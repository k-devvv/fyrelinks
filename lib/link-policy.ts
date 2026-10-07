const SITE_ORIGIN = "https://www.fyrelinkz.com";

export function linkPolicy(href: string, paid = false, suppliedRel = "", target?: string) {
  let url: URL;
  try { url = new URL(href, SITE_ORIGIN); }
  catch { return { internal: false, rel: "nofollow", target }; }
  const sameSite = ["fyrelinkz.com", "www.fyrelinkz.com"].includes(url.hostname)
    && ["http:", "https:"].includes(url.protocol);
  const affiliate = paid || (sameSite && url.pathname.startsWith("/go/"));
  const internal = sameSite && !affiliate;
  const finalTarget = target ?? (internal ? undefined : "_blank");
  const rel = new Set(suppliedRel.split(/\s+/).filter(Boolean));
  // "dofollow" is not a defined link relationship: normal editorial links need no qualifier.
  rel.delete("dofollow");
  if (affiliate) { rel.add("sponsored"); rel.add("nofollow"); }
  if (finalTarget === "_blank") { rel.add("noopener"); rel.add("noreferrer"); }
  return { internal, rel: Array.from(rel).join(" ") || undefined, target: finalTarget };
}
