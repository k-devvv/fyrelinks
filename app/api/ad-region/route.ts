import { NextResponse } from "next/server";
import { adsNeedConsent, countryFromHeaders } from "@/lib/advertising";

export const dynamic = "force-dynamic";

// Returns only whether ads need opt-in here; the visitor's country is not echoed or stored.
export function GET(request: Request) {
  const country = countryFromHeaders(request.headers);
  return NextResponse.json(
    { consentRequired: adsNeedConsent(country), detected: country !== null },
    { headers: { "cache-control": "private, no-store" } }
  );
}
