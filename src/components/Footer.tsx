export default function Footer() {
  return (
    <footer className="border-t border-[#1F1F25] bg-[#151519]">
      <div className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-between gap-3 px-6 py-5 font-mono text-[11px] tracking-[0.06em] text-muted">
        <span>© {new Date().getFullYear()} AWAIS RAZA</span>
        <span>DESIGNED IN PAKISTAN, FUELLED BY CHAI</span>
        <a href="#top" className="flex min-h-11 items-center text-soft hover:text-ink">
          BACK TO TOP ↑
        </a>
      </div>
    </footer>
  );
}
