# FyreLinkz editorial redesign

Approved direction: warm-white editorial magazine, bold ink headlines, orange accents, original illustrations, image-led news and focused topic navigation. Audience: people creating with AI video, ComfyUI and local GPUs. Keep the existing Next.js 14 application and existing article URLs.

Homepage: compact masthead; topic navigation; lead news feature with two secondary stories; a dated news list; practical guides; a clearly labeled reader tool; RSS subscription. Article: breadcrumb, headline, summary, publication and source dates, editorial byline, illustration, key takeaway, contents links, sections, primary sources and related reading. Mobile uses one column, accessible menus and native dialog search. No invented popularity counts or subscribers.

Content: replace unsupported test claims with original documentation-based explanations, separately identify reporting versus editorial advice, attach primary sources, and publish recent verifiable news with actual event dates. Both sample video files have identical SHA256 hashes, so remove their use as model-specific evidence. Preserve all eleven legacy URLs through rewritten articles. No automatic reposting of third-party articles.

Technical: static server rendering; compact search records passed to client; strict category + slug lookup; one title suffix; route-specific canonicals and share images; Article/NewsArticle and breadcrumb schema; sitemap, RSS, crawlable assets and real 404s. Original vector illustrations rendered to local PNG for sharing. Use source dates in news and stable publication dates, never new Date() as a freshness shortcut.

Revenue: unobtrusive reserved ad locations enabled only by real configured placement data. No active ad-network integration without publisher configuration. Useful cost calculator based on reader inputs and labeled illustrative defaults. RSS is a working retention feature. No fake newsletter success.

Verification: content assertions; TypeScript and production build; local HTTP checks for valid pages, unknown routes, canonical metadata, JSON-LD, images and RSS; desktop/mobile browser screenshots and keyboard/search/calculator checks. Changes stay in a workspace copy until verified. A diff and original-file hashes guard transfer back to Downloads.

External publishing and distribution are separate actions. This request authorizes development and content preparation; the pasted prior prompt does not authorize a production push or community posting.
