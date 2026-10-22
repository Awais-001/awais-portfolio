"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, Sticker } from "../ui";

const bouncy = { type: "spring", stiffness: 380, damping: 14 } as const;

export default function Hero() {
  const reduce = useReducedMotion();
  const d = (s: number) => (reduce ? 0 : s); // delay helper

  return (
    <section className="mx-auto flex max-w-[1200px] flex-col items-center gap-11 px-6 pb-32 pt-20 text-center md:pt-28">
      <motion.span
        initial={reduce ? false : { opacity: 0, y: 12, rotate: -6 }}
        animate={{ opacity: 1, y: 0, rotate: 0 }}
        transition={{ ...bouncy, delay: d(0.05) }}
        className="font-hand text-[30px] text-note"
      >
        hi, my name is
      </motion.span>

      {/* Name inside a Figma-style selection box that draws itself */}
      <div className="relative px-2">
        <motion.div
          initial={reduce ? false : { scale: 0.92, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ ...bouncy, delay: d(0.15) }}
          className="relative px-5 pb-1.5 pt-2.5 md:px-7"
        >
          <svg className="pointer-events-none absolute inset-0 h-full w-full overflow-visible" aria-hidden="true">
            <motion.rect
              x="0" y="0" width="100%" height="100%"
              fill="none" stroke="#4C8DFF" strokeWidth="1.5"
              initial={reduce ? false : { pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.9, ease: "easeInOut", delay: d(0.35) }}
            />
          </svg>
          {[
            "-left-[5px] -top-[5px]",
            "-right-[5px] -top-[5px]",
            "-bottom-[5px] -left-[5px]",
            "-bottom-[5px] -right-[5px]",
          ].map((pos, i) => (
            <motion.span
              key={pos}
              aria-hidden="true"
              className={`absolute ${pos} size-2.5 border-[1.5px] border-figma bg-ink`}
              initial={reduce ? false : { scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 600, damping: 12, delay: d(1.15 + i * 0.07) }}
            />
          ))}
          <h1 className="text-[clamp(72px,14vw,172px)] font-extrabold uppercase leading-[0.95] tracking-[-0.05em]">Awais</h1>
          <motion.span
            aria-hidden="true"
            initial={reduce ? false : { scale: 0, y: -6 }}
            animate={{ scale: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 500, damping: 14, delay: d(1.45) }}
            className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-[3px] bg-figma px-1.5 py-0.5 font-mono text-[10px] text-white"
          >
            Fill × Hug
          </motion.span>
        </motion.div>

        {/* Stickers slap onto the box */}
        <motion.div
          className="absolute -left-6 -top-10 md:-left-10"
          initial={reduce ? false : { y: -60, rotate: -40, opacity: 0 }}
          animate={{ y: 0, rotate: 0, opacity: 1 }}
          transition={{ ...bouncy, delay: d(1.6) }}
        >
          <Sticker rotate={-6} wiggle={false}>FINTECH · SAAS · AI</Sticker>
        </motion.div>
        <motion.div
          className="absolute -bottom-5 -right-4 md:-right-8"
          initial={reduce ? false : { y: -60, rotate: 40, opacity: 0 }}
          animate={{ y: 0, rotate: 0, opacity: 1 }}
          transition={{ ...bouncy, delay: d(1.75) }}
        >
          <Sticker bg="#5EEAD4" rotate={5} wiggle={false}>PAKISTAN</Sticker>
        </motion.div>
        <motion.div
          className="absolute -left-[230px] top-1/2 hidden -translate-y-1/2 items-center gap-1 lg:flex"
          initial={reduce ? false : { opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ ...bouncy, delay: d(1.9) }}
          style={{ rotate: "-8deg" }}
        >
          <span className="font-hand text-[26px] text-note">Product Designer</span>
          <svg width="34" height="22" viewBox="0 0 34 22" fill="none" stroke="#D9D6CC" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            <path d="M2 14 C 12 4, 22 4, 30 10" />
            <path d="M24 4 L30 10 L23 13" />
          </svg>
        </motion.div>
      </div>

      <motion.p
        initial={reduce ? false : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...bouncy, delay: d(0.6) }}
        className="mt-6 max-w-[860px] text-[clamp(26px,3.4vw,42px)] font-medium leading-[1.25] tracking-[-0.02em]"
      >
        I design fintech apps <span aria-hidden="true" className="inline-block size-[0.7em] translate-y-[0.05em] rounded-full bg-lime align-baseline" /> SaaS platforms &amp; websites that feel{" "}
        <span className="font-hand text-[1.25em] font-bold text-lime">effortless.</span>
      </motion.p>

      <motion.div
        initial={reduce ? false : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...bouncy, delay: d(0.75) }}
        className="flex flex-wrap items-center justify-center gap-3.5"
      >
        <Link href="/contact" className="group flex h-12 items-center gap-2.5 rounded-md bg-figma px-5 font-mono text-[13px] tracking-[0.06em] text-white transition-transform hover:-translate-y-0.5">
          <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
          HIRE ME
        </Link>
        <span className="font-hand text-2xl text-muted">(or just say salaam)</span>
      </motion.div>
    </section>
  );
}
