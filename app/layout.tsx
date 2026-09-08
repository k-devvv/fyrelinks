import type { Metadata, Viewport } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";

export const viewport: Viewport = {
  themeColor: "#080B11",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://fyrelinkz.com"),
  title: {
    default: "FyreLinkz | Verified Tech Reviews & AI Benchmarks",
    template: "%s | FyreLinkz",
  },
  description:
    "Independent hardware benchmarks, SaaS pricing teardowns, and generative AI workflow matrices.",
  keywords: [
    "tech reviews",
    "developer hardware",
    "AI video generation",
    "B2B data enrichment",
    "async engineering",
    "4K 144Hz monitors",
    "AI benchmarks",
    "SaaS pricing",
    "fyrelinkz",
  ],
  authors: [{ name: "FyreLinkz Editorial Board" }],
  creator: "FyreLinkz Media Inc.",
  publisher: "FyreLinkz Media Inc.",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "https://fyrelinkz.com",
    languages: {
      "en-US": "https://fyrelinkz.com",
      "en-GB": "https://fyrelinkz.com",
      "en-CA": "https://fyrelinkz.com",
      "en-AU": "https://fyrelinkz.com",
      "x-default": "https://fyrelinkz.com",
    },
  },
  verification: {
    google: "YOUR_GOOGLE_VERIFICATION_TOKEN_HERE",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://fyrelinkz.com",
    siteName: "FyreLinkz",
    title: "FyreLinkz | Verified Tech Reviews & AI Benchmarks",
    description:
      "Independent hardware benchmarks, SaaS pricing teardowns, and generative AI workflow matrices.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&h=630&q=80",
        width: 1200,
        height: 630,
        alt: "FyreLinkz Editorial Review Lab",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FyreLinkz | Verified Tech Reviews & AI Benchmarks",
    description:
      "Independent hardware benchmarks, SaaS pricing teardowns, and generative AI workflow matrices.",
    images: [
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&h=630&q=80",
    ],
    creator: "@fyrelinkz",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "NewsMediaOrganization",
    name: "FyreLinkz",
    url: "https://fyrelinkz.com",
    logo: "https://fyrelinkz.com/logo.png",
    sameAs: [
      "https://twitter.com/fyrelinkz",
      "https://github.com/fyrelinkz",
      "https://linkedin.com/company/fyrelinkz",
    ],
    publishingPrinciples: "https://fyrelinkz.com/about#methodology",
    correctionsPolicy: "https://fyrelinkz.com/about#corrections",
    diversityPolicy: "https://fyrelinkz.com/about#ethics",
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "FyreLinkz",
    url: "https://fyrelinkz.com",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://fyrelinkz.com/?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <html lang="en" className="dark">
      <body className="min-h-screen flex flex-col bg-background text-gray-100 antialiased selection:bg-fyre-500/40">
        <JsonLd data={[organizationSchema, websiteSchema]} />

        {/* Ambient background glow layers */}
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
          <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[1000px] h-[450px] bg-fyre-500/10 blur-[130px] rounded-full" />
          <div className="absolute top-1/3 -left-40 w-[500px] h-[500px] bg-blue-600/5 blur-[120px] rounded-full" />
          <div className="absolute top-2/3 -right-40 w-[600px] h-[600px] bg-rose-600/5 blur-[140px] rounded-full" />
          <div className="absolute inset-0 bg-grid-pattern opacity-40" />
        </div>

        {/* App Wrapper */}
        <div className="relative z-10 flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
