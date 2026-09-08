export interface Category {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  icon: string;
  accentColor: string;
  bannerGradient: string;
  featuredArticleSlug: string;
}

export interface Author {
  name: string;
  role: string;
  avatar: string;
  bio: string;
  verifiedReviewer: boolean;
}

export interface SpecItem {
  label: string;
  value: string;
  highlight?: boolean;
}

export interface ComparisonProduct {
  id: string;
  name: string;
  brand: string;
  badge?: "Editor's Choice" | "Best Value" | "Runner Up" | "Fastest Pick" | "Premium Pick";
  score: number;
  rating: number; // out of 5
  reviewCount: number;
  price: string;
  originalPrice?: string;
  affiliateUrl: string;
  specs: Record<string, string>;
  pros: string[];
  cons: string[];
  ctaText: string;
  featured?: boolean;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface ReviewSection {
  id: string;
  title: string;
  content: string[];
  callout?: {
    type: "tip" | "warning" | "benchmark" | "quote";
    title: string;
    text: string;
  };
}

export interface ReviewPost {
  id: string;
  slug: string;
  category: string;
  categoryName: string;
  title: string;
  subtitle: string;
  metaTitle: string;
  metaDescription: string;
  excerpt: string;
  publishedAt: string;
  updatedAt: string;
  readTime: string;
  featured: boolean;
  trending: boolean;
  author: Author;
  heroImage: string;
  product: {
    name: string;
    brand: string;
    model: string;
    price: string;
    originalPrice?: string;
    discountPercent?: string;
    currency: string;
    sku: string;
    rating: number; // 0 - 10
    starRating: number; // 0 - 5
    reviewCount: number;
    affiliateUrl: string;
    ctaText: string;
    seller: string;
    inStock: boolean;
    releaseYear: number;
  };
  verdict: {
    score: number;
    badge: string;
    summary: string;
    bottomLine: string;
    bestFor: string;
    skipIf: string;
  };
  pros: string[];
  cons: string[];
  specs: SpecItem[];
  sections: ReviewSection[];
  comparisonTable: {
    title: string;
    description: string;
    specKeys: { key: string; label: string }[];
    products: ComparisonProduct[];
  };
  faqs: FAQItem[];
  relatedSlugs: string[];
}
