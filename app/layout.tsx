import type { Metadata, Viewport } from "next";
import "./globals.css";
import "./tech-theme.css";
import "./studio.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Analytics from "@/components/Analytics";
import ScrollReveal from "@/components/ScrollReveal";
import PointerAccent from "@/components/PointerAccent";
import JsonLd from "@/components/JsonLd";
import { POSTS } from "@/lib/posts";
import { SITE_URL, articlePath } from "@/lib/editorial";
export const viewport: Viewport = {
  themeColor: "#f7f3eb",
  width: "device-width",
  initialScale: 1
};
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "FyreLinkz — AI news, creative tools & practical guides",
    template: "%s | FyreLinkz"
  },
  description: "Less noise. More making. Sourced AI news, ComfyUI guides and local hardware advice for people creating with technology.",
  alternates: {
    canonical: SITE_URL,
    types: {
      "application/rss+xml": SITE_URL + "/feed.xml"
    }
  },
  openGraph: {
    title: "FyreLinkz — AI news, creative tools & practical guides",
    description: "Less noise. More making. Sourced AI news, ComfyUI guides and local hardware advice for people creating with technology.",
    type: "website",
    locale: "en_US",
    siteName: "FyreLinkz",
    url: SITE_URL,
    images: [{
      url: "/art/cover.png",
      width: 1200,
      height: 750
    }]
  },
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    apple: [{ url: "/brand/symbol.svg" }]
  },
  twitter: {
    card: "summary_large_image",
    images: ["/art/cover.png"]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1
    }
  }
};
export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return <html lang="en"><head><script dangerouslySetInnerHTML={{ __html: `(()=>{try{const t=localStorage.getItem('fyrelinkz-theme');const d=window.matchMedia('(prefers-color-scheme: dark)').matches;document.documentElement.dataset.theme=t==='light'||t==='dark'?t:d?'dark':'light'}catch{}})()` }} /></head><body><a href="#main-content" className="skip-link">Skip to content</a><PointerAccent /><JsonLd data={[{
        "@context": "https://schema.org",
        "@type": "Organization",
        "@id": SITE_URL + "/#organization",
        name: "FyreLinkz",
        url: SITE_URL,
        logo: SITE_URL + "/brand/symbol.svg",
        publishingPrinciples: SITE_URL + "/about"
      }, {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "@id": SITE_URL + "/#website",
        name: "FyreLinkz",
        url: SITE_URL,
        publisher: {
          "@id": SITE_URL + "/#organization"
        }
      }]} /><Navbar records={[{title:"AI video model directory",href:"/ai-video-models",topic:"Models",description:"Kling Seedance Sora Veo Hailuo Ray Pika model pricing"}, ...POSTS.map(p => ({
        title: p.title,
        href: articlePath(p),
        topic: p.topic,
        description: p.metaDescription
      }))]} /><main id="main-content" tabIndex={-1}>{children}</main><Footer /><Analytics /><ScrollReveal /></body></html>;
}
