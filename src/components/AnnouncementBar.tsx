"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

// Slim opening-season ribbon. Replaces the old "Opening Fall 2026" pop-up.
export function AnnouncementBar() {
  const pathname = usePathname();
  if (pathname.startsWith("/admin")) return null;

  return (
    <div className="bg-forest text-sand">
      <div className="mx-auto flex min-h-11 max-w-7xl flex-wrap items-center justify-center gap-x-3 gap-y-1 px-4 py-2 text-center text-[13px] font-semibold tracking-[0.02em] sm:text-sm">
        <span className="hidden size-2 rounded-full bg-[#d9a066] sm:inline-block" aria-hidden />
        <span>Opening Fall 2026. The first-ride list is open!</span>
        <Link
          href="/#first-ride"
          className="text-cream underline underline-offset-[3px] hover:text-wheat"
        >
          Save your spot
        </Link>
      </div>
    </div>
  );
}
