import type { MetadataRoute } from "next";
import { galleryEntries } from "@/lib/wildweights-gallery";
import { POSTS, CATEGORIES } from "@/lib/posts";
import { SITE_URL, articlePath } from "@/lib/editorial";

function latestUpdate(posts: typeof POSTS) {
  return posts.reduce((latest, post) => post.updatedAt > latest ? post.updatedAt : latest, "");
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticUrls = ["about", "contact", "privacy", "terms", "rss", "ai-video-models", "hardware/ai-workstation-planner", "wildweights"];
  const homeLastModified = latestUpdate(POSTS);
  return [
    {
      url: SITE_URL,
      ...(homeLastModified ? { lastModified: new Date(homeLastModified) } : {})
    },
    ...staticUrls.map(path => ({
      url: SITE_URL + "/" + path,
      ...(path === "wildweights" ? { lastModified: new Date("2026-10-13T00:00:00Z") } : {})
    })),
    ...galleryEntries.map(entry => ({ url: SITE_URL + "/wildweights/" + entry.slug, lastModified: new Date("2026-10-13T00:00:00Z") })),
    ...CATEGORIES.map(category => {
      const lastModified = latestUpdate(POSTS.filter(post => post.category === category.slug));
      return {
        url: SITE_URL + "/" + category.slug,
        ...(lastModified ? { lastModified: new Date(lastModified) } : {})
      };
    }),
    ...POSTS.map(post => ({
      url: SITE_URL + articlePath(post),
      lastModified: new Date(post.updatedAt)
    }))
  ];
}
