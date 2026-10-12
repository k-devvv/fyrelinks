import type { Metadata } from "next";
import WildWeightsDirectory from "./WildWeightsDirectory";

const canonical = "https://www.fyrelinkz.com/wildweights";

export const metadata: Metadata = {
  title: "WildWeights: local AI model directory and setup guides",
  description:
    "Compare local image-model workflows, quantizations and adapters. Check hardware caveats, source links and licence notes before you download.",
  alternates: { canonical },
  openGraph: {
    title: "WildWeights: local AI models, clear setup guides",
    description:
      "A sourced directory for running image models locally, with practical setup and memory caveats.",
    url: canonical,
    type: "website",
  },
};

export default function WildWeightsPage() {
  return <WildWeightsDirectory />;
}

