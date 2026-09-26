export type MarketId = "us" | "uk" | "ca" | "de";

export type WorkloadId =
  | "comfyui-image"
  | "comfyui-video"
  | "local-llm"
  | "mixed";

export type SystemPath = "desktop-build" | "desktop-upgrade" | "laptop";

export type SourceRef = {
  label: string;
  url: string;
};

export type MarketPrice = {
  /** Full candidate price in its market currency; null means not researched. */
  amount: number | null;
  currency: "USD" | "GBP" | "CAD" | "EUR";
  checkedAt: string | null;
  source: SourceRef | null;
};

export type HardwareCandidate = {
  id: string;
  name: string;
  path: SystemPath;
  supportedWorkloads: WorkloadId[];
  /** Dedicated graphics memory in GiB; null means unified/unknown memory. */
  gpuMemoryGb: number | null;
  /** Profile/configuration system RAM in GiB; null means unknown. */
  systemRamGb: number | null;
  /** Profile/configuration internal storage in decimal TB; null means unknown. */
  storageTb: number | null;
  /** Platform-specific caveats and compatibility checks to make. */
  platformNote: string;
  requiredParts: string[];
  prices: Record<MarketId, MarketPrice>;
  /** Primary references supporting the specifications shown in this entry. */
  specificationSources: SourceRef[];
};

export type Recommendation = HardwareCandidate & {
  fit: "strong" | "constrained" | "over-budget";
  reasons: string[];
  caveats: string[];
  /** Only set when the selected market has a complete, fresh price. */
  estimatedTotal: number | null;
};
