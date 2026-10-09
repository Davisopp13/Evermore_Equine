export const dynamic = "force-dynamic";

import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { getAllContent } from "@/lib/actions/content";
import { MeetTheHerd } from "@/components/MeetTheHerd";
import { ValuesTabs } from "@/components/home/ValuesTabs";

const IMG = {
  forest:
    "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/e1c444d2-b20c-4128-9d1e-7b509ac38088/Attachment-1-1769784170295.png?width=8000&height=8000&resize=contain",
  paddock:
    "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/zoomed-in-horses-resized-1766587867527.jpg?width=8000&height=8000&resize=contain",
  cappy: "/images/cappy-and-mariah.webp",
  aerial: "/images/aerial.webp",
  trail: "/images/trail-ride.webp",
  crossTies: "/images/cross-ties.webp",
  jumping: "/images/jumping.webp",
  barnJump: "/images/barn-jump.webp",
};

const FACTS = [
  { value: "17", label: "wooded acres" },
  { value: "6-17", label: "riders" },
  { value: "1 : 1", label: "private lessons" },
  { value: "Fall ’26", label: "opening season" },
];

function Script({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={`font-script text-[28px] leading-none text-pine sm:text-[33px] ${className}`}>
      {children}
    </p>
  );
}

export default async function Home() {
  const c = await getAllContent();
  const tagline = c["home.hero.tagline"] ?? "where passion makes progress";
  const body = "whitespace-pre-line text-lg leading-[1.7] text-bark sm:text-[19px]";
  const welcomeParagraphs = [
    c["home.welcome.paragraph1"] ??
      "We are a boutique, small scale riding lesson facility dedicated to providing a personalized, high quality equestrian learning experience for riders ages 6 to 17, with a focus on beginner through intermediate riders eager to build a solid foundation.",
    c["home.welcome.paragraph2"] ??
      "Come to have fun, relax, and ride. We follow each rider’s pace and guide them toward their own goals.",
    c["home.welcome.paragraph3"],
  ];
  const philosophy = [
    {
      key: "mission",
      title: c["home.mission.title"] ?? "Our Mission",
      paragraphs: [c["home.mission.paragraph1"], c["home.mission.paragraph2"]],
    },
    {
      key: "basics",
      title: c["home.basics.title"] ?? "From Basics to Beyond",
      paragraphs: [c["home.basics.paragraph1"], c["home.basics.paragraph2"]],
    },
  ].filter((section) => c[`home.${section.key}.title`] || section.paragraphs.some(Boolean));

  const values = [
    {
      title: c["home.values.safety.title"] ?? "Safety First",
      body: c["home.values.safety.body"] ?? "Strictly adhered-to barn rules and safety protocols keep every rider and horse safe.",
      img: IMG.crossTies,
      alt: "A chestnut and white pony standing calmly in cross-ties in the barn aisle",
    },
    {
      title: c["home.values.horsemanship.title"] ?? "Foundational Horsemanship",
      body: c["home.values.horsemanship.body"] ?? "Lessons in and out of the saddle, covering barn practices, handling, groundwork and riding, to build a complete equestrian.",
      img: IMG.jumping,
      alt: "A rider and bay horse cantering over a low cross rail in the field",
    },
    {
      title: c["home.values.atmosphere.title"] ?? "Peaceful Atmosphere",
      body: c["home.values.atmosphere.body"] ?? "Seventeen acres of wooded land: warm, minimal and distraction-free, so you can connect with nature.",
      img: IMG.trail,
      alt: "Two young riders on horseback on a wooded trail",
    },
  ];

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative flex h-[78vh] min-h-[560px] items-center justify-center overflow-hidden lg:h-[780px]">
        <Image
          src={IMG.forest}
          alt="Misty pine forest in the Pocono Mountains"
          fill
          priority
          sizes="100vw"
          className="ee-drift object-cover"
        />
        <div className="absolute inset-0 bg-[rgba(2,30,20,0.38)]" />
        <div className="relative flex flex-col items-center gap-2 px-4 pb-10 text-center">
          <p className="ee-rise text-xs font-bold uppercase tracking-[0.3em] text-sand sm:text-sm">
            Bear Creek, Pennsylvania &middot; Est. 2025
          </p>
          <h1 className="ee-rise-2 font-script text-[64px] leading-[1.05] text-cream [text-shadow:0_4px_30px_rgba(0,0,0,0.3)] sm:text-[96px] lg:text-[128px]">
            evermore equine
          </h1>
          <p className="ee-rise-3 font-script text-[28px] text-sand sm:text-[36px] lg:text-[44px]">
            &ldquo;{tagline}&rdquo;
          </p>
        </div>
        <ChevronDown className="ee-bob absolute bottom-7 left-1/2 -ml-3 size-6 text-sand" aria-hidden />
      </section>

      {/* Facts */}
      <section className="bg-sand px-6 py-10">
        <dl className="mx-auto grid max-w-5xl grid-cols-2 gap-y-8 md:grid-cols-4">
          {FACTS.map((f) => (
            <div key={f.label} className="flex flex-col-reverse items-center gap-1">
              <dt className="text-sm font-semibold uppercase tracking-[0.08em] text-bark">{f.label}</dt>
              <dd className="text-[36px] font-extrabold text-forest sm:text-[44px]">{f.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Welcome */}
      <section className="mx-auto grid w-full max-w-7xl items-center gap-12 px-6 py-20 lg:grid-cols-2 lg:gap-20 lg:px-8 lg:py-28">
        <div className="flex flex-col gap-5">
          <Script>welcome to the barn</Script>
          <h2 className="text-4xl font-extrabold leading-[1.1] text-forest sm:text-[50px]">
            {c["home.welcome.title"] ?? "A boutique lesson barn, built around the rider."}
          </h2>
          {welcomeParagraphs.map((paragraph, i) =>
            paragraph ? <p key={i} className={body}>{paragraph}</p> : null,
          )}
        </div>
        <div className="ee-zoom relative h-[320px] overflow-hidden rounded-[28px] sm:h-[420px] lg:h-[520px]">
          <Image
            src={IMG.paddock}
            alt="Two horses grazing in the paddock"
            fill
            sizes="(min-width: 1024px) 600px, 100vw"
            className="object-cover"
          />
        </div>
      </section>

      {/* Mission and Basics: keep the sections editable through the Home tab. */}
      {philosophy.length > 0 && (
        <section className="bg-sand px-6 py-20 lg:px-8 lg:py-28">
          <div className={`mx-auto grid gap-12 lg:gap-20 ${philosophy.length > 1 ? "max-w-7xl lg:grid-cols-2" : "max-w-3xl"}`}>
            {philosophy.map((section, i) => (
              <div key={i} className="flex flex-col gap-5">
                <h2 className="text-3xl font-extrabold leading-tight text-forest sm:text-[44px]">
                  {section.title}
                </h2>
                {section.paragraphs.map((paragraph, n) =>
                  paragraph ? <p key={n} className={body}>{paragraph}</p> : null,
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Meet the Horses */}
      <MeetTheHerd />

      {/* Values */}
      <section id="values" className="bg-forest px-6 py-20 text-cream lg:px-8 lg:py-28">
        <div className="mx-auto flex max-w-7xl flex-col gap-12">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div className="flex flex-col gap-2.5">
              <Script className="!text-wheat">why evermore</Script>
              <h2 className="text-3xl font-extrabold sm:text-[48px] sm:leading-tight">
                {c["home.values.title"] ?? "Three things we never compromise on"}
              </h2>
            </div>
            <p className="text-[15px] text-sage">Tap a value to explore</p>
          </div>
          <ValuesTabs values={values} />
        </div>
      </section>

      {/* Tagline band */}
      <section className="flex flex-col items-center bg-forest px-6 py-20 lg:px-8 lg:py-28">
        <div className="flex max-w-3xl flex-col items-center gap-3.5 text-center text-cream">
          <p className="font-script text-[44px] leading-none sm:text-[64px]">
            {c["home.cta.tagline"] ?? tagline}
          </p>
          {[c["home.cta.paragraph1"] ?? "Follow your passions, in and out of the barn.", c["home.cta.paragraph2"]].map((paragraph, i) =>
            paragraph ? (
              <p key={i} className="whitespace-pre-line text-lg leading-relaxed text-oat sm:text-[19px]">
                {paragraph}
              </p>
            ) : null,
          )}
        </div>
      </section>

      {/* Jumping photo and facility description */}
      <section className="flex flex-col items-center bg-white px-6 py-20 lg:px-8 lg:py-28">
        <div className="flex w-full max-w-xl flex-col gap-5">
          <div className="ee-zoom relative aspect-[1044/672] w-full overflow-hidden rounded-[28px]">
            <Image
              src={IMG.barnJump}
              alt="A rider and chestnut horse clearing a jump in front of the barn"
              fill
              sizes="(min-width: 640px) 576px, 100vw"
              className="object-cover"
            />
          </div>
          <p className="text-center text-[15px] leading-relaxed text-bark">
            A boutique riding lesson facility focused on safety and foundational
            horsemanship in a peaceful setting on 17 acres in Bear Creek, PA.
          </p>
        </div>
      </section>
    </div>
  );
}
