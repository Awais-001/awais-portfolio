import Hero from "@/components/home/Hero";
import About from "@/components/home/About";
import SelectedWork from "@/components/home/SelectedWork";
import Numbers from "@/components/home/Numbers";
import Experience from "@/components/home/Experience";
import Capabilities from "@/components/home/Capabilities";
import LetsTalk from "@/components/LetsTalk";

export default function Home() {
  return (
    <>
      <Hero />
      <div aria-hidden="true" className="mx-auto max-w-[1200px] px-6">
        <div className="border-t border-dashed border-line" />
      </div>
      <About />
      <Capabilities />
      <SelectedWork />
      <Numbers />
      <Experience />
      <LetsTalk />
    </>
  );
}
