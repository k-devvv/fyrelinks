import type { Metadata } from "next";
import JsonLd, { generateBreadcrumbSchema } from "@/components/JsonLd";
import { SITE_URL } from "@/lib/editorial";
import WildWeightsDirectory from "./WildWeightsDirectory";

const canonical = "https://www.fyrelinkz.com/wildweights";
const description =
  "Compare local AI image models, ComfyUI workflows, GGUF quantizations and LoRAs. See source links, setup notes and GPU memory caveats before you download.";

export const metadata: Metadata = {
  title: { absolute: "Qwen-Image 2.1 ComfyUI, GGUF & LoRA | WildWeights" },
  description,
  alternates: { canonical },
  openGraph: {
    title: "Local AI Image Models, GGUF & ComfyUI | WildWeights",
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
    title: "Local AI Image Models, GGUF & ComfyUI | WildWeights",
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
        data={generateBreadcrumbSchema([
          { name: "Home", url: SITE_URL },
          { name: "WildWeights", url: canonical },
        ])}
      />
      <WildWeightsDirectory />
    </>
  );
}
