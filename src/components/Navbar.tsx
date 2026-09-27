"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ArrowRight, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const LOGO =
  "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/EE-Logo-1763684405565.JPG?width=8000&height=8000&resize=contain";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Our Story", href: "/about" },
  { name: "Services & Pricing", href: "/services" },
  { name: "Schedule & Contact", href: "/contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => setOpen(false), [pathname]);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-line bg-cream/95 backdrop-blur supports-[backdrop-filter]:bg-cream/80">
      <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:h-[92px] lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src={LOGO}
            alt="evermore equine logo"
            width={62}
            height={62}
            className="size-12 object-contain lg:size-[62px]"
            priority
          />
          <span className="font-script text-[24px] leading-none text-forest lg:text-[29px]">
            evermore equine
          </span>
        </Link>

        <nav className="hidden items-center gap-8 text-[15px] font-semibold lg:flex">
          {navigation.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "border-b-2 pb-1 transition-colors",
                  active
                    ? "border-forest text-forest"
                    : "border-transparent text-bark hover:text-forest",
                )}
              >
                {item.name}
              </Link>
            );
          })}
          <Link
            href="/contact"
            className="flex items-center gap-2 rounded-full bg-forest px-6 py-3 text-cream transition-transform hover:-translate-y-0.5"
          >
            Schedule a lesson
            <ArrowRight className="size-4" aria-hidden />
          </Link>
        </nav>

        <button
          type="button"
          className="flex size-12 items-center justify-center rounded-full text-forest hover:bg-sand lg:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </div>

      {open && (
        <div
          id="mobile-menu"
          className="absolute inset-x-3 top-full mt-2 rounded-3xl bg-cream p-2.5 shadow-[0_24px_48px_-18px_rgba(2,50,32,0.5)] lg:hidden"
        >
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex h-[52px] items-center rounded-2xl px-4 text-[17px] font-bold text-forest",
                pathname === item.href && "bg-sand",
              )}
            >
              {item.name}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
