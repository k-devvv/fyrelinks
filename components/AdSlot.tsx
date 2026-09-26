import Link from "next/link";

const PLACEMENTS = {
  home: process.env.FYRE_HOME_SPONSOR_URL,
  article: process.env.FYRE_ARTICLE_SPONSOR_URL
};

export default function AdSlot({
  placement
}: {
  placement: "home" | "article";
}) {
  const sponsorUrl = PLACEMENTS[placement];
  const sponsorTitle = process.env.FYRE_SPONSOR_TITLE;
  // 1. Direct sponsor link if explicitly configured with verified HTTPS
  if (sponsorUrl && sponsorTitle && sponsorUrl.startsWith("https://")) {
    return (
      <aside className="ad-slot" aria-label="Sponsorship">
        <span className="eyebrow">SPONSOR</span>
        <a href={sponsorUrl} rel="sponsored nofollow noopener noreferrer" target="_blank">
          {sponsorTitle} ↗
        </a>
        <Link href="/about#funding">About our funding</Link>
      </aside>
    );
  }

  // Network-ad rendering stays disabled until a real CMP and ad loader are integrated.
  // A configured AdSense <ins> alone is inert and would appear as a misleading blank slot.
  return null;
}
