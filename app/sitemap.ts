import type { MetadataRoute } from "next";
import { POSTS, CATEGORIES } from "@/lib/posts";
import { SITE_URL, articlePath } from "@/lib/editorial";

import { newsPageCount, newsPagePath } from "@/lib/news-pagination";

function latestUpdate(posts: typeof POSTS) {
  return posts.reduce((latest, post) => post.updatedAt > latest ? post.updatedAt : latest, "");
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticUrls = ["about", "contact", "privacy", "terms", "rss", "ai-video-models", "hardware/ai-workstation-planner"];
  const homeLastModified = latestUpdate(POSTS);
  return [
    {
      url: SITE_URL,
      ...(homeLastModified ? { lastModified: new Date(homeLastModified) } : {})
    },
    ...staticUrls.map(path => ({
      url: SITE_URL + "/" + path,

    })),
    ...CATEGORIES.map(category => {
      // Reading paths and Finance hub content were substantially revised on this date.
      const lastModified = [latestUpdate(POSTS.filter(post => post.category === category.slug)), "2026-10-17"].sort().pop()!;
      return {
        url: SITE_URL + "/" + category.slug,
        ...(lastModified ? { lastModified: new Date(lastModified) } : {})
      };
    }),
    ...Array.from({ length: newsPageCount(POSTS.filter(p => p.category === "news").length) - 1 }, (_, i) => ({ url: SITE_URL + newsPagePath(i + 2) })),
    ...POSTS.map(post => ({
      url: SITE_URL + articlePath(post),
      lastModified: new Date(post.updatedAt)
    }))
  ];
}
