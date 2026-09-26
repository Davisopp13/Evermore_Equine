"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  animate,
  motion,
  AnimatePresence,
  useInView,
  useMotionValue,
  useReducedMotion,
  useTransform,
  type PanInfo,
} from "framer-motion";
import { ChevronLeft, ChevronRight, MoveHorizontal } from "lucide-react";

// Each horse's name is its photo's file name in /public/horses (e.g. Duke.webp → "Duke").
// To add a horse, drop "<Name>.webp" into public/horses and add the name here.
// `focus` is an optional object-position so the crop keeps the horse's face in frame.
const HORSES: { name: string; focus?: string }[] = [
  { name: "Duke", focus: "50% 22%" },
  { name: "Emmitt", focus: "50% 40%" },
  { name: "Cappy", focus: "60% 50%" },
  { name: "Red", focus: "50% 45%" },
];

const SWIPE_DISTANCE = 110;
const SWIPE_VELOCITY = 500;
const FLING_DISTANCE = 640;
const VISIBLE_DEPTH = 3;

// Resting pose for a card `depth` places behind the front of the deck.
const STACK_POSES = [
  { x: 0, y: 0, rotate: 0, scale: 1, opacity: 1 },
  { x: 22, y: 10, rotate: 5, scale: 0.95, opacity: 1 },
  { x: -20, y: 18, rotate: -4, scale: 0.9, opacity: 1 },
];
const HIDDEN_POSE = { ...STACK_POSES[VISIBLE_DEPTH - 1], opacity: 0 };

type Fling = { dir: -1 | 1; id: number } | null;

export function MeetTheHerd() {
  const [active, setActive] = useState(0);
  const [fling, setFling] = useState<Fling>(null);
  const [interacted, setInteracted] = useState(false);
  const deckRef = useRef<HTMLDivElement>(null);
  const inView = useInView(deckRef, { once: true, amount: 0.5 });
  const reduceMotion = useReducedMotion();
  const count = HORSES.length;

  // The barn doors slide open shortly after the deck scrolls into view, then get out of the way.
  const [doorsOpen, setDoorsOpen] = useState(false);
  const [doorsGone, setDoorsGone] = useState(false);
  useEffect(() => {
    if (!inView || doorsOpen) return;
    const t = setTimeout(() => setDoorsOpen(true), 450);
    return () => clearTimeout(t);
  }, [inView, doorsOpen]);

  // Swiping/flinging left moves forward through the herd; right goes back.
  const go = useCallback(
    (dir: -1 | 1) => {
      if (fling) return;
      setInteracted(true);
      setDoorsOpen(true);
      if (reduceMotion) {
        setActive((a) => (a - dir + count) % count);
        return;
      }
      setFling({ dir, id: Date.now() });
    },
    [fling, reduceMotion, count],
  );

  const finishFling = useCallback(() => {
    if (!fling) return;
    setActive((a) => (a - fling.dir + count) % count);
    setFling(null);
  }, [fling, count]);

  const jumpTo = (index: number) => {
    if (fling || index === active) return;
    setInteracted(true);
    setDoorsOpen(true);
    setActive(index);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      go(-1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      go(1);
    }
  };

  const current = HORSES[active];

  return (
    <section className="py-24 bg-secondary/30 overflow-hidden">
      <div
        className="container mx-auto px-4 md:px-6"
        style={{ fontFamily: "var(--font-nunito)" }}
      >
        {/* Phones: intro → deck → controls. Desktop: intro + controls left, deck right. */}
        <div className="grid md:grid-cols-2 md:grid-rows-[1fr_auto_1fr] gap-x-12 gap-y-10 md:gap-y-8 items-center">
          <motion.div
            className="space-y-4 text-center md:text-left md:col-start-1 md:row-start-1 md:self-end"
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-muted-foreground">
              Welcome to the Barn
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-primary">
              Meet the Horses
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-md mx-auto md:mx-0">
              Every lesson starts with a great partner. Swipe through to say
              hello to the horses who make Evermore home.
            </p>
          </motion.div>

          {/* Controls */}
          <div className="space-y-6 md:col-start-1 md:row-start-2">
            <div className="flex items-center justify-center md:justify-start gap-5">
              <button
                type="button"
                onClick={() => go(1)}
                aria-label="Previous horse"
                className="size-12 rounded-full border border-primary/20 bg-card text-primary shadow-sm flex items-center justify-center transition hover:bg-primary hover:text-primary-foreground hover:shadow-md active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <ChevronLeft className="size-5" />
              </button>

              <div className="min-w-[88px] text-center tabular-nums">
                <span className="text-2xl font-bold text-primary">
                  {String(active + 1).padStart(2, "0")}
                </span>
                <span className="text-muted-foreground">
                  {" "}
                  / {String(count).padStart(2, "0")}
                </span>
              </div>

              <button
                type="button"
                onClick={() => go(-1)}
                aria-label="Next horse"
                className="size-12 rounded-full border border-primary/20 bg-card text-primary shadow-sm flex items-center justify-center transition hover:bg-primary hover:text-primary-foreground hover:shadow-md active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <ChevronRight className="size-5" />
              </button>
            </div>

            {/* Stall-board of names — jump straight to a horse */}
            <ul className="flex flex-wrap justify-center md:justify-start gap-2">
              {HORSES.map((horse, i) => (
                <li key={horse.name}>
                  <button
                    type="button"
                    onClick={() => jumpTo(i)}
                    aria-current={i === active ? "true" : undefined}
                    className="relative px-4 py-1.5 rounded-full text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 text-primary/70 hover:text-primary"
                  >
                    {i === active && (
                      <motion.span
                        layoutId="herd-active-pill"
                        className="absolute inset-0 rounded-full bg-primary"
                        transition={{ type: "spring", stiffness: 420, damping: 34 }}
                      />
                    )}
                    <span
                      className={`relative ${i === active ? "text-primary-foreground" : ""}`}
                    >
                      {horse.name}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Card deck */}
          <div className="flex flex-col items-center row-start-2 md:col-start-2 md:row-start-1 md:row-span-3">
            <div
              ref={deckRef}
              role="region"
              aria-roledescription="carousel"
              aria-label="Meet the horses"
              tabIndex={0}
              onKeyDown={onKeyDown}
              className="relative w-[78vw] max-w-[360px] lg:max-w-[400px] aspect-[5/7] select-none rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-8 focus-visible:ring-offset-transparent"
            >
              {HORSES.map((horse, i) => {
                const depth = (i - active + count) % count;
                return (
                  <HorseCard
                    key={horse.name}
                    horse={horse}
                    index={i}
                    depth={depth}
                    count={count}
                    dealt={doorsOpen}
                    interacted={interacted}
                    fling={depth === 0 ? fling : null}
                    reduceMotion={!!reduceMotion}
                    onSwipe={go}
                    onFlingDone={finishFling}
                  />
                );
              })}

              {!reduceMotion && !doorsGone && (
                <BarnDoors open={doorsOpen} onOpened={() => setDoorsGone(true)} />
              )}
            </div>

            <div className="h-10 mt-8 flex items-center">
              <AnimatePresence>
                {!interacted && (
                  <motion.p
                    className="flex items-center gap-2 text-sm text-muted-foreground"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <motion.span
                      animate={reduceMotion ? undefined : { x: [0, -6, 6, 0] }}
                      transition={{ duration: 1.6, repeat: Infinity, repeatDelay: 1 }}
                    >
                      <MoveHorizontal className="size-4" />
                    </motion.span>
                    Swipe to meet the horses
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            <p className="sr-only" aria-live="polite">
              {current.name}, horse {active + 1} of {count}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function HorseCard({
  horse,
  index,
  depth,
  count,
  dealt,
  interacted,
  fling,
  reduceMotion,
  onSwipe,
  onFlingDone,
}: {
  horse: { name: string; focus?: string };
  index: number;
  depth: number;
  count: number;
  dealt: boolean;
  interacted: boolean;
  fling: Fling;
  reduceMotion: boolean;
  onSwipe: (dir: -1 | 1) => void;
  onFlingDone: () => void;
}) {
  const isFront = depth === 0;
  const x = useMotionValue(0);
  const tilt = useTransform(x, [-300, 300], [-16, 16]);
  const fade = useTransform(
    x,
    [-FLING_DISTANCE, -FLING_DISTANCE * 0.55, 0, FLING_DISTANCE * 0.55, FLING_DISTANCE],
    [0, 1, 1, 1, 0],
  );

  // Throw the front card off the deck, then hand control back to the parent,
  // which reshuffles it to the back.
  useEffect(() => {
    if (!fling) return;
    let cancelled = false;
    const controls = animate(x, fling.dir * FLING_DISTANCE, {
      type: "tween",
      duration: 0.32,
      ease: [0.32, 0.72, 0, 1],
    });
    controls.then(() => {
      if (!cancelled) onFlingDone();
    });
    return () => {
      cancelled = true;
      controls.stop();
    };
  }, [fling, x, onFlingDone]);

  // Once a thrown card has been reshuffled behind the deck, bring it back on-screen.
  useEffect(() => {
    if (!isFront) x.set(0);
  }, [isFront, x]);

  // Fan the deck out from behind the barn doors the first time they open.
  const dealDelay = !interacted && !reduceMotion ? 0.45 + (count - 1 - depth) * 0.1 : 0;

  const onDragEnd = (_: unknown, info: PanInfo) => {
    const { offset, velocity } = info;
    if (offset.x < -SWIPE_DISTANCE || velocity.x < -SWIPE_VELOCITY) onSwipe(-1);
    else if (offset.x > SWIPE_DISTANCE || velocity.x > SWIPE_VELOCITY) onSwipe(1);
  };

  const pose = depth < VISIBLE_DEPTH ? STACK_POSES[depth] : HIDDEN_POSE;
  // Behind the closed doors the cards sit squared up; they fan out once the doors open.
  const undealt = { ...STACK_POSES[0], opacity: depth < VISIBLE_DEPTH ? 1 : 0 };

  return (
    <motion.div
      className="absolute inset-0"
      style={{ zIndex: count - depth }}
      initial={false}
      animate={dealt || reduceMotion ? pose : undealt}
      transition={{ type: "spring", stiffness: 260, damping: 26, delay: dealDelay }}
      aria-hidden={!isFront}
    >
      <motion.div
        className={`h-full w-full rounded-2xl bg-card p-3 flex flex-col border border-border/70 ${
          isFront
            ? "shadow-2xl cursor-grab active:cursor-grabbing"
            : "shadow-lg pointer-events-none"
        }`}
        style={{ x, rotate: tilt, opacity: fade, touchAction: "pan-y" }}
        drag={isFront && !fling ? "x" : false}
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.9}
        onDragEnd={onDragEnd}
        whileTap={isFront ? { scale: 0.985 } : undefined}
      >
        <div className="relative flex-1 overflow-hidden rounded-xl bg-muted">
          <Image
            src={`/horses/${horse.name}.webp`}
            alt={`${horse.name}, one of the Evermore Equine horses`}
            fill
            sizes="(min-width: 1024px) 400px, (min-width: 768px) 360px, 78vw"
            className="object-cover pointer-events-none"
            style={{ objectPosition: horse.focus ?? "50% 50%" }}
            draggable={false}
            priority={index === 0}
          />
          <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-black/25 to-transparent" />
        </div>
        {/* Great Day's capitals rise ~0.4em above its line box, so the row leaves
            room for them, and `relative` keeps them painted above the photo. */}
        <div className="h-20 md:h-24 flex items-center justify-center">
          <span
            className="relative text-4xl md:text-[2.75rem] leading-none text-primary"
            style={{ fontFamily: "var(--font-great-day)" }}
          >
            {horse.name}
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
}

// A pair of sliding barn doors covering the deck. They unlatch with a small
// nudge, roll apart into the "walls", and then unmount.
function BarnDoors({ open, onOpened }: { open: boolean; onOpened: () => void }) {
  const slide = {
    duration: 1.15,
    times: [0, 0.14, 1],
    ease: [0.45, 0, 0.2, 1] as const,
  };

  return (
    <div className="absolute -inset-2 z-20 overflow-hidden rounded-2xl pointer-events-none" aria-hidden>
      <motion.div
        className="absolute inset-y-0 left-0 w-1/2"
        initial={false}
        animate={open ? { x: ["0%", "3%", "-103%"] } : { x: "0%" }}
        transition={slide}
      >
        <BarnDoor side="left" />
      </motion.div>
      <motion.div
        className="absolute inset-y-0 right-0 w-1/2"
        initial={false}
        animate={open ? { x: ["0%", "-3%", "103%"] } : { x: "0%" }}
        transition={slide}
        onAnimationComplete={() => {
          if (open) onOpened();
        }}
      >
        <BarnDoor side="right" />
      </motion.div>
    </div>
  );
}

function BarnDoor({ side }: { side: "left" | "right" }) {
  const trim = "var(--primary-foreground)";
  return (
    <div
      className={`relative h-full w-full bg-primary shadow-2xl ${
        side === "left" ? "rounded-l-2xl" : "rounded-r-2xl"
      }`}
      style={{
        // Vertical boards with a soft top-to-bottom light falloff.
        backgroundImage:
          "repeating-linear-gradient(90deg, transparent 0 calc(20% - 1.5px), rgba(0,0,0,0.28) calc(20% - 1.5px) 20%), linear-gradient(180deg, rgba(255,255,255,0.08), transparent 45%, rgba(0,0,0,0.18))",
      }}
    >
      {/* Frame, middle rail, and an X brace in each half */}
      <svg
        className="absolute inset-3 h-[calc(100%-1.5rem)] w-[calc(100%-1.5rem)] overflow-visible opacity-60"
        viewBox="0 0 100 200"
        preserveAspectRatio="none"
        fill="none"
        stroke={trim}
        strokeLinecap="square"
      >
        <g strokeWidth={8}>
          <rect x="0" y="0" width="100" height="200" vectorEffect="non-scaling-stroke" />
          <line x1="0" y1="100" x2="100" y2="100" vectorEffect="non-scaling-stroke" />
          <line x1="0" y1="0" x2="100" y2="100" vectorEffect="non-scaling-stroke" />
          <line x1="100" y1="0" x2="0" y2="100" vectorEffect="non-scaling-stroke" />
          <line x1="0" y1="100" x2="100" y2="200" vectorEffect="non-scaling-stroke" />
          <line x1="100" y1="100" x2="0" y2="200" vectorEffect="non-scaling-stroke" />
        </g>
      </svg>

      {/* Handle by the center seam */}
      <div
        className={`absolute top-1/2 -translate-y-1/2 h-16 w-2 rounded-full shadow-md ${
          side === "left" ? "right-5" : "left-5"
        }`}
        style={{ background: "linear-gradient(90deg, #b08a4a, #e2c27d, #9c7639)" }}
      />

      {/* Shadow line where the doors meet */}
      <div
        className={`absolute inset-y-0 w-px bg-black/40 ${side === "left" ? "right-0" : "left-0"}`}
      />
    </div>
  );
}
