import { NextRequest, NextResponse } from "next/server";
import { getRedirectUrl } from "@/lib/redirects";

export const dynamic = "force-dynamic";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const destination = getRedirectUrl((await params).slug || "");

  if (destination) {
    const response = NextResponse.redirect(destination, 307);
    response.headers.set("X-Robots-Tag", "noindex, nofollow");
    return response;
  }

  return new NextResponse("Link not found", { status: 404, headers: { "X-Robots-Tag": "noindex" } });
}
