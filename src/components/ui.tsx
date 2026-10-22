import type { CSSProperties, ReactNode } from "react";

/** Small mono label on a colored strip, slightly rotated. Wiggles when its parent `.group` is hovered. */
export function Sticker({
  children,
  bg = "#C6F432",
  ink = "#0C0C0E",
  rotate = 0,
  className = "",
  wiggle = true,
}: {
  children: ReactNode;
  bg?: string;
  ink?: string;
  rotate?: number;
  className?: string;
  wiggle?: boolean;
}) {
  return (
    <span
      className={`inline-block whitespace-nowrap px-2.5 py-1.5 font-mono text-[11px] tracking-[0.08em] ${wiggle ? "sticker-wiggle" : ""} ${className}`}
      style={{ background: bg, color: ink, rotate: `${rotate}deg`, ["--r" as string]: `${rotate}deg` } as CSSProperties}
    >
      {children}
    </span>
  );
}

/** Translucent tape strip. Position it absolutely from the parent. */
export function Tape({ className = "", opacity = 0.55, rotate = 0 }: { className?: string; opacity?: number; rotate?: number }) {
  return (
    <span
      aria-hidden="true"
      className={`pointer-events-none absolute z-10 block h-6 w-[88px] ${className}`}
      style={{ background: `rgba(237,237,240,${opacity})`, rotate: `${rotate}deg` }}
    />
  );
}

export function SectionHeader({ note, title, right }: { note: string; title: string; right?: ReactNode }) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div className="flex flex-col gap-2.5">
        <span className="font-hand text-[26px] text-muted">{note}</span>
        <h2 className="text-[clamp(52px,7vw,96px)] font-extrabold uppercase leading-[0.95] tracking-[-0.045em]">{title}</h2>
      </div>
      {right}
    </div>
  );
}

type IconProps = { className?: string; size?: number };

export const ArrowRight = ({ className = "", size = 16 }: IconProps) => (
  <svg aria-hidden="true" className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

export const ArrowUpRight = ({ className = "", size = 16 }: IconProps) => (
  <svg aria-hidden="true" className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
    <path d="M7 17L17 7M9 7h8v8" />
  </svg>
);

export const MailIcon = ({ className = "", size = 14 }: IconProps) => (
  <svg aria-hidden="true" className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="M3 7l9 6 9-6" />
  </svg>
);

export const DownloadIcon = ({ className = "", size = 14 }: IconProps) => (
  <svg aria-hidden="true" className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 4v12M6 11l6 6 6-6M5 20h14" />
  </svg>
);

export const LinkedInIcon = ({ className = "", size = 18 }: IconProps) => (
  <svg aria-hidden="true" className={className} width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

export const BehanceIcon = ({ className = "", size = 20 }: IconProps) => (
  <svg aria-hidden="true" className={className} width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M16.969 16.927a2.561 2.561 0 0 0 1.901.677 2.501 2.501 0 0 0 1.531-.475c.362-.235.636-.584.779-.99h2.585a5.091 5.091 0 0 1-1.9 2.896 5.292 5.292 0 0 1-3.091.88 5.839 5.839 0 0 1-2.284-.433 4.871 4.871 0 0 1-1.723-1.211 5.657 5.657 0 0 1-1.08-1.874 7.057 7.057 0 0 1-.383-2.393c-.005-.8.129-1.595.396-2.349a5.313 5.313 0 0 1 5.088-3.604 4.87 4.87 0 0 1 2.376.563c.661.362 1.231.87 1.668 1.485a6.2 6.2 0 0 1 .943 2.133c.194.821.263 1.666.205 2.508h-7.699c-.063.79.184 1.574.688 2.187ZM6.947 4.084a8.065 8.065 0 0 1 1.928.198 4.29 4.29 0 0 1 1.49.638c.418.303.748.711.958 1.182.241.579.357 1.203.341 1.83a3.506 3.506 0 0 1-.506 1.961 3.726 3.726 0 0 1-1.503 1.287 3.588 3.588 0 0 1 2.027 1.437c.464.747.697 1.615.67 2.494a4.593 4.593 0 0 1-.423 2.032 3.945 3.945 0 0 1-1.163 1.413 5.114 5.114 0 0 1-1.683.807 7.135 7.135 0 0 1-1.928.259H0V4.084h6.947Zm-.235 12.9c.308.004.616-.029.916-.099a2.18 2.18 0 0 0 .766-.332c.228-.158.411-.371.534-.619.142-.317.208-.663.191-1.009a2.08 2.08 0 0 0-.642-1.715 2.618 2.618 0 0 0-1.696-.505h-3.54v4.279h3.471Zm13.635-5.967a2.13 2.13 0 0 0-1.654-.619 2.336 2.336 0 0 0-1.163.259 2.474 2.474 0 0 0-.738.62 2.359 2.359 0 0 0-.396.792c-.074.239-.12.485-.137.734h4.769a3.239 3.239 0 0 0-.679-1.785l-.002-.001Zm-13.813-.648a2.254 2.254 0 0 0 1.423-.433c.399-.355.607-.88.56-1.413a1.916 1.916 0 0 0-.178-.891 1.298 1.298 0 0 0-.495-.533 1.851 1.851 0 0 0-.711-.267 3.966 3.966 0 0 0-.835-.069H3.241v3.6h3.293v.006ZM15.5 5.152h5.962v1.453H15.5V5.152Z" />
  </svg>
);
