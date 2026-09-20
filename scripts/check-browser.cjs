const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { chromium } = require(process.env.FYRE_PLAYWRIGHT_PATH || 'playwright');
const data = require('../lib/content/articles.json');
const base = process.env.FYRE_TEST_URL || 'http://127.0.0.1:3092';
const origin = 'https://www.fyrelinkz.com';
const output = process.env.FYRE_TEST_OUTPUT || path.resolve(__dirname, '../work/verification');
fs.mkdirSync(output, { recursive: true });

(async () => {
  const browser = await chromium.launch({
    headless: true,
    executablePath: process.env.FYRE_CHROMIUM_PATH
  });
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  const errors = [];
  page.on('pageerror', e => errors.push(e.message));

  const routes = ['/', '/news', '/create', '/workflow', '/hardware', '/stack', '/about', '/contact', '/privacy', '/terms', '/ai-video-models', ...data.map(p => '/' + p.category + '/' + p.slug)];
  let broken = [];
  let schemas = 0;

  for (const route of routes) {
    const res = await page.goto(base + route, { waitUntil: 'networkidle' });
    assert.equal(res.status(), 200, route);
    if (route === '/') {
      await page.screenshot({ path: path.join(output, 'fyrelinkz-desktop.png'), fullPage: true });
      await page.screenshot({ path: path.join(output, 'fyrelinkz-preview.png') });
    }
    assert.equal(await page.locator('h1').count(), 1, route + ' single H1');
    assert.equal(await page.locator('link[rel=canonical]').count(), 1, route + ' canonical');
    assert.equal(await page.locator('link[rel=canonical]').getAttribute('href'), origin + (route === '/' ? '' : route));
    assert.ok(!(await page.title()).includes('| FyreLinkz | FyreLinkz'), route + ' title duplication');

    // Verify NO calculator links remain on any page
    const calcLinks = await page.locator('a[href*="/tools/video-cost"]').count();
    assert.equal(calcLinks, 0, route + ' must not link to retired calculator');

    const graphs = await page.locator('script[type="application/ld+json"]').allTextContents();
    for (const raw of graphs) {
      JSON.parse(raw);
      schemas++;
    }

    const missing = await page.locator('img').evaluateAll(imgs => imgs.filter(i => !i.complete || i.naturalWidth === 0).map(i => i.src));
    assert.deepEqual(missing, [], route + ' images');
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false, route + ' desktop overflow');

    const story = data.find(p => route === '/' + p.category + '/' + p.slug);
    if (story) {
      const graph = graphs.flatMap(g => {
        const x = JSON.parse(g);
        return x['@graph'] || [];
      });
      const article = graph.find(x => x['@type'] === 'Article' || x['@type'] === 'NewsArticle');
      assert.ok(article?.image?.url);
      assert.equal(article.citation.length, story.sources.length);
      const asset = await page.request.get(article.image.url.replace(origin, base));
      assert.equal(asset.status(), 200);
      assert.equal(await page.locator('#sources ol li').count(), story.sources.length);
    }

    const links = await page.locator('a[href^="/"]').evaluateAll(as => as.map(a => a.getAttribute('href')).filter(h => !h.startsWith('/go/')));
    for (const href of new Set(links)) {
      const check = await page.request.get(base + href);
      if (check.status() >= 400) broken.push({ route, href, status: check.status() });
    }
  }

  assert.deepEqual(broken, [], 'Internal links');

  // Verify retired calculator permanent 308 redirect
  const retired = await page.request.get(base + '/tools/video-cost', { maxRedirects: 0 });
  assert.equal(retired.status(), 308, 'Retired calculator must return 308 permanent redirect');
  assert.ok(retired.headers()['location'].endsWith('/create/ai-video-generation-matrix-minimax-higgsfield-seedance'), 'Redirect destination');

  for (const route of ['/does-not-exist', '/hardware/runway-adobe-premiere-after-effects-plugins', '/news/no-such-story', '/madeup/ai-video-generation-matrix-minimax-higgsfield-seedance']) {
    assert.equal((await page.request.get(base + route)).status(), 404, route);
  }

  // Verify XML Feeds
  for (const route of ['/feed.xml', '/sitemap.xml']) {
    const res = await page.request.get(base + route);
    assert.equal(res.status(), 200);
    const content = await res.text();
    const parsed = await page.evaluate(text => {
      const d = new DOMParser().parseFromString(text, 'application/xml');
      return {
        error: !!d.querySelector('parsererror'),
        items: d.querySelectorAll('item').length,
        urls: d.querySelectorAll('url').length
      };
    }, content);
    assert.equal(parsed.error, false, route);
    if (route === '/feed.xml') {
      assert.equal(parsed.items, data.length, 'Feed item count equals article count (16)');
    } else {
      assert.equal(parsed.urls, routes.length, 'Sitemap URL count equals total routes (27)');
    }
  }

  const robots = await (await page.request.get(base + '/robots.txt')).text();
  assert.ok(!robots.includes('Disallow: /_next/'));
  assert.ok(robots.includes(origin + '/sitemap.xml'));

  // Search interaction test
  await page.goto(base, { waitUntil: 'networkidle' });
  await page.getByRole('button', { name: 'Search FyreLinkz' }).click();
  assert.equal(await page.getByRole('dialog').isVisible(), true);
  await page.getByRole('searchbox', { name: 'Search articles' }).fill('ComfyUI');
  assert.ok((await page.locator('.search-results a').count()) >= 2);
  await page.getByRole('searchbox').fill('no-match-xyz');
  assert.equal(await page.getByText(/No matching stories/i).isVisible(), true);
  await page.keyboard.press('Escape');
  assert.equal(await page.getByRole('dialog').isVisible(), false);
  await page.getByRole('button', { name: 'Search FyreLinkz' }).evaluate(e => e === document.activeElement);

  await page.keyboard.press('Control+k');
  assert.equal(await page.getByRole('dialog').isVisible(), true);
  await page.getByRole('searchbox').fill('Runway moves');
  await page.locator('.search-results a').first().click();
  await page.waitForURL('**/news/runway-adobe-premiere-after-effects-plugins');
  assert.equal(await page.getByRole('dialog').isVisible(), false);

  await page.screenshot({ path: path.join(output, 'fyrelinkz-article.png'), fullPage: true });

  // Model directory filtering test
  await page.goto(base + '/ai-video-models', { waitUntil: 'networkidle' });
  assert.equal(await page.locator('.model-directory').isVisible(), true);
  await page.locator('.directory-search input').fill('Kling');
  const countKling = await page.locator('.model-directory table tbody tr').count();
  assert.ok(countKling > 0, 'Kling results visible');
  await page.screenshot({ path: path.join(output, 'fyrelinkz-model-directory.png') });

  // Responsive layout tests
  for (const width of [320, 390, 768]) {
    await page.setViewportSize({ width, height: 844 });
    for (const route of ['/', '/news', '/create', '/ai-video-models', '/create/comfyui-flux-lora-training-and-inference-guide']) {
      await page.goto(base + route, { waitUntil: 'networkidle' });
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false, route + ' overflow at ' + width);
    }
  }

  // Mobile navigation test
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(base, { waitUntil: 'networkidle' });
  await page.screenshot({ path: path.join(output, 'fyrelinkz-mobile.png'), fullPage: true });
  await page.getByRole('button', { name: 'Open menu' }).click();
  assert.equal(await page.getByRole('navigation', { name: 'Main navigation' }).isVisible(), true);
  await page.getByRole('navigation', { name: 'Main navigation' }).getByRole('link', { name: 'Hardware', exact: true }).click();
  await page.waitForURL('**/hardware');
  assert.equal(await page.getByRole('button', { name: 'Open menu' }).getAttribute('aria-expanded'), 'false');

  assert.deepEqual(errors, [], 'Browser errors');

  const report = {
    routes: routes.length,
    schemas,
    invalidRoutes: 4,
    internalLinks: 'passed',
    rssItems: data.length,
    sitemapUrls: routes.length,
    desktopWidths: [1440],
    responsiveWidths: [320, 390, 768],
    search: 'passed',
    calculatorRedirect: 'passed',
    modelDirectory: 'passed',
    mobileNavigation: 'passed',
    browserErrors: errors
  };

  fs.writeFileSync(path.join(output, 'verification.json'), JSON.stringify(report, null, 2));
  console.log(JSON.stringify(report, null, 2));
  await browser.close();
})().catch(e => {
  console.error(e);
  process.exit(1);
});
