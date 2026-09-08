import React from "react";

interface JsonLdProps {
  data: Record<string, unknown> | Record<string, unknown>[];
}

export default function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

// Utility schema generators for rich SEO snippets
export function generateProductReviewSchema({
  productName,
  brand,
  model,
  sku,
  price,
  currency = "USD",
  rating,
  starRating,
  reviewCount,
  inStock = true,
  authorName,
  reviewBody,
  url,
  imageUrl,
  datePublished,
}: {
  productName: string;
  brand: string;
  model: string;
  sku: string;
  price: string;
  currency?: string;
  rating: number;
  starRating: number;
  reviewCount: number;
  inStock?: boolean;
  authorName: string;
  reviewBody: string;
  url: string;
  imageUrl: string;
  datePublished: string;
}) {
  const numericPrice = parseFloat(price.replace(/[^0-9.]/g, "")) || 99.0;

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: productName,
    image: imageUrl,
    description: reviewBody,
    sku: sku,
    brand: {
      "@type": "Brand",
      name: brand,
    },
    model: model,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: starRating.toString(),
      bestRating: "5",
      worstRating: "1",
      reviewCount: reviewCount.toString(),
    },
    offers: {
      "@type": "Offer",
      url: url,
      priceCurrency: currency,
      price: numericPrice.toString(),
      availability: inStock
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      seller: {
        "@type": "Organization",
        name: "FyreLinkz Verified Affiliate Merchant",
      },
    },
    review: {
      "@type": "Review",
      reviewRating: {
        "@type": "Rating",
        ratingValue: (rating / 2).toFixed(1),
        bestRating: "5",
        worstRating: "1",
      },
      author: {
        "@type": "Person",
        name: authorName,
      },
      publisher: {
        "@type": "Organization",
        name: "FyreLinkz",
        url: "https://fyrelinkz.com",
      },
      datePublished: datePublished,
      reviewBody: reviewBody,
    },
  };
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
