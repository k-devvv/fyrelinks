# Competitor crawl and outbound link audit

Checked October 7, 2026. Public HTML and robots.txt were fetched directly; authenticated FyreLinkz Search Console and GA4 results were reviewed separately. This is a small public-page sample, not a full crawl or an estimate of competitor impressions, engagement or revenue.

| Homepage / landing page | HTTP | HTML anchors | H1 elements | Canonical in fetched HTML |
|---|---:|---:|---:|---|
| Unite.AI | 200 | 883 | 1 | https://www.unite.ai/ |
| The Decoder | 200 | 164 | 0 | https://the-decoder.com/ |
| The Rundown AI | 200 | 77 | 1 | Not found in fetched HTML |
| Artificial Analysis /models/ | 200 | 80 | 1 | https://artificialanalysis.ai/models |
| FyreLinkz | 200 | 82 | 1 | https://www.fyrelinkz.com |

No nofollow, sponsored or ugc tokens were counted on these sampled homepages. This does not establish how those sites qualify paid links on articles or other pages, and is not a reason to remove paid-link qualification. Anchor count does not measure ranking or quality. JavaScript rendering may expose additional metadata or links.

## Observable patterns to retain

- Unite.AI has broad topic navigation and section-level View All links. Use specific, crawlable topic hubs; avoid creating empty categories merely to match its scale.
- The Decoder exposes short news, research and practical AI coverage, source references and related/popular reading. Keep source citations ordinary links, and keep useful related reading in server-rendered HTML. Popular labels require actual supporting data.
- The Rundown exposes news, guides organized by user roles, tools and subscriptions. Prioritize understandable journeys from news to practical guides; do not add a nonfunctional signup form.
- Artificial Analysis offers model comparisons. Preserve our comparison pages and planner, with clear pricing assumptions and evidence limitations.

Existing FyreLinkz articles already have a direct answer, section headings, source references, FAQs, bylines, related reading, breadcrumbs, article structured data and server-rendered content. These are already useful patterns; duplicating them would add clutter.

## Robots and redirects

Unite.AI publishes a sitemap and excludes WordPress administration/login. The Decoder publishes a sitemap and excludes administrative and selected utility paths. The Rundown allows public content, excludes API and internal paths, and publishes general and news sitemaps. FyreLinkz allows public content, excludes API/admin/go paths and publishes its canonical sitemap. Do not copy another site's path exclusions.

The live apex https://fyrelinkz.com/ resolved successfully to https://www.fyrelinkz.com/ with HTTP 200. Search Console's redirect error was historical (last crawled September 8; report updated September 21). No current redirect loop was reproduced; no blind redirect configuration change was made.

## Correct outbound-link policy

- Ordinary editorial/internal links: no nofollow/sponsored qualification; there is no required dofollow attribute.
- Advertisements, sponsorships and affiliate links: sponsored; nofollow may also be retained.
- User-generated links: ugc when a UGC feature exists. FyreLinkz has no public commenting feature in this release.
- Other unendorsed links: nofollow when warranted; never apply indiscriminately to all citations.
- noopener/noreferrer are browsing/referrer controls, not substitutes for sponsored or nofollow.

Source: https://developers.google.com/search/docs/crawling-indexing/qualify-outbound-links

## Changes in this branch

SmartLink now compares exact hostnames rather than searching for a domain substring. Protocol-relative external links and lookalike domains remain external. Paid-link tokens merge with caller-supplied rel values and cannot be overwritten. Same-site affiliate redirect URLs receive the same qualification whether relative or absolute. Inline article links use this policy. A focused regression check is included in npm run check.

No competitor websites or external backlinks were modified. No ranking, crawling or indexing outcome is guaranteed. Search Console's nine discovered-not-indexed pages still require individual investigation; the aggregate report alone does not prove a code defect.
