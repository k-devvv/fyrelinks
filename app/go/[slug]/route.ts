import { NextRequest, NextResponse } from "next/server";
import { REDIRECT_MAP } from "@/lib/redirects";

export const dynamic = "force-dynamic";

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  const slug = params.slug?.toLowerCase();
  const destination = REDIRECT_MAP[slug];

  if (destination) {
    return NextResponse.redirect(destination, 307);
  }

  // Fallback to home page if redirect slug is not mapped
  return NextResponse.redirect(new URL("/", request.url), 302);
}
