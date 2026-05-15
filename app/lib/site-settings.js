import fs from "node:fs/promises";
import path from "node:path";

const DATA_DIR = path.join(process.cwd(), "data");
const SETTINGS_FILE = path.join(DATA_DIR, "site-settings.json");

export const DEFAULT_SITE_SETTINGS = {
  orderEmail: "hello@PlaysOnline.studio",
};

function cleanEmail(value) {
  return String(value ?? "").trim().toLowerCase().slice(0, 160);
}

export function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail(value));
}

function sanitizeSettings(value) {
  const orderEmail = cleanEmail(value?.orderEmail);

  return {
    orderEmail: isValidEmail(orderEmail) ? orderEmail : DEFAULT_SITE_SETTINGS.orderEmail,
  };
}

async function ensureStorage() {
  await fs.mkdir(DATA_DIR, { recursive: true });
}

export async function readSiteSettings() {
  await ensureStorage();

  try {
    const raw = await fs.readFile(SETTINGS_FILE, "utf8");
    return sanitizeSettings(JSON.parse(raw));
  } catch (error) {
    if (error.code !== "ENOENT") {
      console.warn("Could not read site-settings.json", error);
    }

    return DEFAULT_SITE_SETTINGS;
  }
}

export async function writeSiteSettings(settings) {
  const orderEmail = cleanEmail(settings?.orderEmail);

  if (!isValidEmail(orderEmail)) {
    throw new Error("INVALID_EMAIL");
  }

  const nextSettings = { orderEmail };

  await ensureStorage();
  await fs.writeFile(SETTINGS_FILE, `${JSON.stringify(nextSettings, null, 2)}\n`, "utf8");

  return nextSettings;
}
