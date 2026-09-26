import type {
  HardwareCandidate,
  MarketId,
  MarketPrice,
  SourceRef,
} from "./types";

const MARKET_CURRENCY: Record<MarketId, MarketPrice["currency"]> = {
  us: "USD",
  uk: "GBP",
  ca: "CAD",
  de: "EUR",
};

const noPrice = (market: MarketId): MarketPrice => ({
  amount: null,
  currency: MARKET_CURRENCY[market],
  checkedAt: null,
  source: null,
});

const unpricedEverywhere = (): Record<MarketId, MarketPrice> => ({
  us: noPrice("us"),
  uk: noPrice("uk"),
  ca: noPrice("ca"),
  de: noPrice("de"),
});

const marketPrice = (
  market: MarketId,
  amount: number,
  label: string,
  url: string,
): MarketPrice => ({
  amount,
  currency: MARKET_CURRENCY[market],
  checkedAt: "2026-09-26",
  source: { label, url },
});

const nvidia5060Ti: SourceRef = {
  label: "NVIDIA GeForce RTX 5060 family specifications",
  url: "https://www.nvidia.com/en-us/geforce/graphics-cards/50-series/rtx-5060-family/",
};

const nvidia5070Family: SourceRef = {
  label: "NVIDIA GeForce RTX 5070 family specifications",
  url: "https://www.nvidia.com/en-us/geforce/graphics-cards/50-series/rtx-5070-family/",
};

const nvidia5090: SourceRef = {
  label: "NVIDIA GeForce RTX 5090 specifications",
  url: "https://www.nvidia.com/en-us/geforce/graphics-cards/50-series/rtx-5090/",
};

const laptop5090: SourceRef = {
  label: "Dell Alienware 18 Area-51 configuration specifications",
  url: "https://www.dell.com/en-us/shop/dell-laptops/alienware-18-area-51-gaming-laptop/spd/alienware-area-51-aa18250-gaming-laptop/useaa18250wmlkcto03",
};

const thinkpadP16: SourceRef = {
  label: "Lenovo ThinkPad P16 Gen 3 product specifications",
  url: "https://www.lenovo.com/us/en/p/laptops/thinkpad/thinkpadp/lenovo-thinkpad-p16-gen-3-16-inch-intel-mobile-workstation/21rqcto1wwus1",
};

/**
 * Small source-first catalogue. Desktop-build entries are planning profiles,
 * not purchasable bundles: their RAM/storage values are suggested targets and
 * their complete-system prices remain unknown until every part is priced.
 * The upgrade example is the graphics card only; it does not assert that it
 * fits a visitor's existing case, PSU, motherboard, or power connectors.
 */
export const HARDWARE_CANDIDATES: HardwareCandidate[] = [
  {
    id: "desktop-build-16gb-entry",
    name: "16 GB GPU desktop build profile",
    path: "desktop-build",
    supportedWorkloads: ["comfyui-image", "local-llm"],
    gpuMemoryGb: 16,
    systemRamGb: 32,
    storageTb: 1,
    platformNote:
      "Planning profile, not a tested or priced parts list. 32 GB RAM and 1 TB storage are suggested starting targets; verify target models, PSU, case clearance, motherboard slot, cooling, and software support before buying.",
    requiredParts: [
      "16 GB discrete GPU",
      "Compatible desktop CPU and motherboard",
      "32 GB system RAM target",
      "1 TB NVMe storage target",
      "Compatible PSU, case, and cooling",
    ],
    prices: unpricedEverywhere(),
    specificationSources: [nvidia5060Ti],
  },
  {
    id: "desktop-build-16gb-creator",
    name: "16 GB GPU creator desktop profile",
    path: "desktop-build",
    supportedWorkloads: ["comfyui-image", "comfyui-video", "mixed"],
    gpuMemoryGb: 16,
    systemRamGb: 64,
    storageTb: 2,
    platformNote:
      "Planning profile, not a tested or priced parts list. The 64 GB RAM and 2 TB storage targets are editorial configuration suggestions; video workflow memory use varies widely. Confirm the exact workflow and all component compatibility.",
    requiredParts: [
      "16 GB discrete GPU",
      "Compatible desktop CPU and motherboard",
      "64 GB system RAM target",
      "2 TB NVMe storage target",
      "Compatible PSU, case, and cooling",
    ],
    prices: unpricedEverywhere(),
    specificationSources: [nvidia5070Family],
  },
  {
    id: "desktop-build-32gb-high-memory",
    name: "32 GB GPU high-memory desktop profile",
    path: "desktop-build",
    supportedWorkloads: ["comfyui-video", "local-llm", "mixed"],
    gpuMemoryGb: 32,
    systemRamGb: 128,
    storageTb: 4,
    platformNote:
      "Planning profile, not a tested or priced parts list. 128 GB RAM and 4 TB storage are suggested targets rather than a requirement or performance guarantee; large local models may still exceed usable memory. Verify component fit and software support.",
    requiredParts: [
      "32 GB discrete GPU",
      "Compatible desktop CPU and motherboard",
      "128 GB system RAM target",
      "4 TB NVMe storage target",
      "High-capacity compatible PSU, case, and cooling",
    ],
    prices: unpricedEverywhere(),
    specificationSources: [nvidia5090],
  },
  {
    id: "desktop-upgrade-16gb-gpu",
    name: "16 GB RTX 5060 Ti-class graphics-card upgrade",
    path: "desktop-upgrade",
    supportedWorkloads: ["comfyui-image", "local-llm"],
    gpuMemoryGb: 16,
    systemRamGb: null,
    storageTb: null,
    platformNote:
      "Graphics card only. Listed prices are retail examples for the card, not a complete PC or total upgrade cost. Existing PSU capacity/connectors, card length, PCIe slot, case airflow, drivers, and workload compatibility must be checked separately.",
    requiredParts: ["One compatible 16 GB RTX 5060 Ti graphics card"],
    prices: {
      us: marketPrice(
        "us",
        799.99,
        "Best Buy US: PNY RTX 5060 Ti 16 GB example (graphics card only)",
        "https://www.bestbuy.com/product/pny-geforce-rtx-5060-ti-overclocked-16gb-gddr7-pci-express-5-0-graphics-card-with-dual-fan-black/JXF2C465C5/sku/6630626",
      ),
      uk: marketPrice(
        "uk",
        699.98,
        "Scan UK: ASUS Dual RTX 5060 Ti OC 16 GB example (graphics card only)",
        "https://www.scan.co.uk/products/asus-nvidia-geforce-rtx-5060-ti-dual-oc-16gb-gddr7-ray-tracing-graphics-card-dlss-4-4608-core-2632-m?bvstate=pg%3A2%2Fct%3Ar",
      ),
      ca: marketPrice(
        "ca",
        1119.99,
        "Best Buy Canada: ASUS Dual RTX 5060 Ti OC 16 GB example (graphics card only)",
        "https://www.bestbuy.ca/en-ca/collection/nvidia-graphic-cards-rtx-5060ti-series/blte1ce94972b1c60ba",
      ),
      de: marketPrice(
        "de",
        886.54,
        "Mindfactory Germany: ASUS RTX 5060 Ti TUF OC 16 GB example (graphics card only)",
        "https://www.mindfactory.de/product_info.php/16GB-Asus-GeForce-RTX-5060-Ti-TUF-Gaming-OC-Aktiv-PCIe-5-0-x16--x8-Reta_1617121.html",
      ),
    },
    specificationSources: [nvidia5060Ti],
  },
  {
    id: "desktop-upgrade-32gb-gpu",
    name: "32 GB RTX 5090-class graphics-card upgrade",
    path: "desktop-upgrade",
    supportedWorkloads: ["comfyui-video", "local-llm", "mixed"],
    gpuMemoryGb: 32,
    systemRamGb: null,
    storageTb: null,
    platformNote:
      "Graphics card only; all market prices remain unverified. Do not buy until PSU capacity/connectors, card dimensions, motherboard slot, cooling, power delivery, and workload software support are checked.",
    requiredParts: ["One compatible 32 GB RTX 5090 graphics card"],
    prices: unpricedEverywhere(),
    specificationSources: [nvidia5090],
  },
  {
    id: "laptop-alienware-18-area-51-5090",
    name: "Alienware 18 Area-51 with RTX 5090 Laptop GPU",
    path: "laptop",
    supportedWorkloads: ["comfyui-image", "comfyui-video", "local-llm", "mixed"],
    gpuMemoryGb: 24,
    systemRamGb: 32,
    storageTb: 2,
    platformNote:
      "Example Dell configuration lists a 24 GB laptop GPU, 32 GB RAM, and 2 TB SSD. Laptop GPU power, cooling, memory limits, upgradeability, and sustained behavior differ from desktop cards; confirm the exact SKU and target software. Prices are unverified.",
    requiredParts: ["Complete laptop configuration and its supplied power adapter"],
    prices: unpricedEverywhere(),
    specificationSources: [laptop5090],
  },
  {
    id: "laptop-thinkpad-p16g3-rtxpro5000",
    name: "ThinkPad P16 Gen 3 with RTX PRO 5000 Laptop GPU",
    path: "laptop",
    supportedWorkloads: ["comfyui-image", "comfyui-video", "local-llm", "mixed"],
    gpuMemoryGb: 24,
    systemRamGb: 128,
    storageTb: 12,
    platformNote:
      "Lenovo lists these as configurable maximums: 24 GB RTX PRO 5000 Laptop GPU, up to 128 GB ECC RAM, and up to 12 TB storage. They may not coexist in every regional SKU; verify the exact build, power/cooling limits, software support, and price before purchase.",
    requiredParts: ["Complete laptop configuration and its supplied power adapter"],
    prices: unpricedEverywhere(),
    specificationSources: [thinkpadP16],
  },
];
