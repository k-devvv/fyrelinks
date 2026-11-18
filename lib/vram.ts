// VRAM estimates for running local LLMs. These are planning estimates, not benchmarks.
// Architecture numbers come from each model's published config.json.

export type VramModel = {
  id: string;
  name: string;
  paramsB: number; // total parameters, billions
  layers: number;
  kvHeads: number;
  headDim: number;
  maxContext: number;
};

export const VRAM_MODELS: VramModel[] = [
  { id: "llama-3.2-3b", name: "Llama 3.2 3B", paramsB: 3.21, layers: 28, kvHeads: 8, headDim: 128, maxContext: 131072 },
  { id: "phi-3.5-mini", name: "Phi-3.5 Mini 3.8B", paramsB: 3.82, layers: 32, kvHeads: 32, headDim: 96, maxContext: 131072 },
  { id: "mistral-7b", name: "Mistral 7B v0.3", paramsB: 7.25, layers: 32, kvHeads: 8, headDim: 128, maxContext: 32768 },
  { id: "qwen2.5-7b", name: "Qwen2.5 7B", paramsB: 7.62, layers: 28, kvHeads: 4, headDim: 128, maxContext: 131072 },
  { id: "llama-3.1-8b", name: "Llama 3.1 8B", paramsB: 8.03, layers: 32, kvHeads: 8, headDim: 128, maxContext: 131072 },
  { id: "gemma-2-9b", name: "Gemma 2 9B", paramsB: 9.24, layers: 42, kvHeads: 8, headDim: 256, maxContext: 8192 },
  { id: "mistral-nemo-12b", name: "Mistral Nemo 12B", paramsB: 12.2, layers: 40, kvHeads: 8, headDim: 128, maxContext: 131072 },
  { id: "qwen2.5-14b", name: "Qwen2.5 14B", paramsB: 14.8, layers: 48, kvHeads: 8, headDim: 128, maxContext: 131072 },
  { id: "gemma-2-27b", name: "Gemma 2 27B", paramsB: 27.2, layers: 46, kvHeads: 16, headDim: 128, maxContext: 8192 },
  { id: "qwen2.5-32b", name: "Qwen2.5 32B", paramsB: 32.8, layers: 64, kvHeads: 8, headDim: 128, maxContext: 131072 },
  { id: "llama-3.3-70b", name: "Llama 3.3 70B", paramsB: 70.6, layers: 80, kvHeads: 8, headDim: 128, maxContext: 131072 },
];

// Average bits per weight for common GGUF quantizations (llama.cpp / Ollama).
export const QUANTS = [
  { id: "q4_k_m", name: "Q4_K_M (Ollama default)", bits: 4.85 },
  { id: "q5_k_m", name: "Q5_K_M", bits: 5.69 },
  { id: "q6_k", name: "Q6_K", bits: 6.59 },
  { id: "q8_0", name: "Q8_0", bits: 8.5 },
  { id: "f16", name: "FP16 (unquantized)", bits: 16 },
] as const;

export const GPU_SIZES = [4, 6, 8, 10, 12, 16, 20, 24, 32, 48];
export const CONTEXTS = [2048, 4096, 8192, 16384, 32768, 65536, 131072];

const GB = 1024 ** 3;
const RUNTIME_OVERHEAD_GB = 0.6; // CUDA context, compute buffers
const DESKTOP_RESERVED_GB = 0.4; // display and other apps on the same GPU

export type VramEstimate = {
  weightsGb: number;
  kvCacheGb: number;
  overheadGb: number;
  totalGb: number;
  usableGb: number;
  verdict: "fits" | "tight" | "offload" | "too-big";
  gpuLayerShare: number; // 0..1 share of weights that fit on the GPU
};

export function estimateVram(model: VramModel, quantBits: number, context: number, gpuGb: number): VramEstimate {
  const weightsGb = (model.paramsB * 1e9 * quantBits) / 8 / GB;
  // K and V, per layer, FP16 (2 bytes).
  const kvCacheGb = (2 * model.layers * model.kvHeads * model.headDim * context * 2) / GB;
  const overheadGb = RUNTIME_OVERHEAD_GB;
  const totalGb = weightsGb + kvCacheGb + overheadGb;
  const usableGb = Math.max(gpuGb - DESKTOP_RESERVED_GB, 0);
  const forWeights = usableGb - kvCacheGb - overheadGb;
  const gpuLayerShare = Math.max(0, Math.min(1, forWeights / weightsGb));
  let verdict: VramEstimate["verdict"];
  if (totalGb <= usableGb * 0.9) verdict = "fits";
  else if (totalGb <= usableGb) verdict = "tight";
  else if (gpuLayerShare >= 0.5) verdict = "offload";
  else verdict = "too-big";
  return { weightsGb, kvCacheGb, overheadGb, totalGb, usableGb, verdict, gpuLayerShare };
}
