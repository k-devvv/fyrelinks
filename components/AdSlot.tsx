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
  const url = PLACEMENTS[placement];
  const title = process.env.FYRE_SPONSOR_TITLE;
  const adsenseClientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;

  // If a direct sponsor is configured, render labeled sponsor link
  if (url && title && url.startsWith("https://")) {
    return (
      <aside className="ad-slot" aria-label="Advertisement">
        <span className="eyebrow">SPONSOR</span>
        <a href={url} rel="sponsored nofollow noopener noreferrer" target="_blank">
          {title} ↗
        </a>
        <Link href="/about#funding">About our funding</Link>
      </aside>
    );
  }

  // If Google AdSense client ID is provided in future, slot is ready
  // Currently inactive because user has not supplied publisher ID
  if (adsenseClientId && adsenseClientId.startsWith("ca-pub-")) {
    return (
      <aside className="ad-slot ad-slot-adsense" aria-label="Advertisement">
        <span className="eyebrow">ADVERTISEMENT</span>
        {/* Placeholder ready for approved AdSense publisher unit */}
        <ins
          className="adsbygoogle"
          style={{ display: "block" }}
          data-ad-client={adsenseClientId}
          data-ad-slot={placement === "home" ? "1000000001" : "1000000002"}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
        <Link href="/privacy#advertising">Ad policy & consent</Link>
      </aside>
    );
  }

  // No active ads or tracking scripts when no publisher ID is configured
  return null;
}
