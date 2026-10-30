import type { EditorialPost } from "@/lib/editorial";
import { SITE_URL, articleShareImagePath, sectionId, faqPageSchema } from "@/lib/editorial";
import { getCategoryBySlug } from "@/lib/posts";
import { generateHowToSchema, generateBreadcrumbSchema } from "@/lib/schema";

export { generateBreadcrumbSchema } from "@/lib/schema";

type Props = {
  post: EditorialPost;
  url: string;
  data?: never;
} | {
  data: Record<string, unknown> | Record<string, unknown>[];
  post?: never;
  url?: never;
};

export default function JsonLd(props: Props) {
  let data: unknown = props.data;
  if (props.post) {
    const p = props.post;
    const isTech = p.category === "hardware" || p.category === "workflow" || p.category === "stack";
    const articleType = p.category === "news" ? "NewsArticle" : isTech ? "TechArticle" : "Article";

    const howTo = generateHowToSchema(p, props.url);

    data = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": articleType,
          "@id": props.url + "#article",
          headline: p.title,
          description: p.metaDescription,
          abstract: p.verdict,
          ...(isTech ? { proficiencyLevel: "Intermediate" } : {}),
          isAccessibleForFree: true,
          hasPart: p.sections.map(s => ({
            "@type": "WebPageElement",
            "@id": props.url + "#" + sectionId(s.heading),
            name: s.heading,
            url: props.url + "#" + sectionId(s.heading)
          })),
          url: props.url,
          mainEntityOfPage: props.url,
          datePublished: p.publishedAt + "T12:00:00+05:30",
          dateModified: p.updatedAt + "T12:00:00+05:30",
          image: {
            "@type": "ImageObject",
            url: SITE_URL + articleShareImagePath(p.image),
            width: 1200,
            height: 750
          },
          author: {
            "@type": "Organization",
            name: p.author.name,
            url: SITE_URL + "/about"
          },
          publisher: {
            "@id": SITE_URL + "/#organization"
          },
          isPartOf: {
            "@id": SITE_URL + "/#website"
          },
          citation: p.sources.map(s => s.url),
          inLanguage: "en-US",
          speakable: {
            "@type": "SpeakableSpecification",
            cssSelector: [".article-header h1", ".article-deck", ".takeaway p"]
          },
          articleSection: p.topic
        },
        generateBreadcrumbSchema([
          {
            name: "Home",
            url: SITE_URL
          },
          {
            name: getCategoryBySlug(p.category)?.name ?? p.topic,
            url: SITE_URL + "/" + p.category
          },
          {
            name: p.title,
            url: props.url!
          }
        ]),
        ...(howTo ? [howTo] : []),
        ...(faqPageSchema(p.faqs) ? [faqPageSchema(p.faqs)] : [])
      ]
    };
  }
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c")
      }}
    />
  );
}
