import Link from "next/link";
import {ArrowUpRight, ArrowRight, Rss, Layers3, Monitor, BookOpen} from "lucide-react";
import {NEWS, GUIDES} from "@/lib/posts";
import {articlePath, formatDate} from "@/lib/editorial";
import StoryCard from "@/components/StoryCard";
import AdSlot from "@/components/AdSlot";
import ComputeVisual from "@/components/ComputeVisual";
export default function Home() {
  return <div className="wrap home">
    <section className="home-intro">
      <div className="home-intro-main">
        <span className="eyebrow"><i className="signal-dot"/> INDEPENDENT PUBLICATION FOR CREATIVE AI</span>
        <h1>Find your next<br/><span>AI workflow.</span></h1>
        <p>For AI video creators, ComfyUI builders and people choosing local hardware. Sourced guides, model teardowns and reproducible steps—without synthetic claims or noise.</p>
        <div className="home-intro-actions">
          <Link href="/create" className="button-primary">Explore creator guides <ArrowUpRight size={18}/></Link>
          <Link href="/ai-video-models" className="intro-secondary">Browse the AI model directory ↗</Link>
        </div>
      </div>
      <div className="home-intro-visual">
        <ComputeVisual />
      </div>
    </section>
    <div className="section-heading compact-heading"><h2>On the radar</h2><Link href="/news">All news <ArrowRight size={16}/></Link></div>
    <section className="hero-grid" aria-label="Featured stories"><StoryCard post={NEWS[0]} variant="lead" priority/><div className="hero-side">{NEWS.slice(1,3).map(p=><StoryCard key={p.slug} post={p} variant="compact"/>)}</div></section>
    <nav className="discovery-grid" aria-label="Explore FyreLinkz core pillars"><Link href="/create/ai-video-prompt-guide-examples"><Layers3/><div><strong>AI Video Direction</strong><span>Six reproducible prompt structures & shot economics.</span></div><ArrowUpRight/></Link><Link href="/hardware/best-local-ai-workstation-build-guide-2026"><Monitor/><div><strong>Local AI Hardware</strong><span>Workload-first VRAM thresholds & multi-GPU sizing.</span></div><ArrowUpRight/></Link><Link href="/workflow/comfyui-beginner-first-workflow-guide"><BookOpen/><div><strong>ComfyUI Graph Workflows</strong><span>Crash-free node baselines & step-by-step triage.</span></div><ArrowUpRight/></Link></nav>
    <AdSlot placement="home"/>
    <section className="guide-section"><div className="section-heading"><div><span className="eyebrow">FROM RESEARCH TO YOUR NEXT RENDER</span><h2>Learn something. Make something.</h2></div><Link href="/create">Explore guides <ArrowRight size={16}/></Link></div><div className="guide-grid">{GUIDES.map(p=><StoryCard key={p.slug} post={p}/>)}</div></section>
    <div className="middle-grid"><section className="latest"><div className="section-heading"><h2>Latest dispatches</h2><Link href="/news">Newsroom ↗</Link></div>{NEWS.map((p,i)=><article className="news-row" key={p.slug}><span className="news-number">0{i+1}</span><div><div className="story-meta"><span className="eyebrow topic">{p.topic}</span><time dateTime={p.publishedAt}>{formatDate(p.publishedAt)}</time></div><h3><Link href={articlePath(p)}>{p.title}</Link></h3><p>{p.metaDescription}</p></div><Link href={articlePath(p)} className="row-arrow" aria-label={`Read: ${p.title}`}>↗</Link></article>)}</section><aside className="field-note"><span className="eyebrow">YOUR NEXT CREATIVE PROJECT</span><span className="note-asterisk" aria-hidden="true">✳</span><h2>A better workflow.<br/>One useful step at a time.</h2><p>Start with a repeatable image workflow, write a clear video prompt and learn how to judge the output. Our guides connect the steps with original examples and primary sources.</p><Link href="/create" className="button-primary">Find your next guide <ArrowUpRight size={18}/></Link><small>Original explanations · Practical checklists · Sources linked</small></aside></div>
    <section className="rss-banner"><Rss size={30}/><div><span className="eyebrow">KEEP YOUR EDGE</span><h2>Good reads. Straight to your feed.</h2><p>Follow the next release, useful guide and source-backed update in your RSS reader.</p></div><a href="/feed.xml" className="button-secondary">Follow FyreLinkz <ArrowUpRight size={17}/></a></section>
    <section className="editorial-note"><span className="eyebrow">OUR EDITORIAL PROMISE</span><p>Useful first.<br/><strong>Sources always.</strong></p><div>We show where the information comes from, what it means for creators and where our knowledge stops. Vendor claims and hands-on testing are labeled separately.<Link href="/about">Read our approach <ArrowRight size={16}/></Link></div></section>
  </div>;
}
