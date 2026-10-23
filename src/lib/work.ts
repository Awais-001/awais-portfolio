import { site as profile } from "./site";

export type Category = "apps" | "ux" | "websites" | "branding";

export type WorkItem = {
  slug: string;
  title: string;
  line: string;
  cover: string;
  accent: string;
  tag: string;
  category: Category;
  /** External link for websites (opens a new tab). Case studies use /work/slug. */
  external?: string;
};

export const apps: WorkItem[] = [
  { slug: "pace-wallet", title: "Pace Wallet", line: "Crypto, stocks and real-world assets in one wallet.", cover: "/images/pace-wallet/cover.webp", accent: "#A78BFA", tag: "iOS & ANDROID", category: "apps" },
  { slug: "veyro", title: "VEYRO", line: "Hold, send, swap and spend crypto, simply.", cover: "/images/veyro/cover.webp", accent: "#C6F432", tag: "iOS & ANDROID", category: "apps" },
  { slug: "youngs-capital", title: "Youngs Capital", line: "Pakistan's first profit-and-loss sharing brokerage.", cover: "/images/youngs-capital/cover.webp", accent: "#34D399", tag: "iOS & ANDROID", category: "apps" },
  { slug: "traqstock", title: "Traqstock", line: "Verified market data and transparent trading.", cover: "/images/traqstock/cover.webp", accent: "#7DD3FC", tag: "WEB PLATFORM", category: "apps" },
  { slug: "zazo", title: "ZAZO", line: "Get paid in USD from anywhere, spend in PKR.", cover: "/images/zazo/cover.webp", accent: "#5EEAD4", tag: "iOS & ANDROID", category: "apps" },
];

export const uxCases: WorkItem[] = [
  { slug: "tipbox", title: "Tipbox", line: "Contactless QR tipping that sends your tip straight to the person who served you.", cover: "/images/tipbox/cover.webp", accent: "#FF8A5B", tag: "UX CASE STUDY", category: "ux" },
  { slug: "price92", title: "Price92", line: "Compare phones across brands, prices and specs, built for buyers in Pakistan.", cover: "/images/price92/cover.webp", accent: "#FF8A5B", tag: "UX CASE STUDY", category: "ux" },
  { slug: "appointick", title: "Appointick", line: "Appointment scheduling for salons, clinics and coaches, on both sides of the booking.", cover: "/images/appointick/cover.webp", accent: "#FF8A5B", tag: "UX CASE STUDY", category: "ux" },
  { slug: "landlord", title: "Landlord", line: "A tenant management app that helps property owners run rentals without the spreadsheets.", cover: "/images/landlord/cover.webp", accent: "#FF8A5B", tag: "UX CASE STUDY", category: "ux" },
];

// Websites open your Behance profile for now. Swap in a live URL or a
// specific Behance project link per site whenever you have one.
const site = (slug: string, title: string): WorkItem => ({
  slug, title, line: "Landing page", cover: `/images/websites/${slug}.webp`, accent: "#EDEDF0", tag: "WEBSITE", category: "websites", external: profile.links.behance,
});
export const websites: WorkItem[] = [
  site("lunera", "Lunera"), site("travara", "Travara"), site("funky-fitness", "Funky Fitness"),
  site("fintrix", "Fintrix"), site("exora", "Exora"), site("tasktrox", "Tasktrox"),
  site("troxride", "TroxRide"), site("troxestate", "TroxEstate"), site("curepath", "Curepath"),
  site("topograph", "Topograph"),
];

export const branding: WorkItem[] = [
  { slug: "nero", title: "NERO", line: "Brand guidelines and a full visual identity system: logo marks, color, type, icons, UI elements and social.", cover: "/images/nero/cover.webp", accent: "#FF7A30", tag: "BRAND IDENTITY", category: "branding" },
];

export const allWorkCount = apps.length + uxCases.length + websites.length + branding.length;
