import type { EditorialPost } from "@/lib/editorial";
import { SITE_URL, articleShareImagePath, articleImageDimensions, sectionId, faqPageSchema, techArticleSchema, howToSchema, softwareApplicationSchema } from "@/lib/editorial";
import { getCategoryBySlug } from "@/lib/posts";
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
    const published = p.publishedAt + "T12:00:00+05:30";
    const modified = p.updatedAt + "T12:00:00+05:30";
    const isTechnical = p.category === "workflow" || p.category === "hardware";
    const articleBase = isTechnical
      ? techArticleSchema({ headline: p.title, description: p.metaDescription, url: props.url!, datePublished: published, dateModified: modified })
      : { "@type": p.category === "news" ? "NewsArticle" : "Article", headline: p.title, description: p.metaDescription, url: props.url! };
    const appSchema = p.slug === "comfyui-beginner-first-workflow-guide"
      ? softwareApplicationSchema({ name: "ComfyUI", url: "https://www.comfy.org/", operatingSystem: "Windows, macOS (Apple Silicon), Linux", applicationCategory: "MultimediaApplication" })
      : undefined;
    const howTo = p.howToSteps?.length ? howToSchema(p.title, p.metaDescription, p.howToSteps) : undefined;
    data = {
      "@context": "https://schema.org",
      "@graph": [{
        ...articleBase,
        "@id": props.url + "#article",
        headline: p.title,
        description: p.metaDescription,
        abstract: p.verdict,
        isAccessibleForFree: true,
        hasPart: p.sections.map(s => ({
          "@type": "WebPageElement",
          "@id": props.url + "#" + sectionId(s.heading),
          name: s.heading,
          url: props.url + "#" + sectionId(s.heading)
        })),
        url: props.url,
        mainEntityOfPage: props.url,
        datePublished: published,
        dateModified: modified,
        image: {
          '@type': 'ImageObject',
          url: SITE_URL + articleShareImagePath(p.image),
          contentUrl: SITE_URL + articleShareImagePath(p.image),
          caption: p.imageCaption ?? p.imageAlt,
          description: p.imageAlt,
          ...articleImageDimensions(p.image)
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
        inLanguage: "en",
        articleSection: p.topic
      }, generateBreadcrumbSchema([{
        name: "Home",
        url: SITE_URL
      }, {
        name: getCategoryBySlug(p.category)?.name ?? p.topic,
        url: SITE_URL + "/" + p.category
      }, {
        name: p.title,
        url: props.url!
      }]), ...(faqPageSchema(p.faqs) ? [faqPageSchema(p.faqs)] : []), ...(howTo ? [howTo] : []), ...(appSchema ? [appSchema] : [])]
    };
  }
  return <script type="application/ld+json" dangerouslySetInnerHTML={{
    __html: JSON.stringify(data).replace(/</g, "\\u003c")
  }} />;
}
export function generateBreadcrumbSchema(items: {
  name: string;
  url: string;
}[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((i, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: i.name,
      item: i.url
    }))
  };
}
