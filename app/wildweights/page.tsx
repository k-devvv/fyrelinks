import type { Metadata } from "next";
import { galleryEntries } from "@/lib/wildweights-gallery";
import JsonLd, { generateBreadcrumbSchema } from "@/components/JsonLd";
import { SITE_URL } from "@/lib/editorial";
import { wildWeightsFaqs } from "@/lib/wildweights-content";
import WildWeightsDirectory from "./WildWeightsDirectory";

const canonical = "https://www.fyrelinkz.com/wildweights";
const description =
  "Local AI image models: Qwen-Image 2.1 ComfyUI workflow, GGUF and LoRA. Check source files, reported VRAM, setup notes and licenses before use.";

export const metadata: Metadata = {
  title: { absolute: "Qwen-Image 2.1 ComfyUI, GGUF & LoRA | WildWeights" },
  description,
  alternates: { canonical },
  openGraph: {
    title: "Qwen-Image 2.1 ComfyUI, GGUF & LoRA | WildWeights",
    description,
    url: canonical,
    type: "website",
    siteName: "FyreLinkz",
    images: [
      {
        url: "/art/wildweights/image-workflow.jpg",
        alt: "Editorial image of an adult creator reviewing a local AI image workflow at a computer.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Qwen-Image 2.1 ComfyUI, GGUF & LoRA | WildWeights",
    description,
    images: ["/art/wildweights/image-workflow.jpg"],
  },
};

export default function WildWeightsPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "@id": canonical + "#collection",
          name: "WildWeights local AI image model directory",
          url: canonical,
          description,
          inLanguage: "en",
          isAccessibleForFree: true,
          dateModified: "2026-10-13",
          about: [
            { "@type": "Thing", name: "Local AI image models" },
            { "@type": "Thing", name: "ComfyUI workflows" },
            { "@type": "Thing", name: "Model quantization and LoRA adapters" },
          ],
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: wildWeightsFaqs.map((faq) => ({
            "@type": "Question",
            name: faq.q,
            acceptedAnswer: { "@type": "Answer", text: faq.a },
          })),
        }}
      />
      <JsonLd
        data={generateBreadcrumbSchema([
          { name: "Home", url: SITE_URL },
          { name: "WildWeights", url: canonical },
        ])}
      />
      <JsonLd data={{
        "@context": "https://schema.org", "@type": "ItemList",
        name: "WildWeights local image model collection",
        itemListElement: galleryEntries.map((entry, index) => ({
          "@type": "ListItem", position: index + 1, name: entry.name,
          url: canonical + "/" + entry.slug
        }))
      }} />
      <WildWeightsDirectory />
    </>
  );
}
