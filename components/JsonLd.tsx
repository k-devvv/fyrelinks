import React from "react";
import { ReviewPost } from "@/lib/types";

type JsonLdProps =
  | { post: ReviewPost; url: string; data?: never }
  | { data: Record<string, unknown> | Record<string, unknown>[]; post?: never; url?: never };

export default function JsonLd(props: JsonLdProps) {
  if ("post" in props && props.post && props.url) {
    const { post, url } = props;
    const articleType =
      post.postType === "hardware" || post.postType === "guide" ? "TechArticle" : "Article";

    const schemaGraph: Record<string, unknown>[] = [
      {
        "@type": articleType,
        "@id": `${url}#article`,
        isPartOf: {
          "@type": "WebSite",
          "@id": "https://www.fyrelinkz.com/#website",
          name: "FyreLinkz",
          url: "https://www.fyrelinkz.com",
        },
        headline: post.title,
        description: post.metaDescription,
        url: url,
        datePublished: post.publishedAt,
        dateModified: post.updatedAt || post.publishedAt,
        inLanguage: "en-US",
        author: {
          "@type": "Organization",
          name: post.author.name,
          url: "https://www.fyrelinkz.com/about",
        },
        publisher: {
          "@type": "Organization",
          name: "FyreLinkz",
          url: "https://www.fyrelinkz.com",
          logo: {
            "@type": "ImageObject",
            url: "https://www.fyrelinkz.com/icon.svg",
          },
        },
        mainEntityOfPage: url,
      },
    ];

    if (post.faqs && post.faqs.length > 0) {
      schemaGraph.push({
        "@type": "FAQPage",
        "@id": `${url}#faq`,
        mainEntity: post.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      });
    }

    return (
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": schemaGraph,
          }),
        }}
      />
    );
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(props.data) }}
    />
  );
}

export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
