import React from "react";
import { ReviewPost } from "@/lib/types";

type JsonLdProps =
  | { post: ReviewPost; url: string; data?: never }
  | { data: Record<string, unknown> | Record<string, unknown>[]; post?: never; url?: never };

export default function JsonLd(props: JsonLdProps) {
  if ("post" in props && props.post && props.url) {
    const { post, url } = props;
    const schemaGraph = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "TechArticle",
          "@id": `${url}#article`,
          isPartOf: {
            "@type": "WebSite",
            "@id": "https://fyrelinkz.com/#website",
            name: "FyreLinkz",
            url: "https://fyrelinkz.com",
          },
          headline: post.title,
          description: post.metaDescription,
          url: url,
          datePublished: post.publishedAt,
          dateModified: post.updatedAt,
          inLanguage: "en-US",
          author: {
            "@type": "Person",
            name: post.author.name,
            jobTitle: post.author.role,
          },
          publisher: {
            "@type": "Organization",
            name: "FyreLinkz Editorial Lab",
            url: "https://fyrelinkz.com",
            logo: {
              "@type": "ImageObject",
              url: "https://fyrelinkz.com/logo.png",
            },
          },
          mainEntityOfPage: url,
        },
        {
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
        },
        {
          "@type": "Product",
          "@id": `${url}#product`,
          name: post.title,
          description: post.metaDescription,
          review: {
            "@type": "Review",
            reviewRating: {
              "@type": "Rating",
              ratingValue: post.score,
              bestRating: 10,
              worstRating: 1,
            },
            author: {
              "@type": "Person",
              name: post.author.name,
            },
          },
        },
      ],
    };

    return (
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaGraph) }}
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

export function generateFaqSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}
