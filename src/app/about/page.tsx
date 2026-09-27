export const dynamic = "force-dynamic";

import Image from "next/image";
import { getAllContent } from "@/lib/actions/content";

const IMG = {
  forest:
    "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/e1c444d2-b20c-4128-9d1e-7b509ac38088/Attachment-1-1769783405836.png?width=8000&height=8000&resize=contain",
  aerial:
    "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/2EC24B38-7C13-4462-BDC1-C46088D413E7-1766588996852.JPG?width=8000&height=8000&resize=contain",
  bigRedSchool:
    "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/Big-red-School-1766590252852.png?width=8000&height=8000&resize=contain",
  cappy:
    "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/IMG_8834-1763680980805.jpg?width=8000&height=8000&resize=contain",
  bigRedFirst:
    "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/36686A12-4045-452F-827D-E15F878CB7D4-1765893758118.JPG?width=8000&height=8000&resize=contain",
};

function Script({ children }: { children: React.ReactNode }) {
  return <p className="font-script text-[28px] leading-none text-pine sm:text-[33px]">{children}</p>;
}

function Caption({ children }: { children: React.ReactNode }) {
  return <p className="text-center text-sm italic text-bark">{children}</p>;
}

export default async function AboutPage() {
  const c = await getAllContent();
  const body = "text-base leading-[1.75] text-bark sm:text-[17px]";

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative flex h-[46vh] min-h-[360px] items-center justify-center overflow-hidden bg-[#2d4f1e] lg:h-[560px]">
        <Image src={IMG.forest} alt="Pine forest" fill priority sizes="100vw" className="object-cover opacity-60" />
        <h1 className="ee-rise relative font-script text-[72px] leading-[1.05] text-cream [text-shadow:0_4px_30px_rgba(0,0,0,0.3)] sm:text-[100px] lg:text-[128px]">
          Our Story
        </h1>
      </section>

      {/* The History of 180 White Haven Rd */}
      <section className="mx-auto grid w-full max-w-7xl items-center gap-14 px-6 py-20 lg:grid-cols-2 lg:gap-[72px] lg:px-8 lg:py-28">
        <div className="order-2 flex flex-col items-center gap-10 lg:order-1">
          <figure className="flex w-full flex-col gap-3">
            <div className="ee-zoom relative aspect-video overflow-hidden rounded-3xl shadow-[0_24px_48px_-24px_rgba(2,50,32,0.4)]">
              <Image src={IMG.aerial} alt="Aerial view of 180 White Haven Road property" fill sizes="(min-width: 1024px) 600px, 100vw" className="object-cover" />
            </div>
            <figcaption>
              <Caption>evermore equine</Caption>
            </figcaption>
          </figure>
          <figure className="flex flex-col items-center gap-3">
            <div className="ee-zoom relative w-[268px] max-w-full overflow-hidden rounded-3xl shadow-[0_24px_48px_-24px_rgba(2,50,32,0.4)]" style={{ aspectRatio: "268/318" }}>
              <Image src={IMG.bigRedSchool} alt="Mariah with Big Red" fill sizes="268px" className="object-cover" />
            </div>
            <figcaption>
              <Caption>Mariah and Big Red at Houghton University circa 2019</Caption>
            </figcaption>
          </figure>
        </div>
        <div className="order-1 flex flex-col gap-5 lg:order-2">
          <Script>the land</Script>
          <h2 className="text-3xl font-extrabold leading-[1.1] text-forest sm:text-[44px]">
            {c["about.history.title"] ?? "The History of 180 White Haven Rd"}
          </h2>
          {[1, 2, 3, 4, 5, 6].map((n) =>
            c[`about.history.paragraph${n}`] ? (
              <p key={n} className={body}>
                {c[`about.history.paragraph${n}`]}
              </p>
            ) : null,
          )}
        </div>
      </section>

      {/* Where It All Began */}
      <section className="bg-sand px-6 py-20 lg:px-8 lg:py-28">
        <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-2 lg:gap-[72px]">
          <figure className="flex flex-col items-center gap-3">
            <div className="ee-zoom relative w-full max-w-[464px] overflow-hidden rounded-3xl shadow-[0_24px_48px_-24px_rgba(2,50,32,0.4)]" style={{ aspectRatio: "464/656" }}>
              <Image src={IMG.cappy} alt="Young rider on horse at Bear Creek property" fill sizes="(min-width: 1024px) 464px, 100vw" className="object-cover" />
            </div>
            <figcaption>
              <Caption>Mariah and Cappy circa 2007</Caption>
            </figcaption>
          </figure>
          <div className="flex flex-col gap-5">
            <Script>a dedication</Script>
            <h2 className="text-3xl font-extrabold leading-[1.1] text-forest sm:text-[44px]">
              {c["about.dedication.title"] ?? "Where It All Began"}
            </h2>
            {c["about.dedication.quote"] && (
              <div className="flex flex-col gap-2 rounded-[18px] bg-cream px-6 py-5">
                <p className="text-base italic leading-[1.65] text-ink">{c["about.dedication.quote"]}</p>
                <p className="text-[13px] leading-normal text-bark">{c["about.dedication.quoteAuthor"]}</p>
              </div>
            )}
            {[1, 2, 3, 4].map((n) =>
              c[`about.dedication.paragraph${n}`] ? (
                <p key={n} className={body}>
                  {c[`about.dedication.paragraph${n}`]}
                </p>
              ) : null,
            )}
            {c["about.dedication.footer"] && (
              <p className="border-t border-line pt-4 text-base font-semibold italic leading-[1.65] text-forest sm:text-[17px]">
                {c["about.dedication.footer"]}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Why Evermore & The Color Green? */}
      <section className="mx-auto flex w-full max-w-[880px] flex-col items-center gap-10 px-6 py-20 lg:py-28">
        <div className="flex flex-col items-center gap-3 text-center">
          <Script>the name</Script>
          <h2 className="text-3xl font-extrabold text-forest sm:text-[44px]">
            {c["about.brand.title"] ?? "Why Evermore & The Color Green?"}
          </h2>
        </div>
        <div className="grid w-full items-start gap-10 md:grid-cols-[320px_minmax(0,1fr)] md:gap-12">
          <div className="flex flex-col gap-2.5 rounded-3xl bg-forest p-8 text-cream">
            <p className="text-[26px] font-extrabold">
              Evermore <span className="block text-base font-semibold text-sage">[ev-er-mawr, -mohr]</span>
            </p>
            <p className="text-[15px] italic text-wheat">adverb</p>
            <p className="text-base leading-relaxed text-oat">1. always; continually; forever</p>
            <p className="text-base leading-relaxed text-oat">2. at all times; henceforth</p>
          </div>
          <div className="flex flex-col gap-4">
            {[1, 2, 3].map((n) =>
              c[`about.brand.paragraph${n}`] ? (
                <p key={n} className={body}>
                  {c[`about.brand.paragraph${n}`]}
                </p>
              ) : null,
            )}
          </div>
        </div>
        <div className="flex w-full flex-col items-center gap-10 md:flex-row">
          <blockquote className="flex-1 rounded-[18px] bg-sand px-7 py-6 text-base italic leading-relaxed text-ink">
                <p>&ldquo;And I couldn&apos;t be sure</p>
                <p>I had a feeling so peculiar</p>
                <p>This pain wouldn&apos;t be for</p>
                <p>Evermore.&rdquo;</p>
              </blockquote>
          <figure className="flex shrink-0 flex-col items-center gap-2.5">
            <div className="relative h-[170px] w-[260px] overflow-hidden rounded-[18px] shadow-xl">
              <Image src={IMG.bigRedFirst} alt="Rider on horse at pasture" fill sizes="260px" className="object-cover" />
            </div>
            <figcaption>
              <Caption>Mariah on Big Red at her first competition circa 2012</Caption>
            </figcaption>
          </figure>
        </div>
      </section>
    </div>
  );
}
