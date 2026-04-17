const ADMIN_SESSION_COOKIE_NAME = "bias-admin-session";
const ADMIN_SESSION_TTL_MS = 1000 * 60 * 60 * 24 * 7;
const SESSION_SCOPE = "bias-admin";

type AdminCredentials = {
  username: string;
  password: string;
};

function getAdminCredentials(): AdminCredentials | null {
  const username = process.env.ADMIN_USERNAME;
  const password = process.env.ADMIN_PASSWORD;

  if (!username || !password) {
    return null;
  }

  return {
    username,
    password,
  };
}

function bufferToHex(buffer: ArrayBuffer) {
  return Array.from(new Uint8Array(buffer), (byte) =>
    byte.toString(16).padStart(2, "0"),
  ).join("");
}

async function signSessionValue(expiresAt: number) {
  const credentials = getAdminCredentials();

  if (!credentials) {
    throw new Error("Admin credentials are not configured.");
  }

  const secret = new TextEncoder().encode(`cms:${credentials.username}:${credentials.password}`);
  const message = new TextEncoder().encode(`${SESSION_SCOPE}:${expiresAt}`);
  const key = await crypto.subtle.importKey(
    "raw",
    secret,
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign("HMAC", key, message);

  return bufferToHex(signature);
}

export function getAdminSessionCookieName() {
  return ADMIN_SESSION_COOKIE_NAME;
}

export function isAdminConfigured() {
  return getAdminCredentials() !== null;
}

export function allowOpenAdminInDevelopment() {
  return process.env.NODE_ENV !== "production" && !isAdminConfigured();
}

export function sanitizeAdminRedirectPath(pathname: string | null | undefined) {
  if (!pathname || !pathname.startsWith("/admin")) {
    return "/admin";
  }

  if (pathname === "/admin/login") {
    return "/admin";
  }

  return pathname;
}

export async function verifyAdminCredentials(username: string, password: string) {
  const credentials = getAdminCredentials();

  if (!credentials) {
    return false;
  }

  return username === credentials.username && password === credentials.password;
}

export async function createAdminSessionToken() {
  const expiresAt = Date.now() + ADMIN_SESSION_TTL_MS;
  const signature = await signSessionValue(expiresAt);

  return {
    token: `${expiresAt}.${signature}`,
    expiresAt,
  };
}

export async function verifyAdminSessionToken(token: string | null | undefined) {
  if (!token) {
    return false;
  }

  const [expiresAtValue, signature] = token.split(".");

  if (!expiresAtValue || !signature) {
    return false;
  }

  const expiresAt = Number(expiresAtValue);

  if (!Number.isFinite(expiresAt) || expiresAt <= Date.now()) {
    return false;
  }

  const expectedSignature = await signSessionValue(expiresAt);

  return signature === expectedSignature;
}

export function getAdminSessionTtlMs() {
  return ADMIN_SESSION_TTL_MS;
}