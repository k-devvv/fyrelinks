import { VRAM_MODELS, estimateVram } from "./vram";

const Q4_BITS = 4.85; // Q4_K_M, the Ollama default
const CONTEXT = 8192;

// Budget bands are rough guides: laptop prices in India change with sales and launches.
export const INDIA_LAPTOP_TIERS = [
  {
    gb: 6, budget: "Under ₹80,000", gpu: "RTX 4050 Laptop (6 GB)", ram: "16 GB", ssd: "512 GB",
    who: "Students and beginners trying local AI for the first time.",
    pros: ["Cheapest way to get an NVIDIA GPU with CUDA", "Fine for small models and AI coding helpers"],
    cons: ["6 GB fills up fast", "Most 7B–8B models need short chats or partial offload"],
  },
  {
    gb: 8, budget: "₹80,000 – ₹1,20,000", gpu: "RTX 4060 Laptop (8 GB)", ram: "16–32 GB", ssd: "1 TB",
    who: "The sweet spot for B.Tech, AI/ML coursework and daily local chat.",
    pros: ["Runs 7B–8B models fully on the GPU", "Wide choice of gaming laptops at this price"],
    cons: ["Laptop RTX 4070 and 5070 also have 8 GB, so paying more may not add VRAM", "12B+ models need offload"],
  },
  {
    gb: 12, budget: "₹1,50,000 – ₹2,20,000", gpu: "RTX 5070 Ti Laptop (12 GB)", ram: "32 GB", ssd: "1 TB",
    who: "Developers who want 12B–14B models and longer context.",
    pros: ["Big jump in usable model size over 8 GB", "Good for Stable Diffusion and image models too"],
    cons: ["Price jumps sharply from the 8 GB tier", "Heavier, louder machines"],
  },
  {
    gb: 16, budget: "₹2,50,000 and above", gpu: "RTX 5080 Laptop (16 GB)", ram: "32–64 GB", ssd: "2 TB",
    who: "Professionals who need the most VRAM a laptop can give.",
    pros: ["Most VRAM you can get in a laptop", "Same models as 12 GB, with more room for long chats"],
    cons: ["A desktop with a 16 GB card costs far less", "Still too small for 27B–70B models"],
  },
];

export function fitsAt(gb: number) {
  return VRAM_MODELS.filter((m) => {
    const v = estimateVram(m, Q4_BITS, CONTEXT, gb).verdict;
    return v === "fits" || v === "tight";
  });
}

// Small, serialisable data for the client-side budget picker.
export function pickerTiers() {
  return INDIA_LAPTOP_TIERS.map((t) => ({
    gb: t.gb, budget: t.budget, gpu: t.gpu, who: t.who,
    models: fitsAt(t.gb).sort((x, y) => y.paramsB - x.paramsB).map((m) => m.name),
  }));
}
