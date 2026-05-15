import { NextResponse } from "next/server";
import { readSongs, SONG_LIMIT } from "../../lib/songs";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const songs = await readSongs();

  return NextResponse.json({ limit: SONG_LIMIT, songs });
}
