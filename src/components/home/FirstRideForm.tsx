"use client";

import { useState, type FormEvent } from "react";
import { Check } from "lucide-react";

export function FirstRideForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setStatus("sending");
    try {
      const response = await fetch("/api/first-ride", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
      });
      if (!response.ok) throw new Error("Sign-up failed");
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div
      id="first-ride"
      className="flex scroll-mt-32 flex-col gap-3.5 rounded-3xl bg-forest p-6 text-cream sm:p-7"
    >
      <div className="flex flex-col gap-1">
        <span className="text-[13px] font-extrabold tracking-[0.2em] text-wheat">
          OPENING FALL 2026
        </span>
        <span className="text-[22px] font-extrabold">Join the first-ride list</span>
        <span className="text-[15px] text-sage">
          Be the first to hear when lesson times open.
        </span>
      </div>

      {status === "sent" ? (
        <p role="status" className="flex min-h-[52px] items-center gap-3 text-[17px] font-bold">
          <span className="flex size-[34px] items-center justify-center rounded-full bg-wheat text-forest">
            <Check className="size-[18px]" strokeWidth={2.5} aria-hidden />
          </span>
          You&rsquo;re on the list. See you at the barn!
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-2.5 sm:flex-row">
          <label htmlFor="first-ride-email" className="sr-only">
            Email address
          </label>
          <input
            id="first-ride-email"
            type="email"
            name="email"
            required
            maxLength={254}
            placeholder="you@email.com"
            className="h-[52px] w-full rounded-full sm:flex-1 border-0 bg-cream px-5 text-base text-ink placeholder:text-bark/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-wheat"
          />
          <div className="absolute h-px w-px overflow-hidden [clip:rect(0,0,0,0)]" aria-hidden="true">
            <input type="text" name="website" tabIndex={-1} autoComplete="off" />
          </div>
          <button
            type="submit"
            disabled={status === "sending"}
            className="h-[52px] rounded-full bg-wheat px-6 text-base font-extrabold text-forest transition-transform hover:-translate-y-0.5 disabled:opacity-70"
          >
            {status === "sending" ? "Adding…" : "Count me in"}
          </button>
        </form>
      )}

      {status === "error" && (
        <p role="status" className="text-sm text-sage">
          We couldn&rsquo;t add you just now. Please try again or email us.
        </p>
      )}
    </div>
  );
}
