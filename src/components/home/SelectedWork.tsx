"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionTemplate,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import { featured, type Featured } from "@/lib/projects";
import { ArrowRight, SectionHeader, Sticker, Tape } from "../ui";

function useIsDesktop() {
  const [desk, setDesk] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const on = () => setDesk(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return desk;
}

function CardBody({ p, i }: { p: Featured; i: number }) {
  return (
    <article
      className="group relative flex flex-col gap-10 rounded-3xl px-7 py-12 shadow-[0_-12px_40px_rgba(0,0,0,0.55),0_24px_48px_rgba(0,0,0,0.35)] md:px-12 lg:h-[560px] lg:flex-row lg:items-center lg:gap-14 lg:py-14"
      style={{ background: p.color, color: p.ink, border: p.border ? `1px solid ${p.border}` : undefined }}
    >
      <span className="absolute -top-3.5 left-6 rounded-md px-3 py-1.5 font-mono text-[11px] tracking-[0.08em]" style={{ background: p.tab.bg, color: p.tab.ink }}>
        ● PROJECT 0{i + 1}
      </span>
      <span aria-hidden="true" className="pointer-events-none absolute -top-2 left-7 select-none text-[200px] font-extrabold leading-none tracking-[-0.06em] opacity-[0.07] lg:text-[240px]">
        0{i + 1}
      </span>

      <div className="relative flex flex-col gap-5 lg:w-[440px] lg:shrink-0">
        <span className="font-mono text-xs uppercase tracking-[0.08em] opacity-80">● {p.tagline}</span>
        <h3 className="text-[clamp(44px,5vw,68px)] font-extrabold leading-[0.95] tracking-[-0.04em]">{p.title}</h3>
        <p className="text-lg leading-[1.55]" style={{ color: p.subInk ?? p.ink }}>
          {p.description}
        </p>
        <Link
          href={`/work/${p.slug}`}
          className="group/btn flex h-12 w-fit items-center gap-2.5 rounded-full px-6 text-base font-semibold transition-transform hover:-translate-y-0.5"
          style={{ background: p.button.bg, color: p.button.ink }}
        >
          View case study <ArrowRight className="transition-transform group-hover/btn:translate-x-1" />
        </Link>
      </div>

      <div className="relative min-w-0 flex-1">
        <div className="relative aspect-[16/10] -rotate-[1.5deg] border-[7px] border-ink shadow-[0_22px_40px_rgba(0,0,0,0.35)] transition-transform duration-500 group-hover:rotate-0">
          <Image src={p.cover} alt={`${p.title} cover`} fill sizes="(min-width:1024px) 620px, 90vw" className="object-cover object-top" />
          <Tape className="-left-6 -top-2" rotate={22} opacity={p.tapeOpacity} />
          <Tape className="-right-6 -top-2" rotate={-22} opacity={p.tapeOpacity} />
          <Sticker className="absolute -bottom-4 left-5" bg={p.sticker.bg} ink={p.sticker.ink} rotate={-4}>
            {p.sticker.text}
          </Sticker>
        </div>
      </div>
    </article>
  );
}

function StackCard({ p, i, total, progress }: { p: Featured; i: number; total: number; progress: MotionValue<number> }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress: enter } = useScroll({ target: ref, offset: ["start end", "start start"] });
  const tilt = i % 2 === 0 ? -1.5 : 1.5;
  // Card swings in with a small tilt and settles gently (one soft overshoot, no wobble).
  const rotate = useSpring(useTransform(enter, [0, 1], [tilt * 3, tilt]), { stiffness: 110, damping: 20, mass: 1.1 });
  const depth = total - 1 - i;
  const scale = useTransform(progress, [i / total, 1], [1, 1 - depth * 0.035]);
  const bright = useTransform(progress, [i / total, 1], [1, 1 - depth * 0.09]);
  const filter = useMotionTemplate`brightness(${bright})`;

  return (
    <div ref={ref} className="sticky" style={{ top: 110 + i * 16, marginBottom: i === total - 1 ? 0 : "65vh" }}>
      <motion.div style={{ rotate, scale, filter, transformOrigin: "50% 0%" }}>
        <CardBody p={p} i={i} />
      </motion.div>
    </div>
  );
}

export default function SelectedWork() {
  const reduce = useReducedMotion();
  const desktop = useIsDesktop();
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: container, offset: ["start start", "end end"] });
  const stacking = desktop && !reduce;

  return (
    <section id="work" className="mx-auto flex max-w-[1200px] flex-col gap-16 px-6 py-24">
      <SectionHeader note="stuff I'm proud of ↓" title="Selected work" />

      <div ref={container} className="relative">
        {stacking ? (
          featured.map((p, i) => <StackCard key={p.slug} p={p} i={i} total={featured.length} progress={scrollYProgress} />)
        ) : (
          <div className="flex flex-col gap-12">
            {featured.map((p, i) => (
              <div key={p.slug} style={{ rotate: reduce ? "0deg" : `${i % 2 === 0 ? -1 : 1}deg` }}>
                <CardBody p={p} i={i} />
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-3.5">
        <span className="font-hand text-2xl text-muted">+ a UX case study &amp; 10 more in the archive →</span>
        <Link href="/work" className="flex min-h-11 items-center bg-orange px-3 font-mono text-[11px] tracking-[0.06em] text-bg transition-transform hover:-rotate-2">
          TIPBOX · PRICE92 · LUNERA · TRAVARA · + MORE
        </Link>
      </div>
    </section>
  );
}
