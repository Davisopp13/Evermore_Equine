"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";
import { savePopupSettings } from "@/lib/actions/popup";
import { type PopupSettings } from "@/lib/popup";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Save } from "lucide-react";

function localDateTime(iso: string | null): string {
  if (!iso) return "";
  const date = new Date(iso);
  const local = new Date(date.getTime() - date.getTimezoneOffset() * 60_000);
  return local.toISOString().slice(0, 16);
}

export function PopupEditor({ initialSettings }: { initialSettings: PopupSettings }) {
  const [draft, setDraft] = useState(initialSettings);
  const [endLocal, setEndLocal] = useState(() => localDateTime(initialSettings.expiresAt));
  const [error, setError] = useState("");
  const [imageFailed, setImageFailed] = useState(false);
  const [isPending, startTransition] = useTransition();
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone || "your device timezone";

  function change<K extends keyof PopupSettings>(key: K, value: PopupSettings[K]) {
    setDraft((previous) => ({ ...previous, [key]: value }));
    setError("");
    if (key === "imageUrl") setImageFailed(false);
  }

  function save() {
    setError("");
    const endDate = endLocal ? new Date(endLocal) : null;
    if (endDate && !Number.isFinite(endDate.getTime())) {
      setError("Enter a valid end date and time.");
      return;
    }
    const expiresAt = endDate?.toISOString() ?? null;
    startTransition(async () => {
      try {
        const saved = await savePopupSettings({
          enabled: draft.enabled,
          headline: draft.headline,
          message: draft.message,
          imageUrl: draft.imageUrl,
          buttonText: draft.buttonText,
          buttonUrl: draft.buttonUrl,
          expiresAt,
        });
        setDraft(saved);
        setEndLocal(localDateTime(saved.expiresAt));
        toast.success("Popup settings saved.");
      } catch (cause) {
        const message = cause instanceof Error ? cause.message : "Save failed. Please try again.";
        setError(message);
        toast.error("Popup settings were not saved.");
      }
    });
  }

  return (
    <Card>
      <CardHeader><CardTitle className="text-base">Announcement popup</CardTitle></CardHeader>
      <CardContent className="space-y-5">
        <div className="flex items-center justify-between gap-4 rounded-lg border p-4">
          <div>
            <Label htmlFor="popup-enabled" className="font-semibold">Show popup</Label>
            <p className="text-sm text-muted-foreground">Off or expired popups stay hidden.</p>
          </div>
          <Switch id="popup-enabled" checked={draft.enabled} onCheckedChange={(value) => change("enabled", value)} aria-label="Show popup" />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="popup-headline">Headline</Label>
          <Input id="popup-headline" value={draft.headline} maxLength={120} onChange={(event) => change("headline", event.target.value)} />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="popup-message">Message</Label>
          <Textarea id="popup-message" value={draft.message} maxLength={2000} rows={5} onChange={(event) => change("message", event.target.value)} />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="popup-image">Image URL (optional)</Label>
          <Input id="popup-image" type="url" placeholder="https://example.com/image.jpg" value={draft.imageUrl} onChange={(event) => change("imageUrl", event.target.value)} />
          {draft.imageUrl && !imageFailed && (
            // Preview the same URL visitors will load; a failed image does not block editing.
            <img src={draft.imageUrl} alt="Popup image preview" onError={() => setImageFailed(true)} className="max-h-48 w-full rounded-lg border object-contain" />
          )}
          {imageFailed && <p role="status" className="text-sm text-destructive">Image preview could not load. Check the URL.</p>}
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label htmlFor="popup-button-text">Button text</Label>
            <Input id="popup-button-text" value={draft.buttonText} maxLength={80} onChange={(event) => change("buttonText", event.target.value)} />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="popup-button-url">Button destination (optional)</Label>
            <Input id="popup-button-url" placeholder="/services or https://example.com" value={draft.buttonUrl} onChange={(event) => change("buttonUrl", event.target.value)} />
            <p className="text-xs text-muted-foreground">Leave blank to close the popup.</p>
          </div>
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="popup-end">Stop showing after (optional)</Label>
          <Input id="popup-end" type="datetime-local" value={endLocal} onChange={(event) => { setEndLocal(event.target.value); setError(""); }} />
          <p className="text-xs text-muted-foreground">Time zone: {timeZone}. The saved deadline is converted to UTC. Clear this field for no end time.</p>
        </div>
        {error && <p role="alert" className="text-sm text-destructive">{error}</p>}
        <div className="flex justify-end">
          <Button disabled={isPending} onClick={save} className="gap-2"><Save className="size-4" />{isPending ? "Saving…" : "Save popup settings"}</Button>
        </div>
      </CardContent>
    </Card>
  );
}
