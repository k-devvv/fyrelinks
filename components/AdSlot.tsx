import Link from "next/link";
import Advertising from "./Advertising";

const PLACEMENTS = {
  home: process.env.FYRE_HOME_SPONSOR_URL,
  article: process.env.FYRE_ARTICLE_SPONSOR_URL
};

export default function AdSlot({
  placement
}: {
  placement: "home" | "article" | "sidebar";
}) {
  const sponsorUrl = placement === "sidebar" ? undefined : PLACEMENTS[placement];
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

  // Network placements use an independent opt-in and isolated per-unit frame.
  return <Advertising placement={placement} />;
}
