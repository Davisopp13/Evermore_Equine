export const dynamic = "force-dynamic";

import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { getAllContent } from "@/lib/actions/content";

export default async function AboutPage() {
  const c = await getAllContent();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header with hero image */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden bg-[#2D4F1E]">
        <div className="absolute inset-0">
          <Image
            src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/e1c444d2-b20c-4128-9d1e-7b509ac38088/Attachment-1-1769783405836.png?width=8000&height=8000&resize=contain"
            alt="Pine Forest"
            fill
            className="object-cover opacity-60"
            priority
          />
        </div>
        <div className="container px-4 md:px-6 text-center relative z-10">
          <h1
            className="text-[70px] md:text-[82px] lg:text-[106px] text-white mx-auto max-w-full drop-shadow-lg !whitespace-pre-line !w-[82%] md:!max-w-[82%]"
            style={{ fontFamily: "var(--font-great-day)" }}
          >
            Our Story
          </h1>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 md:px-6 py-16 space-y-24">
        {/* The History of 180 White Haven Rd */}
        <section className="grid md:grid-cols-2 gap-12 items-center md:grid-flow-col-dense">
          <div className="space-y-6 md:col-start-2">
            <h2
              className="text-2xl font-bold text-primary"
              style={{ fontFamily: "var(--font-nunito)" }}
            >
              {c["about.history.title"] ?? "The History of 180 White Haven Rd"}
            </h2>
            <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
              <p>{c["about.history.paragraph1"]}</p>
              <p>{c["about.history.paragraph2"]}</p>
              <p>{c["about.history.paragraph3"]}</p>
              <p>{c["about.history.paragraph4"]}</p>
              <p>{c["about.history.paragraph5"]}</p>
              <p>{c["about.history.paragraph6"]}</p>
            </div>
          </div>
          <div className="space-y-6 md:col-start-1">
            <div className="space-y-3 flex flex-col items-center">
              <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-lg">
                <Image
                  src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/2EC24B38-7C13-4462-BDC1-C46088D413E7-1766588996852.JPG?width=8000&height=8000&resize=contain"
                  alt="Aerial view of 180 White Haven Road property"
                  fill
                  className="object-cover"
                />
              </div>
              <p className="text-center text-xs text-muted-foreground italic">
                evermore equine
              </p>
            </div>
            <div className="space-y-3 flex flex-col items-center pt-8">
              <div className="relative rounded-xl overflow-hidden shadow-lg w-[268px] max-w-full" style={{ aspectRatio: "268/318" }}>
                <Image
                  src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/Big-red-School-1766590252852.png?width=8000&height=8000&resize=contain"
                  alt="Mariah with Big Red"
                  fill
                  className="object-cover"
                />
              </div>
              <p className="text-center text-xs text-muted-foreground italic">
                Mariah and Big Red at Houghton University circa 2019
              </p>
            </div>
          </div>
        </section>

        <Separator className="bg-border" />

        {/* Mariah's Dedication Section */}
        <section className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-3 w-full md:w-[464px] flex flex-col items-center">
            <div className="relative rounded-xl overflow-hidden shadow-lg w-full" style={{ aspectRatio: "464/656" }}>
              <Image
                src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/IMG_8834-1763680980805.jpg?width=8000&height=8000&resize=contain"
                alt="Young rider on horse at Bear Creek property"
                fill
                className="object-cover"
              />
            </div>
            <p className="text-center text-xs text-muted-foreground italic !whitespace-pre-line">
              Mariah and Cappy circa 2007
            </p>
          </div>
          <div className="space-y-6">
            <h2
              className="text-2xl font-bold text-primary"
              style={{ fontFamily: "var(--font-nunito)" }}
            >
              {c["about.dedication.title"] ?? "Where It All Began"}
            </h2>
            <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
              <div className="space-y-2">
                <p className="italic text-xs text-foreground">
                  {c["about.dedication.quote"]}
                </p>
                <p className="text-[11px]">{c["about.dedication.quoteAuthor"]}</p>
              </div>

              <p>{c["about.dedication.paragraph1"]}</p>
              <p>{c["about.dedication.paragraph2"]}</p>
              <p>{c["about.dedication.paragraph3"]}</p>
              <p>{c["about.dedication.paragraph4"]}</p>

              <p className="pt-4 border-t border-border italic font-medium text-foreground">
                {c["about.dedication.footer"]}
              </p>
            </div>
          </div>
        </section>

        <Separator className="bg-border" />

        {/* Brand Identity Section */}
        <section className="text-center max-w-3xl mx-auto space-y-8">
          <h2
            className="text-2xl font-bold text-primary"
            style={{ fontFamily: "var(--font-nunito)" }}
          >
            {c["about.brand.title"] ?? "Why Evermore & The Color Green?"}
          </h2>

          <div className="text-left space-y-6">
            <div className="space-y-2">
              <p className="text-sm font-semibold text-foreground">
                <strong>Evermore</strong> [ev-er-mawr, -mohr]
              </p>
              <p className="text-muted-foreground italic">adverb</p>
              <p className="text-muted-foreground">always; continually; forever</p>
              <p className="text-muted-foreground">at all times; henceforth</p>
            </div>

            <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
              <p>{c["about.brand.paragraph1"]}</p>
              <p>{c["about.brand.paragraph2"]}</p>
              <p>{c["about.brand.paragraph3"]}</p>
            </div>

            <div className="flex flex-col md:flex-row gap-8 items-center">
              <blockquote className="border-l-4 border-primary pl-6 py-4 italic text-sm text-foreground flex-1">
                <p>&ldquo;And I couldn&apos;t be sure</p>
                <p>I had a feeling so peculiar</p>
                <p>This pain wouldn&apos;t be for</p>
                <p>Evermore.&rdquo;</p>
              </blockquote>
              <div className="space-y-2 flex-shrink-0 flex flex-col items-center">
                <div className="relative w-[200px] h-[130px] md:w-[260px] md:h-[170px] rounded-xl overflow-hidden shadow-xl">
                  <Image
                    src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/36686A12-4045-452F-827D-E15F878CB7D4-1765893758118.JPG?width=8000&height=8000&resize=contain"
                    alt="Rider on horse at pasture"
                    fill
                    className="object-cover"
                  />
                </div>
                <p className="text-center text-xs text-muted-foreground italic">
                  Mariah on Big Red at her first competition circa 2012
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
