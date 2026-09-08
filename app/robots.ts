import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/", "/admin/", "/go/"],
      },
    ],
    sitemap: "https://www.fyrelinkz.com/sitemap.xml",
    host: "https://www.fyrelinkz.com",
  };
}
