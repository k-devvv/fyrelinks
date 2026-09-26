# FyreLinkz search and distribution notes

Updated September 26, 2026. This plan uses the Search Console screenshot supplied by the site owner; it is an early snapshot, not a complete query or landing-page export.

## What current evidence says

The screenshot shows the selected three-month view covering September 7–23: 154 impressions, 2 clicks, 1.3% CTR and average position 17.9. The visible query rows show `findrez ai` (15 impressions), scraping comparisons (8 combined across “scrapling vs firecrawl” and “firecrawl vs scrapling”), and Windsurf/Cursor/Copilot comparisons (7 across two visible rows). These are query totals, not page totals. Screenshot does not reveal which URLs earned impressions, where visitors left, or what article deserves a rewrite. Do not claim an exact top-performing page from this evidence.

Before choosing the next evergreen topic, export Search Console Performance data with date, query and page dimensions for the same range. Inspect rows with relevant impressions, position 8–25 and low CTR. Pair each query with its landing URL. Prioritize a clear intent match and useful page improvement; ignore misspellings or unrelated terms unless the landing report confirms real audience fit. Compare equal-length periods after enough data accumulates.

## Current editorial action

Publish the September 24 Google Research report on long-form video continuity as a sourced news article for the site's AI creator audience. Clearly label it as research, attribute benchmark results to Google, link to the underlying papers, and avoid claims that readers can use a generally available product. Link from the existing AI-video prompt guide and back to practical guides. The title, description and first section give searchers a direct answer; original thumbnail depicts continuity across two shots.

Search snippet in use:

- **Title:** Google’s AI co-director tackles long-video continuity
- **Description:** Google Research outlined four systems for planning shots, preserving characters and refining long AI videos. Here is what creators can use—and what remains research.

Social draft for owner review: “AI video can look convincing shot by shot and still lose the story at every cut. Google Research’s new report groups four approaches to planning, remembering, generating and reviewing longer sequences. We break down what the papers show, what is still research, and a continuity checklist creators can use today.”

## Crawl and link rules

The site already serves a dynamic XML sitemap, crawlable `robots.txt`, canonical article URLs, static-rendered article pages and `NewsArticle` structured data with citations. New content automatically enters sitemap, RSS and the newsroom. After deployment, inspect the exact production URL in Search Console and submit or refresh `/sitemap.xml`; sitemap submission and URL inspection invite crawling but do not guarantee indexing or rankings.

Keep relevant internal links as normal followed links. Editorial sources can remain followed: `noopener` and `noreferrer` protect browser behavior but do not add `nofollow`. Qualify paid, affiliate or sponsored links with `rel="sponsored"` (the site's ad and SmartLink components already do this). `nofollow` is a link hint, not a crawler control. Do not blanket nofollow every outbound link, buy backlinks, trade keyword-stuffed links, or publish doorway pages. Keep redirect/ad routes `noindex` so they do not become search landing pages.

## Distribution and revenue

Share the article only where AI-video and creator communities allow relevant self-promotion. Lead with its continuity checklist and primary research links; disclose site ownership and add the URL only when it helps the discussion. Reuse one chart or frame sequence for social, plus a short newsletter blurb if the site later adds an opt-in newsletter. Do not automate unsolicited messages or post duplicate link drops.

Measure Search Console impressions, clicks, CTR and position by query/page. Use analytics for engaged visits and useful next-page clicks. Track ad revenue from actual account reports. Keep ad slots clearly labeled and stable; avoid forced popups and interstitials that interrupt reading. Add ad demand only after site eligibility and privacy requirements are confirmed.

## Review cadence

After deployment, check URL inspection, sitemap status, canonical, rich-result parsing and mobile rendering. After 2–4 weeks, compare query/page exports and revise title or opening only where the page earns relevant impressions but underperforms. After 4–8 weeks, decide whether the topic merits a second guide. Report actual deltas; do not promise indexing, traffic or earnings.
