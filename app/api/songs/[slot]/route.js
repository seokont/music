import { NextResponse } from "next/server";
import { isAdminRequestAuthorized } from "../../../lib/admin-auth";
import { clearSongSlot, saveSongSlot } from "../../../lib/songs";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function errorResponse(error) {
  const message = error instanceof Error ? error.message : "UNKNOWN_ERROR";

  if (message === "INVALID_SLOT") {
    return NextResponse.json({ error: "Song slot must be from 1 to 7." }, { status: 400 });
  }

  if (message === "NO_FILE") {
    return NextResponse.json({ error: "Choose an MP3 file." }, { status: 400 });
  }

  if (message === "ONLY_MP3") {
    return NextResponse.json({ error: "Only MP3 files are supported." }, { status: 400 });
  }

  if (message === "FILE_TOO_LARGE") {
    return NextResponse.json({ error: "MP3 file must be 30 MB or smaller." }, { status: 400 });
  }

  console.error(error);
  return NextResponse.json({ error: "Could not save song." }, { status: 500 });
}

export async function POST(request, context) {
  if (!isAdminRequestAuthorized(request)) {
    return NextResponse.json({ error: "Admin login required." }, { status: 401 });
  }

  try {
    const { slot } = await context.params;
    const formData = await request.formData();
    const song = await saveSongSlot(Number(slot), formData.get("file"), {
      title: formData.get("title"),
      event: formData.get("event"),
      description: formData.get("description"),
    });

    return NextResponse.json({ song });
  } catch (error) {
    return errorResponse(error);
  }
}

export async function DELETE(_request, context) {
  if (!isAdminRequestAuthorized(_request)) {
    return NextResponse.json({ error: "Admin login required." }, { status: 401 });
  }

  try {
    const { slot } = await context.params;
    const song = await clearSongSlot(Number(slot));

    return NextResponse.json({ song });
  } catch (error) {
    return errorResponse(error);
  }
}
