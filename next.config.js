/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  outputFileTracingRoot: __dirname,
  poweredByHeader: false,
  // Static export: every route is prerendered to out/ and served by Cloudflare
  // Pages at no per-request cost. Security headers moved to public/_headers and
  // the retired calculator redirect to public/_redirects, because next.config
  // headers() and redirects() are not applied to an exported site.
  output: "export",
  images: {
    // Required by output: "export"; no image optimizer runs at request time.
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
