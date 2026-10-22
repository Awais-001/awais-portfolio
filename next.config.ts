import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static site: works on Vercel, Netlify or any static host.
  output: "export",
  trailingSlash: true,
  // Images are already optimized to WebP during import.
  images: { unoptimized: true },
};

export default nextConfig;
