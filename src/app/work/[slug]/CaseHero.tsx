"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import type { CaseStudy } from "@/lib/caseStudies";
import { Sticker, Tape } from "@/components/ui";

const bouncy = { type: "spring", stiffness: 380, damping: 15 } as const;

export default function CaseHero({ c }: { c: CaseStudy }) {
  const reduce = useReducedMotion();
  const d = (s: number) => (reduce ? 0 : s);
  return (
    <section className="mx-auto flex max-w-[1200px] flex-col gap-7 px-6 pt-12 md:pt-16">
      <div className="flex flex-wrap items-center gap-4">
        <Link href="/work" className="group flex min-h-11 items-center gap-2 font-mono text-xs tracking-[0.06em] text-muted hover:text-ink">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="transition-transform group-hover:-translate-x-1">
            <path d="M19 12H5M11 6l-6 6 6 6" />
          </svg>
          BACK TO WORK
        </Link>
        <span className="inline-flex items-center gap-2 rounded-t-lg rounded-b-[2px] border border-[#34343A] bg-[#1E1E22] px-3.5 py-2 font-mono text-xs font-bold uppercase tracking-[0.06em] text-ink">
          <span aria-hidden="true" style={{ color: c.accent }}>✦</span>
          {c.crumb}
        </span>
      </div>

      <motion.span
        initial={reduce ? false : { opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={bouncy}
        className="font-mono text-[13px] uppercase tracking-[0.08em]"
        style={{ color: c.accent }}
      >
        ● {c.tagline}
      </motion.span>

      <div className="flex flex-wrap items-end gap-6">
        <motion.h1
          initial={reduce ? false : { opacity: 0, y: 50, scale: 0.94 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ ...bouncy, delay: d(0.06) }}
          className="text-[clamp(60px,11vw,150px)] font-extrabold leading-[0.9] tracking-[-0.055em]"
        >
          {c.title}
        </motion.h1>
        <motion.div
          initial={reduce ? false : { y: -80, rotate: -40, opacity: 0 }}
          animate={{ y: 0, rotate: 0, opacity: 1 }}
          transition={{ ...bouncy, delay: d(0.4) }}
          className="mb-3"
        >
          <Sticker bg={c.accent} rotate={-6} wiggle={false}>{c.sticker}</Sticker>
        </motion.div>
      </div>

      <motion.p
        initial={reduce ? false : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...bouncy, delay: d(0.15) }}
        className="max-w-[760px] text-[clamp(22px,2.4vw,28px)] font-medium leading-[1.35] tracking-[-0.01em] text-soft"
      >
        {c.summary}
      </motion.p>

      <motion.div
        initial={reduce ? false : { opacity: 0, y: 100, rotate: 4 }}
        animate={{ opacity: 1, y: 0, rotate: 0 }}
        transition={{ type: "spring", stiffness: 150, damping: 14, delay: d(0.3) }}
        className="relative mt-10"
      >
        <div className="relative aspect-[16/10] overflow-hidden rounded-lg border-8 border-ink shadow-[0_30px_60px_rgba(0,0,0,0.5)]">
          <Image src={c.cover} alt={`${c.title} cover`} fill priority sizes="(min-width:1240px) 1200px, 100vw" className="object-cover object-top" />
        </div>
        <Tape className="-left-6 -top-2.5 !h-[30px] !w-[110px]" rotate={-18} opacity={0.5} />
        <Tape className="-right-6 -top-2.5 !h-[30px] !w-[110px]" rotate={18} opacity={0.5} />
        <span className="absolute -top-16 right-10 hidden items-center gap-1.5 font-hand text-[26px] text-note md:flex" style={{ rotate: "-4deg" }}>
          <svg width="40" height="30" viewBox="0 0 40 30" fill="none" stroke="#D9D6CC" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            <path d="M36 4 C 22 4, 10 12, 6 26" />
            <path d="M2 19 L6 27 L13 21" />
          </svg>
          the hero shot
        </span>
      </motion.div>
    </section>
  );
}
