import type { MetadataRoute } from "next";
import { POSTS, CATEGORIES } from "@/lib/posts";
import { SITE_URL, SOURCE_CHECK_DATE, articlePath } from "@/lib/editorial";

export default function sitemap(): MetadataRoute.Sitemap {
  const latestPostDate = POSTS.reduce(
    (latest, p) => (p.updatedAt > latest ? p.updatedAt : latest),
    SOURCE_CHECK_DATE
  );

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: new Date(latestPostDate),
      changeFrequency: "daily",
      priority: 1.0
    },
    {
      url: `${SITE_URL}/hardware/ai-workstation-planner`,
      lastModified: new Date(SOURCE_CHECK_DATE),
      changeFrequency: "weekly",
      priority: 0.95
    },
    {
      url: `${SITE_URL}/ai-video-models`,
      lastModified: new Date(SOURCE_CHECK_DATE),
      changeFrequency: "weekly",
      priority: 0.95
    },
    {
      url: `${SITE_URL}/about`,
      lastModified: new Date(SOURCE_CHECK_DATE),
      changeFrequency: "monthly",
      priority: 0.6
    },
    {
      url: `${SITE_URL}/contact`,
      lastModified: new Date(SOURCE_CHECK_DATE),
      changeFrequency: "monthly",
      priority: 0.5
    },
    {
      url: `${SITE_URL}/privacy`,
      lastModified: new Date(SOURCE_CHECK_DATE),
      changeFrequency: "monthly",
      priority: 0.4
    },
    {
      url: `${SITE_URL}/terms`,
      lastModified: new Date(SOURCE_CHECK_DATE),
      changeFrequency: "monthly",
      priority: 0.4
    },
    {
      url: `${SITE_URL}/affiliate-disclosure`,
      lastModified: new Date(SOURCE_CHECK_DATE),
      changeFrequency: "monthly",
      priority: 0.3
    }
  ];

  const categoryRoutes: MetadataRoute.Sitemap = CATEGORIES.map(c => ({
    url: `${SITE_URL}/${c.slug}`,
    lastModified: new Date(
      POSTS.filter(p => p.category === c.slug).reduce(
        (latest, p) => (p.updatedAt > latest ? p.updatedAt : latest),
        SOURCE_CHECK_DATE
      )
    ),
    changeFrequency: "daily",
    priority: 0.85
  }));

  const articleRoutes: MetadataRoute.Sitemap = POSTS.map(p => ({
    url: SITE_URL + articlePath(p),
    lastModified: new Date(p.updatedAt),
    changeFrequency: p.category === "news" ? "weekly" : "monthly",
    priority: p.featured ? 0.9 : 0.8
  }));

  return [...staticRoutes, ...categoryRoutes, ...articleRoutes];
}
