import { type NextRequest, NextResponse } from "next/server";

export default async function proxy(request: NextRequest) {
  // Offline mode: just let everyone through
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};