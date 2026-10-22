"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { Sticker } from "./ui";

const bouncy = { type: "spring", stiffness: 380, damping: 14 } as const;

/** Big page title with a handwritten note above and a slapped-on sticker. */
export default function PageHero({
  note,
  title,
  sticker,
  stickerBg = "#C6F432",
  children,
}: {
  note: string;
  title: string;
  sticker?: string;
  stickerBg?: string;
  children?: ReactNode;
}) {
  const reduce = useReducedMotion();
  return (
    <section className="mx-auto flex max-w-[1200px] flex-col gap-7 px-6 pb-16 pt-16 md:pt-24">
      <motion.span
        initial={reduce ? false : { opacity: 0, y: 10, rotate: -6 }}
        animate={{ opacity: 1, y: 0, rotate: 0 }}
        transition={bouncy}
        className="font-hand text-[30px] text-note"
      >
        {note}
      </motion.span>
      <div className="flex flex-wrap items-end gap-5">
        <motion.h1
          initial={reduce ? false : { opacity: 0, y: 40, scale: 0.94 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ ...bouncy, delay: reduce ? 0 : 0.08 }}
          className="text-[clamp(64px,13vw,180px)] font-extrabold uppercase leading-[0.85] tracking-[-0.055em]"
        >
          {title}
        </motion.h1>
        {sticker && (
          <motion.div
            initial={reduce ? false : { y: -80, rotate: -40, opacity: 0 }}
            animate={{ y: 0, rotate: 0, opacity: 1 }}
            transition={{ ...bouncy, delay: reduce ? 0 : 0.45 }}
            className="mb-3"
          >
            <Sticker bg={stickerBg} rotate={-6} wiggle={false}>
              {sticker}
            </Sticker>
          </motion.div>
        )}
      </div>
      {children && (
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...bouncy, delay: reduce ? 0 : 0.2 }}
        >
          {children}
        </motion.div>
      )}
    </section>
  );
}
