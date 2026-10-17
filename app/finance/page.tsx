import Link from "next/link";
import StoryCard from "@/components/StoryCard";
import ReadingPaths from "@/components/ReadingPaths";
import JsonLd, { generateBreadcrumbSchema } from "@/components/JsonLd";
import { SITE_URL, articlePath, sectionId } from "@/lib/editorial";
import { getPostsByCategory } from "@/lib/posts";

import AdSlot from "@/components/AdSlot";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata("Finance guides: savings, fees, business costs & crypto safety", "Understand business costs, financial decisions and crypto risks with primary-source resources and clear educational context.", "/finance");
const financeFaqs = [
  {
    "question": "Does this page recommend investments?",
    "answer": "No. It provides educational context and links to primary sources. It does not offer personalized investment, tax or legal advice."
  },
  {
    "question": "How should I compare financial costs across countries?",
    "answer": "Check product availability, currency, fees, taxes and the protections that apply in your country. A US example or advertised rate does not establish the terms available to you."
  },
  {
    "question": "Are prices and crypto quotes live here?",
    "answer": "No. This page does not display live market data or trading signals."
  }
];
export default function FinancePage() {
  const posts = getPostsByCategory("finance");
  const url = SITE_URL + "/finance";
  return <div className="wrap info-page">
    <JsonLd data={[{
      "@context":"https://schema.org", "@type":"CollectionPage", "@id":url+"#webpage", url, name:"Finance, business costs and crypto safety guides", description:"Source-linked financial education covering savings, fees, business costs and fraud awareness.", inLanguage:"en",
      isPartOf:{"@id":SITE_URL+"/#website"}, mainEntity:{"@type":"ItemList",numberOfItems:posts.length,itemListElement:posts.map((post,index)=>({"@type":"ListItem",position:index+1,name:post.title,url:SITE_URL+articlePath(post)}))}
    }, generateBreadcrumbSchema([{name:"Home",url:SITE_URL},{name:"Finance",url}]), {
      "@context":"https://schema.org", "@type":"FAQPage","@id":url+"#faq",url:url+"#faq",mainEntity:financeFaqs.map(faq=>({"@type":"Question","@id":url+"#faq-"+sectionId(faq.question),name:faq.question,acceptedAnswer:{"@type":"Answer",text:faq.answer}}))
    }]} />
    <nav className="breadcrumbs" aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><span aria-current="page">Finance</span></nav>
    <span className="eyebrow">MONEY, BUSINESS & DIGITAL ASSETS</span>
    <h1>Finance, business costs<br/>and crypto safety.</h1>
    <p className="intro">A starting point for understanding money, business and crypto. Educational resources, with original publishers linked for current details.</p>
    <ReadingPaths category="finance" />
    <section aria-labelledby="finance-guides-heading"><span className="eyebrow">SOURCE-LINKED FINANCIAL EDUCATION</span><h2 id="finance-guides-heading">Understand your next money decision.</h2><p>US data and sources are labeled. Examples explain the arithmetic; they are not personalized investment, tax or legal advice.</p><div className="guide-grid">{posts.map(post => <StoryCard key={post.slug} post={post} />)}</div></section>
    <section id="finance"><h2>Finance: begin with risk and fees</h2><p>Before comparing financial products, identify your time horizon, fees and potential losses. Product availability and protections depend on your country.</p><a href="https://www.investor.gov/introduction-investing" rel="noopener noreferrer" target="_blank">Investor.gov: introduction to investing ↗</a></section>
    <section id="business"><h2>Business: calculate the whole cost</h2><p>Separate one-time setup expenses from recurring subscriptions, operations and customer acquisition. An advertised price rarely captures your full operating cost.</p><a href="https://www.sba.gov/counseling/plan-your-business/" rel="noopener noreferrer" target="_blank">US Small Business Administration: business planning ↗</a><p><Link href="/stack/local-vs-cloud-ai-cost-per-accepted-task">Compare local and cloud AI business costs →</Link></p><p><Link href="/hardware/ai-workstation-planner">Explore our AI hardware cost planner →</Link></p></section>
    <AdSlot placement="article" />
    <section id="crypto"><h2>Crypto: examine custody and fraud risks</h2><p>Understand who controls the private keys, which withdrawals are possible and what happens if a platform fails. Promised guaranteed returns are a warning sign. Avoid sharing recovery phrases.</p><a href="https://consumer.ftc.gov/articles/what-know-about-cryptocurrency-scams" rel="noopener noreferrer" target="_blank">FTC: cryptocurrency and scams ↗</a></section>
    <section className="article-faq" id="faq" aria-labelledby="faq-heading"><h2 id="faq-heading">Frequently asked questions</h2>{financeFaqs.map(faq=><details id={"faq-"+sectionId(faq.question)} key={faq.question}><summary>{faq.question}</summary><p>{faq.answer}</p></details>)}</section>
    <section><h2>Editorial approach</h2><p>We distinguish factual source material from analysis, label commercial relationships and correct material errors. Financial content requires current sources and region-specific context.</p><Link href="/about">About our methodology →</Link></section>
  </div>;
}
