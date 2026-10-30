import type { Metadata } from "next";
import Link from "next/link";
export const metadata: Metadata = { title: "Page not found", robots: { index: false, follow: true } };
export default function NotFound() {
  return <div className="wrap not-found" data-no-ads=""><span className="eyebrow">404 · OFF THE TRAIL</span><h1>This link lost its spark.</h1><p>The page does not exist. Find a new starting point in our latest stories.</p><Link href="/" className="button-dark">Back to FyreLinkz →</Link></div>;
}
