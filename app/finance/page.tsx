import Link from "next/link";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata("Finance, Business & Crypto | FyreLinkz", "Understand business costs, financial decisions and crypto risks with primary-source resources and clear educational context.", "/finance");
export default function FinancePage() {
  return <div className="wrap info-page">
    <span className="eyebrow">MONEY, BUSINESS & DIGITAL ASSETS</span>
    <h1>Understand the cost.<br/>Question the promise.</h1>
    <p className="intro">A starting point for understanding money, business and crypto. Educational resources, with original publishers linked for current details.</p>
    <section id="finance"><h2>Finance: begin with risk and fees</h2><p>Before comparing financial products, identify your time horizon, fees and potential losses. Product availability and protections depend on your country.</p><a href="https://www.investor.gov/introduction-investing" rel="noopener noreferrer" target="_blank">Investor.gov: introduction to investing ↗</a></section>
    <section id="business"><h2>Business: calculate the whole cost</h2><p>Separate one-time setup expenses from recurring subscriptions, operations and customer acquisition. An advertised price rarely captures your full operating cost.</p><a href="https://www.sba.gov/business-guide/plan-your-business/calculate-your-startup-costs" rel="noopener noreferrer" target="_blank">US Small Business Administration: startup costs ↗</a><p><Link href="/hardware/ai-workstation-planner">Explore our AI hardware cost planner →</Link></p></section>
    <section id="crypto"><h2>Crypto: examine custody and fraud risks</h2><p>Understand who controls the private keys, which withdrawals are possible and what happens if a platform fails. Promised guaranteed returns are a warning sign. Avoid sharing recovery phrases.</p><a href="https://consumer.ftc.gov/articles/what-know-about-cryptocurrency-scams" rel="noopener noreferrer" target="_blank">FTC: cryptocurrency and scams ↗</a></section>
    <section><h2>Frequently asked questions</h2><h3>Does this page recommend investments?</h3><p>No. It provides educational context and links to primary sources. It does not offer personalized investment, tax or legal advice.</p><h3>Does a finance page guarantee higher advertising revenue?</h3><p>No. Revenue depends on audience, geography, advertiser demand, placement and actual traffic.</p><h3>Are prices and crypto quotes live here?</h3><p>No. This release does not display live market data or trading signals.</p></section>
    <section><h2>Editorial approach</h2><p>We distinguish factual source material from analysis, label commercial relationships and correct material errors. Financial content requires current sources and region-specific context.</p><Link href="/about">About our methodology →</Link></section>
  </div>;
}
