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
export function getRelatedPosts(slug: string, limit = 3, excludeSlugs: string[] = []) {
  const p = POSTS.find(x => x.slug === slug);
  if (!p) return POSTS.slice(0, limit);

  const getScore = (candidate: typeof p) => {
    let score = 0;
    if (candidate.topic === p.topic) score += 100;

    const pSlug = p.slug.toLowerCase(), cSlug = candidate.slug.toLowerCase();
    const pTopic = p.topic.toLowerCase(), cTopic = candidate.topic.toLowerCase();

    // ComfyUI ecosystem
    const isPComfy = pTopic.includes('comfy') || pSlug.includes('comfy');
    const isCComfy = cTopic.includes('comfy') || cSlug.includes('comfy');
    if (isPComfy && isCComfy) score += 80;

    // AI Video & Motion tools
    const isPVideo = pTopic.includes('video') || pSlug.includes('video') || pSlug.includes('runway');
    const isCVideo = cTopic.includes('video') || cSlug.includes('video') || cSlug.includes('runway');
    if (isPVideo && isCVideo) score += 80;

    // Local AI, GPU hardware & memory sizing
    const isPLocal = pTopic.includes('local') || pTopic.includes('hardware') || pSlug.includes('vram') || pSlug.includes('workstation') || pSlug.includes('laptop') || pSlug.includes('gpu');
    const isCLocal = cTopic.includes('local') || cTopic.includes('hardware') || cSlug.includes('vram') || cSlug.includes('workstation') || cSlug.includes('laptop') || cSlug.includes('gpu');
    if (isPLocal && isCLocal) score += 80;

    // Enterprise infrastructure & governance
    const isPGov = pTopic.includes('governance') || pTopic.includes('enterprise') || pSlug.includes('eu-ai-act') || pSlug.includes('openshift');
    const isCGov = cTopic.includes('governance') || cTopic.includes('enterprise') || cSlug.includes('eu-ai-act') || cSlug.includes('openshift');
    if (isPGov && isCGov) score += 90;

    // Data pipelines, RAG, scraping & agents
    const isPRag = pSlug.includes('rag') || pSlug.includes('agent') || pSlug.includes('vector') || pSlug.includes('scraping');
    const isCRag = cSlug.includes('rag') || cSlug.includes('agent') || cSlug.includes('vector') || cSlug.includes('scraping');
    if (isPRag && isCRag) score += 70;

    // General developer tools / engineering stack
    const isPDev = pTopic.includes('developer') || pTopic.includes('enterprise') || pTopic.includes('governance');
    const isCDev = cTopic.includes('developer') || cTopic.includes('enterprise') || cTopic.includes('governance');
    if (isPDev && isCDev) score += 40;

    // Category affinity
    if (candidate.category === p.category) score += 20;

    return score;
  };

  const exclusions = new Set([slug, ...excludeSlugs]);
  return POSTS
    .filter(x => !exclusions.has(x.slug))
    .sort((a, b) => {
      const diff = getScore(b) - getScore(a);
      if (diff !== 0) return diff;
      return (b.updatedAt || b.publishedAt).localeCompare(a.updatedAt || a.publishedAt);
    })
    .slice(0, limit);
}
export function getFeaturedPosts() {
  return GUIDES;
}
export function getAllCategoriesWithLegacy() {
  return CATEGORIES;
}
