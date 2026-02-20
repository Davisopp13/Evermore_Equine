export const dynamic = "force-dynamic";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Check, Award, BookOpen, Heart } from "lucide-react";
import { getAllContent } from "@/lib/actions/content";

interface PackageOption {
  duration: string;
  price: string;
  savings: string | null;
}

interface LessonPackage {
  name: string;
  subtitle: string;
  color: string;
  options: PackageOption[];
}

export default async function ServicesPage() {
  const c = await getAllContent();

  let packages: LessonPackage[] = [];
  try {
    packages = JSON.parse(c["services.packages"] ?? "[]");
  } catch {
    packages = [];
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Banner Section */}
      <section className="relative h-[30vh] md:h-[40vh] flex items-center justify-center overflow-hidden bg-[#2D4F1E]">
        <Image
          src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/e1c444d2-b20c-4128-9d1e-7b509ac38088/Attachment-1-1769783405836.png?width=8000&height=8000&resize=contain"
          alt="Pine Forest"
          fill
          priority
          className="object-cover opacity-60"
        />
        <div className="container px-4 md:px-6 text-center relative z-10">
          <h1
            className="text-5xl font-normal text-white drop-shadow-lg pt-6"
            style={{ fontFamily: "var(--font-great-day)" }}
          >
            Services &amp; Pricing
          </h1>
        </div>
      </section>

      <div className="container px-4 md:px-6 py-16 md:py-24 space-y-24">
        {/* Age-Based Lesson Tiers */}
        <section>
          <div className="text-center mb-12 space-y-3">
            <h2
              className="text-3xl md:text-4xl font-bold text-primary"
              style={{ fontFamily: "var(--font-nunito)" }}
            >
              Lesson Tiers by Age
            </h2>
            <p className="text-muted-foreground text-lg">
              Tailored programs designed for every stage of riding.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {/* The Just Green — Ages 4-8 */}
            <Card className="border-border/50 hover:shadow-lg transition-all">
              <CardHeader className="text-center pb-4">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-500/10 mx-auto mb-4">
                  <BookOpen className="w-8 h-8 text-emerald-500" />
                </div>
                <CardTitle
                  className="text-2xl text-emerald-600"
                  style={{ fontFamily: "var(--font-nunito)" }}
                >
                  The Just Green
                </CardTitle>
                <CardDescription className="text-base font-medium text-foreground/70 mt-2">
                  Ages 4-8
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground italic">
                    15 minutes in the barn • 15 minutes in the saddle
                  </p>
                </div>
                <div className="pt-4 border-t border-border/50 space-y-3 text-left">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    <strong className="text-foreground">
                      A &ldquo;Green&rdquo; horse or rider is inexperienced but is eager and
                      ready to learn!
                    </strong>
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {c["services.tiers.justGreen.paragraph1"]}
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {c["services.tiers.justGreen.paragraph2"]}
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {c["services.tiers.justGreen.paragraph3"]}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* The Gallant — Ages 9-18 */}
            <Card className="border-border/50 hover:shadow-lg transition-all">
              <CardHeader className="text-center pb-4">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mx-auto mb-4">
                  <Award className="w-8 h-8 text-primary" />
                </div>
                <CardTitle
                  className="text-2xl text-primary"
                  style={{ fontFamily: "var(--font-nunito)" }}
                >
                  The Gallant
                </CardTitle>
                <CardDescription className="text-base font-medium text-foreground/70 mt-2">
                  Ages 9-18
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground italic">
                    20 minutes hands-on in the barn • 40 minutes in the saddle
                  </p>
                </div>
                <div className="pt-4 border-t border-border/50 space-y-3 text-left">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    <strong className="text-foreground">
                      Equestrians often use the word &ldquo;Gallant&rdquo; to describe horse
                      and rider alike as brave, honest and noble.
                    </strong>
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {c["services.tiers.gallant.paragraph1"]}
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {c["services.tiers.gallant.paragraph2"]}
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {c["services.tiers.gallant.paragraph3"]}
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {c["services.tiers.gallant.paragraph4"]}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* The Trail Blazer — Ages 18+ */}
            <Card className="border-border/50 hover:shadow-lg transition-all">
              <CardHeader className="text-center pb-4">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-amber-500/10 mx-auto mb-4">
                  <Heart className="w-8 h-8 text-amber-500" />
                </div>
                <CardTitle
                  className="text-2xl text-amber-600"
                  style={{ fontFamily: "var(--font-nunito)" }}
                >
                  The Trail Blazer
                </CardTitle>
                <CardDescription className="text-base font-medium text-foreground/70 mt-2">
                  Ages 18 and up
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground italic">
                    30-60 minutes flexible lesson lengths for adult learners
                  </p>
                </div>
                <div className="pt-4 border-t border-border/50 space-y-3 text-left">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    <strong className="text-foreground">
                      A &ldquo;Trailblazer&rdquo; is someone who forges their own path and
                      creates opportunities for others to follow.
                    </strong>
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {c["services.tiers.trailblazer.paragraph1"]}
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {c["services.tiers.trailblazer.paragraph2"]}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Lesson Packages */}
        <section>
          <div className="text-center mb-12 space-y-3">
            <h2
              className="text-3xl md:text-4xl font-bold text-primary"
              style={{ fontFamily: "var(--font-nunito)" }}
            >
              Lesson Packages
            </h2>
            <p className="text-muted-foreground text-lg !whitespace-pre-line">
              Choose the package that best fits your goals and schedule.
            </p>
          </div>

          <div className="flex flex-col gap-4 max-w-4xl mx-auto">
            {packages.map((tier) => (
              <Card
                key={tier.name}
                className="border-border/50 hover:shadow-lg transition-all overflow-hidden"
              >
                <div className="flex flex-col md:flex-row md:items-center p-6 gap-6">
                  <div className="flex-1 space-y-1 text-left">
                    <h3
                      className="text-xl font-bold"
                      style={{
                        fontFamily: "var(--font-nunito)",
                        color: tier.color,
                      }}
                    >
                      {tier.name}
                    </h3>
                    {tier.subtitle && (
                      <p className="text-sm text-muted-foreground">
                        {tier.subtitle}
                      </p>
                    )}
                  </div>

                  <div className="flex-1 md:text-center md:border-x border-border/50 md:px-6">
                    <div className="flex flex-col gap-3">
                      {tier.options.map((option, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-start gap-4"
                        >
                          <span className="text-sm font-medium text-muted-foreground w-16 text-right">
                            {option.duration}
                          </span>
                          <div className="flex items-center gap-2">
                            <span
                              className="text-2xl font-bold"
                              style={{ color: tier.color }}
                            >
                              {option.price}
                            </span>
                            {option.savings && (
                              <span
                                className="px-2 py-1 rounded-full text-xs font-bold whitespace-nowrap"
                                style={{
                                  backgroundColor: `${tier.color}20`,
                                  color: tier.color,
                                }}
                              >
                                {option.savings}
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="md:w-40 shrink-0">
                    <Button asChild className="w-full" variant="outline">
                      <Link href="/contact">Get Started</Link>
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Additional Information */}
          <div className="mt-16 grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle
                  className="text-xl font-bold text-primary"
                  style={{ fontFamily: "var(--font-nunito)" }}
                >
                  Lesson Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {[
                    "Each lesson is private unless group lesson is requested",
                    "All lesson packages are due on the day of first lesson",
                    "All riders are required to wear long pants, boots, and an ASTM certified helmet while mounted",
                    "Evermore Equine provides Certified Helmets for all riders",
                    "We welcome all friends, family, and pets, please keep all pets leashed for their safety",
                    "All visitors are required to wear closed toe shoes for their safety",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-muted-foreground leading-relaxed">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="border-border/50">
              <CardHeader>
                <CardTitle
                  className="text-xl font-bold text-primary"
                  style={{ fontFamily: "var(--font-nunito)" }}
                >
                  Payment Methods
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {[
                    "Venmo (@evermore.equine)",
                    "Cash",
                    "Check (made out to Evermore Equine)",
                    "Lessons may be rescheduled or gifted, but cannot be refunded",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-muted-foreground leading-relaxed">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
}
