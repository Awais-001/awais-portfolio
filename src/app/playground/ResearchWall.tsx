"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";

type Note = { text: string; project: string; votes?: string[] };
type Cluster = { name: string; color: string; x: number; y: number; w: number; cols: number; notes: Note[]; noteW?: number; noteH?: number };

const clusters: Cluster[] = [
  {
    name: "Interview questions", color: "#FFE58A", x: 40, y: 70, w: 540, cols: 3,
    notes: [
      { text: "When was the last time you tipped someone?", project: "TIPBOX" },
      { text: "Would you trust an app to send your tip to the right person?", project: "TIPBOX" },
      { text: "Ever wanted to tip but had no cash? What did you do?", project: "TIPBOX" },
      { text: "Ever felt overwhelmed by too many phone options?", project: "PRICE92" },
      { text: "Do you trust online reviews? Why or why not?", project: "PRICE92" },
      { text: "What would make choosing a phone easier?", project: "PRICE92" },
    ],
  },
  {
    name: "What users told us", color: "#FFB4C8", x: 620, y: 70, w: 540, cols: 3,
    notes: [
      { text: "“I wish I had some cash. It should be as easy as scanning and done.”", project: "TIPBOX · SARA" },
      { text: "“Cash tips are dropping. Will this app really help me?”", project: "TIPBOX · ALI" },
      { text: "“Can I really trust these online reviews?”", project: "PRICE92" },
      { text: "“I spend too much time managing appointments.”", project: "APPOINTICK" },
      { text: "“We can't afford to lose revenue from missed appointments.”", project: "APPOINTICK" },
      { text: "“I need a system to manage my properties and rent collection.”", project: "LANDLORD" },
    ],
  },
  {
    name: "Pain points", color: "#FFB98A", x: 40, y: 570, w: 540, cols: 3,
    notes: [
      { text: "No cash on hand when they want to tip", project: "TIPBOX" },
      { text: "Won't download an app for a one-time tip", project: "TIPBOX" },
      { text: "Unsure the staff actually gets the tip", project: "TIPBOX" },
      { text: "Too many specs, scared of the wrong choice", project: "PRICE92" },
      { text: "Revenue lost to last-minute no-shows", project: "APPOINTICK" },
      { text: "Manual rent collection, no way to track collectors", project: "LANDLORD" },
    ],
  },
  {
    name: "How might we...", color: "#A9D4FF", x: 620, y: 570, w: 540, cols: 3,
    notes: [
      { text: "HMW make tipping as easy as scanning a QR code?", project: "TIPBOX", votes: ["#4C8DFF", "#FF5F57", "#4C8DFF"] },
      { text: "HMW prove the tip reaches the right person?", project: "TIPBOX", votes: ["#4C8DFF", "#FF5F57"] },
      { text: "HMW make phone specs feel simple?", project: "PRICE92" },
      { text: "HMW make prices and reviews feel trustworthy?", project: "PRICE92" },
      { text: "HMW cut no-shows without annoying clients?", project: "APPOINTICK", votes: ["#4C8DFF"] },
      { text: "HMW give owners one place for every property?", project: "LANDLORD" },
    ],
  },
  {
    name: "Decisions", color: "#C6F432", x: 40, y: 1070, w: 1120, cols: 4, noteW: 250, noteH: 160,
    notes: [
      { text: "App-free QR tipping: scan, pick the staff member, done", project: "TIPBOX", votes: ["#FF5F57", "#4C8DFF", "#4C8DFF"] },
      { text: "Credibility indicators on prices + real user reviews", project: "PRICE92" },
      { text: "Clear availability + instant booking confirmation", project: "APPOINTICK" },
      { text: "Role-based app for owners, managers and collectors", project: "LANDLORD" },
    ],
  },
];

const W = 1200;
const H = 1380;
// Stable pseudo-random tilts so server and client render the same thing.
const tilt = (a: number, b: number) => (((a * 37 + b * 61) % 7) - 3) * 0.9;

function Pointer({ color }: { color: string }) {
  return (
    <svg width="22" height="24" viewBox="0 0 22 24" fill="none" aria-hidden="true">
      <path d="M2 2 L19 12 L11 13.5 L7 21 Z" fill={color} stroke="#FFFFFF" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  );
}

export default function ResearchWall() {
  const reduce = useReducedMotion();
  const scroller = useRef<HTMLDivElement>(null);
  const board = useRef<HTMLDivElement>(null);
  const [fine, setFine] = useState(false);
  const [panning, setPanning] = useState(false);
  const [zoom, setZoom] = useState(1);
  const pan = useRef<{ x: number; y: number; l: number; t: number } | null>(null);

  useEffect(() => setFine(window.matchMedia("(pointer: fine)").matches), []);

  // Drag empty canvas to pan (mouse). Touch and trackpads scroll natively.
  const onDown = (e: React.PointerEvent) => {
    if (!fine || (e.target as Element).closest("[data-note]")) return;
    const el = scroller.current!;
    pan.current = { x: e.clientX, y: e.clientY, l: el.scrollLeft, t: el.scrollTop };
    setPanning(true);
    (e.currentTarget as Element).setPointerCapture(e.pointerId);
  };
  const onMove = (e: React.PointerEvent) => {
    if (!pan.current) return;
    const el = scroller.current!;
    el.scrollLeft = pan.current.l - (e.clientX - pan.current.x);
    el.scrollTop = pan.current.t - (e.clientY - pan.current.y);
  };
  const onUp = () => {
    pan.current = null;
    setPanning(false);
  };

  return (
    <section className="mx-auto max-w-[1200px] px-6 pb-10">
      <div className="overflow-hidden rounded-[18px] border border-card-line bg-[#18181D] shadow-[0_30px_60px_rgba(0,0,0,0.5)]">
        {/* Top bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-card-line px-5 py-3.5 text-[13px]">
          <div className="flex items-center gap-3.5">
            <span aria-hidden="true" className="flex gap-2">
              <span className="size-3 rounded-full bg-[#FF5F57]" />
              <span className="size-3 rounded-full bg-[#FEBC2E]" />
              <span className="size-3 rounded-full bg-[#28C840]" />
            </span>
            <span className="hidden text-faint sm:inline">Drafts /</span>
            <span className="font-semibold">Awais&apos;s Playground</span>
          </div>
          <div className="flex items-center gap-3">
            <span aria-hidden="true" className="flex size-7 items-center justify-center rounded-full bg-lime text-xs font-semibold text-bg">A</span>
            <span aria-hidden="true" className="flex size-7 items-center justify-center rounded-full bg-figma text-xs font-semibold text-white">Y</span>
            <span className="hidden rounded-lg bg-figma px-3.5 py-1.5 text-xs font-semibold text-white sm:inline">Share</span>
            <div className="flex items-center gap-1 text-xs text-faint">
              <button type="button" aria-label="Zoom out" onClick={() => setZoom((z) => Math.max(0.5, +(z - 0.1).toFixed(1)))} className="flex size-8 items-center justify-center rounded-md hover:bg-[#2A2A32] hover:text-ink">−</button>
              <span className="w-10 text-center tabular-nums">{Math.round(zoom * 100)}%</span>
              <button type="button" aria-label="Zoom in" onClick={() => setZoom((z) => Math.min(1.4, +(z + 0.1).toFixed(1)))} className="flex size-8 items-center justify-center rounded-md hover:bg-[#2A2A32] hover:text-ink">+</button>
            </div>
          </div>
        </div>

        {/* Canvas */}
        <div className="relative">
          <div
            ref={scroller}
            onPointerDown={onDown}
            onPointerMove={onMove}
            onPointerUp={onUp}
            onPointerCancel={onUp}
            role="region"
            aria-label="Research wall canvas. Drag to pan around."
            tabIndex={0}
            className={`h-[min(78vh,820px)] overflow-auto overscroll-contain ${fine ? (panning ? "cursor-grabbing" : "cursor-grab") : ""}`}
            style={{
              backgroundColor: "#101013",
              backgroundImage: "radial-gradient(rgba(255,255,255,0.12) 1.2px, transparent 1.2px)",
              backgroundSize: `${26 * zoom}px ${26 * zoom}px`,
            }}
          >
            <div style={{ width: W * zoom, height: H * zoom }}>
              <div ref={board} className="relative origin-top-left" style={{ width: W, height: H, transform: `scale(${zoom})` }}>
                <span className="absolute left-10 top-5 font-mono text-[11px] tracking-[0.06em] text-faint">
                  4 projects · Tipbox · Price92 · Appointick · Landlord
                </span>

                {clusters.map((c, ci) => {
                  const nw = c.noteW ?? 154;
                  const nh = c.noteH ?? 154;
                  const rows = Math.ceil(c.notes.length / c.cols);
                  const h = 40 + rows * (nh + 22) + 10;
                  return (
                    <div
                      key={c.name}
                      className="absolute rounded-[18px] border-[1.5px] border-dashed"
                      style={{ left: c.x, top: c.y, width: c.w, height: h, borderColor: `${c.color}73`, background: `${c.color}0F` }}
                    >
                      <span className="absolute -top-4 left-5 rounded-lg px-3 py-1.5 text-sm font-semibold text-bg" style={{ background: c.color }}>
                        {c.name}
                      </span>
                      {c.notes.map((n, ni) => (
                        <motion.div
                          key={n.text}
                          data-note
                          drag={fine && !reduce}
                          dragMomentum={false}
                          whileDrag={{ scale: 1.08, rotate: 0, zIndex: 50, boxShadow: "0 24px 40px rgba(0,0,0,0.5)" }}
                          whileHover={fine && !reduce ? { y: -4, rotate: 0 } : undefined}
                          initial={reduce ? false : { opacity: 0, scale: 0.6, y: -30 }}
                          whileInView={{ opacity: 1, scale: 1, y: 0 }}
                          viewport={{ once: true, root: scroller }}
                          transition={{ type: "spring", stiffness: 420, damping: 14, delay: reduce ? 0 : ci * 0.05 + ni * 0.04 }}
                          className={`absolute flex flex-col justify-between p-3 text-[#1A1A1E] shadow-[0_8px_16px_rgba(0,0,0,0.35)] ${fine ? "cursor-grab active:cursor-grabbing" : ""}`}
                          style={{
                            left: 24 + (ni % c.cols) * (nw + 18),
                            top: 40 + Math.floor(ni / c.cols) * (nh + 22),
                            width: nw,
                            height: nh,
                            background: c.color,
                            rotate: tilt(ci, ni),
                          }}
                        >
                          <span className="font-hand text-[19px] leading-[1.08]">{n.text}</span>
                          <span className="flex items-end justify-between">
                            <span className="font-mono text-[9px] font-medium tracking-[0.08em] opacity-55">{n.project}</span>
                            {n.votes && (
                              <span className="flex -space-x-1" aria-label={`${n.votes.length} votes`}>
                                {n.votes.map((v, vi) => (
                                  <span key={vi} className="size-[18px] rounded-full border-2 border-white" style={{ background: v }} />
                                ))}
                              </span>
                            )}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  );
                })}

                {/* Flow arrows */}
                <svg aria-hidden="true" className="pointer-events-none absolute left-0 top-0" width={W} height={H} fill="none" stroke="#8E8E99" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M584 270 H612 M604 262 L613 270 L604 278" />
                  <path d="M610 494 C 600 520, 580 520, 570 552 M566 542 L570 553 L580 548" />
                  <path d="M584 770 H612 M604 762 L613 770 L604 778" />
                  <path d="M890 1002 V1050 M882 1042 L890 1051 L898 1042" />
                </svg>

                {/* Comment pin */}
                <div className="absolute flex items-center gap-2 rounded-full bg-ink py-1.5 pl-1.5 pr-3.5 text-[13px] text-bg shadow-lg" style={{ left: 250, top: 1020 }}>
                  <span className="flex size-[26px] items-center justify-center rounded-full bg-lime text-[11px] font-semibold">A</span>
                  most votes, this one ships
                </div>

                {/* Multiplayer cursors */}
                <motion.div
                  aria-hidden="true"
                  className="pointer-events-none absolute"
                  animate={reduce ? undefined : { x: [0, 40, 10, 0], y: [0, -20, 30, 0] }}
                  transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
                  style={{ left: 760, top: 200 }}
                >
                  <Pointer color="#C6F432" />
                  <span className="ml-3.5 rounded-md bg-lime px-2 py-1 text-xs font-semibold text-bg">Awais</span>
                </motion.div>
                <motion.div
                  aria-hidden="true"
                  className="pointer-events-none absolute"
                  animate={reduce ? undefined : { x: [0, -60, -20, 0], y: [0, 40, -10, 0] }}
                  transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
                  style={{ left: 1040, top: 330 }}
                >
                  <Pointer color="#4C8DFF" />
                  <span className="ml-3.5 rounded-md bg-figma px-2 py-1 text-xs font-semibold text-white">You</span>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Toolbar */}
          <div aria-hidden="true" className="pointer-events-none absolute bottom-5 left-1/2 flex -translate-x-1/2 gap-1 rounded-[14px] border border-line bg-[#1E1E24] p-2">
            {[
              "M5 3 L19 12 L12 13.5 L9 20 Z",
              "M8 3 V21 M16 3 V21 M3 8 H21 M3 16 H21",
              "M4 4 H20 V20 H4 Z",
              "M4 20 L8 19 L19 8 L16 5 L5 16 Z",
              "M6 5 H18 M12 5 V19",
              "M5 5 H19 V15 H11 L7 19 V15 H5 Z",
            ].map((d, i) => (
              <span key={i} className={`flex rounded-lg p-2 ${i === 0 ? "bg-figma" : ""}`}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#EDEDF0" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d={d} />
                </svg>
              </span>
            ))}
          </div>
        </div>
      </div>
      <p className="mt-5 font-hand text-2xl text-muted">
        {fine ? "psst: drag the canvas around, and move the stickies too ✦" : "psst: swipe around the canvas ✦"}
      </p>
    </section>
  );
}
