"use client";

import * as React from "react";
import { CalendarDays } from "lucide-react";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const ANNOUNCEMENT_SESSION_KEY = "evermore-opening-fall-2026-seen";

export function OpeningAnnouncement() {
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    if (pathname.startsWith("/admin")) return;

    const hasSeenAnnouncement = window.sessionStorage.getItem(
      ANNOUNCEMENT_SESSION_KEY
    );

    if (!hasSeenAnnouncement) {
      setOpen(true);
    }
  }, [pathname]);

  function handleOpenChange(nextOpen: boolean) {
    setOpen(nextOpen);

    if (!nextOpen) {
      window.sessionStorage.setItem(ANNOUNCEMENT_SESSION_KEY, "true");
    }
  }

  if (pathname.startsWith("/admin")) return null;

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="overflow-hidden border-primary/20 bg-background p-0 shadow-2xl sm:max-w-md">
        <div className="h-2 bg-primary" />
        <div className="px-6 pb-7 pt-4 text-center sm:px-9 sm:pb-9">
          <div className="mx-auto mb-5 flex size-14 items-center justify-center rounded-full bg-secondary text-primary">
            <CalendarDays className="size-7" aria-hidden="true" />
          </div>

          <DialogHeader className="items-center text-center sm:text-center">
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-muted-foreground">
              Coming Soon
            </p>
            <DialogTitle className="flex flex-col items-center text-primary">
              <span
                className="text-4xl leading-tight sm:text-5xl"
                style={{ fontFamily: "var(--font-great-day)" }}
              >
                Opening Fall
              </span>
              <span
                className="mt-1 text-3xl font-extrabold tracking-[0.16em] sm:text-4xl"
                style={{ fontFamily: "var(--font-nunito)" }}
              >
                2026
              </span>
            </DialogTitle>
            <DialogDescription className="max-w-sm pt-2 text-base leading-relaxed text-muted-foreground">
              Evermore Equine is not yet open for lessons or training. We look
              forward to welcoming riders beginning in Fall 2026.
            </DialogDescription>
          </DialogHeader>

          <DialogClose asChild>
            <Button className="mt-7 w-full rounded-full py-5 font-semibold">
              Explore the Site
            </Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}
