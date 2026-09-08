import { MetadataRoute } from "next";
import { CATEGORIES, POSTS } from "@/lib/posts";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.fyrelinkz.com";
  const siteUpdateDate = new Date("2026-09-08");

  // Static core routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: siteUpdateDate,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: siteUpdateDate,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: siteUpdateDate,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: siteUpdateDate,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: siteUpdateDate,
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];

  // Category hub routes
  const categoryRoutes: MetadataRoute.Sitemap = CATEGORIES.map((cat) => ({
    url: `${baseUrl}/${cat.slug}`,
    lastModified: siteUpdateDate,
    changeFrequency: "weekly",
    priority: 0.85,
  }));

  // In-depth review and guide article routes
  const postRoutes: MetadataRoute.Sitemap = POSTS.map((post) => ({
    url: `${baseUrl}/${post.category}/${post.slug}`,
    lastModified: new Date(post.updatedAt || post.publishedAt),
    changeFrequency: "monthly",
    priority: 0.9,
  }));

  return [...staticRoutes, ...categoryRoutes, ...postRoutes];
}
