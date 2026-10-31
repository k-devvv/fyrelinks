/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  outputFileTracingRoot: __dirname,
  poweredByHeader: false,
  // Static export to out/, served by Cloudflare Pages. Live headlines are
  // fetched at build time and refreshed by the scheduled rebuild workflow, so
  // no route needs a server at request time. Security headers live in
  // public/_headers and the retired calculator redirect in public/_redirects,
  // because next.config headers() and redirects() do not apply to an export.
  output: "export",
  env: {
    // Empty keeps ads off. Set to the https origin of the separate Pages
    // project that serves /ads/frame.html.
    NEXT_PUBLIC_AD_FRAME_ORIGIN: process.env.NEXT_PUBLIC_AD_FRAME_ORIGIN || '',
  },
  images: {
    // Required by output: "export"; no optimizer runs at request time.
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "assets.fyrelinkz.com",
      },
    ],
  },
};

module.exports = nextConfig;
