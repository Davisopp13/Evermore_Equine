"use client";

import { useState } from "react";
import { Mail, MessageSquare, Phone } from "lucide-react";
import { cn } from "@/lib/utils";

type Season = { label: string; days: string; time: string };

export function HoursCard({
  seasons,
  phone,
  email,
}: {
  seasons: [Season, Season];
  phone: string;
  email: string;
}) {
  const [active, setActive] = useState(0);
  const s = seasons[active];

  const action =
    "flex flex-col items-center gap-1.5 rounded-2xl bg-cream p-3.5 text-sm font-bold text-forest transition-colors hover:bg-sand";

  return (
    <div className="flex flex-col gap-4 rounded-3xl border border-line bg-white p-6 sm:p-7">
      <div
        className="flex self-start rounded-full bg-sand p-1.5"
        role="group"
        aria-label="Season"
      >
        {seasons.map((season, i) => (
          <button
            key={season.label}
            type="button"
            aria-pressed={i === active}
            onClick={() => setActive(i)}
            className={cn(
              "h-11 whitespace-nowrap rounded-full px-3.5 text-[13px] font-bold transition-colors sm:px-5 sm:text-sm",
              i === active ? "bg-forest text-cream" : "text-bark hover:text-forest",
            )}
          >
            {season.label}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 pt-1.5">
        <span className="text-xl font-extrabold text-forest sm:text-[22px]">{s.days}</span>
        <span className="text-xl font-bold text-pine sm:text-[22px]">{s.time}</span>
      </div>

      <div className="grid grid-cols-3 gap-2.5 pt-1.5">
        <a href={`tel:${phone}`} className={action}>
          <Phone className="size-[22px]" aria-hidden />
          Call
        </a>
        <a href={`sms:${phone}`} className={action}>
          <MessageSquare className="size-[22px]" aria-hidden />
          Text
        </a>
        <a href={`mailto:${email}`} className={action}>
          <Mail className="size-[22px]" aria-hidden />
          Email
        </a>
      </div>
    </div>
  );
}
