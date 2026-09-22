const fs = require('fs');
const path = require('path');

const articlesPath = path.join(__dirname, '..', 'lib', 'content', 'articles.json');
const articles = JSON.parse(fs.readFileSync(articlesPath, 'utf8'));

// 1. ai-video-generation-matrix-minimax-higgsfield-seedance
const art1 = articles.find(a => a.slug === 'ai-video-generation-matrix-minimax-higgsfield-seedance');
if (art1) {
  art1.takeaway = 'Direct Answer: Choose MiniMax/Hailuo when you need rich physical motion and fluid camera movement from text prompts; choose Seedance when keyframe continuity and storyboard constraints dictate the cut; choose Higgsfield for mobile-first camera templates. If your production requires multi-camera sync or NLE timeline integration, Runway Gen-3/4 remains the industry standard.';
  art1.updatedAt = '2026-09-22';
  
  // Update section 1 (Start here) with Intended reader & practical outcome
  const s0 = art1.sections.find(s => s.heading === 'Start here');
  if (s0) {
    s0.content = 'Intended reader: Video editors, creative directors and solo creators deciding where to spend generation credits for a multi-shot project. Practical outcome: A 4-step evaluation sheet to test tools against your actual creative brief before committing to monthly tiers. Three attractive demo reels do not tell you which service will finish your project. Start with the shot you need: a product turn, a character action or a moving background. This guide provides a reproducible selection framework, not a synthetic league table.';
  }

  // Update section 3 (Build a shot brief before a shortlist) with Checklist
  const s2 = art1.sections.find(s => s.heading === 'Build a shot brief before a shortlist');
  if (s2) {
    s2.checklist = [
      'Lock delivery aspect ratio (16:9, 9:16, 1:1) and target duration before generating.',
      'Separate subject description from background environment in the prompt text.',
      'Specify exact camera vector (e.g., "dolly forward at steady pace", not "cool camera move").',
      'Prepare an uncompressed 1080p starting frame for image-to-video runs.',
      'Enforce a strict 3-take limit per prompt variant before revising the input image.'
    ];
  }

  // Update section 8 (Use a shortlist with explicit pass and fail rules) with Table
  const s7 = art1.sections.find(s => s.heading === 'Use a shortlist with explicit pass and fail rules');
  if (s7) {
    s7.table = {
      headers: ['Model / Platform', 'Primary Input Mode', 'Camera Controls', 'Best Suited For', 'Production Limitation'],
      rows: [
        ['MiniMax / Hailuo-01', 'Text & Image-to-Video', 'Prompt-directed trajectory', 'Dynamic physical action & complex fluid scenes', 'Less deterministic end-frame locking'],
        ['Seedance / Kling 1.5', 'Image-to-Video + End-frame', 'Start & End frame interpolation', 'Strict continuity between established storyboard frames', 'Occasional morphing on rapid camera rotations'],
        ['Higgsfield AI', 'Image-to-Video + Motion presets', 'Pre-baked camera orbits & zooms', 'Social-first character moves and rapid style testing', 'Fixed aspect ratios & limited custom NLE integration'],
        ['Runway Gen-3 / Gen-4', 'Multi-modal & Timeline Plugins', 'Motion Brush, Camera Path & Keyframes', 'Commercial NLE workflows (Premiere / After Effects)', 'Higher credit consumption per high-resolution render']
      ]
    };
  }
}

// 2. comfyui-flux-lora-training-and-inference-guide
const art2 = articles.find(a => a.slug === 'comfyui-flux-lora-training-and-inference-guide');
if (art2) {
  art2.takeaway = 'Direct Answer: To run FLUX.1 without CUDA out-of-memory errors on 12GB–16GB consumer GPUs, load FLUX.1 dev in FP8 (or GGUF Q4_K_M / Q8_0) using ComfyUI’s native UNETLoader and DualCLIPLoader, offload CLIP and T5 to CPU RAM, and clamp inference to 20–25 steps with Euler sampler. Only introduce LoRA nodes after validating this baseline.';
  art2.updatedAt = '2026-09-22';

  const s0 = art2.sections.find(s => s.heading === 'Start here');
  if (s0) {
    s0.content = 'Intended reader: Creators running local RTX 3060/4070/4080 GPUs seeking photorealistic outputs from FLUX.1. Practical outcome: A crash-free node setup that loads weights efficiently and accepts LoRAs without breaking latent dimensions. Your base image looks promising, but the moment you add a LoRA, several other things change too. Was it the model, the prompt or the new component? Build a baseline you can return to, then make one deliberate change.';
  }

  const s3 = art2.sections.find(s => s.heading === 'Save a reproducible baseline');
  if (s3) {
    s3.checklist = [
      'Download clip_l.safetensors and t5xxl_fp8_e4m3fn.safetensors into ComfyUI/models/clip/.',
      'Download flux1-dev.safetensors into ComfyUI/models/unet/ or models/checkpoints/.',
      'Download ae.safetensors into ComfyUI/models/vae/.',
      'Connect DualCLIPLoader (clip_l + t5xxl) to CLIPTextEncode with clip_type set to "flux".',
      'Set KSampler: steps=20, cfg=1.0, sampler_name=euler, scheduler=simple.',
      'Run a single test generation at 1024x1024 to verify VRAM allocation before loading LoRA weights.'
    ];
  }

  const s5 = art2.sections.find(s => s.heading === 'Memory savings need a measured trade-off');
  if (s5) {
    s5.table = {
      headers: ['Model Variant', 'File Size / Precision', 'Min VRAM Required', 'System RAM Requirement', 'Licensing & Best Fit'],
      rows: [
        ['FLUX.1 [schnell]', '~23.8 GB (FP16) or ~12 GB (FP8)', '12 GB VRAM (FP8)', '32 GB DDR4/DDR5', 'Apache 2.0 (Commercial allowed) · Fast 4-step preview'],
        ['FLUX.1 [dev]', '~23.8 GB (FP16) or ~11.9 GB (FP8)', '16 GB VRAM (FP8/NF4)', '32–64 GB DDR5', 'Non-commercial research · High-fidelity 20-30 steps'],
        ['FLUX.1 GGUF (Q4_K_M)', '~6.5 GB (4-bit quantized)', '8–10 GB VRAM', '24 GB System RAM', 'Community quantized · Budget GPUs (RTX 3060/4060)'],
        ['FLUX.1 [pro]', 'Cloud API Only', 'N/A (Managed API)', 'N/A', 'Commercial paid API · When local hardware is unavailable']
      ]
    };
  }
}

// 3. best-local-ai-workstation-build-guide-2026
const art3 = articles.find(a => a.slug === 'best-local-ai-workstation-build-guide-2026');
if (art3) {
  art3.takeaway = 'Direct Answer: For local AI in 2026, VRAM capacity strictly determines what models you can run without system slowdowns. 16GB (RTX 4070 Ti Super) is the minimum baseline for quantized FLUX and 8B LLMs; 24GB (RTX 3090 / 4090) is the sweet spot for full-fidelity diffusion and 14B–32B models; running two GPUs splits workloads across processes but does NOT merge VRAM into a single memory pool for standard ComfyUI runs.';
  art3.updatedAt = '2026-09-22';

  const s0 = art3.sections.find(s => s.heading === 'Start here');
  if (s0) {
    s0.content = 'Intended reader: Creators and developers building a dedicated local machine for generative image/video diffusion and local LLM inference. Practical outcome: A hardware dimensioning worksheet covering VRAM, PCIe lane bifurcation, power headroom, and system RAM ratios. A graphics card can look perfect on a specification sheet and still be wrong for the model you want to run. Before building a shopping cart, write down your actual workflow, output size and waiting-time limit.';
  }

  const s2 = art3.sections.find(s => s.heading === 'Capacity and speed answer different questions');
  if (s2) {
    s2.table = {
      headers: ['GPU Model', 'VRAM & Bus', 'Memory Bandwidth', 'TDP / Power', 'Workload Sweet Spot'],
      rows: [
        ['GeForce RTX 4070 Ti Super', '16 GB GDDR6X (256-bit)', '672 GB/s', '285W', 'Budget FLUX FP8 / SDXL / 8B LLMs with 8k context'],
        ['GeForce RTX 3090 (Used)', '24 GB GDDR6X (384-bit)', '936 GB/s', '350W', 'Most cost-effective 24GB entry point for heavy ComfyUI graphs'],
        ['GeForce RTX 4090', '24 GB GDDR6X (384-bit)', '1,008 GB/s', '450W', 'Fastest consumer batch inference & local video diffusion'],
        ['Dual RTX 3090 / 4090', '48 GB (2x 24 GB discrete)', '1,872–2,016 GB/s total', '750W–900W total', 'Local LLM tensor parallelism (vLLM / Ollama 70B Q4)']
      ]
    };
  }

  const s6 = art3.sections.find(s => s.heading === 'A purchase checklist you can actually use');
  if (s6) {
    s6.checklist = [
      'Verify System RAM is at least 2x your GPU VRAM (minimum 32GB–64GB DDR5 for model swapping).',
      'Check PSU capacity has at least 150W headroom above total system peak load (850W for single 4090, 1200W+ for dual).',
      'Ensure motherboard supports PCIe 4.0/5.0 x8/x8 bifurcation if planning dual-GPU expansion.',
      'Choose NVMe storage with at least 2TB Gen4 capacity for fast checkpoint loading (3–5 GB/s reads).',
      'Measure physical GPU clearance (length, slot thickness, and 12VHPWR bend radius) in the case.'
    ];
  }
}

// 4. comfyui-beginner-first-workflow-guide
const art4 = articles.find(a => a.slug === 'comfyui-beginner-first-workflow-guide');
if (art4) {
  art4.takeaway = 'Direct Answer: Load ComfyUI’s default text-to-image template, place one standard SDXL or SD 1.5 checkpoint in ComfyUI/models/checkpoints/, verify the 5 core connections (Loader -> Encoders -> Empty Latent -> KSampler -> VAE Decode), and run one test image at default resolution (1024x1024 for SDXL, 512x512 for SD1.5) before touching custom extensions.';
  art4.updatedAt = '2026-09-22';

  const s0 = art4.sections.find(s => s.heading === 'Start here');
  if (s0) {
    s0.content = 'Intended reader: Beginners setting up ComfyUI who want to avoid red-node errors and dependency nightmares. Practical outcome: A working, crash-free image generation within 10 minutes and a repeatable mental model of data flow. An unfamiliar canvas, missing model files and a row of connected boxes can make the first image feel harder than it needs to be. Give yourself one small goal: run an official example, save the result and understand the path to the output.';
  }

  const s3 = art4.sections.find(s => s.heading === 'Read the graph from inputs to output');
  if (s3) {
    s3.table = {
      headers: ['Node Name', 'Inputs', 'Outputs', 'Role in Pipeline', 'Common Beginner Trap'],
      rows: [
        ['Load Checkpoint', 'None (Selects model)', 'MODEL, CLIP, VAE', 'Unpacks neural weights into RAM/VRAM', 'Placing UNet-only or LoRA files in the checkpoints folder'],
        ['CLIP Text Encode', 'CLIP from Loader + Text String', 'CONDITIONING', 'Converts words into latent vector embeddings', 'Using negative weights without setting appropriate CFG'],
        ['Empty Latent Image', 'Width, Height, Batch size', 'LATENT', 'Creates uncompressed latent pixel canvas', 'Requesting non-standard resolutions that distort aspect ratio'],
        ['KSampler', 'MODEL, CONDITIONING (+ / -), LATENT', 'LATENT (Denoised)', 'Executes iterative diffusion denoising steps', 'Setting steps > 50 on Euler or Euler a (wastes compute)'],
        ['VAE Decode', 'LATENT from KSampler, VAE from Loader', 'IMAGE', 'Translates math tensors back into RGB pixels', 'Connecting incompatible external VAE to checkpoint']
      ]
    };
  }

  const s6 = art4.sections.find(s => s.heading === 'Missing model, incompatible file or memory error?');
  if (s6) {
    s6.checklist = [
      'Confirm checkpoint is located inside "ComfyUI/models/checkpoints/" and ends in .safetensors.',
      'Click "Refresh" on the ComfyUI floating menu if the newly downloaded model does not appear.',
      'Check KSampler denoise is set to 1.0 for standard text-to-image generation.',
      'Set Empty Latent dimensions to 1024x1024 for SDXL / FLUX or 512x512 for SD 1.5.',
      'If red outline appears on a node, check ComfyUI Manager for missing custom node packs.'
    ];
  }
}

// 5. ai-video-prompt-guide-examples
const art5 = articles.find(a => a.slug === 'ai-video-prompt-guide-examples');
if (art5) {
  art5.takeaway = 'Direct Answer: Structure AI video prompts as a 4-part physical brief: [Subject State] + [Camera Trajectory] + [Physical Action/Light Change] + [Framing/Lens Type]. Omit subjective filler words like "hyperrealistic" or "8k cinematic"; specify direction, speed, and focal length to achieve predictable, non-morphing takes.';
  art5.updatedAt = '2026-09-22';

  const s0 = art5.sections.find(s => s.heading === 'Start here');
  if (s0) {
    s0.content = 'Intended reader: Video creators and storytellers struggling with morphing faces, uncontrollable camera pans, or inconsistent character actions. Practical outcome: A repeatable 4-tier prompt template with 6 tested real-world shot examples. The clip looks polished, but the camera moves when you wanted a still shot and the action never quite finishes. Before adding more adjectives, simplify the brief. Work through six original examples, change one variable between attempts and decide what makes a take usable.';
  }

  const s1 = art5.sections.find(s => s.heading === 'Start with the shot, not a list of adjectives');
  if (s1) {
    s1.table = {
      headers: ['Prompt Component', 'What to Specify', 'What to Avoid', 'Example Direction'],
      rows: [
        ['Camera Vector', 'Explicit movement (dolly forward, pan right, orbit)', 'Vague adjectives ("dynamic angle", "epic camera")', '"Camera glides forward at waist level, tracking the runner"'],
        ['Subject Action', 'One primary physical action with start/end states', 'Multiple overlapping conflicting actions', '"The barista pours steamed milk into the cup, then stops"'],
        ['Lighting & Atmosphere', 'Directional source and color temperature', 'Contradictory lighting ("bright neon yet dark moody")', '"Warm late-afternoon sunlight entering from screen left"'],
        ['Pacing & Timing', 'Speed of movement (steady, slow-motion, real-time)', 'Assuming the model understands musical beats', '"Slow-motion 60fps movement, steady 3-second drift"']
      ]
    };
  }

  const s5 = art5.sections.find(s => s.heading === 'Judge the whole clip, not the best frame');
  if (s5) {
    s5.checklist = [
      'Frame 1 to Frame 30 boundary check: Does the object hold its structural shape?',
      'Limb and finger stability: Do hands avoid vanishing into surfaces or sprouting extra joints?',
      'Camera track fidelity: Does the background perspective shift naturally without warping?',
      'Lighting consistency: Do cast shadows stay locked to moving objects?',
      'Cut-point cleanliness: Can an NLE editor transition cleanly into the head or tail of the clip?'
    ];
  }
}

fs.writeFileSync(articlesPath, JSON.stringify(articles, null, 2), 'utf8');
console.log('Successfully updated the top 5 priority articles in lib/content/articles.json');
