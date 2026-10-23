import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { caseStudies, getCaseStudy, type Shot } from "@/lib/caseStudies";
import { imageSizes } from "@/lib/imageSizes";
import Reveal from "@/components/Reveal";
import { ArrowRight, Sticker, Tape } from "@/components/ui";
import CaseHero from "./CaseHero";

export const dynamicParams = false;

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const c = getCaseStudy(slug);
  return c ? { title: `${c.title} — Awais Raza`, description: c.summary } : {};
}

/** Section image: trims a built-in slide title off the top (`crop`) or shows only the top of very tall images (`maxH`). */
function ShotImage({ shot }: { shot: Shot }) {
  const [w, h] = imageSizes[shot.src] ?? [1600, 1200];
  let ratio = w / h;
  let position = "center";
  if (shot.crop) {
    ratio = w / (h * (1 - shot.crop));
    position = "bottom";
  } else if (shot.maxH) {
    const shown = Math.min((1200 * h) / w, shot.maxH);
    ratio = 1200 / shown;
    position = "top";
  }
  return (
    <div className="relative w-full overflow-hidden rounded-2xl border border-card-line bg-card" style={{ aspectRatio: ratio }}>
      <Image src={shot.src} alt={shot.alt} fill sizes="(min-width:1240px) 1200px, 100vw" className="object-cover" style={{ objectPosition: position }} />
    </div>
  );
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = getCaseStudy(slug);
  if (!c) notFound();
  const next = getCaseStudy(c.next)!;

  return (
    <article>
      <CaseHero c={c} />

      {/* Overview */}
      <section className="mx-auto max-w-[1200px] px-6 pt-20">
        <dl className="grid grid-cols-2 gap-x-6 md:grid-cols-3 lg:grid-cols-5">
          {c.overview.map(([k, v]) => (
            <div key={k} className="flex flex-col gap-2 border-t border-dashed border-line py-5 pr-4">
              <dt className="font-mono text-[11px] uppercase tracking-[0.1em] text-faint">{k}</dt>
              <dd className="text-[19px] font-semibold leading-snug">{v}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Challenge */}
      {c.problem && c.solution && (
        <section className="mx-auto flex max-w-[1200px] flex-col gap-10 px-6 pt-28">
          <div className="flex flex-col gap-2.5">
            <span className="font-hand text-[26px] text-muted">the why</span>
            <h2 className="text-[clamp(52px,7vw,96px)] font-extrabold uppercase leading-[0.95] tracking-[-0.045em]">The challenge</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            <Reveal y={40} rotate={-2} className="h-full">
              <div className="flex h-full flex-col gap-5 rounded-[20px] border border-card-line bg-card p-10">
                <Sticker bg="#FF8A5B" rotate={-3}>PROBLEM</Sticker>
                <h3 className="text-[34px] font-extrabold leading-[1.1] tracking-[-0.02em]">{c.problem[0]}</h3>
                <p className="text-lg leading-[1.6] text-[#B4B4BE]">{c.problem[1]}</p>
              </div>
            </Reveal>
            <Reveal y={40} rotate={2} delay={0.1} className="h-full">
              <div className="flex h-full flex-col gap-5 rounded-[20px] p-10 text-bg" style={{ background: c.accent }}>
                <Sticker bg="#0C0C0E" ink="#EDEDF0" rotate={3}>SOLUTION</Sticker>
                <h3 className="text-[34px] font-extrabold leading-[1.1] tracking-[-0.02em]">{c.solution[0]}</h3>
                <p className="text-lg leading-[1.6]">{c.solution[1]}</p>
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {/* Sections */}
      {c.sections.map((s, i) => (
        <section key={s.name} className="mx-auto flex max-w-[1200px] flex-col gap-8 px-6 pt-32">
          <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-5">
            <div className="flex flex-col gap-2.5">
              <span className="font-hand text-[26px] text-muted">
                {String(i + 1).padStart(2, "0")} — {s.note}
              </span>
              <h2 className="text-[clamp(48px,7vw,96px)] font-extrabold uppercase leading-[0.95] tracking-[-0.045em]">{s.title}</h2>
            </div>
            {s.body && <p className="max-w-[440px] text-[19px] leading-[1.6] text-[#B4B4BE]">{s.body}</p>}
          </div>
          {s.shots.map((shot) => (
            <Reveal key={shot.src} y={60} scale={0.97}>
              <ShotImage shot={shot} />
            </Reveal>
          ))}
        </section>
      ))}

      {/* Next project */}
      <section className="mx-auto flex max-w-[1200px] flex-col gap-5 px-6 pb-36 pt-40">
        <span className="font-hand text-[26px] text-muted">
          that&apos;s a wrap on {c.title}. {c.wrapNote ?? "up next"} ↓
        </span>
        <Link
          href={`/work/${next.slug}`}
          className="group flex flex-col gap-10 rounded-3xl px-8 py-10 text-bg transition-transform duration-300 hover:-translate-y-1.5 md:flex-row md:items-center md:px-14 md:py-12"
          style={{ background: next.accent }}
        >
          <div className="flex flex-1 flex-col gap-4">
            <span className="font-mono text-xs uppercase tracking-[0.08em] opacity-75">{c.nextLabel ?? "Next project"}</span>
            <span className="text-[clamp(52px,7vw,88px)] font-extrabold leading-[0.95] tracking-[-0.04em]">{next.title}</span>
            <span className="text-[22px] font-medium">{next.short}</span>
            <span className="mt-2 flex h-12 w-fit items-center gap-2.5 rounded-full bg-bg px-6 text-base font-semibold text-ink">
              {next.kind === "ux" ? "Next case study" : "Open project"} <ArrowRight className="transition-transform group-hover:translate-x-1" />
            </span>
          </div>
          <div className="relative aspect-[16/10] w-full rotate-2 border-[6px] border-ink shadow-[0_18px_36px_rgba(0,0,0,0.3)] transition-transform duration-500 group-hover:rotate-0 md:w-[480px] md:shrink-0">
            <Image src={next.cover} alt={`${next.title} cover`} fill sizes="480px" className="object-cover object-top" />
            <Tape className="-left-5 -top-2" rotate={-18} opacity={0.55} />
          </div>
        </Link>
      </section>
    </article>
  );
}
