import { feedResponse } from "../lib/feed";

// /feed.xml negotiates on the Accept header, so it cannot be a static file.
// Feed readers are few, so this stays well inside the free Workers quota.
function handle({ request }) {
  return feedResponse(request);
}

export const onRequestGet = handle;
// Without this, HEAD falls through to the static fallback file instead of the
// handler, so the two disagree on status and headers.
export const onRequestHead = handle;
