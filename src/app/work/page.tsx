import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import LetsTalk from "@/components/LetsTalk";
import { allWorkCount } from "@/lib/work";
import WorkGrid from "./WorkGrid";

export const metadata: Metadata = { title: "Work — Awais Raza" };

export default function WorkPage() {
  return (
    <>
      <PageHero note="everything I've made, so far" title="Work" sticker={`${allWorkCount} PROJECTS`}>
        <p className="max-w-[700px] text-[26px] font-medium leading-[1.35] tracking-[-0.01em] text-soft">
          Fintech apps, UX case studies, websites and a brand or two. Pick a shelf and dig in.
        </p>
      </PageHero>
      <WorkGrid />
      <LetsTalk />
    </>
  );
}
