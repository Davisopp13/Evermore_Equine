export const dynamic = "force-dynamic";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Award, ChevronDown, MapPin, Sprout } from "lucide-react";
import { getAllContent } from "@/lib/actions/content";
import { MeetTheHerd } from "@/components/MeetTheHerd";
import { ValuesTabs } from "@/components/home/ValuesTabs";
import { HoursCard } from "@/components/home/HoursCard";
import { FirstRideForm } from "@/components/home/FirstRideForm";

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
  const phone = c["contact.phone.href"] || "15707095501";
  const email = c["contact.email"] || "connect@evermoreequine.com";

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

  const programs = [
    {
      ages: "AGES 6 TO 10",
      name: "The Just Green",
      time: "15 min in the barn · 15 min in the saddle",
      icon: Sprout,
      lead: "A “Green” horse or rider is inexperienced but is eager and ready to learn!",
      paragraphs: [
        c["services.tiers.justGreen.paragraph1"] ||
          "We love our littles! At Evermore Equine, we offer a fun, hands-on experience for children 6-10 years old in a safe, confidence-building environment.",
        c["services.tiers.justGreen.paragraph2"] ||
          "Our lessons focus on teaching basic horsemanship skills through age-appropriate activities. Children learn horse safety, grooming techniques, and balancing on the horse.",
        c["services.tiers.justGreen.paragraph3"] ||
          "Our program is relaxed with no structured curriculum. Each lesson is based on having fun and learning something new each time. We believe a good, stable foundation sets our young ones up for success!",
      ],
    },
    {
      ages: "AGES 11 TO 17",
      name: "The Gallant",
      time: "30 min in the barn · 30 min in the saddle",
      icon: Award,
      lead: "Equestrians often use the word “Gallant” to describe horse and rider alike as brave, honest and noble.",
      paragraphs: [
        c["services.tiers.gallant.paragraph1"] ||
          "We offer a detailed lesson program for our students ages 11-17. Students will learn a strong foundation in horsemanship and correct skills in the saddle.",
        c["services.tiers.gallant.paragraph2"] ||
          "As students advance, we emphasize responsibility, confidence, and goal-setting, encouraging riders to grow both in and out of the saddle. Our program offers hands-on learning in a positive environment.",
        c["services.tiers.gallant.paragraph3"] ||
          "Each Gallant student will receive a hard copy detailed packet of level I checklist materials to work through at their own pace. We work through the curriculum in a positive and structured setting.",
        c["services.tiers.gallant.paragraph4"] ||
          "We want students to take the knowledge they learn from Evermore Equine and implement their skills into all aspects of life.",
      ],
    },
  ].map((p) => ({ ...p, paragraphs: p.paragraphs.map((t) => t.replace(/\s*[\u2014\u2013]\s*(\w)/g, (_m: string, ch: string) => ". " + ch.toUpperCase())) }));

  const noDash = (t: string) => t.replace(/\s+[-\u2013\u2014]\s+/g, " to ");
  const seasons: [
    { label: string; days: string; time: string },
    { label: string; days: string; time: string },
  ] = [
    {
      label: "April to November",
      days: noDash(c["contact.hours.summer.days"] || "Tuesday through Saturday"),
      time: noDash(c["contact.hours.summer.time"] || "9am to 7pm"),
    },
    {
      label: "December to March",
      days: noDash(c["contact.hours.winter.days"] || "Friday, Saturday, Sunday"),
      time: noDash(c["contact.hours.winter.time"] || "TBD"),
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
          <div className="ee-rise-3 mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4">
            <Link
              href="/contact"
              className="rounded-full bg-cream px-8 py-4 text-[17px] font-bold text-forest transition-transform hover:-translate-y-0.5"
            >
              Schedule a lesson
            </Link>
            <Link
              href="/about"
              className="rounded-full border-[1.5px] border-cream/70 px-8 py-4 text-[17px] font-bold text-cream transition-transform hover:-translate-y-0.5"
            >
              Meet Mariah &amp; Cappy
            </Link>
          </div>
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

      {/* Programs */}
      <section id="programs" className="px-6 py-20 lg:px-8 lg:py-28">
        <div className="mx-auto flex max-w-[900px] flex-col gap-12">
          <div className="flex flex-col items-center gap-2.5 text-center">
            <Script>from basics to beyond</Script>
            <h2 className="text-3xl font-extrabold text-forest sm:text-[48px]">Programs we offer</h2>
          </div>
          <div className="grid gap-7 md:grid-cols-2">
            {programs.map((p) => (
              <article
                key={p.name}
                className="ee-lift flex flex-col gap-4 rounded-3xl border border-line bg-white p-7 sm:p-9"
              >
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-mint px-3 py-1.5 text-[13px] font-extrabold tracking-[0.04em] text-moss">
                    {p.ages}
                  </span>
                  <p.icon className="size-7 text-pine" strokeWidth={1.6} aria-hidden />
                </div>
                <h3 className="text-[28px] font-extrabold text-forest">{p.name}</h3>
                <p className="text-[15px] font-bold text-pine">{p.time}</p>
                <div className="flex flex-col gap-3 border-t border-line pt-4 text-base leading-[1.65]">
                  <p className="font-bold text-ink">{p.lead}</p>
                  {p.paragraphs.map((t) => (
                    <p key={t.slice(0, 24)} className="text-bark">
                      {t}
                    </p>
                  ))}
                </div>
              </article>
            ))}
          </div>
          <div className="flex justify-center">
            <Link
              href="/services"
              className="flex items-center gap-2 text-[17px] font-bold text-forest hover:text-pine"
            >
              See pricing &amp; lesson details
              <ArrowRight className="size-[18px]" aria-hidden />
            </Link>
          </div>
        </div>
      </section>

      {/* Meet the family */}
      <section className="bg-sand px-6 py-20 lg:px-8 lg:py-28">
        <div className="mx-auto grid max-w-7xl items-center gap-7 lg:grid-cols-12">
          <div className="flex flex-col gap-4 lg:col-span-4">
            <Script>where it all began</Script>
            <h2 className="text-3xl font-extrabold leading-[1.1] text-forest sm:text-[46px]">
              Meet the family behind the barn
            </h2>
            <p className="text-lg leading-[1.7] text-bark">
              From a family pony named Cappy to a barn of her own: Mariah&rsquo;s story, and the
              great-grandfather it honors.
            </p>
            <Link
              href="/about"
              className="flex items-center gap-2 text-[17px] font-bold text-forest hover:text-pine"
            >
              Read our story
              <ArrowRight className="size-[18px]" aria-hidden />
            </Link>
          </div>
          {[
            { name: "Mariah", sub: "Founder & instructor · B.S. Equine Performance", img: IMG.mariah, alt: "Mariah standing with her chestnut horse", pos: "center 20%" },
            { name: "Cappy", sub: "The family pony who started it all", img: IMG.cappy, alt: "Young Mariah riding Cappy, the family pony", pos: "center 30%" },
          ].map((p) => (
            <Link
              key={p.name}
              href="/about"
              className="ee-lift ee-zoom flex flex-col overflow-hidden rounded-3xl bg-cream sm:col-span-1 lg:col-span-4"
            >
              <div className="relative h-[340px] overflow-hidden sm:h-[380px]">
                <Image
                  src={p.img}
                  alt={p.alt}
                  fill
                  sizes="(min-width: 1024px) 400px, 100vw"
                  className="object-cover"
                  style={{ objectPosition: p.pos }}
                />
              </div>
              <div className="flex flex-col gap-1 px-6 py-5">
                <span className="font-script text-[29px] leading-none text-forest">{p.name}</span>
                <span className="text-[15px] text-bark">{p.sub}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Visit */}
      <section id="visit" className="mx-auto grid w-full max-w-7xl gap-10 px-6 py-20 lg:grid-cols-2 lg:gap-12 lg:px-8 lg:py-28">
        <div className="relative min-h-[320px] overflow-hidden rounded-[28px] lg:min-h-[520px]">
          <Image
            src={IMG.aerial}
            alt="Aerial view of the barn and pastures surrounded by forest"
            fill
            sizes="(min-width: 1024px) 600px, 100vw"
            className="object-cover"
          />
          <div className="absolute left-4 right-4 top-4 flex items-center gap-2 rounded-2xl bg-cream px-4 py-2.5 text-sm font-bold text-forest sm:right-auto sm:left-6 sm:top-6 sm:rounded-full sm:text-[15px]">
            <MapPin className="size-[18px]" aria-hidden />
            180 White Haven Rd., Bear Creek PA 18602
          </div>
        </div>
        <div className="flex flex-col gap-7">
          <div className="flex flex-col gap-2.5">
            <Script>come see us</Script>
            <h2 className="text-3xl font-extrabold text-forest sm:text-[46px]">Plan your visit</h2>
          </div>
          <HoursCard seasons={seasons} phone={phone} email={email} />
          <FirstRideForm />
        </div>
      </section>

      {/* Tagline band */}
      <section className="relative flex h-[300px] items-center justify-center overflow-hidden sm:h-[360px]">
        <Image src={IMG.paddock} alt="" fill sizes="100vw" className="object-cover object-[center_60%]" />
        <div className="absolute inset-0 bg-[rgba(2,50,32,0.62)]" />
        <div className="relative flex max-w-3xl flex-col items-center gap-3.5 px-6 text-center text-cream">
          <p className="font-script text-[44px] leading-none sm:text-[64px]">{tagline}</p>
          <p className="text-lg leading-relaxed text-oat sm:text-[19px]">
            Follow your passions, in and out of the barn.
          </p>
        </div>
      </section>

      {/* Mobile action bar */}
      <div id="mobile-action-bar" className="fixed inset-x-3 bottom-4 z-40 flex items-center justify-between rounded-[22px] bg-forest py-2.5 pl-5 pr-2.5 shadow-[0_16px_36px_-14px_rgba(2,50,32,0.6)] md:hidden">
        <span className="flex flex-col text-cream">
          <span className="text-[15px] font-extrabold">
            Lessons from {c["services.pricing.thirtyMin"] || "$50"}
          </span>
          <span className="text-xs text-sage">Private &middot; helmets provided</span>
        </span>
        <Link
          href="/contact"
          className="flex h-12 items-center rounded-full bg-wheat px-5 text-[15px] font-extrabold text-forest"
        >
          Schedule a lesson
        </Link>
      </div>
    </div>
  );
}
