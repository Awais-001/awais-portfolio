"use client";

import Image from "next/image";
import Link from "next/link";
import { Fragment, useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionTemplate,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import { featured, type Featured } from "@/lib/projects";
import { ArrowRight, FolderTab, SectionHeader, Sticker, Tape } from "../ui";

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

const FOLDER_SHADOW = "drop-shadow(0 8px 18px rgba(0,0,0,0.16))";

/** One project as a file folder: a tab in the card's color, staggered left→right down the stack. */
function Folder({ p, i, total }: { p: Featured; i: number; total: number }) {
  const f = total > 1 ? i / (total - 1) : 0; // 0 = tab far left, 1 = far right
  const first = f === 0, last = f === 1;
  return (
    <div className="group relative">
      <div className="flex">
        <span style={{ flexGrow: f }} />
        <FolderTab bg={p.color} ink={p.ink} border={p.border} className="relative z-[1] -mb-px">Project 0{i + 1}</FolderTab>
        <span style={{ flexGrow: 1 - f }} />
      </div>
      <article
        className="relative flex flex-col gap-10 px-7 pb-16 pt-12 md:px-12 lg:h-[560px] lg:flex-row lg:items-center lg:gap-14 lg:py-14"
        style={{
          background: p.color,
          color: p.ink,
          border: p.border ? `1px solid ${p.border}` : undefined,
          borderRadius: `${first ? 0 : 14}px ${last ? 0 : 14}px 4px 4px`,
        }}
      >
        <div className="relative flex flex-col gap-5 lg:w-[440px] lg:shrink-0">
          <span className="font-mono text-xs uppercase tracking-[0.08em] opacity-80">● {p.label}</span>
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
    </div>
  );
}

function StackCard({ p, i, total, progress }: { p: Featured; i: number; total: number; progress: MotionValue<number> }) {
  const depth = total - 1 - i;
  const scale = useTransform(progress, [i / total, 1], [1, 1 - depth * 0.035]);
  const bright = useTransform(progress, [i / total, 1], [1, 1 - depth * 0.09]);
  const filter = useMotionTemplate`brightness(${bright}) ${FOLDER_SHADOW}`;

  // Each folder sticks a little lower than the one before, so the staggered tabs
  // pile up like files in a drawer.
  return (
    <div className="sticky" style={{ top: 96 + i * 18 }}>
      <motion.div style={{ scale, filter, transformOrigin: "50% 0%" }}>
        <Folder p={p} i={i} total={total} />
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
          featured.map((p, i) => (
            <Fragment key={p.slug}>
              <StackCard p={p} i={i} total={featured.length} progress={scrollYProgress} />
              {/* Scroll room between folders. Kept outside the sticky element: a margin on it
                  would make the browser release earlier folders before the last one lands. */}
              <div aria-hidden="true" style={{ height: i === featured.length - 1 ? "22vh" : "65vh" }} />
            </Fragment>
          ))
        ) : (
          <div className="flex flex-col">
            {featured.map((p, i) => (
              // Tabs sit on the bottom edge of the folder above, like Umar's file stack.
              <div key={p.slug} className={i > 0 ? "-mt-9" : ""} style={{ filter: FOLDER_SHADOW, position: "relative" }}>
                <Folder p={p} i={i} total={featured.length} />
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
