"use client";

import { motion, useReducedMotion } from "motion/react";
import { SectionHeader } from "@/components/ui";

const K = "#0C0C0E";
const doodle: Record<string, React.ReactNode> = {
  gym: (
    <>
      <rect x="10" y="34" width="10" height="28" rx="3" />
      <rect x="20" y="28" width="10" height="40" rx="3" />
      <rect x="66" y="28" width="10" height="40" rx="3" />
      <rect x="76" y="34" width="10" height="28" rx="3" />
      <path d="M30 48 H66" />
    </>
  ),
  cricket: (
    <>
      <path d="M64 14 L74 24 L40 70 L28 70 L26 58 Z" />
      <path d="M26 70 L16 80" />
      <circle cx="74" cy="72" r="9" />
      <path d="M68 66 Q74 72 80 78" />
    </>
  ),
  tt: (
    <>
      <circle cx="42" cy="40" r="24" />
      <path d="M58 58 L74 76" />
      <path d="M70 72 L78 80" />
      <circle cx="76" cy="22" r="7" />
    </>
  ),
  tekken: (
    <>
      <path d="M22 34 H74 Q86 34 88 50 L90 64 Q91 74 82 74 Q76 74 70 64 H26 Q20 74 14 74 Q5 74 6 64 L8 50 Q10 34 22 34 Z" />
      <path d="M26 46 V58 M20 52 H32" />
      <circle cx="66" cy="48" r="3" />
      <circle cx="74" cy="54" r="3" />
    </>
  ),
  fifa: (
    <>
      <circle cx="48" cy="48" r="32" />
      <path d="M48 34 L60 43 L56 57 H40 L36 43 Z" />
      <path d="M48 34 V18 M60 43 L76 38 M56 57 L66 72 M40 57 L30 72 M36 43 L20 38" />
    </>
  ),
  chai: (
    <>
      <path d="M36 20 C 32 14, 40 11, 36 4 M50 20 C 46 14, 54 11, 50 4 M64 20 C 60 14, 68 11, 64 4" />
      <path d="M24 28 H72 L65 86 Q64 90 60 90 H36 Q32 90 31 86 Z" />
      <path d="M28 48 H68" />
    </>
  ),
};

const hobbies = [
  { k: "gym", name: "Gym", color: "#C6F432", cap: "the daily reset button", rot: -2 },
  { k: "cricket", name: "Cricket", color: "#5EEAD4", cap: "always up for a match", rot: 1.5 },
  { k: "tt", name: "Table tennis", color: "#FF8A5B", cap: "fast hands, faster rallies", rot: -1 },
  { k: "tekken", name: "Tekken 8", color: "#A78BFA", cap: "combos > meetings", rot: 2 },
  { k: "fifa", name: "FIFA", color: "#7DD3FC", cap: "just one more match...", rot: -1.5 },
  { k: "chai", name: "Chai", color: "#FFE58A", cap: "fuel for all of the above", rot: 1 },
];

export default function Hobbies() {
  const reduce = useReducedMotion();
  return (
    <section className="mx-auto flex max-w-[1200px] flex-col gap-12 px-6 py-24">
      <SectionHeader note="when Figma is closed" title="Off the clock" />
      <ul className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
        {hobbies.map((h, i) => (
          <motion.li
            key={h.k}
            initial={reduce ? false : { opacity: 0, y: -120, rotate: h.rot * 8 }}
            whileInView={{ opacity: 1, y: 0, rotate: h.rot }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ type: "spring", stiffness: 260, damping: 11, delay: (i % 3) * 0.1 }}
            whileHover={reduce ? undefined : { rotate: -h.rot * 1.5, scale: 1.04, y: -6 }}
            style={{ background: h.color, rotate: reduce ? `${h.rot}deg` : undefined }}
            className="flex min-h-[300px] flex-col justify-between rounded-[20px] p-8 text-bg shadow-[0_16px_32px_rgba(0,0,0,0.4)]"
          >
            <svg width="96" height="96" viewBox="0 0 96 96" fill="none" stroke={K} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              {doodle[h.k]}
            </svg>
            <div className="flex flex-col gap-1">
              <h3 className="text-[34px] font-extrabold tracking-[-0.02em]">{h.name}</h3>
              <span className="font-hand text-[26px]">{h.cap}</span>
            </div>
          </motion.li>
        ))}
      </ul>
    </section>
  );
}
