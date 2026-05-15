import fs from "node:fs/promises";
import path from "node:path";

export const SONG_LIMIT = 7;

const DATA_DIR = path.join(process.cwd(), "data");
const SONGS_FILE = path.join(DATA_DIR, "songs.json");
const PUBLIC_SONGS_DIR = path.join(process.cwd(), "public", "uploads", "songs");
const PUBLIC_SONGS_URL = "/uploads/songs";

function emptySongs() {
  return Array.from({ length: SONG_LIMIT }, (_, index) => ({
    slot: index + 1,
    title: "",
    event: "",
    description: "",
    url: "",
    fileName: "",
    size: 0,
    updatedAt: "",
  }));
}

function cleanText(value) {
  return String(value ?? "").trim().slice(0, 160);
}

function sanitizeSongs(value) {
  const current = emptySongs();
  const incoming = Array.isArray(value) ? value : [];

  for (const song of incoming) {
    const slot = Number(song?.slot);

    if (!Number.isInteger(slot) || slot < 1 || slot > SONG_LIMIT) {
      continue;
    }

    current[slot - 1] = {
      slot,
      title: cleanText(song.title),
      event: cleanText(song.event),
      description: cleanText(song.description),
      url: cleanText(song.url),
      fileName: cleanText(song.fileName),
      size: Number(song.size) || 0,
      updatedAt: cleanText(song.updatedAt),
    };
  }

  return current;
}

async function ensureStorage() {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.mkdir(PUBLIC_SONGS_DIR, { recursive: true });
}

export async function readSongs() {
  await ensureStorage();

  try {
    const raw = await fs.readFile(SONGS_FILE, "utf8");
    return sanitizeSongs(JSON.parse(raw));
  } catch (error) {
    if (error.code !== "ENOENT") {
      console.warn("Could not read songs.json", error);
    }

    return emptySongs();
  }
}

export async function writeSongs(songs) {
  await ensureStorage();
  await fs.writeFile(SONGS_FILE, `${JSON.stringify(sanitizeSongs(songs), null, 2)}\n`, "utf8");
}

function safeFileStem(name) {
  return path
    .parse(name || "song")
    .name.toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60) || "song";
}

async function removePublicFile(url) {
  if (!url || !url.startsWith(`${PUBLIC_SONGS_URL}/`)) {
    return;
  }

  const target = path.join(process.cwd(), "public", url);
  const resolved = path.resolve(target);
  const allowedRoot = path.resolve(PUBLIC_SONGS_DIR);

  if (!resolved.startsWith(allowedRoot)) {
    return;
  }

  try {
    await fs.unlink(resolved);
  } catch (error) {
    if (error.code !== "ENOENT") {
      console.warn("Could not remove song file", error);
    }
  }
}

export async function saveSongSlot(slot, file, fields) {
  if (!Number.isInteger(slot) || slot < 1 || slot > SONG_LIMIT) {
    throw new Error("INVALID_SLOT");
  }

  if (!file || typeof file.arrayBuffer !== "function") {
    throw new Error("NO_FILE");
  }

  const fileName = String(file.name || "");
  const isMp3 =
    fileName.toLowerCase().endsWith(".mp3") ||
    file.type === "audio/mpeg" ||
    file.type === "audio/mp3";

  if (!isMp3) {
    throw new Error("ONLY_MP3");
  }

  if (file.size > 30 * 1024 * 1024) {
    throw new Error("FILE_TOO_LARGE");
  }

  await ensureStorage();

  const songs = await readSongs();
  const oldSong = songs[slot - 1];
  const buffer = Buffer.from(await file.arrayBuffer());
  const storedName = `${slot}-${Date.now()}-${safeFileStem(fileName)}.mp3`;
  const storedPath = path.join(PUBLIC_SONGS_DIR, storedName);

  await fs.writeFile(storedPath, buffer);
  await removePublicFile(oldSong.url);

  const nextSong = {
    slot,
    title: cleanText(fields.title) || `Song ${slot}`,
    event: cleanText(fields.event),
    description: cleanText(fields.description),
    url: `${PUBLIC_SONGS_URL}/${storedName}`,
    fileName,
    size: file.size,
    updatedAt: new Date().toISOString(),
  };

  songs[slot - 1] = nextSong;
  await writeSongs(songs);

  return nextSong;
}

export async function clearSongSlot(slot) {
  if (!Number.isInteger(slot) || slot < 1 || slot > SONG_LIMIT) {
    throw new Error("INVALID_SLOT");
  }

  const songs = await readSongs();
  await removePublicFile(songs[slot - 1]?.url);
  songs[slot - 1] = emptySongs()[slot - 1];
  await writeSongs(songs);

  return songs[slot - 1];
}
