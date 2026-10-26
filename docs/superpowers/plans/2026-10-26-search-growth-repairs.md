# Search growth repairs implementation plan

Goal: repair measured reader-trust, discovery and measurement gaps without claiming guaranteed rankings.

Approved scope: existing user instruction to fix all listed gaps. Keep current design and consent boundaries. No paid services or unsolicited outreach.

1. Add static news pagination: 24 cards per page, ordinary crawlable archive links, self canonicals, matching ItemList and sitemap entries. Validate every news story appears once across pages, invalid page URLs reject.
2. Replace unavailable correction channel with verified enabled GitHub Issues. Clearly warn that reports are public, require GitHub, and must omit personal information. Preserve privacy-request channel limitation. Disclose actual AI-assisted editorial workflow without inventing human review or credentials.
3. Add small curated in-body reading paths for local inference, world reconstruction, agent systems and extraction. Verify targets exist and exclude current article.
4. Add consent-gated FAQ-open and resource-download events. Send only fixed event types, section IDs and same-origin resource paths, never search text, queries or form contents. Preserve DNT/GPC.
5. Publish reproducible standard-library extraction fixture test and actual result, including limitations and source hashes. It is not a GPU test or vendor benchmark.
6. Run repository check plus regression checks, hosted preview build, preview HTTP/canonical/HTML-size/route checks; merge only passing changes. Verify production before claiming published.

External outcomes remain unfulfilled until measured: Google indexing/rankings, earned links, actual user analytics and AdSense approval. No fabricated completion.
