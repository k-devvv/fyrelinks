# Original evidence and field measurement release

Publishes the Qwen3-0.6B context/memory experiment run on 26 October 2026. Publication is dated 3 November. Three actual input lengths, one warm-up and three measured trials per case; all nine measured outputs contain 64 tokens. The article table and chart derive from recorded JSON. Script hash, pinned model files, prompts, outputs, software versions and limits are public. Peak PyTorch allocation is not total GPU usage; end-to-end timing includes prefill and is not decode-only throughput. Power, thermals and background activity were not controlled.

Adds a research/resources hub, homepage feature and navigation/footer discovery. Measured articles have an explicit evidence label; other source reports retain their existing disclosure. Blank worksheets are not presented as executed tests. Preserves the current broadsheet layout, capped topic cards, author details, service/affiliate disclosures and security settings.

Adds consent-gated standard Web Vitals events, fixed numeric/name/rating payloads, no IDs/DOM attribution or query strings. CLS values are scaled by 1000 for numeric reporting; other values are milliseconds. Sources-section visibility is recorded as article_end_view, not proof of complete reading. No real-user metric values are invented. Privacy notice updated.

Validation: npm run check covers 149 articles, explicit measured-test labeling, data table/median parity, nine raw trials, script hash and bounded metric payloads. Hosted preview build and live reader-flow checks remain required before calling the release published. This work does not guarantee traffic, ad approval or rich results.
