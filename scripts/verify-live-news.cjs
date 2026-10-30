const assert = require('node:assert/strict');
const fs = require('node:fs');
const ts = require('typescript');
require.extensions['.ts'] = (m, f) => m._compile(ts.transpileModule(fs.readFileSync(f, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText, f);
const { parseFeed } = require('../lib/live-news.ts');

const rss = `<rss><channel>
<item><title><![CDATA[New GPU &amp; model]]></title><link>https://a.example/one</link><pubDate>Thu, 29 Oct 2026 10:00:00 GMT</pubDate><description>Long article text</description></item>
<item><title>Script link</title><link>javascript:alert(1)</link><pubDate>Thu, 29 Oct 2026 09:00:00 GMT</pubDate></item>
<item><title>No date</title><link>https://a.example/nodate</link></item>
<item><title>Far future</title><link>https://a.example/future</link><pubDate>Thu, 01 Jan 2099 00:00:00 GMT</pubDate></item>
</channel></rss>`;
const items = parseFeed(rss, { name: 'Example', feed: '' });
assert.deepEqual(items.map(i => i.url), ['https://a.example/one']);
assert.equal(items[0].title, 'New GPU & model');
assert.equal(items[0].source, 'Example');
assert.ok(!('description' in items[0]), 'article text must not be kept');

const atom = `<feed><entry><title type="html">Release &lt;b&gt;v1&lt;/b&gt; &#x27;fast&#x27;</title>
<link rel="enclosure" href="https://b.example/file.zip"/><link rel="alternate" type="text/html" href="https://b.example/release"/>
<updated>2026-10-28T08:00:00Z</updated></entry></feed>`;
const [entry] = parseFeed(atom, { name: 'Atom', feed: '' });
assert.equal(entry.url, 'https://b.example/release');
assert.equal(entry.title, "Release v1 'fast'");

const mixed = `<rss>${['AI chip launch', 'Cooking tips', 'New RTX card'].map((t, i) => `<item><title>${t}</title><link>https://c.example/${i}</link><pubDate>Wed, 28 Oct 2026 0${i}:00:00 GMT</pubDate></item>`).join('')}</rss>`;
assert.deepEqual(parseFeed(mixed, { name: 'Filtered', feed: '', keep: /\b(ai|rtx)\b/i }).map(i => i.title), ['New RTX card', 'AI chip launch']);

const many = `<rss>${Array.from({ length: 12 }, (_, i) => `<item><title>Item ${i}</title><link>https://d.example/${i}</link><pubDate>Tue, 27 Oct 2026 ${String(i).padStart(2, '0')}:00:00 GMT</pubDate></item>`).join('')}</rss>`;
assert.equal(parseFeed(many, { name: 'Busy', feed: '' }).length, 8);

console.log('Live news checks passed: RSS and Atom links, unsafe URLs, missing and future dates, topic filter, per-source cap, no article text.');
