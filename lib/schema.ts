import type { EditorialPost } from "./editorial";
import type { FAQItem } from "./types";
import { SITE_URL, articleShareImagePath, sectionId } from "./editorial";

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export interface SoftwareAppMeta {
  name: string;
  description: string;
  url: string;
  applicationCategory: string;
  operatingSystem?: string;
  offers?: {
    price: string;
    priceCurrency: string;
  };
}

/**
 * Reusable FAQPage Schema generator
 */
export function generateFAQSchema(faqs: FAQItem[]) {
  if (!faqs || faqs.length === 0) return null;
  return {
    "@type": "FAQPage",
    mainEntity: faqs.map(faq => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer
      }
    }))
  };
}

/**
 * Reusable BreadcrumbList Schema generator
 */
export function generateBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  };
}

/**
 * Reusable TechArticle Schema generator
 * Ideal for technical AI, ComfyUI, LLM, and Hardware guides
 */
export function generateTechArticleSchema(post: EditorialPost, url: string) {
  return {
    "@type": "TechArticle",
    "@id": `${url}#techarticle`,
    headline: post.title,
    description: post.metaDescription,
    abstract: post.verdict,
    proficiencyLevel: "Intermediate",
    inLanguage: "en-US",
    dependencies: post.keySpecs.join(", ") || undefined,
    url,
    mainEntityOfPage: url,
    datePublished: `${post.publishedAt}T12:00:00+05:30`,
    dateModified: `${post.updatedAt}T12:00:00+05:30`,
    image: {
      "@type": "ImageObject",
      url: SITE_URL + articleShareImagePath(post.image),
      width: 1200,
      height: 750
    },
    author: {
      "@type": "Organization",
      name: post.author.name,
      url: `${SITE_URL}/about`
    },
    publisher: {
      "@id": `${SITE_URL}/#organization`
    },
    isPartOf: {
      "@id": `${SITE_URL}/#website`
    },
    citation: post.sources.map(s => s.url),
    articleSection: post.topic,
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: [".article-header h1", ".article-deck", ".takeaway p"]
    }
  };
}

/**
 * Reusable HowTo Schema generator
 * Extracted from reproducible checklists and section steps
 */
export function generateHowToSchema(post: EditorialPost, url: string) {
  // Find sections that contain checklists or clear step instructions
  const steps: { "@type": "HowToStep"; name: string; text: string; position: number }[] = [];
  let stepIndex = 1;

  for (const s of post.sections) {
    if (s.checklist && s.checklist.length > 0) {
      for (const item of s.checklist) {
        steps.push({
          "@type": "HowToStep",
          name: `${s.heading}: Step ${stepIndex}`,
          text: item,
          position: stepIndex++
        });
      }
    }
  }

  if (steps.length === 0) return null;

  return {
    "@type": "HowTo",
    "@id": `${url}#howto`,
    name: post.title,
    description: post.metaDescription,
    step: steps,
    inLanguage: "en-US",
    image: {
      "@type": "ImageObject",
      url: SITE_URL + articleShareImagePath(post.image)
    }
  };
}

/**
 * Reusable SoftwareApplication / WebApplication Schema generator
 * Used for interactive tools like the Workstation Planner and Model Directory
 */
export function generateSoftwareAppSchema(app: SoftwareAppMeta) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": `${app.url}#software`,
    name: app.name,
    description: app.description,
    url: app.url,
    applicationCategory: app.applicationCategory,
    operatingSystem: app.operatingSystem ?? "All (Web Browser)",
    offers: {
      "@type": "Offer",
      price: app.offers?.price ?? "0",
      priceCurrency: app.offers?.priceCurrency ?? "USD"
    }
  };
}
