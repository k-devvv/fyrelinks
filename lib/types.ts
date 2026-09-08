export type SiloCategory = "stack" | "create" | "workflow" | "hardware";

export interface FAQItem {
  question: string;
  answer: string;
}

export interface KeySpec {
  label: string;
  value: string;
}

export interface MatrixTableRow {
  name: string;
  metricOrType: string;
  priceOrLicense: string;
  highlight: string;
  verdict: string;
  score?: number;
  badge?: string;
  affiliateUrl?: string;
  redirectUrl?: string;
}

export interface ReviewPost {
  slug: string;
  category: SiloCategory;
  title: string;
  metaTitle: string;
  metaDescription: string;
  verdict: string;
  cpcTier: string;
  readTime: string;
  publishedAt: string;
  updatedAt: string;
  author: {
    name: string;
    role: string;
  };
  score: number;
  badge: string;
  keySpecs: KeySpec[];
  tableData: MatrixTableRow[];
  sections: { heading: string; content: string }[];
  faqs: FAQItem[];
}

export interface Category {
  id: string;
  slug: SiloCategory;
  name: string;
  shortDescription: string;
  description: string;
  icon: string;
  accentColor: string;
  bannerGradient: string;
  featuredArticleSlug: string;
  tier?: string;
  cpcRange?: string;
  isNew?: boolean;
}
