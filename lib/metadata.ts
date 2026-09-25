import type { Metadata } from "next";
import { SITE_URL } from "./editorial";
export function pageMetadata(title: string, description: string, path: string, image = "/art/cover.png"): Metadata {
  const cleanTitle = title.replace(/\s*\|\s*FyreLinkz.*$/i, "").trim();
  return {
    title: cleanTitle,
    description,
    alternates: {
      canonical: SITE_URL + path
    },
    openGraph: {
      siteName: "FyreLinkz",
      title,
      description,
      url: SITE_URL + path,
      type: "website",
      images: [{
        url: SITE_URL + image,
        width: 1200,
        height: 750,
        alt: title
      }]
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [SITE_URL + image]
    }
  };
}
