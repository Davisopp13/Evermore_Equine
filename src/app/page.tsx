export const dynamic = "force-dynamic";

import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { getAllContent } from "@/lib/actions/content";
import { MeetTheHerd } from "@/components/MeetTheHerd";
import { ValuesTabs } from "@/components/home/ValuesTabs";

const IMG = {
  forest:
    "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/e1c444d2-b20c-4128-9d1e-7b509ac38088/Attachment-1-1769784170295.png?width=8000&height=8000&resize=contain",
  jump: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/_MG_8430-1-resized-1766587431984.jpg?width=8000&height=8000&resize=contain",
  paddock:
    "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/zoomed-in-horses-resized-1766587867527.jpg?width=8000&height=8000&resize=contain",
  mariah: "/images/mariah.webp",
  cappy: "/images/cappy-and-mariah.webp",
  aerial: "/images/aerial.webp",
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
  const tagline = c["home.hero.tagline"] || "where passion makes progress";

  const values = [
    {
      title: "Safety First",
      body: "Strictly adhered-to barn rules and safety protocols keep every rider and horse safe.",
      img: IMG.jump,
      alt: "A rider and chestnut horse clearing a jump in front of the barn",
    },
    {
      title: "Foundational Horsemanship",
      body: "Lessons in and out of the saddle, covering barn practices, handling, groundwork and riding, to build a complete equestrian.",
      img: IMG.mariah,
      alt: "Mariah standing with her chestnut horse",
    },
    {
      title: "Peaceful Atmosphere",
      body: "Seventeen acres of wooded land: warm, minimal and distraction-free, so you can connect with nature.",
      img: IMG.paddock,
      alt: "Two horses grazing in a quiet paddock",
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
            A boutique lesson barn, built around the rider.
          </h2>
          <p className="text-lg leading-[1.7] text-bark sm:text-[19px]">
            We are a boutique, small scale riding lesson facility dedicated to providing a
            personalized, high quality equestrian learning experience for riders ages 6 to 17,
            with a focus on beginner through intermediate riders eager to build a solid foundation.
          </p>
          <p className="text-lg leading-[1.7] text-bark sm:text-[19px]">
            Come to have fun, relax, and ride. We follow each rider&rsquo;s pace and guide them
            toward their own goals.
          </p>
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

      {/* Meet the Horses */}
      <MeetTheHerd />

      {/* Values */}
      <section id="values" className="bg-forest px-6 py-20 text-cream lg:px-8 lg:py-28">
        <div className="mx-auto flex max-w-7xl flex-col gap-12">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div className="flex flex-col gap-2.5">
              <Script className="!text-wheat">why evermore</Script>
              <h2 className="text-3xl font-extrabold sm:text-[48px] sm:leading-tight">
                Three things we never compromise on
              </h2>
            </div>
            <p className="text-[15px] text-sage">Tap a value to explore</p>
          </div>
          <ValuesTabs values={values} />
        </div>
      </section>

      {/* Tagline band */}
      <section className="relative flex h-[300px] items-center justify-center overflow-hidden bg-forest sm:h-[360px]">
        <div className="relative flex max-w-3xl flex-col items-center gap-3.5 px-6 text-center text-cream">
          <p className="font-script text-[44px] leading-none sm:text-[64px]">{tagline}</p>
          <p className="text-lg leading-relaxed text-oat sm:text-[19px]">
            Follow your passions, in and out of the barn.
          </p>
        </div>
      </section>
    </div>
  );
}
