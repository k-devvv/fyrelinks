import { resolveRedirect } from "../../lib/redirects";

// Cloudflare Pages Function. Only affiliate clicks reach it, so it stays far
// inside the free Workers request quota; static pages never invoke it.
function handle({ params, env }) {
  const raw = Array.isArray(params.slug) ? params.slug[0] : params.slug;
  const destination = resolveRedirect(raw || "", env || {});

  if (!destination) {
    return new Response("Link not found", {
      status: 404,
      headers: { "X-Robots-Tag": "noindex", "Content-Type": "text/plain; charset=utf-8" },
    });
  }

  return new Response(null, {
    status: 307,
    headers: {
      Location: destination,
      "X-Robots-Tag": "noindex, nofollow",
      "Cache-Control": "no-store",
    },
  });
}

export const onRequestGet = handle;
// HEAD must answer too: a handler registered only for GET makes Pages fall
// through, and with no static asset behind /go/ that is a 404. Link checkers
// and crawlers commonly use HEAD, so the links would read as broken.
export const onRequestHead = handle;
