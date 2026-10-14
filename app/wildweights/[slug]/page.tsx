import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { galleryEntries } from "@/lib/wildweights-gallery";
import styles from "../wildweights.module.css";

export function generateStaticParams() { return galleryEntries.map(entry => ({ slug: entry.slug })); }
export async function generateMetadata({params}: {params: Promise<{slug:string}>}): Promise<Metadata> {
  const {slug} = await params;
  const entry = galleryEntries.find(item => item.slug === slug);
  if (!entry) return {};
  return { title: {absolute: entry.name + " — Files & setup | WildWeights"}, description: entry.summary,
    alternates: {canonical: "https://www.fyrelinkz.com/wildweights/" + slug} };
}
export default async function ModelPage({params}: {params:Promise<{slug:string}>}) {
  const {slug} = await params;
  const entry = galleryEntries.find(item=>item.slug===slug);
  if (!entry) notFound();
  return <div className={styles.site}><main className={styles.main}><article className={styles.detail}>
    <Link href="/wildweights">← WildWeights / Model collection</Link>
    <p className={styles.kicker}>{entry.kind.toUpperCase()} · QWEN-IMAGE FAMILY</p>
    <h1>{entry.name}</h1><p>{entry.summary}</p>
    <a className={styles.primary} href={entry.source} target="_blank" rel="noopener noreferrer">View original model files ↗</a>
    <h2>Memory and compatibility</h2><p>{entry.memory}</p>
    <p>A model download is only part of the workflow. Account for the text encoder, VAE, loader, system RAM, image resolution and offloading. We have not independently run or benchmarked this entry.</p>
    <h2>Before your first run</h2><ul>
      <li>Read the current repository instructions and record the exact artifact and revision.</li>
      <li>{entry.kind==="Adapter" ? "Confirm that the adapter matches your base model. A LoRA is not a standalone checkpoint." : entry.kind==="Quantization" ? "Use the compatible GGUF loader and required companion files from the publisher instructions." : "Match the diffusion model, text encoder and VAE to the publisher's workflow."}</li>
      <li>Start with the publisher's example configuration. Record changes and actual memory use on your device.</li>
      <li>Review the licenses of the weights, adapters and dependencies separately before commercial use.</li>
    </ul>
    <h2>License and evidence</h2><p>License status is not independently verified here. The original repository is the source of current usage terms. Directory inclusion does not grant permission or guarantee compatibility.</p>
    <p>Editorial source review: 12 October 2026. The gallery's AI-generated images are illustrations, not outputs or benchmarks from this model.</p>
    <h2>Continue your setup</h2><p><Link href="/workflow/comfyui-beginner-first-workflow-guide">ComfyUI first-image guide →</Link></p><p><Link href="/wildweights">Compare all three directory entries →</Link></p>
  </article></main></div>;
}
