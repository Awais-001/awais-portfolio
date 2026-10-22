"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";

/** Figma-style multiplayer cursor with an "Awais" name tag. Mouse devices only. */
export default function Cursor() {
  const reduce = useReducedMotion();
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 900, damping: 45, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 900, damping: 45, mass: 0.4 });
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [down, setDown] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)");
    if (!fine.matches) return;
    setEnabled(true);
    document.documentElement.classList.add("has-custom-cursor");
    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
      const t = e.target as Element | null;
      setHovering(!!t?.closest("a, button, [role='button'], input, textarea, label"));
    };
    const leave = () => setVisible(false);
    const press = () => setDown(true);
    const release = () => setDown(false);
    window.addEventListener("pointermove", move);
    document.addEventListener("pointerleave", leave);
    window.addEventListener("pointerdown", press);
    window.addEventListener("pointerup", release);
    return () => {
      document.documentElement.classList.remove("has-custom-cursor");
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerleave", leave);
      window.removeEventListener("pointerdown", press);
      window.removeEventListener("pointerup", release);
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[100]"
      style={{ x: reduce ? x : sx, y: reduce ? y : sy, opacity: visible ? 1 : 0 }}
    >
      <motion.div
        animate={{ scale: down ? 0.85 : hovering ? 1.15 : 1, rotate: hovering ? -8 : 0 }}
        transition={{ type: "spring", stiffness: 500, damping: 14 }}
        style={{ transformOrigin: "2px 2px" }}
      >
        <svg width="22" height="24" viewBox="0 0 22 24" fill="none">
          <path d="M2 2 L19 12 L11 13.5 L7 21 Z" fill="#C6F432" stroke="#0C0C0E" strokeWidth="1.6" strokeLinejoin="round" />
        </svg>
        <motion.span
          animate={{ scale: hovering ? 1.05 : 1, y: hovering ? 2 : 0 }}
          className="absolute left-4 top-5 rounded-md bg-lime px-2 py-1 text-xs font-semibold text-bg"
        >
          {hovering ? "click!" : "Awais"}
        </motion.span>
      </motion.div>
    </motion.div>
  );
}
