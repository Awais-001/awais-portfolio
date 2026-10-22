import type { Metadata } from "next";
import { site } from "@/lib/site";
import { BehanceIcon, DownloadIcon, LinkedInIcon } from "@/components/ui";
import WorkOrderForm from "./WorkOrderForm";

export const metadata: Metadata = { title: "Contact — Awais Raza" };

export default function ContactPage() {
  return (
    <section className="mx-auto flex max-w-[1200px] flex-wrap items-start gap-x-16 gap-y-20 px-6 pb-32 pt-16 md:pt-24 lg:flex-nowrap">
      <div className="flex min-w-0 flex-1 flex-col gap-7">
        <span className="font-hand text-[28px] text-note">so, you scrolled all the way here</span>
        <h1 className="text-[clamp(52px,6.4vw,88px)] font-extrabold uppercase leading-[0.9] tracking-[-0.05em]">
          Let&apos;s build
          <br />
          something
        </h1>
        <p className="max-w-[500px] text-[22px] font-medium leading-[1.45] text-soft">
          Tell me a little about what you need. A role, a product, a messy flow that needs fixing. I&apos;ll get back to you fast.
        </p>
        <span className="flex w-fit items-center gap-2.5 rounded-full border border-card-line bg-card py-2 pl-3 pr-3.5 font-mono text-xs tracking-[0.04em]">
          <span className="relative flex size-2.5">
            <span className="absolute inset-0 animate-ping rounded-full bg-lime opacity-60 motion-reduce:animate-none" />
            <span className="relative size-2.5 rounded-full bg-lime" />
          </span>
          Available for new projects
        </span>

        <dl className="flex flex-col">
          {[
            ["Email", <a key="e" href={`mailto:${site.email}`} className="break-all hover:text-lime">{site.email}</a>],
            ["Based in", `${site.location} · ${site.timezone}`],
            ["Reply time", site.replyTime],
          ].map(([k, v]) => (
            <div key={String(k)} className="flex flex-wrap items-center justify-between gap-2 border-b border-dashed border-line py-[18px]">
              <dt className="font-mono text-[11px] uppercase tracking-[0.1em] text-faint">{k}</dt>
              <dd className="text-lg font-semibold">{v}</dd>
            </div>
          ))}
        </dl>

        <div className="flex flex-wrap gap-2.5">
          <a href={site.links.linkedin} target="_blank" rel="noreferrer" className="flex min-h-11 items-center gap-2.5 rounded-full border border-[#3A3A44] px-[18px] font-semibold transition-colors hover:border-ink">
            <LinkedInIcon /> LinkedIn
          </a>
          <a href={site.links.behance} target="_blank" rel="noreferrer" className="flex min-h-11 items-center gap-2.5 rounded-full border border-[#3A3A44] px-[18px] font-semibold transition-colors hover:border-ink">
            <BehanceIcon /> Behance
          </a>
          <a href={site.links.resume} className="flex min-h-11 items-center gap-2.5 rounded-full bg-ink px-[18px] font-semibold text-bg transition-transform hover:-translate-y-0.5">
            <DownloadIcon size={16} /> Resume
          </a>
        </div>
        <span className="font-hand text-[26px] text-muted" style={{ rotate: "-3deg" }}>
          (or just say salaam)
        </span>
      </div>

      <div className="flex w-full justify-center lg:w-auto lg:shrink-0 lg:pt-8">
        <WorkOrderForm />
      </div>
    </section>
  );
}
