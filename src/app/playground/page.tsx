import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import LetsTalk from "@/components/LetsTalk";
import ResearchWall from "./ResearchWall";

export const metadata: Metadata = { title: "Playground — Awais Raza" };

export default function PlaygroundPage() {
  return (
    <>
      <PageHero note="where I mess around" title="Playground" sticker="NO RULES HERE" stickerBg="#FF8A5B">
        <p className="max-w-[760px] text-[26px] font-medium leading-[1.35] tracking-[-0.01em] text-soft">
          A peek at my research wall: real questions, quotes and decisions from four UX projects, before they turned into screens.
        </p>
      </PageHero>
      <ResearchWall />
      <LetsTalk />
    </>
  );
}
