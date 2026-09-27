"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export type Value = { title: string; body: string; img: string; alt: string };

export function ValuesTabs({ values }: { values: Value[] }) {
  const [active, setActive] = useState(0);
  const current = values[active];

  return (
    <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
      <div className="flex flex-col gap-3.5" role="tablist" aria-label="Our values">
        {values.map((v, i) => {
          const on = i === active;
          return (
            <button
              key={v.title}
              type="button"
              role="tab"
              id={`value-tab-${i}`}
              aria-selected={on}
              aria-controls="value-panel"
              onClick={() => setActive(i)}
              className={cn(
                "flex items-start gap-5 rounded-[22px] border-[1.5px] px-6 py-6 text-left transition-colors duration-300 sm:px-7",
                on
                  ? "border-wheat bg-cream text-forest"
                  : "border-sage/25 bg-transparent text-cream hover:border-sage/50",
              )}
            >
              <span
                className={cn(
                  "pt-1.5 text-[15px] font-extrabold",
                  on ? "text-pine" : "text-wheat",
                )}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="flex flex-col gap-1.5">
                <span className="text-xl font-extrabold sm:text-2xl">{v.title}</span>
                <span className="text-base leading-relaxed opacity-85">{v.body}</span>
              </span>
            </button>
          );
        })}
      </div>

      <div
        id="value-panel"
        role="tabpanel"
        aria-labelledby={`value-tab-${active}`}
        className="relative min-h-[300px] overflow-hidden rounded-[28px] lg:min-h-[460px]"
      >
        {values.map((v, i) => (
          <Image
            key={v.img}
            src={v.img}
            alt={i === active ? v.alt : ""}
            fill
            sizes="(min-width: 1024px) 560px, 100vw"
            className={cn(
              "object-cover transition-opacity duration-500",
              i === active ? "opacity-100" : "opacity-0",
            )}
          />
        ))}
        <span className="sr-only" aria-live="polite">
          {current.title}
        </span>
      </div>
    </div>
  );
}
