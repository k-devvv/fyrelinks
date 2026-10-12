import type {Metadata} from 'next';
import Link from 'next/link';
import EntryGate from '@/components/EntryGate';
import './style.css';
import {site} from '@/lib/catalog';
export const metadata:Metadata={metadataBase:new URL(site),title:{default:'WildWeights — local models, clear setup guides',template:'%s | WildWeights'},description:'Explore local AI model workflows, quantizations and adapters. Sourced setup guides with honest memory and licence caveats.'};
export default function Layout({children}:{children:React.ReactNode}){return <html lang="en"><body><EntryGate><a className="skip" href="#main">Skip to content</a><header><Link className="brand" href="/">W<span>↗</span> WILDWEIGHTS</Link><nav><Link href="/#directory">Directory</Link><Link href="/standards">Standards</Link><Link href="/signup">Account ↗</Link></nav></header>{children}<footer><strong>Independent guides. Local execution.</strong><div><Link href="/privacy">Privacy</Link><Link href="/standards">Content & terms</Link><a href="https://www.fyrelinkz.com">FyreLinkz ↗</a></div><small>No hosted inference. No user uploads. No independently measured performance claims.</small></footer></EntryGate></body></html>}

