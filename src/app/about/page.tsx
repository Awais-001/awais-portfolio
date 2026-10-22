import type { Metadata } from "next";
import Image from "next/image";
import LetsTalk from "@/components/LetsTalk";
import Reveal from "@/components/Reveal";
import { SectionHeader, Sticker, Tape } from "@/components/ui";
import Hobbies from "./Hobbies";

export const metadata: Metadata = { title: "About — Awais Raza" };

const story = [
  { year: "2024", place: "UET Taxila", role: "BS Computer Science", text: "Engineering roots. I learned how things get built, so now I design with developers, not just for them.", color: "#A78BFA" },
  { year: "2024", place: "Idenbrid Inc", role: "UX/UI Designer", text: "First design job: wireframes, prototypes and responsive UI for web and mobile.", color: "#5EEAD4" },
  { year: "2024 — 2025", place: "Clustox", role: "UX/UI Designer", text: "Got obsessed with usability testing. Core task completion went from 65% to 88%.", color: "#FF8A5B" },
  { year: "2025 — NOW", place: "Quecko", role: "Product Designer", text: "End-to-end SaaS and FinTech products, plus a 120+ component multi-brand design system.", color: "#C6F432" },
];

const process = [
  ["01", "Research", "User interviews, surveys and usability tests to find where people actually get stuck."],
  ["02", "Map", "Personas, journey maps and user flows so the whole team sees the same problem."],
  ["03", "Wireframe", "Low-fidelity structure first. Cheap to change, fast to test."],
  ["04", "Prototype", "Interactive, high-fidelity flows tested with real users before anything ships."],
  ["05", "System", "Components, variants and design tokens so every screen stays consistent."],
  ["06", "Handoff", "Clean specs and auto layout, plus sitting with devs in sprint reviews."],
];

const tools: { group: string; color: string; items: string[] }[] = [
  { group: "Design", color: "#EDEDF0", items: ["Figma", "Figma Make", "Figma AI", "Adobe XD"] },
  { group: "AI", color: "#A78BFA", items: ["Claude", "ChatGPT", "Lovable", "Google Stitch"] },
  { group: "Front-end", color: "#5EEAD4", items: ["HTML", "CSS", "JavaScript", "Tailwind CSS", "Bootstrap"] },
  { group: "Research", color: "#FF8A5B", items: ["User interviews", "Usability testing", "Surveys", "A/B testing"] },
];

export default function AboutPage() {
  return (
    <>
      {/* HERO */}
      <section className="mx-auto flex max-w-[1200px] flex-wrap items-center gap-16 px-6 pb-10 pt-16 md:pt-24">
        <div className="flex min-w-0 flex-[999_1_520px] flex-col gap-6">
          <span className="font-hand text-[30px] text-note">hi again!</span>
          <h1 className="text-[clamp(64px,11vw,150px)] font-extrabold uppercase leading-[0.88] tracking-[-0.055em]">About me</h1>
          <p className="max-w-[620px] text-[clamp(22px,2.4vw,28px)] font-medium leading-[1.38] tracking-[-0.01em] text-soft">
            I&apos;m Awais, a product designer from Pakistan. I design fintech and SaaS products that feel calm and obvious, even when the logic behind them isn&apos;t.
          </p>
          <div className="flex flex-wrap gap-3">
            <Sticker rotate={-3}>2+ YEARS</Sticker>
            <Sticker bg="#A78BFA" rotate={2}>FINTECH · SAAS · AI</Sticker>
            <Sticker bg="#5EEAD4" rotate={-2}>PAKISTAN</Sticker>
          </div>
        </div>
        <Reveal y={-80} rotate={-20} className="mx-auto flex-[1_1_300px]">
          <figure className="relative mx-auto w-full max-w-[372px] rotate-[4deg] bg-ink p-4 pb-11 shadow-[0_24px_48px_rgba(0,0,0,0.55)] transition-transform duration-300 hover:rotate-0">
            <Tape className="left-1/2 -top-3.5 -translate-x-1/2" rotate={-4} opacity={0.5} />
            <div className="relative aspect-[340/400] overflow-hidden">
              <Image src="/images/about/photo.webp" alt="Portrait of Awais Raza" fill priority sizes="340px" className="object-cover" />
            </div>
            <figcaption className="mt-2.5 font-hand text-[28px] text-[#2A2A32]">that&apos;s me, 2026</figcaption>
          </figure>
        </Reveal>
      </section>

      {/* STORY */}
      <section className="mx-auto flex max-w-[1200px] flex-col gap-12 px-6 py-24">
        <SectionHeader note="how I got here" title="My story" />
        <ol className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {story.map((s, i) => (
            <li key={s.place}>
              <Reveal delay={i * 0.08} y={30} className="relative flex flex-col gap-3.5 border-t-2 border-dashed border-line pt-7">
                <span aria-hidden="true" className="absolute -top-[9px] left-0 size-4 rounded-full border-4 border-bg" style={{ background: s.color }} />
                {i === story.length - 1 && (
                  <span className="absolute -top-12 left-24 font-hand text-2xl text-lime" style={{ rotate: "-4deg" }}>
                    ← you are here
                  </span>
                )}
                <span className="font-mono text-xs font-medium tracking-[0.08em]" style={{ color: s.color }}>{s.year}</span>
                <h3 className="text-[30px] font-extrabold tracking-[-0.02em]">{s.place}</h3>
                <span className="text-base font-medium text-soft">{s.role}</span>
                <p className="text-base leading-[1.55] text-muted">{s.text}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </section>

      {/* HOW I WORK */}
      <section className="mx-auto flex max-w-[1200px] flex-col gap-12 px-6 py-24">
        <SectionHeader
          note="my process, roughly"
          title="How I work"
          right={<span className="font-hand text-[26px] text-lime" style={{ rotate: "-3deg" }}>with AI speeding up the boring bits ✦</span>}
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {process.map(([n, t, d], i) => (
            <Reveal key={n} delay={(i % 3) * 0.07} y={40} rotate={i % 2 ? 3 : -3}>
              <div className="flex h-full flex-col gap-3.5 rounded-[20px] border border-card-line bg-card p-8 transition-transform duration-300 hover:-translate-y-1.5 hover:-rotate-1">
                <span className="text-[56px] font-extrabold leading-none tracking-[-0.05em] text-lime">{n}</span>
                <h3 className="text-[28px] font-extrabold tracking-[-0.02em]">{t}</h3>
                <p className="text-base leading-[1.55] text-muted">{d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* TOOLBOX */}
      <section className="mx-auto flex max-w-[1200px] flex-col gap-11 px-6 py-24">
        <SectionHeader note="what lives on my dock" title="Toolbox" />
        <div className="flex flex-col">
          {tools.map((g) => (
            <div key={g.group} className="flex flex-wrap items-center gap-x-8 gap-y-4 border-b border-dashed border-line py-6">
              <span className="w-40 font-mono text-xs uppercase tracking-[0.1em] text-faint">{g.group}</span>
              <ul className="flex flex-wrap gap-2.5">
                {g.items.map((t, i) => (
                  <li key={t}>
                    <Reveal delay={i * 0.04} y={14} scale={0.8}>
                      <span className="inline-block rounded-full px-4 py-2 text-[17px] font-semibold text-bg transition-transform hover:-translate-y-1 hover:-rotate-3" style={{ background: g.color }}>
                        {t}
                      </span>
                    </Reveal>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <Hobbies />
      <LetsTalk />
    </>
  );
}
