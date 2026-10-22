"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { site } from "@/lib/site";
import { ArrowRight } from "./ui";

const bars = [
  { h: 22, c: "#EDEDF0" },
  { h: 34, c: "#C6F432" },
  { h: 28, c: "#EDEDF0" },
  { h: 48, c: "#C6F432" },
  { h: 70, c: "#EDEDF0" },
];

/** Shared closing section used at the bottom of most pages. */
export default function LetsTalk() {
  const reduce = useReducedMotion();
  return (
    <section className="mx-auto flex max-w-[1200px] flex-col items-center gap-9 px-6 pb-36 pt-28 text-center">
      <div className="flex items-end gap-4">
        <div aria-hidden="true" className="flex h-[70px] items-end gap-1.5">
          {bars.map((b, i) => (
            <motion.span
              key={i}
              className="block w-3 origin-bottom"
              style={{ height: b.h, background: b.c }}
              initial={reduce ? false : { scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 400, damping: 10, delay: i * 0.08 }}
            />
          ))}
        </div>
        <span className="font-hand text-[26px] text-muted" style={{ rotate: "-4deg" }}>
          psst, still here?
        </span>
      </div>
      <motion.h2
        className="text-[clamp(72px,11vw,160px)] font-extrabold uppercase leading-[0.9] tracking-[-0.05em]"
        initial={reduce ? false : { scale: 0.8, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ type: "spring", stiffness: 220, damping: 12 }}
      >
        Let&apos;s talk
      </motion.h2>
      <p className="max-w-[480px] text-lg leading-[1.55] text-muted">
        Got a product idea, a confusing flow, or just want to say hi? Send it over. I usually reply within a day.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-5">
        <motion.a
          href={`mailto:${site.email}`}
          className="flex flex-col items-start gap-1 bg-sticky px-5 py-3.5 text-left text-bg shadow-[0_16px_30px_rgba(0,0,0,0.45)]"
          style={{ rotate: "-2deg" }}
          whileHover={reduce ? undefined : { rotate: 2, scale: 1.04 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <span className="font-mono text-[10px] tracking-[0.08em]">DROP A LINE</span>
          <span className="text-lg font-extrabold sm:text-[19px]">{site.email}</span>
        </motion.a>
        <Link href="/contact" className="group flex h-12 items-center gap-2 rounded-md bg-figma px-[18px] font-mono text-xs tracking-[0.06em] text-white transition-transform hover:-translate-y-0.5">
          <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" /> START A PROJECT
        </Link>
      </div>
    </section>
  );
}
