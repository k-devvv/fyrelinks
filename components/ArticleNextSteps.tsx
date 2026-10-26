import Link from 'next/link';
import { POSTS } from '@/lib/posts';
import { articlePath } from '@/lib/editorial';
import { readingJourney } from '@/lib/reading-clusters';
export default function ArticleNextSteps({slug}: {slug: string}) {
  const journey = readingJourney(slug);
  if (!journey) return null;
  const posts = journey.next.map(s => POSTS.find(p => p.slug === s)).filter(p => p !== undefined);
  return <section className="article-next-steps" aria-labelledby="next-steps-heading">
    <span className="eyebrow">CONTINUE THE WORKFLOW</span><h2 id="next-steps-heading">{journey.name}</h2><p>{journey.why}</p>
    <ul>{posts.map(p => <li key={p.slug}><Link href={articlePath(p)}>{p.title}</Link><p>{p.metaDescription}</p></li>)}</ul>
    {slug === 'ai-web-scraping-pipelines-firecrawl-playwright-rag' && <div><h3>Run our original extraction check</h3><p>Our standard-library Python parser recovered both fictional plans and matched the expected JSON on 26 October 2026. This checks one static HTML fixture only; it does not benchmark Firecrawl, Scrapling or Playwright, JavaScript rendering or a real commercial site.</p><p>Download the <a href="/downloads/extraction-check.py">reproducible Python script</a>, <a href="/downloads/extraction-practice.html">fictional HTML fixture</a>, <a href="/downloads/extraction-practice-expected.json">expected JSON</a> and <a href="/downloads/extraction-check-result.json">actual result with source hashes</a>. Keep these files together and run <code>python extraction-check.py</code>. The test makes no network requests.</p></div>}
  </section>;
}
