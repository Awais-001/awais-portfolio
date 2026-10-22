import { site } from "@/lib/site";
import Reveal from "../Reveal";
import { DownloadIcon, SectionHeader, Sticker } from "../ui";

const jobs = [
  {
    date: "OCT 2025 — NOW",
    company: "Quecko",
    role: "Product Designer",
    city: "Islamabad",
    text: "End-to-end B2B/B2C SaaS & FinTech products, from research to handoff. Built and run a 120+ component multi-brand design system.",
    sticker: { text: "CURRENT", bg: "#C6F432", rot: 3 },
  },
  {
    date: "OCT 2024 — MAY 2025",
    company: "Clustox",
    role: "UX/UI Designer",
    city: "Lahore",
    text: "Ran user interviews and usability tests that lifted core task completion from 65% to 88%, and cut front-end revisions by 20%.",
  },
  {
    date: "JUN — AUG 2024",
    company: "Idenbrid Inc",
    role: "UX/UI Designer",
    city: "Lahore",
    text: "Wireframes, prototypes and responsive UI for web and mobile, working alongside senior designers.",
    note: "where it all started ✦",
  },
  {
    date: "GRADUATED 2024",
    company: "UET Taxila",
    role: "BS Computer Science",
    city: "Taxila",
    text: "Engineering roots: why I design with developers, not just for them.",
    sticker: { text: "EDUCATION", bg: "#A78BFA", rot: -3 },
  },
];

export default function Experience() {
  return (
    <section id="resume" className="mx-auto flex max-w-[1200px] flex-col gap-12 px-6 py-24">
      <SectionHeader
        note="where I've been"
        title="Experience"
        right={
          <a href={site.links.resume} className="flex h-11 items-center gap-2 rounded-md border border-[#3A3A44] px-4 font-mono text-xs tracking-[0.06em] transition-colors hover:border-ink">
            <DownloadIcon /> DOWNLOAD RESUME
          </a>
        }
      />
      <ol className="flex flex-col border-t border-dashed border-line">
        {jobs.map((j, i) => (
          <li key={j.company} className="group border-b border-dashed border-line">
            <Reveal y={24} delay={i * 0.05} className="grid gap-x-10 gap-y-3 py-8 md:grid-cols-[180px_minmax(0,520px)_1fr_auto] md:items-start">
              <span className="pt-2 font-mono text-xs tracking-[0.06em] text-muted">{j.date}</span>
              <div className="flex flex-col gap-2.5">
                <h3 className="text-[34px] font-extrabold tracking-[-0.02em]">{j.company}</h3>
                <p className="text-[17px] leading-[1.55] text-muted">{j.text}</p>
              </div>
              <div className="flex flex-col gap-1.5 pt-2">
                <span className="text-lg font-medium">{j.role}</span>
                <span className="font-mono text-xs tracking-[0.06em] text-faint">{j.city}</span>
              </div>
              <div className="pt-2">
                {j.sticker && (
                  <Sticker bg={j.sticker.bg} rotate={j.sticker.rot}>
                    {j.sticker.text}
                  </Sticker>
                )}
                {j.note && (
                  <span className="inline-block font-hand text-2xl text-note" style={{ rotate: "-4deg" }}>
                    {j.note}
                  </span>
                )}
              </div>
            </Reveal>
          </li>
        ))}
      </ol>
    </section>
  );
}
