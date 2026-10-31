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
