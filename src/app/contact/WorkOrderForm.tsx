"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { site } from "@/lib/site";
import { ArrowRight } from "@/components/ui";

const reasons = ["Full-time role", "Freelance project", "Just saying hi"];
const types = ["App", "Website", "Branding", "UX audit"];

function Zigzag({ top = false }: { top?: boolean }) {
  return (
    <svg aria-hidden="true" className={`absolute left-0 h-3 w-full ${top ? "-top-[11px]" : "-bottom-[11px] rotate-180"}`} preserveAspectRatio="none" viewBox="0 0 100 6">
      <path d={"M0 6 " + Array.from({ length: 50 }, (_, i) => `L${i * 2 + 1} 0 L${i * 2 + 2} 6`).join(" ") + " Z"} fill="#F4F1EA" />
    </svg>
  );
}

function Chips({ label, options, value, onChange, color }: { label: string; options: string[]; value: string; onChange: (v: string) => void; color: string }) {
  const reduce = useReducedMotion();
  return (
    <fieldset className="flex flex-col gap-2.5">
      <legend className="mb-2.5 text-[11px] font-bold tracking-[0.08em]">{label}</legend>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => {
          const on = value === o;
          return (
            <motion.label
              key={o}
              whileTap={reduce ? undefined : { scale: 0.92, rotate: -3 }}
              className={`flex min-h-11 cursor-pointer items-center rounded-full px-4 font-display text-[15px] font-semibold transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-figma ${on ? "border-[1.5px] border-[#1A1A1E]" : "border border-[#1A1A1E]/30 hover:border-[#1A1A1E]/70"}`}
              style={{ background: on ? color : "transparent" }}
            >
              <input type="radio" name={label} value={o} checked={on} onChange={() => onChange(o)} className="sr-only" />
              {on ? "✓ " : ""}
              {o}
            </motion.label>
          );
        })}
      </div>
    </fieldset>
  );
}

export default function WorkOrderForm() {
  const reduce = useReducedMotion();
  const id = useId();
  const [reason, setReason] = useState(reasons[1]);
  const [type, setType] = useState(types[0]);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") || "");
    const email = String(data.get("email") || "");
    const message = String(data.get("message") || "");

    if (!site.formEndpoint) {
      // No form service yet: open the visitor's email app with everything filled in.
      const body = `Hi Awais,\n\n${message}\n\n— ${name} (${email})\nHere for: ${reason}\nProject type: ${type}`;
      window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(`Work order: ${reason} · ${type}`)}&body=${encodeURIComponent(body)}`;
      setStatus("sent");
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch(site.formEndpoint, {
        method: "POST",
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message, reason, type }),
      });
      setStatus(res.ok ? "sent" : "error");
      if (res.ok) e.currentTarget?.reset?.();
    } catch {
      setStatus("error");
    }
  }

  const input = "w-full rounded-[10px] border border-[#1A1A1E]/25 bg-white px-4 font-display text-base text-[#1A1A1E] placeholder:text-[#8E8E99] focus:border-figma focus:outline-none focus:ring-2 focus:ring-figma/30";

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 80, rotate: 10 }}
      animate={{ opacity: 1, y: 0, rotate: 1.5 }}
      transition={{ type: "spring", stiffness: 170, damping: 12, delay: reduce ? 0 : 0.2 }}
      style={reduce ? { rotate: "1.5deg" } : undefined}
      className="relative w-full max-w-[600px]"
    >
      <form onSubmit={onSubmit} className="relative flex flex-col gap-5 bg-paper px-6 pb-9 pt-10 font-mono text-[#1A1A1E] shadow-[0_28px_56px_rgba(0,0,0,0.55)] sm:px-10">
        <Zigzag top />
        <div className="flex items-end justify-between gap-4">
          <div className="flex flex-col gap-1">
            <h2 className="font-display text-[40px] font-extrabold leading-none tracking-[-0.02em]">WORK ORDER</h2>
            <span className="text-[11px] tracking-[0.08em] text-[#6B6B72]">AWAIS RAZA · PRODUCT DESIGN</span>
          </div>
          <span className="text-xs font-medium tracking-[0.06em] text-[#6B6B72]">NO. 0089</span>
        </div>
        <hr className="border-t-[1.5px] border-dashed border-[#1A1A1E]/50" />

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="flex flex-col gap-2" htmlFor={`${id}-name`}>
            <span className="text-[11px] font-bold tracking-[0.08em]">NAME</span>
            <input id={`${id}-name`} name="name" required autoComplete="name" placeholder="Your name" className={`${input} h-[52px]`} />
          </label>
          <label className="flex flex-col gap-2" htmlFor={`${id}-email`}>
            <span className="text-[11px] font-bold tracking-[0.08em]">EMAIL</span>
            <input id={`${id}-email`} name="email" type="email" required autoComplete="email" placeholder="you@company.com" className={`${input} h-[52px]`} />
          </label>
        </div>

        <Chips label="I'M HERE FOR" options={reasons} value={reason} onChange={setReason} color="#C6F432" />
        <Chips label="PROJECT TYPE" options={types} value={type} onChange={setType} color="#A78BFA" />

        <label className="flex flex-col gap-2" htmlFor={`${id}-msg`}>
          <span className="text-[11px] font-bold tracking-[0.08em]">TELL ME ABOUT IT</span>
          <textarea id={`${id}-msg`} name="message" required rows={5} placeholder="What are you building, and where are you stuck?" className={`${input} resize-y py-3.5`} />
        </label>

        <hr className="border-t-[1.5px] border-dashed border-[#1A1A1E]/50" />
        <div className="flex flex-wrap items-center justify-between gap-4">
          <span className="text-[11px] tracking-[0.06em] text-[#6B6B72]">PAID IN: a good problem</span>
          <motion.button
            type="submit"
            disabled={status === "sending"}
            whileHover={reduce ? undefined : { scale: 1.05, rotate: -2 }}
            whileTap={reduce ? undefined : { scale: 0.95 }}
            className="group flex h-[52px] items-center gap-2.5 rounded-full bg-[#0C0C0E] px-7 font-display text-[17px] font-semibold text-ink disabled:opacity-60"
          >
            {status === "sending" ? "Sending…" : "Send it"} <ArrowRight className="transition-transform group-hover:translate-x-1" />
          </motion.button>
        </div>
        <p role="status" aria-live="polite" className="min-h-5 text-xs tracking-[0.04em]">
          {status === "sent" && (site.formEndpoint ? "Got it! I'll reply within a day." : "Your email app should open with everything filled in. Just hit send.")}
          {status === "error" && "Hmm, that didn't go through. Email me directly instead."}
        </p>

        {/* Stamp: PRIORITY, then SENT after submitting */}
        <AnimatePresence mode="wait">
          <motion.span
            key={status === "sent" ? "sent" : "priority"}
            aria-hidden="true"
            initial={reduce ? false : { scale: 2.4, opacity: 0, rotate: -20 }}
            animate={{ scale: 1, opacity: 0.85, rotate: 12 }}
            exit={{ opacity: 0, scale: 0.6 }}
            transition={{ type: "spring", stiffness: 420, damping: 12, delay: reduce ? 0 : 0.7 }}
            className={`pointer-events-none absolute right-5 top-5 hidden flex-col items-center rounded-full border-[3px] px-3.5 py-3 sm:flex ${status === "sent" ? "border-[#1FA463] text-[#1FA463]" : "border-[#FF6A3D] text-[#FF6A3D]"}`}
          >
            <span className="text-[13px] font-bold tracking-[0.1em]">{status === "sent" ? "SENT!" : "PRIORITY"}</span>
            <span className="text-[8px] font-medium tracking-[0.08em]">{status === "sent" ? "TALK SOON" : "REPLY WITHIN A DAY"}</span>
          </motion.span>
        </AnimatePresence>
        <Zigzag />
      </form>
    </motion.div>
  );
}
