export type Featured = {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  cover: string;
  color: string; // card background
  ink: string; // main text color on the card
  subInk?: string; // description color (defaults to ink)
  border?: string;
  button: { bg: string; ink: string };
  tab: { bg: string; ink: string };
  sticker: { text: string; bg: string; ink: string };
  tapeOpacity: number;
  meta: { label: string; value: string }[];
};

// The five fintech projects shown as stacking cards on the homepage.
export const featured: Featured[] = [
  {
    slug: "pace-wallet",
    title: "Pace Wallet",
    tagline: "The future of unified digital wealth",
    description:
      "Crypto, stocks and tokenized real-world assets in one secure wallet, with a seamless investing experience.",
    cover: "/images/pace-wallet/cover.webp",
    color: "#A78BFA",
    ink: "#0C0C0E",
    button: { bg: "#0C0C0E", ink: "#EDEDF0" },
    tab: { bg: "#0C0C0E", ink: "#EDEDF0" },
    sticker: { text: "BRANDING + UI", bg: "#EDEDF0", ink: "#0C0C0E" },
    tapeOpacity: 0.55,
    meta: [
      { label: "Industry", value: "FinTech · Web3" },
      { label: "Platform", value: "iOS & Android" },
      { label: "Timeline", value: "8 Weeks" },
    ],
  },
  {
    slug: "veyro",
    title: "VEYRO",
    tagline: "Take control of your crypto",
    description:
      "A smarter crypto wallet to hold, send, swap and spend, with full control and none of the complexity.",
    cover: "/images/veyro/cover.webp",
    color: "#C6F432",
    ink: "#0C0C0E",
    button: { bg: "#0C0C0E", ink: "#EDEDF0" },
    tab: { bg: "#0C0C0E", ink: "#EDEDF0" },
    sticker: { text: "SWAPS + CARDS", bg: "#0C0C0E", ink: "#EDEDF0" },
    tapeOpacity: 0.6,
    meta: [
      { label: "Industry", value: "FinTech · Web3" },
      { label: "Platform", value: "iOS & Android" },
      { label: "Timeline", value: "8 Weeks" },
    ],
  },
  {
    slug: "youngs-capital",
    title: "Youngs Capital",
    tagline: "The brokerage that bets on you",
    description:
      "Pakistan's first profit-and-loss sharing brokerage. Invest, trade and grow on the PSX with a partner that shares both the wins and the losses.",
    cover: "/images/youngs-capital/cover.webp",
    color: "#17171C",
    ink: "#EDEDF0",
    subInk: "#C9C9D1",
    border: "#2A2A32",
    button: { bg: "#34D399", ink: "#0C0C0E" },
    tab: { bg: "#34D399", ink: "#0C0C0E" },
    sticker: { text: "PSX TRADING", bg: "#34D399", ink: "#0C0C0E" },
    tapeOpacity: 0.35,
    meta: [
      { label: "Industry", value: "FinTech · Web3" },
      { label: "Platform", value: "iOS & Android" },
      { label: "Timeline", value: "8 Weeks" },
    ],
  },
  {
    slug: "traqstock",
    title: "Traqstock",
    tagline: "Market transparency platform",
    description:
      "A market intelligence platform where companies publish verified share data, and investors get transparent trading activity and identity-verified discussions.",
    cover: "/images/traqstock/cover.webp",
    color: "#7DD3FC",
    ink: "#0C0C0E",
    button: { bg: "#0C0C0E", ink: "#EDEDF0" },
    tab: { bg: "#0C0C0E", ink: "#EDEDF0" },
    sticker: { text: "VERIFIED DATA", bg: "#EDEDF0", ink: "#0C0C0E" },
    tapeOpacity: 0.6,
    meta: [
      { label: "Industry", value: "FinTech · Web3" },
      { label: "Platform", value: "Web Platform" },
      { label: "Timeline", value: "8 Weeks" },
    ],
  },
  {
    slug: "zazo",
    title: "ZAZO",
    tagline: "Get paid from anywhere",
    description:
      "A cross-border wallet that helps Pakistani freelancers and businesses get paid in USD, hold two currencies and pay locally in seconds.",
    cover: "/images/zazo/cover.webp",
    color: "#5EEAD4",
    ink: "#0C0C0E",
    button: { bg: "#0C0C0E", ink: "#EDEDF0" },
    tab: { bg: "#0C0C0E", ink: "#EDEDF0" },
    sticker: { text: "USD + PKR", bg: "#0C0C0E", ink: "#EDEDF0" },
    tapeOpacity: 0.6,
    meta: [
      { label: "Industry", value: "FinTech · Payments" },
      { label: "Platform", value: "iOS & Android" },
      { label: "Timeline", value: "1 Week" },
    ],
  },
];
