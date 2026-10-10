"use client";

import * as React from "react";
import { CalendarDays } from "lucide-react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { isActivePopup, type PopupSettings } from "@/lib/popup";

const SESSION_KEY = "evermore-announcement-dismissed-revision";

export function OpeningAnnouncement() {
  const pathname = usePathname();
  const [settings, setSettings] = React.useState<PopupSettings | null>(null);
  const [dismissedRevision, setDismissedRevision] = React.useState("");
  const [imageFailed, setImageFailed] = React.useState(false);
  const [now, setNow] = React.useState(() => Date.now());
  const isAdmin = pathname?.startsWith("/admin");

  React.useEffect(() => {
    if (isAdmin) return;
    let cancelled = false;
    async function refresh() {
      try {
        const response = await fetch("/api/popup", { cache: "no-store" });
        if (!response.ok) throw new Error("Popup unavailable");
        const next = await response.json() as PopupSettings | null;
        if (!cancelled) {
          try {
            const stored = window.sessionStorage.getItem(SESSION_KEY);
            if (stored) setDismissedRevision(stored);
          } catch {
            // Keep the in-memory dismissal when storage is unavailable.
          }
          setSettings(next);
          setNow(Date.now());
        }
      } catch {
        if (!cancelled) setSettings(null);
      }
    }
    void refresh();
    const interval = window.setInterval(() => { void refresh(); }, 30_000);
    const onFocus = () => { void refresh(); };
    window.addEventListener("focus", onFocus);
    return () => {
      cancelled = true;
      window.clearInterval(interval);
      window.removeEventListener("focus", onFocus);
    };
  }, [isAdmin]);

  React.useEffect(() => { setImageFailed(false); }, [settings?.revision]);

  React.useEffect(() => {
    if (!settings?.expiresAt || now >= Date.parse(settings.expiresAt)) return;
    const remaining = Date.parse(settings.expiresAt) - Date.now();
    if (remaining <= 0) {
      setNow(Date.now());
      return;
    }
    const timeout = window.setTimeout(() => setNow(Date.now()), Math.min(remaining, 2_147_483_647));
    return () => window.clearTimeout(timeout);
  }, [settings?.expiresAt, now]);

  function dismiss() {
    if (!settings) return;
    setDismissedRevision(settings.revision);
    try {
      window.sessionStorage.setItem(SESSION_KEY, settings.revision);
    } catch {
      // Storage can be blocked; dismissal still works for this mounted page.
    }
  }

  if (isAdmin || !settings) return null;
  const open = isActivePopup(settings, now) && dismissedRevision !== settings.revision;

  return (
    <Dialog open={open} onOpenChange={(next) => { if (!next) dismiss(); }}>
      <DialogContent
        className="max-h-[90dvh] overflow-y-auto border-primary/20 bg-background p-0 shadow-2xl sm:max-w-md"
        onCloseAutoFocus={(event) => {
          event.preventDefault();
          document.querySelector<HTMLElement>("header a")?.focus();
        }}
      >
        <div className="h-2 bg-primary" />
        <div className="px-6 pb-7 pt-4 text-center sm:px-9 sm:pb-9">
          <div className="mx-auto mb-5 flex size-14 items-center justify-center rounded-full bg-secondary text-primary">
            <CalendarDays className="size-7" aria-hidden="true" />
          </div>
          <DialogHeader className="items-center text-center sm:text-center">
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-muted-foreground">Coming Soon</p>
            <DialogTitle className="text-4xl leading-tight text-primary sm:text-5xl" style={{ fontFamily: "var(--font-great-day)" }}>
              {settings.headline}
            </DialogTitle>
            <DialogDescription className="max-w-sm whitespace-pre-line pt-2 text-base leading-relaxed text-muted-foreground">
              {settings.message}
            </DialogDescription>
          </DialogHeader>
          {settings.imageUrl && !imageFailed && (
            // A remote admin-entered image can fail independently of the announcement.
            <img src={settings.imageUrl} alt="Announcement" onError={() => setImageFailed(true)} className="mx-auto mt-5 max-h-56 w-full rounded-lg object-contain" />
          )}
          <DialogClose asChild>
            {settings.buttonUrl ? (
              <Button asChild className="mt-7 w-full rounded-full py-5 font-semibold">
                <a href={settings.buttonUrl}>{settings.buttonText}</a>
              </Button>
            ) : (
              <Button className="mt-7 w-full rounded-full py-5 font-semibold">{settings.buttonText}</Button>
            )}
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}
