export const wildWeightsFaqs = [
  {
    q: "What local AI image models are listed on WildWeights?",
    a: "WildWeights currently lists a Qwen-Image 2.1 ComfyUI workflow, a Qwen-Image GGUF quantization and a community Anime consistency LoRA. Text, audio and video model collections are not published yet."
  },
  {
    q: "How much VRAM does Qwen-Image GGUF need?",
    a: "The linked repository estimates 6–8 GB of VRAM for one quantization; WildWeights has not independently benchmarked it. The text encoder, VAE, image resolution, loader and offloading can change total memory use.",
    link: "https://huggingface.co/Abiray/Qwen-Image-2.1-GGUF",
    linkLabel: "Check the quantization source"
  },
  {
    q: "Can I run Qwen-Image GGUF with 8 GB VRAM?",
    a: "Possibly, but 8 GB is not a guarantee. The 6–8 GB figure is a publisher estimate for one quantization, and the complete workflow needs additional memory. Check the current source instructions and leave headroom for your resolution and other loaded components.",
    link: "https://huggingface.co/Abiray/Qwen-Image-2.1-GGUF",
    linkLabel: "Review the model files and notes"
  },
  {
    q: "What do I need for the Qwen-Image 2.1 ComfyUI workflow?",
    a: "The linked Comfy-Org workflow covers the diffusion model, text encoder, VAE and first-run checks. Follow its current file and loader instructions; the full pipeline can use more memory than the model weights alone.",
    link: "https://huggingface.co/Comfy-Org/Qwen-Image-2.1",
    linkLabel: "Open the Comfy-Org workflow source"
  },
  {
    q: "What is the difference between GGUF and a LoRA?",
    a: "The listed GGUF is a quantized Qwen-Image checkpoint that needs a compatible loader and companion files. A LoRA is an adapter for a compatible base model; it is not a complete model by itself.",
    link: "https://huggingface.co/WarmBloodAban/Qwen-Image-2.1-LoRAs",
    linkLabel: "Check the LoRA source"
  },
  {
    q: "Does WildWeights host or test these AI models?",
    a: "No. WildWeights links to publisher and community repositories; it does not host model files or run inference. Memory notes are identified as publisher estimates unless independent testing is explicitly stated."
  },
  {
    q: "Can I use a listed model commercially?",
    a: "Check the current license for the model, adapter, base model and workflow components before commercial use. Their terms can differ. WildWeights links to sources but does not grant usage rights or provide legal advice."
  },
  {
    q: "How do I choose a local AI image model for my PC?",
    a: "Start with the exact model files and intended workflow, then check GPU memory, system RAM, resolution, loader compatibility and license. Treat untested memory numbers as estimates and compare them with the publisher’s current setup notes."
  }
] as const;
