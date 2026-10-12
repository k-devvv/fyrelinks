/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  outputFileTracingRoot: __dirname,
  poweredByHeader: false,
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: "/wildweights",
          destination: "https://wildweights.vercel.app/wildweights",
        },
        {
          source: "/wildweights/:path*",
          destination: "https://wildweights.vercel.app/wildweights/:path*",
        },
      ],
    };
  },
  async redirects() {
    return [{ source: "/tools/video-cost", destination: "/create/ai-video-generation-matrix-minimax-higgsfield-seedance", permanent: true }];
  },
  async headers() {
    return [{ source: "/:path*", headers: [
      { key: "X-Content-Type-Options", value: "nosniff" },
      { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" }
    ] }];
  },
  images: {
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
