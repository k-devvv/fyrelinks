import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/editorial";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/admin/", "/go/"]
      },
      {
        userAgent: ["Googlebot", "Googlebot-Image", "Bingbot"],
        allow: "/",
        disallow: ["/api/", "/admin/", "/go/"]
      },
      {
        userAgent: ["GPTBot", "ClaudeBot", "PerplexityBot", "Applebot"],
        allow: "/",
        disallow: ["/api/", "/admin/", "/go/"]
      }
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL
  };
}
