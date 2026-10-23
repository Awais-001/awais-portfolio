"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from "motion/react";
import { apps, branding, uxCases, websites, type Category, type WorkItem } from "@/lib/work";
import { ArrowRight, ArrowUpRight, Sticker } from "@/components/ui";
import { site as profile } from "@/lib/site";

const filters: { id: "all" | Category; label: string; count: number }[] = [
  { id: "all", label: "All", count: apps.length + uxCases.length + websites.length + branding.length },
  { id: "apps", label: "Apps", count: apps.length },
  { id: "ux", label: "UX Case Studies", count: uxCases.length },
  { id: "websites", label: "Websites", count: websites.length },
  { id: "branding", label: "Branding", count: branding.length },
];

const spring = { type: "spring", stiffness: 300, damping: 18 } as const;

function SectionHead({ note, title, count }: { note: string; title: string; count: number }) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div className="flex flex-col gap-2">
        <span className="font-hand text-[26px] text-muted">{note}</span>
        <h2 className="text-[clamp(36px,5vw,48px)] font-extrabold uppercase leading-[0.95] tracking-[-0.04em]">{title}</h2>
      </div>
      <span className="font-mono text-xs tracking-[0.08em] text-faint">{String(count).padStart(2, "0")} PROJECT{count > 1 ? "S" : ""}</span>
    </div>
  );
}

/** Dark card used for apps, UX case studies and branding. Links inside the site, so → arrow. */
function CaseCard({ item, big = false, i }: { item: WorkItem; big?: boolean; i: number }) {
  return (
    <motion.div layout initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ ...spring, delay: i * 0.05 }}>
      <Link
        href={`/work/${item.slug}`}
        className="group relative flex h-full flex-col gap-4 rounded-2xl border border-card-line bg-card p-3.5 pb-5 transition-transform duration-300 hover:-translate-y-1.5"
      >
        <span aria-hidden="true" className="absolute left-8 top-0 h-1 w-16 rounded-full" style={{ background: item.accent }} />
        <div className={`relative overflow-hidden rounded-[10px] border border-card-line aspect-[16/9]`}>
          <Image src={item.cover} alt={`${item.title} cover`} fill sizes={big ? "(min-width:1024px) 560px, 90vw" : "(min-width:1024px) 380px, 90vw"} className="origin-top object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]" />
        </div>
        <div className="flex items-end justify-between gap-4 px-1.5">
          <div className="flex min-w-0 flex-col gap-2.5">
            <Sticker bg={item.accent} rotate={-2}>
              {item.tag}
            </Sticker>
            <h3 className={`${big ? "text-2xl" : "text-[22px]"} font-extrabold tracking-[-0.02em]`}>{item.title}</h3>
            <p className="text-[15px] leading-[1.5] text-[#B4B4BE]">{item.line}</p>
          </div>
          <span className="flex size-11 shrink-0 items-center justify-center rounded-full text-bg transition-transform group-hover:translate-x-1" style={{ background: item.accent }}>
            <ArrowRight size={17} />
          </span>
        </div>
      </Link>
    </motion.div>
  );
}

function SiteTile({ item, i }: { item: WorkItem; i: number }) {
  return (
    <motion.a
      layout
      href={item.external}
      target="_blank"
      rel="noreferrer"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ ...spring, delay: i * 0.03 }}
      className="group flex flex-col gap-3.5"
    >
      <div className="relative aspect-[3/2] overflow-hidden rounded-xl border border-card-line">
        <Image src={item.cover} alt={`${item.title} landing page`} fill sizes="(min-width:1024px) 380px, 90vw" className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.04]" />
      </div>
      <div className="flex items-center justify-between px-1">
        <span className="text-lg font-semibold tracking-[-0.01em]">{item.title}</span>
        <ArrowUpRight size={18} className="text-faint transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink" />
      </div>
    </motion.a>
  );
}

export default function WorkGrid() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState<"all" | Category>("all");

  // Remember the filter in the URL hash so it can be shared (#apps, #ux, …).
  useEffect(() => {
    const h = window.location.hash.slice(1) as Category;
    if (filters.some((f) => f.id === h)) setActive(h);
  }, []);
  const pick = (id: "all" | Category) => {
    setActive(id);
    history.replaceState(null, "", id === "all" ? " " : `#${id}`);
  };
  const show = (c: Category) => active === "all" || active === c;

  return (
    <LayoutGroup>
      <div className="mx-auto max-w-[1200px] px-6">
        <div role="group" aria-label="Filter projects" className="flex flex-wrap gap-2.5">
          {filters.map((f) => {
            const on = active === f.id;
            return (
              <button
                key={f.id}
                type="button"
                aria-pressed={on}
                onClick={() => pick(f.id)}
                className={`relative flex min-h-11 items-center gap-2 rounded-full px-[18px] text-base font-semibold transition-colors ${on ? "text-bg" : "border border-[#3A3A44] text-ink hover:border-ink"}`}
              >
                {on && <motion.span layoutId="filter-pill" className="absolute inset-0 rounded-full bg-ink" transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 500, damping: 30 }} />}
                <span className="relative">{f.label}</span>
                <span className={`relative font-mono text-[11px] ${on ? "text-bg/60" : "text-faint"}`}>{f.count}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="mx-auto flex max-w-[1200px] flex-col gap-36 px-6 pb-10 pt-16">
        <AnimatePresence mode="popLayout">
          {show("apps") && (
            <motion.section key="apps" layout className="flex flex-col gap-10" exit={{ opacity: 0 }}>
              <SectionHead note="the main course" title="Fintech apps" count={apps.length} />
              <div className="grid gap-8 md:grid-cols-2">
                {apps.slice(0, 2).map((a, i) => <CaseCard key={a.slug} item={a} big i={i} />)}
              </div>
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {apps.slice(2).map((a, i) => <CaseCard key={a.slug} item={a} i={i + 2} />)}
              </div>
            </motion.section>
          )}
          {show("ux") && (
            <motion.section key="ux" layout className="flex flex-col gap-10" exit={{ opacity: 0 }}>
              <SectionHead note="research, personas, the whole process" title="UX case studies" count={uxCases.length} />
              <div className="grid gap-8 md:grid-cols-2">
                {uxCases.map((a, i) => <CaseCard key={a.slug} item={a} big i={i} />)}
              </div>
            </motion.section>
          )}
          {show("websites") && (
            <motion.section key="websites" layout className="flex flex-col gap-10" exit={{ opacity: 0 }}>
              <SectionHead note="the side quests" title="Websites & landing pages" count={websites.length} />
              <div className="grid gap-x-6 gap-y-9 sm:grid-cols-2 lg:grid-cols-4">
                {websites.map((w, i) => <SiteTile key={w.slug} item={w} i={i} />)}
                <a href={profile.links.behance} target="_blank" rel="noreferrer" className="flex aspect-[3/2] flex-col justify-between rounded-xl border-[1.5px] border-dashed border-[#3A3A44] p-5 transition-colors hover:border-ink">
                  <span className="font-mono text-[11px] tracking-[0.1em] text-faint">ARCHIVE</span>
                  <span className="font-hand text-[30px] leading-[1.05] text-note">+ more shots<br />on Behance ↗</span>
                </a>
                <Link href="/contact" className="group flex aspect-[3/2] flex-col justify-between rounded-xl bg-lime p-5 text-bg transition-transform hover:-rotate-1">
                  <span className="font-hand text-2xl">need one for your brand?</span>
                  <span className="text-[23px] font-extrabold leading-[1.05] tracking-[-0.02em]">Let&apos;s build your landing page →</span>
                </Link>
              </div>
            </motion.section>
          )}
          {show("branding") && (
            <motion.section key="branding" layout className="flex flex-col gap-10" exit={{ opacity: 0 }}>
              <SectionHead note="logos, colors, the whole vibe" title="Branding" count={branding.length} />
              {branding.map((b) => (
                <Link
                  key={b.slug}
                  href={`/work/${b.slug}`}
                  className="group relative flex flex-col gap-10 rounded-2xl border border-card-line bg-card p-3.5 transition-transform duration-300 hover:-translate-y-1.5 lg:flex-row lg:items-center lg:gap-12 lg:pr-12"
                >
                  <span aria-hidden="true" className="absolute left-8 top-0 h-1 w-16 rounded-full" style={{ background: b.accent }} />
                  <div className="relative aspect-video overflow-hidden rounded-[10px] lg:w-[520px] lg:shrink-0">
                    <Image src={b.cover} alt="NERO brand guidelines cover" fill sizes="(min-width:1024px) 520px, 90vw" className="object-cover" />
                  </div>
                  <div className="flex flex-col gap-3.5 px-1.5 pb-4 lg:pb-0">
                    <Sticker bg={b.accent} rotate={-2}>{b.tag}</Sticker>
                    <h3 className="text-[44px] font-extrabold leading-[0.95] tracking-[-0.03em]">{b.title}</h3>
                    <p className="text-base leading-[1.5] text-[#B4B4BE]">{b.line}</p>
                    <span className="flex size-12 items-center justify-center self-end rounded-full text-bg transition-transform group-hover:translate-x-1" style={{ background: b.accent }}>
                      <ArrowRight size={18} />
                    </span>
                  </div>
                </Link>
              ))}
            </motion.section>
          )}
        </AnimatePresence>
      </div>
    </LayoutGroup>
  );
}
