"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

/** Bouncy reveal when scrolled into view. `from` sets the starting offset/tilt. */
export default function Reveal({
  children,
  className,
  delay = 0,
  y = 40,
  rotate = 0,
  scale = 1,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  rotate?: number;
  scale?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y, rotate, scale }}
      whileInView={{ opacity: 1, y: 0, rotate: 0, scale: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ type: "spring", stiffness: 260, damping: 15, delay }}
    >
      {children}
    </motion.div>
  );
}
