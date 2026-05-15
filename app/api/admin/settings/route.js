import { NextResponse } from "next/server";
import { isAdminRequestAuthorized } from "../../../lib/admin-auth";
import { readSiteSettings, writeSiteSettings } from "../../../lib/site-settings";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request) {
  if (!isAdminRequestAuthorized(request)) {
    return NextResponse.json({ error: "Admin login required." }, { status: 401 });
  }

  return NextResponse.json(await readSiteSettings());
}

export async function POST(request) {
  if (!isAdminRequestAuthorized(request)) {
    return NextResponse.json({ error: "Admin login required." }, { status: 401 });
  }

  try {
    const body = await request.json();
    return NextResponse.json(await writeSiteSettings(body));
  } catch (error) {
    if (error instanceof Error && error.message === "INVALID_EMAIL") {
      return NextResponse.json({ error: "Введите корректный email." }, { status: 400 });
    }

    console.error(error);
    return NextResponse.json({ error: "Не удалось сохранить настройки." }, { status: 500 });
  }
}
