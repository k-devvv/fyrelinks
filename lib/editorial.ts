import type { ReviewPost } from './types';
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
export interface ArticleInput {
  slug: string;
  category: ReviewPost['category'] | 'news';
  title: string;
  description: string;
  topic: string;
  image: string;
  imageAlt?: string;
  takeaway: string;
  sections: ArticleSection[];
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
  sources: Source[];
  eventDate?: string;
  sourceCheckedAt: string;
  featured: boolean;
  sections: ArticleSection[];
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
    ])
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
      role: 'AI & creative technology'
    },
    keySpecs: [],
    tableData: [],
    faqs: [],
    imageAlt: p.imageAlt ?? `FyreLinkz editorial illustration: ${p.title}`
  };
}
export function articlePath(p: Pick<EditorialPost, 'category' | 'slug'>) {
  return `/${p.category}/${p.slug}`;
}
export function articleShareImagePath(image: string) {
  return `/art/${image}${image.endsWith('-photo') ? '.jpg' : '.png'}`;
}
export function sectionId(h: string) {
  return h.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}
export function formatDate(d: string) {
  return new Intl.DateTimeFormat('en', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC'
  }).format(new Date(d + 'T12:00:00Z'));
}
