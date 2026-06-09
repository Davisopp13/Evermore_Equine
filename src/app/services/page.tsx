export const dynamic = "force-dynamic";

import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Check, Award, BookOpen } from "lucide-react";
import { getAllContent } from "@/lib/actions/content";

export default async function ServicesPage() {
  const c = await getAllContent();

  let lessonInfo: string[] = [];
  try {
    lessonInfo = JSON.parse(c["services.lessonInfo"] ?? "[]");
  } catch {
    lessonInfo = [];
  }

  let paymentMethods: string[] = [];
  try {
    paymentMethods = JSON.parse(c["services.paymentMethods"] ?? "[]");
  } catch {
    paymentMethods = [];
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
              What We Offer
            </h2>
            <p className="text-muted-foreground text-lg">
              Tailored programs designed for every stage of riding.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
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

            {/* The Gallant — Ages 9-17 */}
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
                  Ages 9-17
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
          </div>

          {/* Adult Riders notice */}
          <div className="mt-8 text-center">
            <p className="text-base text-muted-foreground">
              <span className="font-semibold text-foreground">Adult Riders:</span> lessons upon request
            </p>
          </div>
        </section>

        {/* Pricing, Payment, and Policy */}
        <section>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle
                  className="text-xl font-bold text-primary"
                  style={{ fontFamily: "var(--font-nunito)" }}
                >
                  Lesson and Helpful Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {lessonInfo.map((item, i) => (
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
                  Pricing, Payment, and Policy
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-10">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-primary">
                      {c["services.pricing.thirtyMin"] ?? "$50"}
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">30 Minutes</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-primary">
                      {c["services.pricing.oneHour"] ?? "$70"}
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">1 Hour</p>
                  </div>
                </div>
                <div className="border-t border-border/50 pt-4">
                  <ul className="space-y-3">
                    {paymentMethods.map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-muted-foreground leading-relaxed">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
}
