import type { EditorialPost } from "@/lib/editorial";
import { SITE_URL } from "@/lib/editorial";
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
    data = {
      "@context": "https://schema.org",
      "@graph": [{
        "@type": p.category === "news" ? "NewsArticle" : "Article",
        "@id": props.url + "#article",
        headline: p.title,
        description: p.metaDescription,
        url: props.url,
        mainEntityOfPage: props.url,
        datePublished: p.publishedAt + "T12:00:00+05:30",
        dateModified: p.updatedAt + "T12:00:00+05:30",
        image: {
          '@type': 'ImageObject',
          url: SITE_URL + '/art/' + p.image + '.png',
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
      }])]
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
