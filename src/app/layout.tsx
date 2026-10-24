import type { Metadata } from "next";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Cursor from "@/components/Cursor";
import { Analytics } from "@vercel/analytics/next";

const title = "Awais Raza — Product Designer";
const description =
  "Product designer from Pakistan designing fintech apps, SaaS platforms and websites that feel effortless.";

// Link previews (WhatsApp, LinkedIn, Slack…) need a full URL for the image.
// Change this if you move to a new domain (e.g. awaisraza.com).
const siteUrl = "https://www.awaisraza.xyz";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  openGraph: {
    type: "website",
    siteName: "Awais Raza",
    title,
    description,
    url: "/",
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "Awais Raza, Product Designer" }],
  },
  twitter: { card: "summary_large_image", title, description, images: ["/og.jpg"] },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body id="top">
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-md focus:bg-lime focus:px-4 focus:py-2 focus:text-bg">
          Skip to content
        </a>
        <Cursor />
        <Nav />
        <main id="main">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
