import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const viewport: Viewport = {
  themeColor: "#080B11",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://www.fyrelinkz.com"),
  title: {
    default: "FyreLinkz | Practical AI Video & Diffusion Guides",
    template: "%s | FyreLinkz",
  },
  description:
    "Clear, practical guides, model comparisons, and workstation hardware breakdowns for creators navigating AI video, diffusion pipelines, and local compute.",
  keywords: [
    "AI video generation",
    "ComfyUI workflows",
    "FLUX LoRA training",
    "local AI workstation",
    "diffusion models",
    "GPU compute economics",
    "open weights AI",
    "fyrelinkz",
  ],
  authors: [{ name: "FyreLinkz Editorial" }],
  creator: "FyreLinkz",
  publisher: "FyreLinkz",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "https://www.fyrelinkz.com",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.fyrelinkz.com",
    siteName: "FyreLinkz",
    title: "FyreLinkz | Practical AI Video & Diffusion Guides",
    description:
      "Clear, practical guides, model comparisons, and workstation hardware breakdowns for creators navigating AI video, diffusion pipelines, and local compute.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&h=630&q=80",
        width: 1200,
        height: 630,
        alt: "FyreLinkz Editorial Publication",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FyreLinkz | Practical AI Video & Diffusion Guides",
    description:
      "Clear, practical guides, model comparisons, and workstation hardware breakdowns for creators navigating AI video, diffusion pipelines, and local compute.",
    images: [
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&h=630&q=80",
    ],
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
    "@type": "Organization",
    name: "FyreLinkz",
    url: "https://www.fyrelinkz.com",
    logo: "https://www.fyrelinkz.com/icon.svg",
    publishingPrinciples: "https://www.fyrelinkz.com/about",
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "FyreLinkz",
    url: "https://www.fyrelinkz.com",
  };

  return (
    <html lang="en" className={`dark ${inter.variable}`}>
      <body className="min-h-screen flex flex-col bg-background font-sans text-gray-100 antialiased selection:bg-fyre-500/30 selection:text-white">
        <JsonLd data={[organizationSchema, websiteSchema]} />

        {/* Ambient subtle background structure */}
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
          <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-fyre-500/5 blur-[120px] rounded-full" />
          <div className="absolute inset-0 bg-grid-pattern opacity-30" />
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
