import { z } from "zod";

// First-ride list sign-ups from the home page. Sends a short note to the barn inbox
// through the same Resend setup as the contact form.
const schema = z.object({
  email: z.email().max(254),
  website: z.string().optional(),
});

export async function POST(request: Request) {
  if (!request.headers.get("content-type")?.includes("application/json")) {
    return Response.json({ error: "Invalid request" }, { status: 415 });
  }

  const parsed = schema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return Response.json({ error: "Please enter a valid email" }, { status: 400 });
  }

  // Honeypot: bots fill the hidden field; pretend it worked.
  if (parsed.data.website) return Response.json({ ok: true });

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;
  if (!apiKey || !from) {
    console.error("First-ride email configuration is missing");
    return Response.json({ error: "Email service unavailable" }, { status: 503 });
  }

  const { email } = parsed.data;

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: ["connect@evermoreequine.com"],
        reply_to: email,
        subject: "Evermore Equine: First-ride list sign-up",
        text: `New first-ride list sign-up:\n\n${email}\n\nReply to this email to reach them.`,
      }),
      signal: AbortSignal.timeout(10000),
    });

    if (!response.ok) {
      console.error("Resend rejected first-ride sign-up", response.status, await response.text());
      return Response.json({ error: "Email service unavailable" }, { status: 502 });
    }

    return Response.json({ ok: true });
  } catch (error) {
    console.error("First-ride sign-up request failed", error);
    return Response.json({ error: "Email service unavailable" }, { status: 502 });
  }
}
