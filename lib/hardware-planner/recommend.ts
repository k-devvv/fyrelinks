import { HARDWARE_CANDIDATES } from "./catalog";
import type { HardwareCandidate, MarketId, Recommendation, SystemPath, WorkloadId } from "./types";

export type PlannerInput = {
  market: MarketId;
  budget: number;
  workload: WorkloadId;
  path: SystemPath;
};

export type PlannerResult = {
  error: string | null;
  recommendations: Recommendation[];
  stalePriceCount: number;
};

export const MARKET_BUDGET_LIMITS: Record<MarketId, number> = {
  us: 30000,
  uk: 25000,
  ca: 40000,
  de: 28000,
};

const FRESHNESS_MS = 30 * 24 * 60 * 60 * 1000;

function expectedGpuMemory(workload: WorkloadId): { strong: number; constrained: number } {
  switch (workload) {
    case "comfyui-image": return { strong: 16, constrained: 8 };
    case "comfyui-video": return { strong: 24, constrained: 16 };
    case "local-llm": return { strong: 24, constrained: 12 };
    case "mixed": return { strong: 24, constrained: 16 };
  }
}

function assess(candidate: HardwareCandidate, workload: WorkloadId): { fit: "strong" | "constrained"; reasons: string[]; caveats: string[] } {
  const memory = expectedGpuMemory(workload);
  const vram = candidate.gpuMemoryGb;
  const sufficientRam = workload === "local-llm" ? (candidate.systemRamGb ?? 0) >= 32 : true;
  const strong = vram !== null && vram >= memory.strong && sufficientRam;
  const constrained = vram !== null && vram >= memory.constrained && sufficientRam;
  const reasons: string[] = [];
  const caveats = [candidate.platformNote];

  if (vram === null) {
    reasons.push("Dedicated GPU memory is unknown, so workload fit cannot be assessed confidently.");
  } else if (strong) {
    reasons.push(`${vram} GB of listed GPU memory meets this planner's ${memory.strong} GB strong-fit heuristic for this workload.`);
  } else if (constrained) {
    reasons.push(`${vram} GB of listed GPU memory reaches the planner's constrained-fit range; larger models or workflows may not fit.`);
  } else {
    reasons.push(`${vram} GB of listed GPU memory is below this planner's ${memory.constrained} GB starting heuristic.`);
  }

  if (workload === "local-llm" && !sufficientRam) {
    reasons.push("Listed system memory is below the planner's 32 GB local-LLM planning target or is unknown.");
  }
  if ((workload === "comfyui-video" || workload === "mixed") && vram !== null && vram < memory.strong) {
    caveats.push("Video and mixed workflows vary considerably; a workflow's actual model, resolution, and node memory use may need more GPU memory.");
  }
  if (vram !== null && !constrained) caveats.push("This profile falls below the selected workload's planning threshold; consider a smaller model or workload.");

  return { fit: strong ? "strong" : "constrained", reasons, caveats };
}

function invalidInput(input: PlannerInput): string | null {
  const marketLimits = MARKET_BUDGET_LIMITS as Record<string, number | undefined>;
  const limit = marketLimits[input.market];
  if (!limit) return "Choose one of the supported markets.";
  if (!Number.isFinite(input.budget) || input.budget <= 0) return "Enter a budget greater than zero.";
  if (input.budget > limit) return `Enter a budget of ${limit.toLocaleString()} or less in the selected market's currency.`;
  if (!(["comfyui-image", "comfyui-video", "local-llm", "mixed"] as string[]).includes(input.workload)) return "Choose a supported workload.";
  if (!(["desktop-build", "desktop-upgrade", "laptop"] as string[]).includes(input.path)) return "Choose a supported system path.";
  return null;
}

export function recommendHardware(input: PlannerInput, now = new Date()): PlannerResult {
  const error = invalidInput(input);
  if (error) return { error, recommendations: [], stalePriceCount: 0 };

  const matching = HARDWARE_CANDIDATES.filter(candidate =>
    candidate.path === input.path && candidate.supportedWorkloads.includes(input.workload),
  );
  const stalePriceCount = matching.filter(candidate => {
    const price = candidate.prices[input.market].amount !== null ? candidate.prices[input.market] : null;
    return price?.checkedAt !== null && price?.checkedAt !== undefined
      && now.getTime() - new Date(`${price.checkedAt}T00:00:00Z`).getTime() > FRESHNESS_MS;
  }).length;

  const recommendations = matching.map(candidate => {
    const { fit: workloadFit, reasons, caveats } = assess(candidate, input.workload);
    const marketPrice = candidate.prices[input.market];
    const hasPrice = marketPrice.amount !== null && marketPrice.checkedAt !== null;
    const stale = hasPrice && now.getTime() - new Date(`${marketPrice.checkedAt}T00:00:00Z`).getTime() > FRESHNESS_MS;
    const currentPrice = hasPrice && !stale ? marketPrice.amount : null;
    const fit = currentPrice !== null && currentPrice > input.budget ? "over-budget" : workloadFit;

    if (currentPrice !== null) {
      reasons.push(`Dated price example: ${currentPrice.toLocaleString(undefined, { style: "currency", currency: marketPrice.currency })}; compare it with your entered budget.`);
    } else if (stale) {
      caveats.push("The listed price example is older than 30 days and is excluded from budget ranking; check the retailer for a current price.");
    } else {
      caveats.push("No verified current price example is available for this market, so this option is not ranked against your budget.");
    }

    return {
      ...candidate,
      fit,
      reasons,
      caveats,
      estimatedTotal: currentPrice,
    } satisfies Recommendation;
  });

  const fitRank = (fit: Recommendation["fit"]) => fit === "strong" ? 0 : fit === "constrained" ? 1 : 2;
  recommendations.sort((a, b) => {
    const aPriced = a.estimatedTotal !== null;
    const bPriced = b.estimatedTotal !== null;
    if (aPriced !== bPriced) return aPriced ? -1 : 1;
    if (fitRank(a.fit) !== fitRank(b.fit)) return fitRank(a.fit) - fitRank(b.fit);
    if (aPriced && bPriced && a.estimatedTotal !== b.estimatedTotal) return a.estimatedTotal! - b.estimatedTotal!;
    return (b.gpuMemoryGb ?? -1) - (a.gpuMemoryGb ?? -1);
  });

  return { error: null, recommendations, stalePriceCount };
}
