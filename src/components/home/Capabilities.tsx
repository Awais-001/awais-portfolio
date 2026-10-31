import Link from "next/link";
import Reveal from "../Reveal";
import { SectionHeader, Sticker, Tape } from "../ui";

const rows = [
  ["Product Design", "End-to-end, from research and journey maps to wireframes, prototypes and dev handoff."],
  ["AI-first Design", "Claude + Figma MCP for first-pass screens and design-system checks, Figma Make for clickable prototypes. Concept to handoff 30% faster."],
  ["Mobile & Web Apps", "iOS, Android and web UI for SaaS and fintech, with every state and edge case designed."],
  ["UX Research", "Interviews, usability tests and surveys that find where people get stuck. Took task completion from 65% to 88%."],
  ["Design Systems", "Multi-brand component libraries with variants and tokens that keep growing products consistent."],
  ["Websites & Landing Pages", "Marketing sites and landing pages that make a product look as good as it works."],
];

// Same columns for the header row and every row (desktop).
const cols = "md:grid-cols-[minmax(0,1fr)_96px_minmax(0,1.35fr)]";

export default function Capabilities() {
  return (
    <section id="capabilities" className="mx-auto flex max-w-[1200px] flex-col gap-12 px-6 py-24">
      <SectionHeader
        note="what I can do for you"
        title="Capabilities"
        right={
          <span className="font-hand text-[26px] font-bold text-lime" style={{ rotate: "3deg" }}>
            6 things I&apos;m good at ✦
          </span>
        }
      />

      <Reveal y={30}>
        <div className="relative rounded-2xl border border-[#34343A] bg-[#1E1E22] px-6 pb-8 pt-11 shadow-[0_8px_18px_rgba(0,0,0,0.16)] md:px-12 md:pb-9">
          <Sticker className="absolute -top-3.5 left-7" rotate={-2} wiggle={false}>
            ✦ CAPABILITIES · 2026
          </Sticker>
          <Tape className="-right-7 top-2" rotate={22} opacity={0.32} />

          <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-2 pb-8">
            <h3 className="text-[clamp(24px,2.6vw,30px)] font-semibold tracking-[-0.02em]">Awais Raza — Product Designer</h3>
            <span className="text-[17px] font-medium text-[#A9A9B3]">2+ years · 20+ projects · Fintech, SaaS &amp; AI</span>
          </div>

          <div className={`hidden gap-x-8 border-b-[1.5px] border-[#3A3A44] pb-4 font-mono text-[11px] uppercase tracking-[0.1em] text-[#7A7A86] md:grid ${cols}`}>
            <span>Discipline</span>
            <span>No.</span>
            <span>What you get</span>
          </div>

          <ol>
            {rows.map(([title, desc], i) => (
              <li key={title} className={`group relative grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-8 gap-y-2 py-6 md:py-[26px] ${cols}`}>
                {/* faint highlight on hover, wider than the row so columns stay aligned */}
                <span aria-hidden="true" className="pointer-events-none absolute inset-y-0 -inset-x-4 rounded-[14px] bg-white/[0.04] opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
                <h4 className="relative flex items-center text-[clamp(21px,2.2vw,26px)] font-semibold tracking-[-0.015em] transition-transform duration-200 group-hover:translate-x-1">
                  <span aria-hidden="true" className="mr-0 inline-block size-3 w-0 scale-0 rounded-full bg-lime transition-all duration-200 group-hover:mr-4 group-hover:w-3 group-hover:scale-100" />
                  {title}
                </h4>
                <span className="relative font-mono text-sm font-medium tracking-[0.04em] text-[#5A5A66] transition-colors group-hover:text-lime">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="relative col-span-2 text-base leading-[1.5] text-[#A9A9B3] md:col-span-1">{desc}</p>
              </li>
            ))}
          </ol>

          <div className="flex flex-wrap items-center justify-between gap-4 border-t-[1.5px] border-[#3A3A44] pt-7">
            <span className="flex w-fit items-center gap-2.5 rounded-full border border-card-line bg-bg py-2 pl-3 pr-3.5 font-mono text-xs tracking-[0.04em]">
              <span className="relative flex size-2.5">
                <span className="absolute inset-0 animate-ping rounded-full bg-lime opacity-60 motion-reduce:animate-none" />
                <span className="relative size-2.5 rounded-full bg-lime" />
              </span>
              Available for new projects
            </span>
            <Link href="/contact" className="font-hand text-[26px] text-[#8A8A96] transition-colors hover:text-lime" style={{ rotate: "-2deg" }}>
              pick one, or all of them →
            </Link>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
