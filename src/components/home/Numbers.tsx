"use client";

import { useEffect, useRef, useState } from "react";
import { animate, motion, useInView, useReducedMotion } from "motion/react";

function CountUp({ to, prefix = "", suffix = "" }: { to: number; prefix?: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduce = useReducedMotion();
  const [val, setVal] = useState(reduce ? to : 0);
  useEffect(() => {
    if (!inView || reduce) return;
    const c = animate(0, to, { duration: 1.4, ease: [0.16, 1, 0.3, 1], onUpdate: (v) => setVal(Math.round(v)) });
    return () => c.stop();
  }, [inView, reduce, to]);
  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {val}
      {suffix}
    </span>
  );
}

const items: { label: string; value: React.ReactNode }[] = [
  { label: "Task time, fintech flows", value: <CountUp to={25} prefix="−" suffix="%" /> },
  { label: "Concept → handoff", value: <><CountUp to={30} suffix="%" /> faster</> },
  { label: "Task completion", value: <><CountUp to={65} suffix="%" /> → <CountUp to={88} suffix="%" /></> },
  { label: "Front-end revisions", value: <CountUp to={20} prefix="−" suffix="%" /> },
  { label: "Design system parts", value: <CountUp to={120} suffix="+" /> },
];

function Zigzag({ flip = false }: { flip?: boolean }) {
  return (
    <svg aria-hidden="true" className={`absolute left-0 h-3 w-full ${flip ? "-top-[11px]" : "-bottom-[11px] rotate-180"}`} preserveAspectRatio="none" viewBox="0 0 100 6">
      <path d="M0 6 L2 0 L4 6 L6 0 L8 6 L10 0 L12 6 L14 0 L16 6 L18 0 L20 6 L22 0 L24 6 L26 0 L28 6 L30 0 L32 6 L34 0 L36 6 L38 0 L40 6 L42 0 L44 6 L46 0 L48 6 L50 0 L52 6 L54 0 L56 6 L58 0 L60 6 L62 0 L64 6 L66 0 L68 6 L70 0 L72 6 L74 0 L76 6 L78 0 L80 6 L82 0 L84 6 L86 0 L88 6 L90 0 L92 6 L94 0 L96 6 L98 0 L100 6 Z" fill="#F4F1EA" />
    </svg>
  );
}

export default function Numbers() {
  const reduce = useReducedMotion();
  return (
    <section id="numbers" className="mx-auto flex max-w-[1200px] flex-wrap items-center gap-16 px-6 py-24 lg:flex-nowrap lg:gap-20">
      <div className="flex flex-1 flex-col gap-7">
        <div className="flex flex-col gap-2.5">
          <span className="font-hand text-[26px] text-muted">proof, not just pretty screens</span>
          <h2 className="text-[clamp(52px,7vw,96px)] font-extrabold uppercase leading-[0.95] tracking-[-0.045em]">In numbers</h2>
        </div>
        <p className="max-w-[470px] text-2xl leading-[1.35] text-soft">
          Real results from real projects, itemised like a proper fintech designer would.
        </p>
        <div className="flex flex-col gap-5 pt-3">
          <span className="flex items-center gap-2 font-hand text-3xl text-note" style={{ rotate: "-3deg" }}>
            keep this for your records
            <svg width="60" height="30" viewBox="0 0 60 30" fill="none" stroke="#D9D6CC" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true" className="hidden lg:block">
              <path d="M2 20 C 18 4, 38 4, 54 14" />
              <path d="M46 8 L55 14 L47 21" />
            </svg>
          </span>
          <span className="font-hand text-2xl text-muted" style={{ rotate: "2deg" }}>
            *numbers from my work at Quecko &amp; Clustox
          </span>
        </div>
      </div>

      <motion.div
        className="relative mx-auto w-full max-w-[520px] shrink-0"
        initial={reduce ? false : { opacity: 0, y: 80, rotate: 12 }}
        whileInView={{ opacity: 1, y: 0, rotate: 2.5 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ type: "spring", stiffness: 160, damping: 11 }}
        style={reduce ? { rotate: "2.5deg" } : undefined}
      >
        <div className="relative flex flex-col items-center gap-5 bg-paper px-9 pb-9 pt-11 font-mono text-[#1A1A1E] shadow-[0_24px_48px_rgba(0,0,0,0.55)] sm:px-11">
          <Zigzag flip />
          <span className="font-display text-4xl font-extrabold tracking-[-0.02em]">AWAIS RAZA</span>
          <span className="text-sm font-medium tracking-[0.14em]">★ IMPACT RECEIPT ★</span>
          <span className="text-xs tracking-[0.08em] text-[#6B6B72]">PRODUCT DESIGN · PAKISTAN</span>
          <div className="flex w-full justify-between text-xs tracking-[0.06em] text-[#6B6B72]">
            <span>NO. 0088</span>
            <span>2024 — NOW</span>
          </div>
          <hr className="w-full border-t-[1.5px] border-dashed border-[#1A1A1E]/50" />
          <div className="flex w-full justify-between text-xs font-bold tracking-[0.08em]">
            <span>ITEM</span>
            <span>RESULT</span>
          </div>
          <ul className="flex w-full flex-col gap-3">
            {items.map((it) => (
              <li key={it.label} className="flex items-end gap-2 text-[15px]">
                <span>{it.label}</span>
                <span aria-hidden="true" className="mb-1 flex-1 border-b-[1.5px] border-dotted border-[#1A1A1E]/35" />
                <span className="font-bold">{it.value}</span>
              </li>
            ))}
          </ul>
          <hr className="w-full border-t-[1.5px] border-dashed border-[#1A1A1E]/50" />
          <div className="flex w-full items-center justify-between">
            <span className="text-base font-bold tracking-[0.08em]">TOTAL</span>
            <span className="-rotate-[1.5deg] bg-lime px-2 font-display text-2xl font-extrabold tracking-[-0.01em]">happier users</span>
          </div>
          <div className="flex w-full justify-between text-sm text-[#6B6B72]">
            <span>PAID IN</span>
            <span>chai &amp; curiosity</span>
          </div>
          <hr className="w-full border-t-[1.5px] border-dashed border-[#1A1A1E]/50" />
          <svg aria-hidden="true" width="164" height="46" viewBox="0 0 164 46">
            {[3, 1, 2, 1, 1, 3, 1, 2, 2, 1, 3, 1, 1, 2, 1, 3, 2, 1, 1, 2, 3, 1, 2, 1, 1, 3, 1, 1, 2, 2, 1, 3, 1, 2, 1, 1, 2, 3, 1, 2]
              .reduce<{ x: number; els: React.ReactNode[] }>(
                (acc, w, i) => {
                  if (i % 2 === 0) acc.els.push(<rect key={i} x={acc.x} y="0" width={w * 2} height="46" fill="#1A1A1E" />);
                  acc.x += w * 2;
                  return acc;
                },
                { x: 0, els: [] },
              ).els}
          </svg>
          <span className="text-xs tracking-[0.1em] text-[#6B6B72]">THANKS FOR SCROLLING :)</span>
          <motion.span
            aria-hidden="true"
            className="absolute bottom-12 right-5 flex flex-col items-center rounded-full border-[3px] border-[#FF6A3D] px-3.5 py-3 text-[#FF6A3D] opacity-85"
            initial={reduce ? false : { scale: 2.2, opacity: 0, rotate: -20 }}
            whileInView={{ scale: 1, opacity: 0.85, rotate: 14 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 400, damping: 12, delay: 1 }}
            style={reduce ? { rotate: "14deg" } : undefined}
          >
            <span className="text-[13px] font-bold tracking-[0.1em]">VERIFIED</span>
            <span className="text-[8px] font-medium tracking-[0.1em]">REAL PROJECTS</span>
          </motion.span>
          <Zigzag />
        </div>
      </motion.div>
    </section>
  );
}
