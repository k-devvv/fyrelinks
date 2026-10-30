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

  // 2. Google AdSense network ad when publisher client ID is configured
  const adsenseClientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;
  if (adsenseClientId) {
    const slotId = placement === "home"
      ? process.env.NEXT_PUBLIC_ADSENSE_HOME_SLOT_ID
      : process.env.NEXT_PUBLIC_ADSENSE_ARTICLE_SLOT_ID;

    return (
      <aside className="ad-slot adsense-container" aria-label="Advertisement" style={{ minHeight: "120px", margin: "2rem 0" }}>
        <span className="eyebrow ad-label" style={{ opacity: 0.6, fontSize: "0.75rem", letterSpacing: "0.05em" }}>ADVERTISEMENT</span>
        <ins
          className="adsbygoogle"
          style={{ display: "block" }}
          data-ad-client={adsenseClientId}
          {...(slotId ? { "data-ad-slot": slotId } : {})}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: "(window.adsbygoogle = window.adsbygoogle || []).push({});"
          }}
        />
      </aside>
    );
  }

  return null;
}
