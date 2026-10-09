import type { Recommendation } from "./hardware-planner/types";

export type PlannerOutcome = "no-match" | "unpriced" | "priced-within-budget" | "priced-over-budget";
export type PlannerSourceKind = "spec" | "retailer";

const allowedValues: Record<string, ReadonlySet<string>> = {
  market: new Set(["us", "uk", "ca", "de"]),
  workload: new Set(["comfyui-image", "comfyui-video", "local-llm", "mixed"]),
  path: new Set(["desktop-build", "desktop-upgrade", "laptop"]),
  placement: new Set(["planner", "result-card", "methodology"]),
  outcome: new Set(["no-match", "unpriced", "priced-within-budget", "priced-over-budget"]),
  source_kind: new Set(["spec", "retailer"]),
};

/** Fixed categorical fields only; budget, text and URLs never leave this boundary. */
export function sanitizePlannerFields(properties: unknown): Record<string, string> {
  if (!properties || typeof properties !== "object" || Array.isArray(properties)) return {};
  const input = properties as Record<string, unknown>;
  const fields: Record<string, string> = {};
  for (const [key, values] of Object.entries(allowedValues)) {
    const value = input[key];
    if (typeof value === "string" && values.has(value)) fields[key] = value;
  }
  return fields;
}

export function plannerOutcome(results: readonly Recommendation[], budget: number): PlannerOutcome {
  if (!results.length) return "no-match";
  const priced = results.filter(result => result.estimatedTotal !== null);
  if (!priced.length) return "unpriced";
  return priced.some(result => result.estimatedTotal! <= budget) ? "priced-within-budget" : "priced-over-budget";
}
