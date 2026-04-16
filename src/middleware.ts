import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import {
  allowOpenAdminInDevelopment,
  getAdminSessionCookieName,
  sanitizeAdminRedirectPath,
  verifyAdminSessionToken,
} from "@/lib/admin-auth-shared";

export async function middleware(request: NextRequest) {
  if (allowOpenAdminInDevelopment()) {
    return NextResponse.next();
  }

  const { pathname, search } = request.nextUrl;
  const isAuthenticated = await verifyAdminSessionToken(
    request.cookies.get(getAdminSessionCookieName())?.value ?? null,
  );

  if (pathname === "/admin/login") {
    if (isAuthenticated) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }

    return NextResponse.next();
  }

  if (isAuthenticated) {
    return NextResponse.next();
  }

  const loginUrl = new URL("/admin/login", request.url);
  loginUrl.searchParams.set(
    "next",
    sanitizeAdminRedirectPath(`${pathname}${search}`),
  );

  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/admin/:path*"],
};