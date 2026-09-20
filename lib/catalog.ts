import data from './content/articles.json';
import { articleFromInput, type ArticleInput } from './editorial';
export const CATEGORIES = [{
  slug: 'news',
  name: 'News',
  description: 'What changed in creative AI, why it matters, and where to read the original announcement.'
}, {
  slug: 'create',
  name: 'AI video & images',
  description: 'Understand video models, diffusion workflows and the work behind a usable result.'
}, {
  slug: 'workflow',
  name: 'Guides',
  description: 'Clear starting points for ComfyUI, coding tools and creative workflows. Practical steps, with sources you can inspect.'
}, {
  slug: 'hardware',
  name: 'Hardware',
  description: 'Plan a local AI workstation around your models, memory requirements and actual workload.'
}, {
  slug: 'stack',
  name: 'Comparisons',
  description: 'Compare tools by workflow, operating costs and requirements. Make a shortlist that fits your project.'
}];
export const POSTS = (data as ArticleInput[]).map(articleFromInput);
export const NEWS = POSTS.filter(p => p.category === 'news').sort((a, b) => (b.eventDate ?? b.publishedAt).localeCompare(a.eventDate ?? a.publishedAt));
export const GUIDES = POSTS.filter(p => p.featured && p.category !== 'news');
export function getPostBySlug(category: string, slug: string) {
  return POSTS.find(p => p.category === category && p.slug === slug);
}
export function getPostsByCategory(category: string) {
  return POSTS.filter(p => p.category === category);
}
export function getCategoryBySlug(slug: string) {
  return CATEGORIES.find(c => c.slug === slug);
}
export function getRelatedPosts(slug: string, limit = 3) {
  const p = POSTS.find(p => p.slug === slug);
  return POSTS.filter(x => x.slug !== slug).sort((a, b) => Number(b.topic === p?.topic) - Number(a.topic === p?.topic) || Number(b.category === p?.category) - Number(a.category === p?.category)).slice(0, limit);
}
export function getFeaturedPosts() {
  return GUIDES;
}
export function getAllCategoriesWithLegacy() {
  return CATEGORIES;
}
