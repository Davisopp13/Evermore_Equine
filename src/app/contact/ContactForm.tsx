"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const inputClass =
  "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setStatus("sending");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
      });

      if (!response.ok) throw new Error("Message could not be sent");

      form.reset();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  return (
    <form
      className="grid gap-4 md:grid-cols-2 bg-card border border-border rounded-lg p-4 md:p-6 shadow-sm"
      onSubmit={handleSubmit}
    >
      <label className="flex flex-col gap-1 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-foreground">
        Parent or Guardian Name
        <Input type="text" name="parentName" placeholder="If rider is under 18" required maxLength={100} />
      </label>

      <label className="flex flex-col gap-1 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-foreground !whitespace-pre-line">
        Rider Name
        <Input type="text" name="studentName" required maxLength={100} />
      </label>

      <label className="flex flex-col gap-1 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-foreground">
        Email
        <Input type="email" name="email" required maxLength={254} />
      </label>

      <label className="flex flex-col gap-1 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-foreground">
        Phone
        <Input type="tel" name="phone" required maxLength={30} />
      </label>

      <label className="flex flex-col gap-1 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-foreground md:col-span-1">
        Interest
        <select name="interest" className={inputClass} defaultValue="" required>
          <option value="" disabled>
            Select one
          </option>
          <option value="lessons">Riding Lessons</option>
          <option value="general">General Inquiry</option>
        </select>
      </label>

      <label className="flex flex-col gap-1 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-foreground md:col-span-2">
        Message
        <Textarea
          name="message"
          className="min-h-[80px]"
          placeholder="Share any questions or details that will help us serve you"
          maxLength={5000}
        />
      </label>

      <div className="absolute h-px w-px overflow-hidden [clip:rect(0,0,0,0)]" aria-hidden="true">
        <label>
          Leave this field empty
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="md:col-span-2 flex justify-end">
        <Button type="submit" className="w-full md:w-auto" disabled={status === "sending"}>
          {status === "sending" ? "Sending…" : "Send Message"}
        </Button>
      </div>
      {(status === "sent" || status === "error") && (
        <p role="status" aria-live="polite" className="md:col-span-2 text-sm text-muted-foreground">
          {status === "sent"
            ? "Your message was sent. We’ll be in touch soon."
            : "We couldn’t send your message. Please try again or email us using the address above."}
        </p>
      )}
    </form>
  );
}
