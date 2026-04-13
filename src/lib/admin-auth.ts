import "server-only";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import {
  allowOpenAdminInDevelopment,
  createAdminSessionToken,
  getAdminSessionCookieName,
  getAdminSessionTtlMs,
  sanitizeAdminRedirectPath,
  verifyAdminCredentials,
  verifyAdminSessionToken,
} from "@/lib/admin-auth-shared";

export async function createAdminSession() {
  const cookieStore = await cookies();
  const { token, expiresAt } = await createAdminSessionToken();

  cookieStore.set(getAdminSessionCookieName(), token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    expires: new Date(expiresAt),
    maxAge: Math.floor(getAdminSessionTtlMs() / 1000),
    path: "/",
  });
}

export async function deleteAdminSession() {
  const cookieStore = await cookies();
  cookieStore.delete(getAdminSessionCookieName());
}

export async function isAdminAuthenticated() {
  if (allowOpenAdminInDevelopment()) {
    return true;
  }

  const cookieStore = await cookies();
  return verifyAdminSessionToken(
    cookieStore.get(getAdminSessionCookieName())?.value ?? null,
  );
}

export async function requireAdminSession(nextPath?: string) {
  if (await isAdminAuthenticated()) {
    return;
  }

  const redirectTarget = sanitizeAdminRedirectPath(nextPath);
  redirect(`/admin/login?next=${encodeURIComponent(redirectTarget)}`);
}

export {
  sanitizeAdminRedirectPath,
  verifyAdminCredentials,
};