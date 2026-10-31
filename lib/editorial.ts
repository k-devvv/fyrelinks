import type { FAQItem, ReviewPost } from './types';
export interface Source {
  title: string;
  url: string;
  publisher: string;
  publishedAt?: string;
}
export interface ArticleTable {
  headers: string[];
  rows: string[][];
}
export interface ArticleSection {
  heading: string;
  content: string;
  subpoints?: string[];
  sourceIds?: number[];
  table?: ArticleTable;
  checklist?: string[];
}
export interface HowToStep {
  name: string;
  text: string;
}
export interface ArticleInput {
  slug: string;
  category: ReviewPost['category'] | 'news' | 'finance';
  title: string;
  description: string;
  topic: string;
  image: string;
  imageAlt?: string;
  imageCaption?: string;
  imageCreditName?: string;
  imageCreditUrl?: string;
  takeaway: string;
  sections: ArticleSection[];
  faqs?: FAQItem[];
  howToSteps?: HowToStep[];
  sources: Source[];
  eventDate?: string;
  publishedAt: string;
  updatedAt: string;
  sourceCheckedAt: string;
  featured?: boolean;
}
export interface EditorialPost extends Omit<ReviewPost, 'category' | 'sections'> {
  category: ArticleInput['category'];
  topic: string;
  image: string;
  imageAlt: string;
  imageCaption?: string;
  imageCreditName?: string;
  imageCreditUrl?: string;
  sources: Source[];
  eventDate?: string;
  sourceCheckedAt: string;
  featured: boolean;
  sections: ArticleSection[];
  howToSteps?: HowToStep[];
}
export const SITE_URL = 'https://www.fyrelinkz.com';
export const SOURCE_CHECK_DATE = '2026-09-12';
export function articleFromInput(p: ArticleInput): EditorialPost {
  const words = [
    p.description,
    p.takeaway,
    ...p.sections.flatMap(s => [
      s.heading,
      s.content,
      ...(s.subpoints ?? []),
      ...(s.checklist ?? []),
      ...(s.table?.headers ?? []),
      ...(s.table?.rows?.flat() ?? [])
    ]),
    ...(p.faqs ?? []).flatMap(f => [f.question, f.answer])
  ].join(' ').split(/\s+/).length;
  return {
    ...p,
    featured: p.featured ?? false,
    metaTitle: p.title,
    metaDescription: p.description,
    postType: p.category === 'hardware' ? 'hardware' : p.category === 'stack' ? 'comparison' : 'guide',
    verdict: p.takeaway,
    testedDate: '',
    testedHardware: '',
    testingScope: 'Based on linked primary sources and FyreLinkz editorial analysis. No independent performance benchmark is claimed.',
    evidenceBasis: p.category === 'news' ? 'Source report' : 'Practical guide',
    whoThisIsFor: '',
    whereItFails: '',
    readTime: `${Math.max(1, Math.ceil(words / 220))} min read`,
    publishedAt: p.publishedAt,
    updatedAt: p.updatedAt,
    author: {
      name: 'FyreLinkz Editorial',
      role: p.category === 'finance' ? 'Financial education & business costs' : 'AI & creative technology'
    },
    keySpecs: [],
    tableData: [],
    faqs: p.faqs ?? [],
    imageAlt: p.imageAlt ?? `FyreLinkz editorial illustration: ${p.title}`
  };
}
export function articlePath(p: Pick<EditorialPost, 'category' | 'slug'>) {
  return `/${p.category}/${p.slug}`;
}
export function articleCardImagePath(image: string) {
  if (image === 'ai-week-roundup-2026') return '/art/ai-week-roundup-2026.jpg';
  if (image === 'reflection-beam-hardware') return '/art/reflection-beam-2026.jpg';
  return `/art/${image}${image.endsWith('-photo') ? '.jpg' : '.webp'}`;
}
export function articleShareImagePath(image: string) {
  if (image === 'ai-week-roundup-2026' || image === 'reflection-beam-hardware') return articleCardImagePath(image);
  return `/art/${image}${image.endsWith('-photo') ? '.jpg' : '.png'}`;
}
export function articleImageDimensions(image: string) {
  if (['moss-layout-oct21-photo', 'spark-petaflop-oct21-photo'].includes(image)) return { width: 1200, height: 675 };
  if (image === 'ai-week-oct11-research-photo') return { width: 1200, height: 800 };
  if (image === 'samsung-littlebit-photo') return { width: 1672, height: 941 };
  if (['samsung-ai-infrastructure-photo', 'autonomous-science-robotics-photo', 'ai-genomics-clinical-research-photo'].includes(image)) return { width: 1586, height: 992 };
  if (image === 'reflection-beam-hardware') return { width: 1586, height: 992 };
  if (image === 'ai-week-roundup-2026') return { width: 1200, height: 800 };
  if (image === 'jev-needle-small-models-photo' || image === 'taomate-h3-streaming-photo') return { width: 1200, height: 630 };
  return { width: 1200, height: 750 };
}
export function sectionId(h: string) {
  return h.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}
export function faqPageSchema(faqs: FAQItem[]) {
  if (!faqs.length) return undefined;
  return {
    "@type": "FAQPage",
    mainEntity: faqs.map(faq => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer }
    }))
  };
}
export function techArticleSchema(input: { headline: string; description: string; url: string; datePublished: string; dateModified: string }) {
  return {
    "@type": "TechArticle",
    headline: input.headline,
    description: input.description,
    url: input.url,
    mainEntityOfPage: input.url,
    datePublished: input.datePublished,
    dateModified: input.dateModified
  };
}
export function howToSchema(name: string, description: string, steps: HowToStep[]) {
  if (!steps.length) return undefined;
  return {
    "@type": "HowTo",
    name,
    description,
    step: steps.map((step, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: step.name,
      text: step.text
    }))
  };
}
export function softwareApplicationSchema(input: { name: string; url: string; operatingSystem: string; applicationCategory: string }) {
  return {
    "@type": "SoftwareApplication",
    name: input.name,
    url: input.url,
    operatingSystem: input.operatingSystem,
    applicationCategory: input.applicationCategory
  };
}
export function formatDate(d: string) {
  return new Intl.DateTimeFormat('en', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC'
  }).format(new Date(d + 'T12:00:00Z'));
}
