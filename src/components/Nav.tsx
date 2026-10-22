"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { nav, site } from "@/lib/site";
import { BehanceIcon, LinkedInIcon, MailIcon } from "./ui";

export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header className="relative z-40 mx-auto flex max-w-[1200px] items-center justify-between gap-4 px-6 py-6">
      <Link href="/" className="flex min-h-11 items-center text-lg font-extrabold tracking-[-0.02em]">
        Awais Raza
      </Link>

      <nav aria-label="Main" className="hidden gap-1 font-mono text-xs tracking-[0.06em] md:flex">
        {nav.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            aria-current={isActive(item.href) ? "page" : undefined}
            className={`flex min-h-11 items-center rounded-md px-3.5 uppercase transition-colors ${
              isActive(item.href) ? "bg-lime text-bg" : "text-muted hover:text-ink"
            }`}
          >
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="flex items-center gap-2">
        <a href={site.links.linkedin} aria-label="LinkedIn" target="_blank" rel="noreferrer" className="hidden size-11 items-center justify-center rounded-full bg-[#1C1C22] text-ink transition-transform hover:-translate-y-0.5 sm:flex">
          <LinkedInIcon />
        </a>
        <a href={site.links.behance} aria-label="Behance" target="_blank" rel="noreferrer" className="hidden size-11 items-center justify-center rounded-full bg-[#1C1C22] text-ink transition-transform hover:-translate-y-0.5 sm:flex">
          <BehanceIcon />
        </a>
        <Link
          href="/contact"
          className={`hidden h-11 items-center gap-2 rounded-md border px-4 font-mono text-xs tracking-[0.06em] transition-colors md:flex ${
            pathname.startsWith("/contact") ? "border-lime bg-lime text-bg" : "border-[#3A3A44] hover:border-ink"
          }`}
        >
          <MailIcon /> CONTACT
        </Link>
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          className="flex size-11 items-center justify-center rounded-md border border-[#3A3A44] md:hidden"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-menu"
            aria-label="Mobile"
            initial={{ opacity: 0, y: -12, rotate: -1 }}
            animate={{ opacity: 1, y: 0, rotate: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ type: "spring", stiffness: 420, damping: 22 }}
            className="absolute inset-x-4 top-[84px] flex flex-col gap-1 rounded-2xl border border-card-line bg-card p-3 md:hidden"
          >
            {[...nav, { label: "Contact", href: "/contact" }].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`rounded-lg px-4 py-3 text-lg font-semibold ${isActive(item.href) ? "bg-lime text-bg" : "text-ink"}`}
              >
                {item.label}
              </Link>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
