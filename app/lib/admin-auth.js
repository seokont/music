import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

export const ADMIN_COOKIE_NAME = "PlaysOnline_admin";
export const ADMIN_COOKIE_MAX_AGE = 60 * 60 * 8;

const FALLBACK_PASSWORD = "PlaysOnline2026";

function adminPassword() {
  return process.env.ADMIN_PASSWORD || FALLBACK_PASSWORD;
}

function authSecret() {
  return process.env.ADMIN_AUTH_SECRET || adminPassword();
}

export function adminToken() {
  return createHmac("sha256", authSecret()).update(adminPassword()).digest("hex");
}

export function verifyAdminPassword(password) {
  const expected = Buffer.from(adminPassword());
  const received = Buffer.from(String(password ?? ""));

  if (expected.length !== received.length) {
    return false;
  }

  return timingSafeEqual(expected, received);
}

export function verifyAdminToken(token) {
  const expected = Buffer.from(adminToken());
  const received = Buffer.from(String(token ?? ""));

  if (expected.length !== received.length) {
    return false;
  }

  return timingSafeEqual(expected, received);
}

export async function isAdminCookieAuthorized() {
  const cookieStore = await cookies();
  return verifyAdminToken(cookieStore.get(ADMIN_COOKIE_NAME)?.value);
}

export function isAdminRequestAuthorized(request) {
  const cookieHeader = request.headers.get("cookie") || "";
  const cookie = cookieHeader
    .split(";")
    .map((item) => item.trim())
    .find((item) => item.startsWith(`${ADMIN_COOKIE_NAME}=`));

  if (!cookie) {
    return false;
  }

  return verifyAdminToken(decodeURIComponent(cookie.split("=").slice(1).join("=")));
}
