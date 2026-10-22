import Image from "next/image";
import Reveal from "../Reveal";

const skills = [
  { label: "Product Design", bg: "#C6F432", rot: -2 },
  { label: "FinTech & Web3", bg: "#A78BFA", rot: 1.5 },
  { label: "Design Systems", bg: "#5EEAD4", rot: -1 },
  { label: "Websites & Brands", bg: "#FF8A5B", rot: 2 },
];

function ChaiDoodle() {
  return (
    <svg viewBox="0 0 130 130" fill="none" className="h-[70%] w-[70%]" role="img" aria-label="A glass of chai">
      <path d="M48 30 C 42 22, 54 18, 48 8" stroke="#EDEDF0" strokeOpacity="0.75" strokeWidth="3" strokeLinecap="round" />
      <path d="M65 28 C 59 19, 71 15, 65 4" stroke="#EDEDF0" strokeOpacity="0.75" strokeWidth="3" strokeLinecap="round" />
      <path d="M82 30 C 76 22, 88 18, 82 8" stroke="#EDEDF0" strokeOpacity="0.75" strokeWidth="3" strokeLinecap="round" />
      <path d="M38.5 62 L91.5 62 L86.6 115 Q86 120 81 120 L49 120 Q44 120 43.4 115 Z" fill="#C9813F" />
      <path d="M39 62 L91 62" stroke="#E8B27A" strokeWidth="3" strokeLinecap="round" />
      <path d="M34 40 L96 40 L87 116 Q86.4 122 80.5 122 L49.5 122 Q43.6 122 43 116 Z" stroke="#EDEDF0" strokeWidth="3.5" strokeLinejoin="round" />
      <path d="M45 70 L49 110" stroke="#EDEDF0" strokeOpacity="0.5" strokeWidth="3" strokeLinecap="round" />
      <path d="M30 40 L100 40" stroke="#EDEDF0" strokeWidth="3.5" strokeLinecap="round" />
      <path d="M108 54 L110 60 L116 62 L110 64 L108 70 L106 64 L100 62 L106 60 Z" fill="#C6F432" />
    </svg>
  );
}

function Polaroid({ caption, rotate, children }: { caption: string; rotate: number; children: React.ReactNode }) {
  return (
    <figure
      className="w-[180px] shrink-0 bg-ink p-2.5 pb-8 shadow-[0_18px_36px_rgba(0,0,0,0.5)] transition-transform duration-300 hover:scale-105"
      style={{ rotate: `${rotate}deg` }}
    >
      <div className="relative flex aspect-square items-center justify-center overflow-hidden bg-[#1C1C22]">{children}</div>
      <figcaption className="mt-1.5 font-hand text-xl text-[#2A2A32]">{caption}</figcaption>
    </figure>
  );
}

export default function About() {
  return (
    <section id="about" className="mx-auto flex max-w-[1200px] flex-col items-center gap-11 px-6 py-24 text-center">
      <span className="self-start font-hand text-[26px] text-note" style={{ rotate: "-4deg" }}>
        about me!
      </span>
      <span className="border-[1.5px] border-ink px-3 py-1 text-xl font-semibold">what&apos;s up</span>

      <div className="flex w-full flex-wrap items-center justify-center gap-12">
        <Reveal y={-60} rotate={-20}>
          <Polaroid caption="2026" rotate={6}>
            <Image src="/images/about/photo.webp" alt="Portrait of Awais Raza" fill sizes="160px" className="object-cover" />
          </Polaroid>
        </Reveal>
        <p className="max-w-[640px] flex-1 basis-[420px] text-[clamp(28px,3.6vw,46px)] font-medium leading-[1.25] tracking-[-0.025em]">
          I&apos;m Awais, a product designer from Pakistan who turns <span className="text-violet">messy money flows</span> into products that feel obvious <span className="text-lime">✦</span>
        </p>
        <Reveal y={-60} rotate={20} delay={0.1}>
          <Polaroid caption="my fuel, always chai" rotate={-5}>
            <ChaiDoodle />
          </Polaroid>
        </Reveal>
      </div>

      <div className="flex max-w-[760px] flex-wrap items-center justify-center gap-3">
        {skills.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.06} y={20} rotate={s.rot * 4}>
            <span
              className="inline-block px-3.5 py-1.5 text-xl font-semibold text-bg transition-transform hover:-translate-y-1 hover:rotate-0"
              style={{ background: s.bg, rotate: `${s.rot}deg` }}
            >
              {s.label}
            </span>
          </Reveal>
        ))}
      </div>
      <span className="font-hand text-2xl text-muted" style={{ rotate: "2deg" }}>
        these are my love languages
      </span>
    </section>
  );
}
