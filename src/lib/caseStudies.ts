/** One image inside a case study section. `crop` trims that fraction off the top
 *  (slides with a big built-in title); `maxH` shows only the top part of very tall images. */
export type Shot = { src: string; alt: string; crop?: number; maxH?: number };

export type Section = { name: string; note: string; title: string; body?: string; shots: Shot[] };

export type CaseStudy = {
  slug: string;
  kind: "app" | "ux" | "brand";
  crumb: string;
  title: string;
  tagline: string;
  sticker: string;
  accent: string;
  summary: string;
  cover: string;
  overview: [string, string][];
  problem?: [string, string];
  solution?: [string, string];
  sections: Section[];
  /** Short line shown on the "next project" card. */
  short: string;
  next: string; // slug of the next project
  nextLabel?: string;
  wrapNote?: string;
};

const img = (slug: string, file: string, alt: string, extra: Partial<Shot> = {}): Shot => ({ src: `/images/${slug}/${file}.webp`, alt, ...extra });

export const caseStudies: CaseStudy[] = [
  // ---------- FINTECH APPS ----------
  {
    slug: "pace-wallet", short: "The future of unified digital wealth.", kind: "app", crumb: "project 01 of 05", title: "Pace Wallet",
    tagline: "The future of unified digital wealth", sticker: "FINTECH · WEB3", accent: "#A78BFA",
    summary: "Manage crypto, stocks and real-world assets in one secure wallet, with a seamless investing experience.",
    cover: "/images/pace-wallet/cover.webp",
    overview: [["Industry", "FinTech · Web3"], ["Platform", "iOS & Android"], ["Timeline", "3 Weeks"], ["My role", "Product Designer"], ["Deliverables", "Branding · Onboarding · UI"]],
    problem: ["Too many apps for one portfolio", "Managing digital wealth today means switching between multiple apps for crypto, stocks, and investments, making portfolio management fragmented, inefficient, and difficult to navigate."],
    solution: ["One secure wallet for everything", "Manage cryptocurrencies, stocks, and tokenized real-world assets from a single secure wallet, eliminating the need to switch between multiple platforms."],
    sections: [
      { name: "Branding", note: "how it looks & feels", title: "Branding", body: "A bold, futuristic identity for a wallet that holds both crypto and real-world assets. Unbounded for headlines, DM Sans for everything you read.", shots: [img("pace-wallet", "branding", "Pace Wallet branding: logo, colors and type", { crop: 0.19 })] },
      { name: "Onboarding", note: "first five minutes", title: "Onboarding", body: "A guided onboarding experience that introduces users to crypto management, Web3 connectivity, and real-world investing in just a few steps.", shots: [img("pace-wallet", "onboarding", "Pace Wallet onboarding screens", { crop: 0.27 })] },
      { name: "User Interface", note: "the everyday screens", title: "User interface", shots: [img("pace-wallet", "ui", "Pace Wallet app screens", { crop: 0.19 })] },
    ],
    next: "veyro",
  },
  {
    slug: "veyro", short: "Take control of your crypto.", kind: "app", crumb: "project 02 of 05", title: "VEYRO",
    tagline: "Take control of your crypto", sticker: "FINTECH · WEB3", accent: "#C6F432",
    summary: "A smarter way to hold, send, and use crypto, built for simplicity, security, and control.",
    cover: "/images/veyro/cover.webp",
    overview: [["Industry", "FinTech · Web3"], ["Platform", "iOS & Android"], ["Timeline", "5 Weeks"], ["My role", "Product Designer"], ["Deliverables", "Branding · UI"]],
    problem: ["Crypto feels complex and risky", "Managing crypto today means dealing with complex interfaces, fragmented apps, and risky swaps, making it difficult for everyday users to hold, send, and control their digital assets with confidence."],
    solution: ["One clean, secure wallet", "VEYRO brings together asset tracking, instant swaps, card payments, and portfolio management in one clean, secure wallet, giving users full control of their crypto without the complexity."],
    sections: [
      { name: "Branding", note: "how it looks & feels", title: "Branding", shots: [img("veyro", "branding", "VEYRO branding: logo, app icon and card", { crop: 0.19 })] },
      { name: "User Interface", note: "the everyday screens", title: "User interface", body: "Asset tracking, instant swaps, card payments and portfolio management, all in one place.", shots: [img("veyro", "ui", "VEYRO wallet and swap screens", { crop: 0.21 })] },
      { name: "More Screens", note: "a few more", title: "More screens", shots: [img("veyro", "more-screens", "VEYRO settings, send and card screens", { crop: 0.21 })] },
    ],
    next: "youngs-capital",
  },
  {
    slug: "youngs-capital", short: "The brokerage that bets on you.", kind: "app", crumb: "project 03 of 05", title: "Youngs Capital",
    tagline: "The brokerage that bets on you", sticker: "FINTECH · BROKERAGE", accent: "#34D399",
    summary: "Invest, trade and grow in Pakistan's stock market, all in one profit-sharing brokerage built for every investor.",
    cover: "/images/youngs-capital/cover.webp",
    overview: [["Industry", "FinTech · Web3"], ["Platform", "iOS & Android"], ["Timeline", "6 Weeks"], ["My role", "Product Designer"], ["Deliverables", "Branding · UI"]],
    problem: ["Investors don't trust the market", "Pakistan's financial market lacks transparency and trust, leaving everyday investors with no reliable brokerage that truly stands beside them through market highs and lows."],
    solution: ["A brokerage that shares the risk", "Youngs Capital introduces Pakistan's first profit-and-loss sharing brokerage: a trusted partner that celebrates wins together and shoulders losses side by side."],
    sections: [
      { name: "Branding", note: "how it looks & feels", title: "Branding", shots: [img("youngs-capital", "branding", "Youngs Capital brand system", { crop: 0.19 })] },
      { name: "User Interface", note: "the everyday screens", title: "User interface", body: "Invest, trade and grow on the PSX, with a partner that shares both the wins and the losses.", shots: [img("youngs-capital", "ui", "Youngs Capital trading screens", { crop: 0.18 })] },
      { name: "More Screens", note: "a few more", title: "More screens", shots: [img("youngs-capital", "more-screens", "Youngs Capital profile and learning screens", { crop: 0.18 })] },
    ],
    next: "traqstock",
  },
  {
    slug: "traqstock", short: "Market transparency starts with trusted data.", kind: "app", crumb: "project 04 of 05", title: "Traqstock",
    tagline: "Market transparency platform", sticker: "FINTECH · WEB", accent: "#7DD3FC",
    summary: "Bringing verified market data, transparent trading activity and trusted investor discussions into one platform.",
    cover: "/images/traqstock/cover.webp",
    overview: [["Industry", "FinTech · Web3"], ["Platform", "Web Platform"], ["Timeline", "4 Weeks"], ["My role", "Product Designer"], ["Deliverables", "Branding · Web UI"]],
    problem: ["Market data is scattered", "Company data, share structures, trading activity and investor discussions are spread across many sources, making it hard for investors to verify information and take part in trustworthy discussions."],
    solution: ["One transparent source of truth", "Companies publish verified share data, and investors get trusted company info, transparent trading activity, blockchain-anchored records and identity-verified discussions, all in one place."],
    sections: [
      { name: "Branding", note: "how it looks & feels", title: "Branding", shots: [img("traqstock", "branding", "Traqstock branding", { crop: 0.17 })] },
      { name: "User Interface", note: "the everyday screens", title: "User interface", body: "Verified share data, transparent trading activity and identity-verified discussions.", shots: [img("traqstock", "ui", "Traqstock dashboard", { crop: 0.21 })] },
      { name: "More Screens", note: "a few more", title: "More screens", shots: [img("traqstock", "more-screens", "Traqstock company and finance screens", { crop: 0.21 })] },
    ],
    next: "zazo",
  },
  {
    slug: "zazo", short: "Get paid from anywhere.", kind: "app", crumb: "project 05 of 05", title: "ZAZO",
    tagline: "Get paid from anywhere", sticker: "FINTECH · PAYMENTS", accent: "#5EEAD4",
    summary: "A cross-border wallet that helps Pakistani freelancers and businesses get paid in USD, hold two currencies and pay locally in seconds.",
    cover: "/images/zazo/cover.webp",
    overview: [["Industry", "FinTech · Payments"], ["Platform", "iOS & Android"], ["Timeline", "1 Week"], ["My role", "Product Designer"], ["Deliverables", "Branding · Flows · UI"]],
    problem: ["Getting paid from abroad hurts", "Getting paid from abroad is slow and costly for Pakistani freelancers and small businesses: long bank wires, high fees, unclear exchange rates and separate apps to receive, convert and spend."],
    solution: ["A US account in your pocket", "ZAZO gives every user US and international account details in their name, a PKR wallet and instant local payments, with fast digital verification and clear rates, all in one simple app."],
    sections: [
      { name: "Key Features", note: "what it does", title: "Key features", body: "Built for freelancers, local users, businesses and merchants in Pakistan.", shots: [img("zazo", "key-features", "ZAZO key features")] },
      { name: "User Flow", note: "download to first payment", title: "User flow", shots: [img("zazo", "user-flow", "ZAZO user flow from download to first payment")] },
      { name: "Branding", note: "how it looks & feels", title: "Branding", shots: [img("zazo", "branding", "ZAZO branding", { crop: 0.25 })] },
      { name: "User Interface", note: "the everyday screens", title: "User interface", body: "Hold USD and PKR side by side, with live rates on every conversion.", shots: [img("zazo", "ui", "ZAZO home and receive screens", { crop: 0.2 })] },
    ],
    next: "pace-wallet", wrapNote: "back to the start",
  },

  // ---------- UX CASE STUDIES ----------
  {
    slug: "tipbox", short: "Tipping, without the cash.", kind: "ux", crumb: "ux case study 01 of 04", title: "Tipbox",
    tagline: "UX UI case study · 2025", sticker: "UX CASE STUDY", accent: "#FF6B6B",
    summary: "A digital platform that lets people tip service workers directly via QR codes. Scan, pick a staff member, tip. No app needed.",
    cover: "/images/tipbox/cover.webp",
    overview: [["Type", "UX/UI Case Study"], ["Year", "2025"], ["Methods", "Interviews · Personas · Empathy maps"], ["My role", "UX/UI Designer"], ["Deliverables", "Wireframes · Style guide · UI"]],
    problem: ["Cashless means tipless", "As people stop carrying cash, tipping has become inconvenient and unclear. Customers want to reward good service but have no easy, direct way, and existing digital options pool tips or lack transparency."],
    solution: ["Scan, pick, tip", "A simple, contactless way to tip specific staff members using QR codes at service locations. Scan the code, choose the person who served you, and tip in seconds."],
    sections: [
      { name: "Research", note: "talking to real people", title: "Research", body: "Interviews with customers and service workers about how, when and why they tip.", shots: [img("tipbox", "interviews", "Tipbox interview questions", { maxH: 1500 })] },
      { name: "Personas", note: "who we designed for", title: "Personas & empathy", shots: [img("tipbox", "personas", "Tipbox user personas", { maxH: 1300 }), img("tipbox", "empathy-maps", "Tipbox empathy maps", { maxH: 1300 })] },
      { name: "Wireframes", note: "structure first", title: "Wireframes", shots: [img("tipbox", "wireframes", "Tipbox high-fidelity wireframes", { maxH: 1500 })] },
      { name: "Style guide", note: "the visual language", title: "Style guide", shots: [img("tipbox", "style-guide", "Tipbox visual style guide", { maxH: 1200 })] },
      { name: "Final design", note: "the polished flows", title: "Final design", body: "User side and restaurant side, in English, Japanese and Chinese.", shots: [img("tipbox", "final-user-side", "Tipbox user-side screens", { maxH: 1800 }), img("tipbox", "final-restaurant-side", "Tipbox restaurant-side screens", { maxH: 1500 })] },
    ],
    next: "price92", nextLabel: "Next case study",
  },
  {
    slug: "price92", short: "Phone shopping, made simple.", kind: "ux", crumb: "ux case study 02 of 04", title: "Price92",
    tagline: "UX UI case study · 2025", sticker: "UX CASE STUDY", accent: "#7DD3FC",
    summary: "A platform that helps people in Pakistan compare mobile phones across brands, prices and specs, with trusted reviews and upcoming launches.",
    cover: "/images/price92/cover.webp",
    overview: [["Type", "UX/UI Case Study"], ["Year", "2025"], ["Methods", "Interviews · Competitors · Personas"], ["My role", "UX/UI Designer"], ["Deliverables", "Wireframes · Style guide · UI"]],
    problem: ["Phone shopping is overwhelming", "Users in Pakistan struggle to discover, compare and buy phones because of scattered information, unreliable pricing, overwhelming specs and little personal guidance, which makes the whole process slow and frustrating."],
    solution: ["Clear, trustworthy comparisons", "A clear visual hierarchy, simpler information, advanced filters and personalised recommendations, plus credibility indicators on prices, real user reviews and an AI chatbot for help."],
    sections: [
      { name: "Research", note: "talking to real people", title: "Research", body: "Interviews about how people search, compare and decide on a new phone, plus a look at the competition.", shots: [img("price92", "interviews", "Price92 interview questions", { maxH: 1500 }), img("price92", "competitors", "Price92 competitor analysis", { maxH: 1400 })] },
      { name: "Personas", note: "who we designed for", title: "Personas", shots: [img("price92", "personas", "Price92 user personas", { maxH: 1500 })] },
      { name: "Wireframes", note: "structure first", title: "Wireframes", shots: [img("price92", "wireframes", "Price92 wireframes", { maxH: 1700 })] },
      { name: "Style guide", note: "the visual language", title: "Style guide", shots: [img("price92", "style-guide", "Price92 visual style guide", { maxH: 1400 })] },
      { name: "Final design", note: "the polished screens", title: "Final design", shots: [img("price92", "final-design", "Price92 final screens", { maxH: 1900 })] },
    ],
    next: "appointick", nextLabel: "Next case study",
  },
  {
    slug: "appointick", short: "Booking, without the back-and-forth.", kind: "ux", crumb: "ux case study 03 of 04", title: "Appointick",
    tagline: "UX UI case study · 2025", sticker: "UX CASE STUDY", accent: "#A78BFA",
    summary: "A smarter way to manage appointments, for salons, clinics, coaches and consultants, and the clients who book them.",
    cover: "/images/appointick/cover.webp",
    overview: [["Type", "UX/UI Case Study"], ["Year", "2025"], ["Methods", "Personas · Empathy maps · Competitors"], ["My role", "UX/UI Designer"], ["Deliverables", "Wireframes · Components · UI"]],
    problem: ["Booking feels complicated", "Service providers struggle to keep track of schedules, while clients get frustrated with confusing booking flows and unclear availability."],
    solution: ["Book in a few taps", "A clear view of availability, simple booking steps, instant confirmations and smart reminders, all in a clean, modern interface that helps businesses stay organised."],
    sections: [
      { name: "Process", note: "how we approached it", title: "Process", shots: [img("appointick", "process", "Appointick design process", { maxH: 1100 })] },
      { name: "Personas", note: "who we designed for", title: "Personas & empathy", shots: [img("appointick", "personas", "Appointick user personas", { maxH: 1500 }), img("appointick", "empathy-maps", "Appointick empathy maps", { maxH: 1200 })] },
      { name: "Wireframes", note: "structure first", title: "Wireframes", shots: [img("appointick", "wireframes", "Appointick wireframes", { maxH: 1300 })] },
      { name: "Style guide", note: "the visual language", title: "Style guide", shots: [img("appointick", "style-guide", "Appointick visual style guide", { maxH: 1000 }), img("appointick", "components", "Appointick component library", { maxH: 1500 })] },
      { name: "Final design", note: "the polished screens", title: "Final design", shots: [img("appointick", "final-design", "Appointick dashboard screens", { maxH: 1900 })] },
    ],
    next: "landlord", nextLabel: "Next case study",
  },
  {
    slug: "landlord", short: "Rentals, without the spreadsheets.", kind: "ux", crumb: "ux case study 04 of 04", title: "Landlord",
    tagline: "UX UI case study · tenant management", sticker: "UX CASE STUDY", accent: "#FF8A5B",
    summary: "A role-based tenant management app that helps property owners add properties, assign tenants and track rent, income and expenses.",
    cover: "/images/landlord/cover.webp",
    overview: [["Type", "UX/UI Case Study"], ["Platform", "Mobile app"], ["Methods", "Personas · Competitors · User flows"], ["My role", "UX/UI Designer"], ["Deliverables", "Wireframes · Bilingual UI"]],
    problem: ["Managing rentals by hand", "Owners juggle residential and commercial units while tracking income, expenses and tenants manually. Without central tools, leases, utilities, overdue rent and co-hosting roles are hard to manage."],
    solution: ["One app for every property", "A centralised dashboard and a unified platform for every property and tenant, with co-hosting, property managers and rent collectors built in."],
    sections: [
      { name: "Personas", note: "who we designed for", title: "Personas", shots: [img("landlord", "personas", "Landlord user personas", { maxH: 1500 })] },
      { name: "Research", note: "gaps in the market", title: "Competitors & flows", shots: [img("landlord", "competitors-flows", "Landlord competitor analysis and user flow", { maxH: 1700 })] },
      { name: "Wireframes", note: "structure first", title: "Wireframes", shots: [img("landlord", "wireframes", "Landlord wireframes", { maxH: 1200 })] },
      { name: "Bilingual", note: "built for Pakistan", title: "English & Urdu", body: "The whole app works in both English and Urdu.", shots: [img("landlord", "english", "Landlord screens in English", { maxH: 1100 }), img("landlord", "urdu", "Landlord screens in Urdu", { maxH: 1100 })] },
      { name: "Final design", note: "the polished screens", title: "Final design", shots: [img("landlord", "final-1", "Landlord home and property screens", { maxH: 1000 }), img("landlord", "final-2", "Landlord tenant screens", { maxH: 1000 })] },
    ],
    next: "tipbox", nextLabel: "Next case study", wrapNote: "back to the start",
  },

  // ---------- BRANDING ----------
  {
    slug: "nero", short: "Brand guidelines & visual identity.", kind: "brand", crumb: "branding project", title: "NERO",
    tagline: "Brand guidelines & visual identity system", sticker: "BRAND IDENTITY", accent: "#FF7A30",
    summary: "A full brand guideline and visual identity system: logo marks, color, typography, iconography, UI elements and social media.",
    cover: "/images/nero/cover.webp",
    overview: [["Type", "Brand Identity"], ["Year", "2026"], ["Primary typeface", "Bricolage Grotesque"], ["My role", "Designer"], ["Deliverables", "Logo · Color · Type · Icons · Social"]],
    sections: [
      { name: "Logo", note: "the mark", title: "Logo", body: "The ribbon mark is the core symbol of the brand, with clear rules for color use.", shots: [img("nero", "logo-color-use", "NERO logo color use"), img("nero", "logo-marks", "NERO logo marks")] },
      { name: "Color", note: "the palette", title: "Color", shots: [img("nero", "primary-colors", "NERO primary colors"), img("nero", "extended-palette", "NERO extended palette")] },
      { name: "Typography", note: "the voice", title: "Typography", shots: [img("nero", "typography", "NERO typography")] },
      { name: "Iconography", note: "the details", title: "Iconography", body: "A clean outline icon system.", shots: [img("nero", "iconography", "NERO icon set")] },
      { name: "UI elements", note: "in the product", title: "UI elements", shots: [img("nero", "ui-elements", "NERO UI elements")] },
      { name: "Social", note: "out in the world", title: "Social media", shots: [img("nero", "social-profile", "NERO social profile assets"), img("nero", "social-posts", "NERO social media posts")] },
    ],
    next: "pace-wallet", nextLabel: "Back to the apps", wrapNote: "what's next",
  },
];

export const getCaseStudy = (slug: string) => caseStudies.find((c) => c.slug === slug);
