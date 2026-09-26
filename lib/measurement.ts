export type MeasurementName = "estimate_view" | "estimate_share" | "model_select" | "plan_select" | "provider_visit" | "source_visit" | "rss_subscribe" | "related_read" | "planner_start" | "planner_complete" | "planner_market" | "planner_guide_click" | "planner_source_click";
export function measure(name: MeasurementName, properties: Record<string, string | number> = {}) {
  if (typeof window !== "undefined") window.dispatchEvent(new CustomEvent("fyre:measure", {detail: {name, properties}}));
}
