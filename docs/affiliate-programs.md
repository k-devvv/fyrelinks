# Affiliate programme shortlist

Researched 31 October 2026. **Every rate below must be confirmed on the programme's own
page before you rely on it.** Several came from third-party affiliate blogs that have their
own interest in the numbers, and headline rates are often tiered, capped, or one-time
despite being presented as recurring. Rates and programme availability change without
notice; two programmes in this space closed or paused during 2026.

## Why recurring beats one-off

The target is ₹10,000–30,000 a month (roughly $120–360).

| Model | Per conversion | To reach ₹10,000/month | Resets monthly? |
|---|---|---|---|
| Hardware, 1–2% of a ₹2L build | ₹2,000–4,000 once | 3–5 sales **every month** | Yes |
| Software, 20% recurring on a $30/month plan | ~$6/month while subscribed | ~20 active subscriptions | **No** |

One-off hardware commissions start from zero every month. Recurring software commissions
accumulate: twenty subscriptions earned over a year keep paying in month thirteen. Getting
to ₹10,000 a month needs roughly twenty active subscriptions, not twenty a month. That is
the only route on this site that compounds, so it is the one to build around.

The catch is that most recurring terms are capped at 6–12 months, not lifetime, so churn
and term limits mean the base leaks and must keep being topped up.

## Confirmed from official documentation

**Runpod** — [official docs](https://docs.runpod.io/accounts-billing/referrals)

- Standard referral: **5% of Serverless spend, 3% of Pod spend, first 6 months, paid in
  Runpod credits.**
- Affiliate tier: **10% cash on all referral spend, first 6 months**, via Partnerstack, but
  only after referring **25 paying users** on the standard programme. Opting in is
  permanent.
- Referred users must sign up with Google SSO, be genuinely new, and load at least $10.
- Note the docs give conflicting beta cutoff dates; confirm in the dashboard.

Credits-not-cash and the 25-user gate make this a slow starter, but it is the best fit for
readers who conclude from the planner that they should rent rather than buy.

## Reported by third parties — verify before applying

| Programme | Reported terms | Source quality |
|---|---|---|
| Higgsfield | 15% recurring, 12 months, via Impact | single secondary source |
| PixVerse | 30% recurring, 12 months, 90-day cookie | vendor's own guide |
| Synthesia | 30% lifetime recurring | 2026 roundup blog |
| InVideo | up to 50% monthly / 25% annual, recurring | comparison blog |
| AI Studios | 40% for 6 months, 60-day cookie, manual review | vendor page |
| Novita AI | 10% revenue share, 180 days, 90-day cookie | directory listing |
| Ampere.sh | 30% recurring on each top-up | vendor page |
| CloudSigma | 15% revenue share, account lifetime | vendor page |
| AccuWeb.Cloud | 25% lifetime recurring, $200 minimum payout | vendor page |
| Thunder Compute | 3% lifetime, paid in platform credits | vendor page |
| Cirrascale | monthly recurring on multi-GPU dedicated sales | vendor page |

Higgsfield is the only one of the four platforms already in the model directory with any
reported programme. Runway, Luma and Pika terms were not found; check their sites directly.

**Closed or paused as of 2026:** Leonardo AI closed its programme on 7 April 2026. Notion
has been paused to new affiliates since early 2026.

## Where each variable's value comes from

There is nothing to fetch. Each programme issues a tracking URL or code only after it
approves you, from its own dashboard, and you paste the result into the matching variable in
the Cloudflare Pages project. Checked 31 October 2026; confirm on each programme's own page.

### What each value looks like

Programmes issue two different things, so `lib/redirects.ts` supports two modes per slug.

**Mode `replace` (the default).** The programme hands you a complete tracking URL, as
Runpod, Runway and Hailuo do. The variable holds that whole URL:

    FYRE_AFF_RUNPOD=https://runpod.io?ref=yourcode

**Mode `param`.** The programme works by adding one parameter to any URL on its own
domain, which is how Amazon Associates works. The variable holds **just the value**:

    FYRE_AFF_AMAZON_US=yourtag-20

That resolves to `https://www.amazon.com/s?k=nvidia+rtx+graphics+card&tag=yourtag-20`. The
existing query survives, a fragment stays last, an already-present `tag` is replaced rather
than duplicated, and the value is URL-encoded. Because one variable carries the tag rather
than a whole URL, the same value also covers deep links to specific products added later as
their own slugs — no second account, no second variable.

A `param` value is never treated as a destination, so a mistyped tag cannot send readers off
the marketplace. `verify-content` asserts that, along with both modes and the blank-value
fallback.

A variable left unset is not a failure: the plain link is served and earns nothing.

### Programme by programme

| Variable | Status | Where to get it |
|---|---|---|
| `FYRE_AFF_RUNPOD` | **Open, terms documented** | Referral dashboard. 5% of Serverless and 3% of Pod spend for 6 months, in credits. The 10% cash affiliate tier needs 25 paying referrals first and opting in is permanent. |
| `FYRE_AFF_MINIMAX` | **Open** | `hailuoai.video/affiliate`. The page states tiers from 10% to 30% of paid referrals, $10 minimum payout, contact `partner@minimaxi.com`. Its own claims, unverified. |
| `FYRE_AFF_VIDEO_RUNWAY` | **Open** | `runway.com/affiliate-program`. Applications open to every tier, needs a free Runway account, every submission reviewed. One locale page states $15 per new subscriber plus a 25%-off code for readers; terms differ by locale, so read the English page. Not to be confused with Runway Catalog on Awin, a different company, or the invitation-only Creative Partners Program. |
| `FYRE_AFF_VIDEO_HIGGSFIELD` | Reported only | Impact-network Ambassador programme, reported at 15% recurring for 12 months by one secondary source. Find it through Impact or ask Higgsfield directly. |
| `FYRE_AFF_IDEOGRAM` | Exists, gated | Routed through the Creators Club. Its terms say acceptance is at Ideogram's sole discretion and rewards can be changed or withheld. No public signup page found. |
| `FYRE_AFF_VIDEO_LUMA` | **No affiliate programme** | Luma's Creative Partner Program is credits for creators, not commission, and expects 5,000+ engaged followers. Leave unset. |
| `FYRE_AFF_VIDEO_PIKA` | **None found** | No affiliate or partner programme surfaced. Leave unset. |
| `FYRE_AFF_SEEDANCE` | **None found** | fal.ai has partner and startup credit programmes, not a referral programme. Leave unset. |
| `FYRE_AFF_KIMI` | Unchecked | Moonshot publishes no programme I have looked at. Leave unset. |
| `FYRE_AFF_AMAZON_*` | Open but a poor fit | See below. |

### Amazon is the weakest of these, not the easiest

It looks like the obvious starting point and is probably the worst use of effort here.

- **Each storefront is a separate account with its own tag**, `-20` for US, `-21` for UK. Changing
  the domain while keeping another marketplace's tag earns nothing. Four variables means
  four applications. The `param` mode at least means each is one short value, and covers any
  future deep link into the same marketplace.
- **An India-based account likely earns nothing on US or UK buyers.** Publishers report
  commission only on Indian purchases, and the standard advice is to register with the
  storefront each visitor comes from. The planner's markets are US, UK, Canada and Germany,
  and Search Console shows the audience is US and UK, so an India account does not serve it.
- **The India programme requires Indian residency, a local bank account and a PAN number.**
- **OneLink may not localise links for a non-US home account**, reported by one publisher for
  other non-US accounts and unconfirmed for India.
- Computer and component categories sit at the bottom of Amazon's rate card, commissions are
  one-off, and each account must reach qualifying sales within a deadline. At 468 impressions
  a month, four accounts racing a sales deadline will most likely all lapse.

Leave the planner links wired and expect nothing. Spend the effort on Runpod, Hailuo and
Runway, whose commissions recur and whose signup does not depend on where you live.

## Not worth prioritising

Amazon Associates. Computer and component categories sit at the bottom of its rate card,
commissions are one-off, and each country needs its own account with its own qualifying-sales
deadline. The planner links are already wired, so leave them in place and expect little.

## Application order

1. **Runpod**, now. Terms are documented, the audience fit is direct, and the 25-user gate
   means starting early matters.
2. **Higgsfield**, now. It is already the default-open provider in the directory, so it gets
   the most attention of any platform on the site.
3. **One cloud GPU host with lifetime recurring terms** — AccuWeb.Cloud and CloudSigma both
   report lifetime rather than 6-month terms, which is worth more than a higher capped rate.
   Check the minimum payout; $200 is a long wait at this traffic.
4. **Runway, Luma, Pika** — check whether programmes exist at all before writing about them.
5. Everything else only once something is actually converting.

## Wiring

Slugs live in `lib/redirects.ts` and resolve through `/go/<slug>`. Set the matching
`FYRE_AFF_*` variable in the Cloudflare Pages project to the tracking URL; leave it unset
and the link still works but earns nothing. Current slugs: `runpod`, `video-higgsfield`,
`video-runway`, `video-luma`, `video-pika`, `minimax`, `kimi`, `seedance`, `ideogram`, and
`amazon-us|uk|ca|de`.

Placement rules this site keeps:
- Editorial citations stay plain links. The "Source" and "Verify on" links in the model
  directory are never monetised, because the sourcing is what the site is for.
- Commercial links are separate, labelled, `rel="nofollow sponsored"`, and routed through
  `/go/` so they are measurable and excluded from indexing.
- Clicks fire the `provider_visit` event with a `provider` and `placement`, so it is
  possible to tell which page earns rather than guessing.
