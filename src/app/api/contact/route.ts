import { z } from "zod";

const contactSchema = z.object({
  parentName: z.string().trim().min(1).max(100),
  studentName: z.string().trim().min(1).max(100),
  email: z.email().max(254),
  phone: z.string().trim().min(1).max(30),
  interest: z.enum(["lessons", "general"]),
  message: z.string().trim().max(5000),
  website: z.string().optional(),
});

export async function POST(request: Request) {
  if (!request.headers.get("content-type")?.includes("application/json")) {
    return Response.json({ error: "Invalid request" }, { status: 415 });
  }

  const body = await request.json().catch(() => null);
  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json({ error: "Please check your form entries" }, { status: 400 });
  }

  if (parsed.data.website) return Response.json({ ok: true });

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;
  if (!apiKey || !from) {
    console.error("Contact form email configuration is missing");
    return Response.json({ error: "Email service unavailable" }, { status: 503 });
  }

  const { parentName, studentName, email, phone, interest, message } = parsed.data;
  const interestLabel = interest === "lessons" ? "Riding Lessons" : "General Inquiry";
  const text = [
    `Parent or Guardian Name: ${parentName}`,
    `Rider Name: ${studentName}`,
    `Email: ${email}`,
    `Phone: ${phone}`,
    `Interest: ${interestLabel}`,
    "",
    "Message:",
    message || "(none provided)",
  ].join("\n");

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
        subject: `Evermore Equine: ${interestLabel}`,
        text,
      }),
      signal: AbortSignal.timeout(10000),
    });

    if (!response.ok) {
      console.error("Resend rejected contact form submission", response.status, await response.text());
      return Response.json({ error: "Email service unavailable" }, { status: 502 });
    }

    return Response.json({ ok: true });
  } catch (error) {
    console.error("Contact form email request failed", error);
    return Response.json({ error: "Email service unavailable" }, { status: 502 });
  }
}
