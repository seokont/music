"use client";

import { ChevronLeft, ChevronRight, Music2, Volume2 } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

const EMPTY_SONGS = Array.from({ length: 7 }, (_, index) => ({
  slot: index + 1,
  title: "",
  event: "",
  description: "",
  url: "",
}));

export function SongExamples({ copy, locale }) {
  const railRef = useRef(null);
  const [songs, setSongs] = useState(EMPTY_SONGS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function loadSongs() {
      try {
        const response = await fetch("/api/songs", { cache: "no-store" });
        const data = await response.json();

        if (isMounted && Array.isArray(data.songs)) {
          setSongs(data.songs);
        }
      } catch {
        if (isMounted) {
          setSongs(EMPTY_SONGS);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadSongs();

    return () => {
      isMounted = false;
    };
  }, []);

  const slots = useMemo(
    () =>
      EMPTY_SONGS.map((emptySong) => ({
        ...emptySong,
        ...(songs.find((song) => song.slot === emptySong.slot) ?? {}),
      })),
    [songs],
  );

  function scrollRail(direction) {
    const rail = railRef.current;

    if (!rail) {
      return;
    }

    const multiplier = locale.dir === "rtl" ? -1 : 1;
    rail.scrollBy({ left: direction * multiplier * 360, behavior: "smooth" });
  }

  return (
    <section className="section examples" id="examples">
      <div className="section-heading examples-heading" data-animate="fade-up">
        <div>
          <p className="eyebrow dark">
            <Volume2 size={18} aria-hidden="true" />
            {copy.eyebrow}
          </p>
          <h2>{copy.title}</h2>
          <p className="section-intro">{copy.intro}</p>
        </div>
        <div className="examples-actions">
          <button
            className="icon-button"
            type="button"
            onClick={() => scrollRail(-1)}
            aria-label="Scroll back"
            title="Scroll back"
          >
            {locale.dir === "rtl" ? (
              <ChevronRight size={20} aria-hidden="true" />
            ) : (
              <ChevronLeft size={20} aria-hidden="true" />
            )}
          </button>
          <button
            className="icon-button"
            type="button"
            onClick={() => scrollRail(1)}
            aria-label="Scroll forward"
            title="Scroll forward"
          >
            {locale.dir === "rtl" ? (
              <ChevronLeft size={20} aria-hidden="true" />
            ) : (
              <ChevronRight size={20} aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      <div className="examples-rail" ref={railRef} aria-busy={loading}>
        {slots.map((song) => {
          const hasAudio = Boolean(song.url);

          return (
            <article
              className={hasAudio ? "example-card" : "example-card empty"}
              dir={locale.dir}
              key={song.slot}
              data-animate="card"
              style={{ "--delay": `${(song.slot - 1) * 70}ms` }}
            >
              <div className="example-card-top">
                <span className="example-number">{String(song.slot).padStart(2, "0")}</span>
                <span className="example-tag">{song.event || copy.noEvent}</span>
              </div>
              <h3>{song.title || copy.emptyTitle}</h3>
              <p>{song.description || copy.emptyDescription}</p>
              {hasAudio ? (
                <audio controls preload="none" src={song.url}>
                  {copy.listen}
                </audio>
              ) : (
                <div className="audio-placeholder">
                  <Music2 size={20} aria-hidden="true" />
                  <span>{loading ? copy.loading : copy.listen}</span>
                </div>
              )}
            </article>
          );
        })}
      </div>
    </section>
  );
}
