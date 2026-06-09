"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { updateManyContent } from "@/lib/actions/content";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { LogOut, Save, Plus, Trash2 } from "lucide-react";

// ── Field components ───────────────────────────────────────────────────────
function Field({
  label,
  contentKey,
  value,
  multiline = false,
  onChange,
}: {
  label: string;
  contentKey: string;
  value: string;
  multiline?: boolean;
  onChange: (key: string, val: string) => void;
}) {
  return (
    <div className="space-y-1.5">
      <Label className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
        {label}
      </Label>
      {multiline ? (
        <Textarea
          value={value}
          onChange={(e) => onChange(contentKey, e.target.value)}
          rows={4}
          className="resize-y text-sm"
        />
      ) : (
        <Input
          value={value}
          onChange={(e) => onChange(contentKey, e.target.value)}
          className="text-sm"
        />
      )}
    </div>
  );
}

// ── Save button for each tab ───────────────────────────────────────────────
function SaveBar({
  keys,
  draft,
  saving,
  onSave,
}: {
  keys: string[];
  draft: Record<string, string>;
  saving: boolean;
  onSave: (entries: Record<string, string>) => void;
}) {
  return (
    <div className="flex justify-end pt-2">
      <Button
        onClick={() => {
          const subset: Record<string, string> = {};
          for (const k of keys) subset[k] = draft[k] ?? "";
          onSave(subset);
        }}
        disabled={saving}
        className="gap-2"
      >
        <Save className="w-4 h-4" />
        {saving ? "Saving…" : "Save changes"}
      </Button>
    </div>
  );
}

// ── Checklist editor ───────────────────────────────────────────────────────
function ChecklistEditor({
  items,
  onChange,
}: {
  items: string[];
  onChange: (updated: string[]) => void;
}) {
  function updateItem(idx: number, val: string) {
    const next = items.map((item, i) => (i === idx ? val : item));
    onChange(next);
  }

  function removeItem(idx: number) {
    onChange(items.filter((_, i) => i !== idx));
  }

  function addItem() {
    onChange([...items, ""]);
  }

  return (
    <div className="space-y-2">
      {items.map((item, idx) => (
        <div key={idx} className="flex gap-2 items-center">
          <Input
            value={item}
            onChange={(e) => updateItem(idx, e.target.value)}
            className="text-sm"
          />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => removeItem(idx)}
            className="shrink-0 text-muted-foreground hover:text-destructive"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      ))}
      <Button
        variant="outline"
        size="sm"
        onClick={addItem}
        className="gap-2 mt-2"
      >
        <Plus className="w-4 h-4" />
        Add item
      </Button>
    </div>
  );
}

// ── Main editor ────────────────────────────────────────────────────────────
export function AdminEditor({
  initialContent,
}: {
  initialContent: Record<string, string>;
}) {
  const router = useRouter();
  const [draft, setDraft] = useState<Record<string, string>>(initialContent);
  const [lessonInfo, setLessonInfo] = useState<string[]>(() => {
    try {
      return JSON.parse(initialContent["services.lessonInfo"] ?? "[]");
    } catch {
      return [];
    }
  });
  const [paymentMethods, setPaymentMethods] = useState<string[]>(() => {
    try {
      return JSON.parse(initialContent["services.paymentMethods"] ?? "[]");
    } catch {
      return [];
    }
  });
  const [isPending, startTransition] = useTransition();

  function set(key: string, val: string) {
    setDraft((prev) => ({ ...prev, [key]: val }));
  }

  function save(entries: Record<string, string>) {
    startTransition(async () => {
      try {
        await updateManyContent(entries);
        toast.success("Changes saved!");
      } catch {
        toast.error("Save failed — please try again.");
      }
    });
  }

  function saveLessonInfo() {
    startTransition(async () => {
      try {
        await updateManyContent({
          "services.lessonInfo": JSON.stringify(lessonInfo),
        });
        toast.success("Lesson information saved!");
      } catch {
        toast.error("Save failed — please try again.");
      }
    });
  }

  function savePricingPayment() {
    startTransition(async () => {
      try {
        await updateManyContent({
          "services.pricing.thirtyMin": draft["services.pricing.thirtyMin"] ?? "$50",
          "services.pricing.oneHour": draft["services.pricing.oneHour"] ?? "$70",
          "services.paymentMethods": JSON.stringify(paymentMethods),
        });
        toast.success("Pricing & payment saved!");
      } catch {
        toast.error("Save failed — please try again.");
      }
    });
  }

  async function handleSignOut() {
    await authClient.signOut();
    router.push("/admin/login");
    router.refresh();
  }

  // ── Home tab keys ──────────────────────────────────────────────────────
  const homeKeys = [
    "home.hero.tagline",
    "home.welcome.title",
    "home.welcome.paragraph1",
    "home.welcome.paragraph2",
    "home.welcome.paragraph3",
    "home.mission.title",
    "home.mission.paragraph1",
    "home.mission.paragraph2",
    "home.basics.title",
    "home.basics.paragraph1",
    "home.basics.paragraph2",
    "home.values.title",
    "home.values.safety.title",
    "home.values.safety.body",
    "home.values.horsemanship.title",
    "home.values.horsemanship.body",
    "home.values.atmosphere.title",
    "home.values.atmosphere.body",
    "home.cta.tagline",
    "home.cta.paragraph1",
    "home.cta.paragraph2",
  ];

  // ── About tab keys ─────────────────────────────────────────────────────
  const aboutKeys = [
    "about.history.title",
    "about.history.paragraph1",
    "about.history.paragraph2",
    "about.history.paragraph3",
    "about.history.paragraph4",
    "about.history.paragraph5",
    "about.history.paragraph6",
    "about.dedication.title",
    "about.dedication.quote",
    "about.dedication.quoteAuthor",
    "about.dedication.paragraph1",
    "about.dedication.paragraph2",
    "about.dedication.paragraph3",
    "about.dedication.paragraph4",
    "about.dedication.footer",
    "about.brand.title",
    "about.brand.paragraph1",
    "about.brand.paragraph2",
    "about.brand.paragraph3",
  ];

  // ── Services tab keys ──────────────────────────────────────────────────
  const servicesKeys = [
    "services.tiers.justGreen.paragraph1",
    "services.tiers.justGreen.paragraph2",
    "services.tiers.justGreen.paragraph3",
    "services.tiers.gallant.paragraph1",
    "services.tiers.gallant.paragraph2",
    "services.tiers.gallant.paragraph3",
    "services.tiers.gallant.paragraph4",
    "services.tiers.trailblazer.paragraph1",
    "services.tiers.trailblazer.paragraph2",
  ];

  // ── Contact tab keys ───────────────────────────────────────────────────
  const contactKeys = [
    "contact.hours.summer.label",
    "contact.hours.summer.days",
    "contact.hours.summer.time",
    "contact.hours.winter.label",
    "contact.hours.winter.days",
    "contact.hours.winter.time",
    "contact.address.line1",
    "contact.address.line2",
    "contact.phone",
    "contact.phone.href",
    "contact.email",
  ];

  return (
    <div className="min-h-screen bg-secondary/10">
      {/* Top bar */}
      <div className="sticky top-0 z-10 bg-background border-b border-border px-6 py-3 flex items-center justify-between">
        <h1
          className="text-xl font-semibold text-primary"
          style={{ fontFamily: "var(--font-nunito)" }}
        >
          evermore equine — Content Editor
        </h1>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleSignOut}
          className="gap-2 text-muted-foreground"
        >
          <LogOut className="w-4 h-4" />
          Sign out
        </Button>
      </div>

      <div className="container max-w-4xl mx-auto px-4 py-8">
        <Tabs defaultValue="home">
          <TabsList className="mb-6">
            <TabsTrigger value="home">Home</TabsTrigger>
            <TabsTrigger value="about">About</TabsTrigger>
            <TabsTrigger value="services">Services</TabsTrigger>
            <TabsTrigger value="contact">Contact</TabsTrigger>
          </TabsList>

          {/* ── HOME ─────────────────────────────────────────────────── */}
          <TabsContent value="home" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Hero</CardTitle>
              </CardHeader>
              <CardContent>
                <Field
                  label="Tagline (appears under logo)"
                  contentKey="home.hero.tagline"
                  value={draft["home.hero.tagline"] ?? ""}
                  onChange={set}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Welcome Section</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Field
                  label="Section Title"
                  contentKey="home.welcome.title"
                  value={draft["home.welcome.title"] ?? ""}
                  onChange={set}
                />
                <Field
                  label="Paragraph 1"
                  contentKey="home.welcome.paragraph1"
                  value={draft["home.welcome.paragraph1"] ?? ""}
                  multiline
                  onChange={set}
                />
                <Field
                  label="Paragraph 2"
                  contentKey="home.welcome.paragraph2"
                  value={draft["home.welcome.paragraph2"] ?? ""}
                  multiline
                  onChange={set}
                />
                <Field
                  label="Paragraph 3"
                  contentKey="home.welcome.paragraph3"
                  value={draft["home.welcome.paragraph3"] ?? ""}
                  multiline
                  onChange={set}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Our Mission</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Field
                  label="Section Title"
                  contentKey="home.mission.title"
                  value={draft["home.mission.title"] ?? ""}
                  onChange={set}
                />
                <Field
                  label="Paragraph 1"
                  contentKey="home.mission.paragraph1"
                  value={draft["home.mission.paragraph1"] ?? ""}
                  multiline
                  onChange={set}
                />
                <Field
                  label="Paragraph 2"
                  contentKey="home.mission.paragraph2"
                  value={draft["home.mission.paragraph2"] ?? ""}
                  multiline
                  onChange={set}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">From Basics to Beyond</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Field
                  label="Section Title"
                  contentKey="home.basics.title"
                  value={draft["home.basics.title"] ?? ""}
                  onChange={set}
                />
                <Field
                  label="Paragraph 1"
                  contentKey="home.basics.paragraph1"
                  value={draft["home.basics.paragraph1"] ?? ""}
                  multiline
                  onChange={set}
                />
                <Field
                  label="Paragraph 2"
                  contentKey="home.basics.paragraph2"
                  value={draft["home.basics.paragraph2"] ?? ""}
                  multiline
                  onChange={set}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Core Values</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <Field
                  label="Section Title"
                  contentKey="home.values.title"
                  value={draft["home.values.title"] ?? ""}
                  onChange={set}
                />
                <Separator />
                <div className="space-y-3">
                  <p className="text-sm font-semibold">Safety First</p>
                  <Field
                    label="Title"
                    contentKey="home.values.safety.title"
                    value={draft["home.values.safety.title"] ?? ""}
                    onChange={set}
                  />
                  <Field
                    label="Body"
                    contentKey="home.values.safety.body"
                    value={draft["home.values.safety.body"] ?? ""}
                    multiline
                    onChange={set}
                  />
                </div>
                <Separator />
                <div className="space-y-3">
                  <p className="text-sm font-semibold">Foundational Horsemanship</p>
                  <Field
                    label="Title"
                    contentKey="home.values.horsemanship.title"
                    value={draft["home.values.horsemanship.title"] ?? ""}
                    onChange={set}
                  />
                  <Field
                    label="Body"
                    contentKey="home.values.horsemanship.body"
                    value={draft["home.values.horsemanship.body"] ?? ""}
                    multiline
                    onChange={set}
                  />
                </div>
                <Separator />
                <div className="space-y-3">
                  <p className="text-sm font-semibold">Peaceful Atmosphere</p>
                  <Field
                    label="Title"
                    contentKey="home.values.atmosphere.title"
                    value={draft["home.values.atmosphere.title"] ?? ""}
                    onChange={set}
                  />
                  <Field
                    label="Body"
                    contentKey="home.values.atmosphere.body"
                    value={draft["home.values.atmosphere.body"] ?? ""}
                    multiline
                    onChange={set}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Call to Action Banner</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Field
                  label="Tagline (italic quote)"
                  contentKey="home.cta.tagline"
                  value={draft["home.cta.tagline"] ?? ""}
                  onChange={set}
                />
                <Field
                  label="Paragraph 1"
                  contentKey="home.cta.paragraph1"
                  value={draft["home.cta.paragraph1"] ?? ""}
                  multiline
                  onChange={set}
                />
                <Field
                  label="Paragraph 2"
                  contentKey="home.cta.paragraph2"
                  value={draft["home.cta.paragraph2"] ?? ""}
                  onChange={set}
                />
              </CardContent>
            </Card>

            <SaveBar
              keys={homeKeys}
              draft={draft}
              saving={isPending}
              onSave={save}
            />
          </TabsContent>

          {/* ── ABOUT ────────────────────────────────────────────────── */}
          <TabsContent value="about" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">
                  The History of 180 White Haven Rd
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Field
                  label="Section Title"
                  contentKey="about.history.title"
                  value={draft["about.history.title"] ?? ""}
                  onChange={set}
                />
                {[1, 2, 3, 4, 5, 6].map((n) => (
                  <Field
                    key={n}
                    label={`Paragraph ${n}`}
                    contentKey={`about.history.paragraph${n}`}
                    value={draft[`about.history.paragraph${n}`] ?? ""}
                    multiline
                    onChange={set}
                  />
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Where It All Began</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Field
                  label="Section Title"
                  contentKey="about.dedication.title"
                  value={draft["about.dedication.title"] ?? ""}
                  onChange={set}
                />
                <Field
                  label="Opening Quote"
                  contentKey="about.dedication.quote"
                  value={draft["about.dedication.quote"] ?? ""}
                  multiline
                  onChange={set}
                />
                <Field
                  label="Quote Author / Attribution"
                  contentKey="about.dedication.quoteAuthor"
                  value={draft["about.dedication.quoteAuthor"] ?? ""}
                  multiline
                  onChange={set}
                />
                {[1, 2, 3, 4].map((n) => (
                  <Field
                    key={n}
                    label={`Paragraph ${n}`}
                    contentKey={`about.dedication.paragraph${n}`}
                    value={draft[`about.dedication.paragraph${n}`] ?? ""}
                    multiline
                    onChange={set}
                  />
                ))}
                <Field
                  label="Dedication footer (italic line)"
                  contentKey="about.dedication.footer"
                  value={draft["about.dedication.footer"] ?? ""}
                  multiline
                  onChange={set}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">
                  Why Evermore & The Color Green?
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Field
                  label="Section Title"
                  contentKey="about.brand.title"
                  value={draft["about.brand.title"] ?? ""}
                  onChange={set}
                />
                {[1, 2, 3].map((n) => (
                  <Field
                    key={n}
                    label={`Paragraph ${n}`}
                    contentKey={`about.brand.paragraph${n}`}
                    value={draft[`about.brand.paragraph${n}`] ?? ""}
                    multiline
                    onChange={set}
                  />
                ))}
              </CardContent>
            </Card>

            <SaveBar
              keys={aboutKeys}
              draft={draft}
              saving={isPending}
              onSave={save}
            />
          </TabsContent>

          {/* ── SERVICES ─────────────────────────────────────────────── */}
          <TabsContent value="services" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">
                  The Just Green (Ages 4-8)
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[1, 2, 3].map((n) => (
                  <Field
                    key={n}
                    label={`Paragraph ${n}`}
                    contentKey={`services.tiers.justGreen.paragraph${n}`}
                    value={
                      draft[`services.tiers.justGreen.paragraph${n}`] ?? ""
                    }
                    multiline
                    onChange={set}
                  />
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">
                  The Gallant (Ages 9-17)
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[1, 2, 3, 4].map((n) => (
                  <Field
                    key={n}
                    label={`Paragraph ${n}`}
                    contentKey={`services.tiers.gallant.paragraph${n}`}
                    value={
                      draft[`services.tiers.gallant.paragraph${n}`] ?? ""
                    }
                    multiline
                    onChange={set}
                  />
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">
                  The Trail Blazer (Ages 18+)
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[1, 2].map((n) => (
                  <Field
                    key={n}
                    label={`Paragraph ${n}`}
                    contentKey={`services.tiers.trailblazer.paragraph${n}`}
                    value={
                      draft[`services.tiers.trailblazer.paragraph${n}`] ?? ""
                    }
                    multiline
                    onChange={set}
                  />
                ))}
              </CardContent>
            </Card>

            <SaveBar
              keys={servicesKeys}
              draft={draft}
              saving={isPending}
              onSave={save}
            />

            <Separator />

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Lesson and Helpful Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <ChecklistEditor items={lessonInfo} onChange={setLessonInfo} />
                <div className="flex justify-end pt-2">
                  <Button
                    onClick={saveLessonInfo}
                    disabled={isPending}
                    className="gap-2"
                  >
                    <Save className="w-4 h-4" />
                    {isPending ? "Saving…" : "Save lesson information"}
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Pricing, Payment, and Policy</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <Field
                    label="30-Minute lesson price"
                    contentKey="services.pricing.thirtyMin"
                    value={draft["services.pricing.thirtyMin"] ?? "$50"}
                    onChange={set}
                  />
                  <Field
                    label="1-Hour lesson price"
                    contentKey="services.pricing.oneHour"
                    value={draft["services.pricing.oneHour"] ?? "$70"}
                    onChange={set}
                  />
                </div>
                <Separator />
                <ChecklistEditor
                  items={paymentMethods}
                  onChange={setPaymentMethods}
                />
                <div className="flex justify-end pt-2">
                  <Button
                    onClick={savePricingPayment}
                    disabled={isPending}
                    className="gap-2"
                  >
                    <Save className="w-4 h-4" />
                    {isPending ? "Saving…" : "Save pricing & payment"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* ── CONTACT ──────────────────────────────────────────────── */}
          <TabsContent value="contact" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Lesson Hours</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <p className="text-sm font-semibold">Summer Season</p>
                  <Field
                    label="Season label (e.g. April - November)"
                    contentKey="contact.hours.summer.label"
                    value={draft["contact.hours.summer.label"] ?? ""}
                    onChange={set}
                  />
                  <Field
                    label="Days open"
                    contentKey="contact.hours.summer.days"
                    value={draft["contact.hours.summer.days"] ?? ""}
                    onChange={set}
                  />
                  <Field
                    label="Hours"
                    contentKey="contact.hours.summer.time"
                    value={draft["contact.hours.summer.time"] ?? ""}
                    onChange={set}
                  />
                </div>
                <Separator />
                <div className="space-y-3">
                  <p className="text-sm font-semibold">Winter Season</p>
                  <Field
                    label="Season label (e.g. December - March)"
                    contentKey="contact.hours.winter.label"
                    value={draft["contact.hours.winter.label"] ?? ""}
                    onChange={set}
                  />
                  <Field
                    label="Days open"
                    contentKey="contact.hours.winter.days"
                    value={draft["contact.hours.winter.days"] ?? ""}
                    onChange={set}
                  />
                  <Field
                    label="Hours"
                    contentKey="contact.hours.winter.time"
                    value={draft["contact.hours.winter.time"] ?? ""}
                    onChange={set}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Location & Contact</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Field
                  label="Address line 1"
                  contentKey="contact.address.line1"
                  value={draft["contact.address.line1"] ?? ""}
                  onChange={set}
                />
                <Field
                  label="Address line 2"
                  contentKey="contact.address.line2"
                  value={draft["contact.address.line2"] ?? ""}
                  onChange={set}
                />
                <Field
                  label="Phone (display, e.g. (570) 709-5501)"
                  contentKey="contact.phone"
                  value={draft["contact.phone"] ?? ""}
                  onChange={set}
                />
                <Field
                  label="Phone href digits (e.g. 15707095501)"
                  contentKey="contact.phone.href"
                  value={draft["contact.phone.href"] ?? ""}
                  onChange={set}
                />
                <Field
                  label="Email address"
                  contentKey="contact.email"
                  value={draft["contact.email"] ?? ""}
                  onChange={set}
                />
              </CardContent>
            </Card>

            <SaveBar
              keys={contactKeys}
              draft={draft}
              saving={isPending}
              onSave={save}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
