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
  postType?: "comparison" | "guide" | "teardown" | "hardware";
  verdict: string;
  testedDate: string;
  testedHardware: string;
  testingScope: string;
  evidenceBasis?: string;
  whoThisIsFor: string;
  whereItFails: string;
  costPerUsableMinute?: string;
  readTime: string;
  publishedAt: string;
  updatedAt: string;
  author: {
    name: string;
    role: string;
  };
  score?: number;
  badge?: string;
  keySpecs: KeySpec[];
  tableData: MatrixTableRow[];
  sections: { heading: string; content: string; subpoints?: string[] }[];
  faqs: FAQItem[];
  videoComparisons?: VideoComparisonItem[];
}

export interface VideoModelClip {
  modelName: string;
  videoSrc?: string;
  posterSrc: string;
  promptUsed: string;
  costInCredits: string;
  renderTime: string;
  strengths: string[];
  failurePoints: string[];
}

export interface VideoComparisonItem {
  title: string;
  promptDescription: string;
  clipA: VideoModelClip;
  clipB: VideoModelClip;
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
  isNew?: boolean;
}
