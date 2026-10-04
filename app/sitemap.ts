import type { MetadataRoute } from "next";
import { POSTS, CATEGORIES } from "@/lib/posts";
import { SITE_URL, articlePath } from "@/lib/editorial";

function latestUpdate(posts: typeof POSTS) {
  return posts.reduce((latest, post) => post.updatedAt > latest ? post.updatedAt : latest, "");
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticUrls = ["about", "contact", "privacy", "terms", "ai-video-models", "hardware/ai-workstation-planner"];
  const homeLastModified = latestUpdate(POSTS);
  return [
    {
      url: SITE_URL,
      ...(homeLastModified ? { lastModified: new Date(homeLastModified) } : {})
    },
    ...staticUrls.map(path => ({ url: SITE_URL + "/" + path })),
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
