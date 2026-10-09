import Link from "next/link";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata("Contact & corrections", "FyreLinkz contact availability, corrections guidance and RSS subscription options.", "/contact");
export default function Contact() {
  return <div className="wrap info-page"><span className="eyebrow">CONTACT & CORRECTIONS</span><h1>Keep us in the loop<span>.</span></h1><p className="intro">A public contact channel is not available yet. Please check back for an active address.</p><section><h2>Corrections</h2><p>When contact becomes available, include the article address, the claim you are querying and a link to the original source. Clear evidence helps us review a change.</p><Link href="/about#corrections">Read our corrections policy →</Link></section><section><h2>Follow new stories</h2><p>You can follow our articles now using RSS. No registration or email address required.</p><Link href="/rss" className="button-dark">Follow with RSS →</Link></section></div>;
}
