import type { NextConfig } from "next";

const preview = process.env.PREVIEW === "1";

const nextConfig: NextConfig = {
  // Static site: works on Vercel, Netlify or any static host.
  output: "export",
  trailingSlash: true,
  // Images are already optimized to WebP during import.
  images: { unoptimized: true },
  // Relative asset paths for the hosted preview link.
  ...(preview ? { assetPrefix: "." } : {}),
};

export default nextConfig;
