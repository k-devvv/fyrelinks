import type { MetadataRoute } from "next";
import { POSTS, CATEGORIES } from "@/lib/posts";
import { SITE_URL, SOURCE_CHECK_DATE, articlePath } from "@/lib/editorial";
export default function sitemap(): MetadataRoute.Sitemap {
  return [...["", "/about", "/contact", "/privacy", "/terms", "/ai-video-models"].map(path => ({
    url: SITE_URL + path,
    lastModified: new Date(path === "" ? POSTS.reduce((latest,p)=>p.updatedAt>latest?p.updatedAt:latest,SOURCE_CHECK_DATE) : SOURCE_CHECK_DATE)
  })), ...CATEGORIES.map(c => ({
    url: SITE_URL + "/" + c.slug,
    lastModified: new Date(POSTS.filter(p=>p.category===c.slug).reduce((latest,p)=>p.updatedAt>latest?p.updatedAt:latest,SOURCE_CHECK_DATE))
  })), ...POSTS.map(p => ({
    url: SITE_URL + articlePath(p),
    lastModified: new Date(p.updatedAt)
  }))];
}
