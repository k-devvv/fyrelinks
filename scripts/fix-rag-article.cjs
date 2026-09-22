const fs = require('fs');
const path = require('path');

const articlesPath = path.join(__dirname, '..', 'lib', 'content', 'articles.json');
const articles = JSON.parse(fs.readFileSync(articlesPath, 'utf8'));

const existingRag = articles.find(a => a.slug === 'ai-web-scraping-pipelines-firecrawl-playwright-rag');
if (existingRag) {
  existingRag.takeaway = 'Direct Answer: Use Playwright when your RAG pipeline requires full local control over authenticated sessions, custom browser actions, or on-premise privacy without per-page cloud costs. Choose Firecrawl when you need clean, LLM-ready markdown extracted through managed proxies without maintaining headless browser infrastructure. For verifiable citations, always store the source URL and paragraph heading with each extracted chunk.';
  existingRag.updatedAt = '2026-09-22';

  // Add comparison table to "Define the output contract"
  const s1 = existingRag.sections.find(s => s.heading === 'Define the output contract');
  if (s1) {
    s1.table = {
      headers: ['Criterion', 'Playwright (Self-Hosted)', 'Firecrawl (Managed API)', 'Architectural Choice'],
      rows: [
        ['Infrastructure Cost', 'Compute only (Run locally / VM)', 'Usage-based per-credit pricing', 'Playwright for high-volume batch runs'],
        ['JavaScript Rendering', 'Full Chromium / WebKit engine', 'Handled on managed server', 'Both render dynamic client-side DOMs'],
        ['Proxy & Anti-Bot', 'Self-managed proxy rotation', 'Built-in residential proxy pool', 'Firecrawl for heavily protected sites'],
        ['Citation Metadata', 'Custom DOM extraction logic', 'Automated markdown with titles', 'Playwright gives granular anchor control'],
        ['Maintenance Overhead', 'Browser binaries & crash restarts', 'Zero browser maintenance (REST API)', 'Firecrawl for fast developer velocity']
      ]
    };
  }

  // Check if citation pipeline section already exists, if not insert it before "Try this next"
  let sCite = existingRag.sections.find(s => s.heading === 'Build a Playwright extraction pipeline with verifiable citations');
  if (!sCite) {
    sCite = {
      heading: 'Build a Playwright extraction pipeline with verifiable citations',
      content: 'When extracting web pages for RAG, dumping raw HTML or unsegmented text destroys citation capability. An effective Playwright extraction pipeline strips noise elements (nav, header, footer, ads, SVG icons), preserves semantic hierarchy (h1, h2, h3), and partitions text into 400–600 token chunks. Each stored vector record must carry metadata: canonical source_url, page_title, heading_anchor, and extraction_timestamp. This allows the answering LLM to provide clickable, verifiable footnotes rather than ungrounded claims.',
      checklist: [
        'Launch Playwright with minimal resource overhead: playwright.chromium.launch({ headless: true }).',
        'Wait for network idle or main content selector before scraping: page.waitForSelector("article, main").',
        'Remove non-editorial nodes from DOM: document.querySelectorAll("nav, footer, aside, script, style").forEach(el => el.remove()).',
        'Extract text segmented by heading boundaries to preserve topical integrity.',
        'Append source_url, title, and section_id to every chunk payload in the vector database.',
        'Prompt LLM to cite document [source_url#heading] whenever asserting a factual claim.'
      ],
      sourceIds: [2]
    };
    // insert right before the last section ("Try this next")
    const tryNextIdx = existingRag.sections.findIndex(s => s.heading === 'Try this next');
    if (tryNextIdx >= 0) {
      existingRag.sections.splice(tryNextIdx, 0, sCite);
    } else {
      existingRag.sections.push(sCite);
    }
  }
}

fs.writeFileSync(articlesPath, JSON.stringify(articles, null, 2), 'utf8');
console.log('Successfully enriched ai-web-scraping-pipelines-firecrawl-playwright-rag with table and checklist.');
