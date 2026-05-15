import { createReadStream } from "node:fs";
import fs from "node:fs/promises";
import path from "node:path";
import { Readable } from "node:stream";

const PUBLIC_SONGS_DIR = path.join(process.cwd(), "public", "uploads", "songs");

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function getSafeSongPath(fileName) {
  const safeFileName = path.basename(String(fileName ?? ""));

  if (!safeFileName.toLowerCase().endsWith(".mp3")) {
    return null;
  }

  const resolved = path.resolve(PUBLIC_SONGS_DIR, safeFileName);
  const allowedRoot = path.resolve(PUBLIC_SONGS_DIR);

  if (!resolved.startsWith(`${allowedRoot}${path.sep}`)) {
    return null;
  }

  return resolved;
}

function parseRange(rangeHeader, size) {
  const match = /^bytes=(\d*)-(\d*)$/.exec(rangeHeader ?? "");

  if (!match) {
    return null;
  }

  const [, startValue, endValue] = match;
  let start = startValue ? Number.parseInt(startValue, 10) : 0;
  let end = endValue ? Number.parseInt(endValue, 10) : size - 1;

  if (!startValue && endValue) {
    const suffixLength = Number.parseInt(endValue, 10);
    start = Math.max(size - suffixLength, 0);
    end = size - 1;
  }

  if (
    !Number.isInteger(start) ||
    !Number.isInteger(end) ||
    start < 0 ||
    end < start ||
    start >= size
  ) {
    return null;
  }

  return {
    start,
    end: Math.min(end, size - 1),
  };
}

function streamFile(filePath, options = {}) {
  return Readable.toWeb(createReadStream(filePath, options));
}

export async function GET(request, context) {
  const { fileName } = await context.params;
  const filePath = getSafeSongPath(fileName);

  if (!filePath) {
    return new Response("Not found", { status: 404 });
  }

  try {
    const stat = await fs.stat(filePath);
    const range = parseRange(request.headers.get("range"), stat.size);
    const headers = {
      "Accept-Ranges": "bytes",
      "Cache-Control": "public, max-age=31536000, immutable",
      "Content-Type": "audio/mpeg",
    };

    if (range) {
      const contentLength = range.end - range.start + 1;

      return new Response(streamFile(filePath, { start: range.start, end: range.end }), {
        status: 206,
        headers: {
          ...headers,
          "Content-Length": String(contentLength),
          "Content-Range": `bytes ${range.start}-${range.end}/${stat.size}`,
        },
      });
    }

    return new Response(streamFile(filePath), {
      headers: {
        ...headers,
        "Content-Length": String(stat.size),
      },
    });
  } catch (error) {
    if (error.code === "ENOENT") {
      return new Response("Not found", { status: 404 });
    }

    console.error("Could not stream song file", error);
    return new Response("Could not stream song file", { status: 500 });
  }
}
