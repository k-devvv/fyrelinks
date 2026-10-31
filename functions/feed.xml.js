import { feedResponse } from "../lib/feed";

// /feed.xml negotiates on the Accept header, so it cannot be a static file.
// Feed readers are few, so this stays well inside the free Workers quota.
export function onRequestGet({ request }) {
  return feedResponse(request);
}
