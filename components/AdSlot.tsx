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
  const adsenseClientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;
  const homeSlotId = process.env.NEXT_PUBLIC_ADSENSE_HOME_SLOT_ID;
  const articleSlotId = process.env.NEXT_PUBLIC_ADSENSE_ARTICLE_SLOT_ID;
  const slotId = placement === "home" ? homeSlotId : articleSlotId;

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

  // 2. Google AdSense unit ONLY when both valid client ID AND real numeric slot ID are configured
  if (adsenseClientId && adsenseClientId.startsWith("ca-pub-") && slotId && /^\d+$/.test(slotId)) {
    return (
      <aside className="ad-slot ad-slot-adsense" aria-label="Advertisement">
        <span className="eyebrow">ADVERTISEMENT</span>
        <ins
          className="adsbygoogle"
          style={{ display: "block" }}
          data-ad-client={adsenseClientId}
          data-ad-slot={slotId}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
        <Link href="/privacy#advertising">Ad policy & consent</Link>
      </aside>
    );
  }

  // Strictly suppressed when unconfigured — zero layout shift, zero dummy IDs, zero tracking
  return null;
}
