"use client";

import { useEffect, useState } from "react";
import styles from "./wildweights.module.css";

const CONSENT_KEY = "wildweights-exoclick-consent-v1";
const adDocument = `<!doctype html>
<html lang="en">
<head><meta name="viewport" content="width=device-width,initial-scale=1"><style>html,body{margin:0;background:transparent}ins{display:block;width:100%;min-height:250px}</style></head>
<body>
<script async type="application/javascript" src="https://a.magsrv.com/ad-provider.js"><\/script>
<ins class="eas6a97888e2" data-zoneid="6053886"></ins>
<script>(AdProvider = window.AdProvider || []).push({"serve": {}});<\/script>
</body></html>`;

export default function WildWeightsExoclickAd() {
  const [choice, setChoice] = useState<"unknown" | "allow" | "decline" | "blocked">("unknown");

  useEffect(() => {
    const privacySignal =
      navigator.doNotTrack === "1" ||
      (navigator as Navigator & { globalPrivacyControl?: boolean }).globalPrivacyControl === true;
    if (privacySignal) {
      setChoice("blocked");
      return;
    }
    setChoice(window.localStorage.getItem(CONSENT_KEY) === "allow" ? "allow" : "unknown");
  }, []);

  function choose(next: "allow" | "decline") {
    window.localStorage.setItem(CONSENT_KEY, next);
    setChoice(next);
  }

  return (
    <section className={styles.adPanel} aria-labelledby="wildweights-ad-title">
      <div className={styles.adHeader}>
        <div>
          <p className={styles.kicker}>OPTIONAL AD / EXOCLICK</p>
          <h2 id="wildweights-ad-title">Support this free directory.</h2>
        </div>
        {choice === "allow" && (
          <button className={styles.adRevoke} type="button" onClick={() => choose("decline")}>
            Turn ads off
          </button>
        )}
      </div>

      {choice === "allow" ? (
        <iframe
          className={styles.adFrame}
          title="Advertisement served by ExoClick"
          srcDoc={adDocument}
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
          sandbox="allow-scripts allow-popups allow-popups-to-escape-sandbox"
          width="300"
          height="250"
        />
      ) : (
        <div className={styles.adChoice}>
          {choice === "blocked" ? (
            <p>Ads stay off because your browser privacy signal asks sites not to load them.</p>
          ) : choice === "decline" ? (
            <p>Ads are off. You can change this choice any time.</p>
          ) : (
            <>
              <p>
                ExoClick receives your IP address, browser details and page referrer if you allow
                this ad. Its adult inventory may include suggestive material. We block the
                Explicit Content and NSFW categories, but cannot guarantee every creative is mild.
                Ads stay off until you choose.
              </p>
              <div className={styles.adActions}>
                <button className={styles.adAllow} type="button" onClick={() => choose("allow")}>
                  Allow this ad
                </button>
                <button className={styles.adDecline} type="button" onClick={() => choose("decline")}>
                  Keep ads off
                </button>
              </div>
            </>
          )}
        </div>
      )}
      <p className={styles.adFootnote}>
        Separate from the 18+ entry check and FyreLinkz ad preferences. Read the{" "}
        <a href="/privacy">privacy details</a>. You can withdraw permission here.
      </p>
    </section>
  );
}
