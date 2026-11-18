import data from './content/articles.json';
import qwenExperiment from './content/qwen-context-experiment.json';
import { articleFromInput, type ArticleInput } from './editorial';
export const CATEGORIES = [{
  slug: 'finance',
  name: 'Finance',
  metaTitle: 'Finance, business costs and crypto safety guides',
  description: 'Source-linked financial education: inflation, savings, investing costs, business planning and fraud awareness.'
}, {
  slug: 'news',
  name: 'News',
  metaTitle: 'AI news: model releases, research and practical implications',
  description: 'What changed in creative AI, why it matters, and where to read the original announcement.'
}, {
  slug: 'create',
  name: 'AI video & images',
  metaTitle: 'AI video and image guides: models, prompts and ComfyUI',
  description: 'Understand video models, diffusion workflows and the work behind a usable result.'
}, {
  slug: 'workflow',
  name: 'Guides',
  metaTitle: 'AI workflow guides: ComfyUI, coding tools and local LLMs',
  description: 'Clear starting points for ComfyUI, coding tools and creative workflows. Practical steps, with sources you can inspect.'
}, {
  slug: 'hardware',
  name: 'Hardware',
  metaTitle: 'Local AI hardware: GPU memory, laptops and PC builds',
  description: 'Plan a local AI workstation around your models, memory requirements and actual workload.'
}, {
  slug: 'stack',
  name: 'Comparisons',
  metaTitle: 'AI tool comparisons: RAG, vector databases and data workflows',
  description: 'Compare tools by workflow, operating costs and requirements. Make a shortlist that fits your project.'
}];
export const POSTS = ([qwenExperiment, ...data] as ArticleInput[]).map(articleFromInput);
// Posts outside the site's focus (local AI on consumer GPUs). They stay online for existing
// links but are kept out of search engines, the sitemap, feeds and on-site listings.
export const OFF_TOPIC = new Set<string>([
  'inflation-savings-fd-stock-market-falls-gold-india',
  'zero-percent-balance-transfer-fee-payoff-example',
  'high-yield-savings-vs-cd-apy-access-penalties',
  'credit-card-apr-daily-interest-example',
  'us-inflation-september-2026-cpi-household-budget',
  'emergency-fund-savings-account-checklist',
  'investment-fees-expense-ratio-cost-example',
  'small-business-break-even-fixed-variable-costs',
  'crypto-investment-scams-wallet-recovery-fee-checklist',
  'carbon-x-dna-language-model-research-limits',
  'openai-research-agents-brain-data-hypotheses',
  'google-willow-magic-state-cultivation-quantum-evidence',
  'roboparty-rp1-open-humanoid-stack-hardware-software',
  'pingpongduo-humanoid-doubles-coordination-research',
  'mistral-ai-altair1-satellite-earth-orbit',
  'samsung-helix-ai-infrastructure-investment',
  'doe-selects-four-robotics-testbeds-autonomous-science',
  'vanderbilt-magen-ai-genomics-grants-clinical-translation',
  'anthropic-claude-wet-lab-art-enzyme-system',
  'alphaprotein-novo-enzyme-design-evidence-terms',
  'botanic1-gemma-plant-genomics-evidence',
  'openai-math-results-lean-withdrawals-review',
  'vals-room-temperature-magnetic-semiconductor-candidates',
  'flashdexretarget-robot-hand-retargeting-benchmark',
  'terra-terrain-musculoskeletal-locomotion-research',
  'grad-conjecture-counterexamples-lean-plasma',
  'napoleon-marmont-cipher-ai-reproducibility',
  'landreman-analytic-3d-equilibria-ai-plasma',
]);
export const isOffTopic = (slug: string) => OFF_TOPIC.has(slug);
export const LISTED = POSTS.filter(p => !OFF_TOPIC.has(p.slug));
export const NEWS = LISTED.filter(p => p.category === 'news').sort((a, b) => (b.eventDate ?? b.publishedAt).localeCompare(a.eventDate ?? a.publishedAt));
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

    // Connect release coverage to practical image workflows across categories.
    const imageTopic = /(?:^|[\s-])(?:image|images|sdxl|flux|ideogram|diffusion|img2img|lora)(?:[\s-]|$)/;
    if (imageTopic.test(pSlug + ' ' + pTopic) && imageTopic.test(cSlug + ' ' + cTopic)) {
      score += 85;
      if (p.category === 'news' && candidate.category !== 'news') score += 30;
    }

    const roboticsTopic = /robot|humanoid|tactile/;
    if (roboticsTopic.test(pSlug + ' ' + pTopic) && roboticsTopic.test(cSlug + ' ' + cTopic)) score += 85;

    const biologyTopic = /protein|genom|healthcare|clinical|biology/;
    if (biologyTopic.test(pSlug + ' ' + pTopic) && biologyTopic.test(cSlug + ' ' + cTopic)) score += 85;

    // Financial education should lead to other financial education.
    if (p.category === 'finance' && candidate.category === 'finance') score += 150;

    // Enterprise infrastructure & governance
    const isPGov = pTopic.includes('governance') || pTopic.includes('enterprise') || pSlug.includes('eu-ai-act') || pSlug.includes('openshift');
    const isCGov = cTopic.includes('governance') || cTopic.includes('enterprise') || cSlug.includes('eu-ai-act') || cSlug.includes('openshift');
    if (isPGov && isCGov) score += 90;

    // Data pipelines, RAG, scraping & agents
    const isPRag = /(?:^|-)rag(?:-|$)/.test(pSlug) || pSlug.includes('agent') || pSlug.includes('vector') || pSlug.includes('scraping');
    const isCRag = /(?:^|-)rag(?:-|$)/.test(cSlug) || cSlug.includes('agent') || cSlug.includes('vector') || cSlug.includes('scraping');
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
  return (isOffTopic(slug) ? POSTS : LISTED)
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
