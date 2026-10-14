export const galleryEntries = [
  {
    slug: "qwen-image-comfyui",
    name: "Qwen-Image 2.1 for ComfyUI",
    kind: "Base model",
    summary:
      "A sourced ComfyUI workflow guide covering the diffusion model, text encoder, VAE and first-run checks.",
    memory:
      "No minimum VRAM independently measured. The full pipeline uses more memory than the weight file alone.",
    source: "https://huggingface.co/Comfy-Org/Qwen-Image-2.1",
    sourceLabel: "Comfy-Org model files",
    tone: "orange",
    image: "/art/wildweights/image-workflow.jpg",
    imageAlt: "AI-generated editorial portrait of a fully clothed adult artist viewing an image workflow in a warm studio.",
  },
  {
    slug: "qwen-image-gguf",
    name: "Qwen-Image GGUF",
    kind: "Quantization",
    summary:
      "Understand GGUF image checkpoints, compatible ComfyUI loaders and the separate files this workflow needs.",
    memory:
      "Publisher estimates 6–8 GB VRAM for one quantization. Workload and offloading change the result.",
    source: "https://huggingface.co/Abiray/Qwen-Image-2.1-GGUF",
    sourceLabel: "Quantization repository",
    tone: "violet",
    image: "/art/wildweights/quantization-workstation.jpg",
    imageAlt: "AI-generated editorial photo of a fully clothed adult comparing image-model output beside a GPU workstation.",
  },
  {
    slug: "anime-consistency-lora",
    name: "Anime consistency LoRA",
    kind: "Adapter",
    summary:
      "A community adapter for fictional character consistency experiments. Compatibility and base-model terms matter.",
    memory:
      "No independent VRAM target. The base model and complete workflow determine memory use.",
    source: "https://huggingface.co/WarmBloodAban/Qwen-Image-2.1-LoRAs",
    sourceLabel: "Adapter card and files",
    tone: "green",
    image: "/art/wildweights/character-consistency.jpg",
    imageAlt: "AI-generated, non-explicit portrait of a clearly adult fictional character with consistent image studies on a monitor.",
  },
];