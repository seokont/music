"use client";

import Link from "next/link";
import {
  AlertCircle,
  ArrowLeft,
  CheckCircle2,
  Loader2,
  LogOut,
  Mail,
  Music2,
  Save,
  Trash2,
  UploadCloud,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";

const EMPTY_SONGS = Array.from({ length: 7 }, (_, index) => ({
  slot: index + 1,
  title: "",
  event: "",
  description: "",
  url: "",
  fileName: "",
}));

const eventOptions = [
  "Свадьба",
  "День рождения",
  "Корпоратив",
  "Вечеринка",
  "Юбилей",
  "Детский праздник",
  "Другое",
];

const DEFAULT_SETTINGS = {
  orderEmail: "hello@PlaysOnline.studio",
};

function buildDrafts(songs) {
  return songs.reduce((drafts, song) => {
    drafts[song.slot] = {
      title: song.title || "",
      event: song.event || "",
      description: song.description || "",
    };

    return drafts;
  }, {});
}

export function AdminSongs() {
  const [songs, setSongs] = useState(EMPTY_SONGS);
  const [drafts, setDrafts] = useState(buildDrafts(EMPTY_SONGS));
  const [files, setFiles] = useState({});
  const [busySlot, setBusySlot] = useState(null);
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);
  const [settingsBusy, setSettingsBusy] = useState(false);
  const [loading, setLoading] = useState(true);
  const [notice, setNotice] = useState({ type: "", text: "" });

  async function loadSongs() {
    setLoading(true);

    try {
      const response = await fetch("/api/songs", { cache: "no-store" });
      const data = await response.json();
      const nextSongs = Array.isArray(data.songs) ? data.songs : EMPTY_SONGS;

      setSongs(nextSongs);
      setDrafts(buildDrafts(nextSongs));
    } catch {
      setNotice({ type: "error", text: "Не удалось загрузить список песен." });
    } finally {
      setLoading(false);
    }
  }

  async function loadSettings() {
    try {
      const response = await fetch("/api/admin/settings", { cache: "no-store" });

      if (response.status === 401) {
        window.location.assign("/admin/login");
        return;
      }

      const data = await response.json();

      setSettings({
        orderEmail: data.orderEmail || DEFAULT_SETTINGS.orderEmail,
      });
    } catch {
      setNotice({ type: "error", text: "Не удалось загрузить настройки почты." });
    }
  }

  useEffect(() => {
    loadSongs();
    loadSettings();
  }, []);

  const filledCount = useMemo(() => songs.filter((song) => song.url).length, [songs]);

  function updateDraft(slot, field, value) {
    setDrafts((current) => ({
      ...current,
      [slot]: {
        ...current[slot],
        [field]: value,
      },
    }));
  }

  function updateFile(slot, fileList) {
    setFiles((current) => ({
      ...current,
      [slot]: fileList?.[0] ?? null,
    }));
  }

  async function uploadSong(event, slot) {
    event.preventDefault();

    const file = files[slot];

    if (!file) {
      setNotice({ type: "error", text: "Выберите MP3-файл для загрузки." });
      return;
    }

    const formData = new FormData();
    const draft = drafts[slot] ?? {};

    formData.append("title", draft.title || "");
    formData.append("event", draft.event || "");
    formData.append("description", draft.description || "");
    formData.append("file", file);
    setBusySlot(slot);
    setNotice({ type: "", text: "" });

    try {
      const response = await fetch(`/api/songs/${slot}`, {
        method: "POST",
        body: formData,
      });
      const data = await response.json();

      if (response.status === 401) {
        window.location.assign("/admin/login");
        return;
      }

      if (!response.ok) {
        throw new Error(data.error || "Не удалось сохранить MP3.");
      }

      setFiles((current) => ({ ...current, [slot]: null }));
      setNotice({ type: "success", text: `Слот ${slot} обновлен.` });
      await loadSongs();
    } catch (error) {
      setNotice({
        type: "error",
        text: error instanceof Error ? error.message : "Не удалось сохранить MP3.",
      });
    } finally {
      setBusySlot(null);
    }
  }

  async function clearSlot(slot) {
    setBusySlot(slot);
    setNotice({ type: "", text: "" });

    try {
      const response = await fetch(`/api/songs/${slot}`, { method: "DELETE" });
      const data = await response.json();

      if (response.status === 401) {
        window.location.assign("/admin/login");
        return;
      }

      if (!response.ok) {
        throw new Error(data.error || "Не удалось очистить слот.");
      }

      setFiles((current) => ({ ...current, [slot]: null }));
      setNotice({ type: "success", text: `Слот ${slot} очищен.` });
      await loadSongs();
    } catch (error) {
      setNotice({
        type: "error",
        text: error instanceof Error ? error.message : "Не удалось очистить слот.",
      });
    } finally {
      setBusySlot(null);
    }
  }

  async function saveSettings(event) {
    event.preventDefault();
    setSettingsBusy(true);
    setNotice({ type: "", text: "" });

    try {
      const response = await fetch("/api/admin/settings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(settings),
      });
      const data = await response.json();

      if (response.status === 401) {
        window.location.assign("/admin/login");
        return;
      }

      if (!response.ok) {
        throw new Error(data.error || "Не удалось сохранить почту.");
      }

      setSettings({ orderEmail: data.orderEmail });
      setNotice({ type: "success", text: "Email для заказов сохранен." });
    } catch (error) {
      setNotice({
        type: "error",
        text: error instanceof Error ? error.message : "Не удалось сохранить почту.",
      });
    } finally {
      setSettingsBusy(false);
    }
  }

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    window.location.assign("/admin/login");
  }

  return (
    <main className="admin-page">
      <header className="admin-topbar">
        <Link className="admin-back" href="/">
          <ArrowLeft size={18} aria-hidden="true" />
          На сайт
        </Link>
        <div className="admin-session">
          <div>
            <span>{filledCount}/7</span>
            <strong>MP3 примеров загружено</strong>
          </div>
          <button className="admin-logout" type="button" onClick={logout}>
            <LogOut size={18} aria-hidden="true" />
            Выйти
          </button>
        </div>
      </header>

      <section className="admin-hero">
        <p className="eyebrow dark">
          <UploadCloud size={18} aria-hidden="true" />
          админка примеров
        </p>
        <h1>Загрузка песен для блока прослушивания</h1>
        <p>
          Заполните название, выберите тип события и загрузите MP3. Каждый слот
          соответствует одной карточке в публичном скролл-разделе.
        </p>
      </section>

      {notice.text ? (
        <div className={`admin-notice ${notice.type}`} role="status">
          {notice.type === "success" ? (
            <CheckCircle2 size={18} aria-hidden="true" />
          ) : (
            <AlertCircle size={18} aria-hidden="true" />
          )}
          {notice.text}
        </div>
      ) : null}

      <form className="admin-settings-card" onSubmit={saveSettings}>
        <div>
          <p className="eyebrow dark">
            <Mail size={18} aria-hidden="true" />
            почта заказов
          </p>
          <h2>Куда отправлять заявки</h2>
          <p>
            Этот адрес будет подставляться в кнопки заказа на сайте во всех языковых
            версиях.
          </p>
        </div>
        <label>
          Email получателя
          <input
            type="email"
            value={settings.orderEmail}
            onChange={(event) => setSettings({ orderEmail: event.target.value })}
            placeholder="orders@example.com"
            autoComplete="email"
            required
          />
        </label>
        <button className="admin-save" type="submit" disabled={settingsBusy}>
          {settingsBusy ? (
            <Loader2 className="spin-icon" size={18} aria-hidden="true" />
          ) : (
            <Save size={18} aria-hidden="true" />
          )}
          Сохранить почту
        </button>
      </form>

      <section className="admin-grid" aria-busy={loading}>
        {songs.map((song) => {
          const slot = song.slot;
          const draft = drafts[slot] ?? {};
          const isBusy = busySlot === slot;

          return (
            <form className="admin-card" onSubmit={(event) => uploadSong(event, slot)} key={slot}>
              <div className="admin-card-head">
                <span>{String(slot).padStart(2, "0")}</span>
                <strong>{song.url ? "Активен" : "Пустой слот"}</strong>
              </div>

              <label>
                Название
                <input
                  value={draft.title ?? ""}
                  onChange={(event) => updateDraft(slot, "title", event.target.value)}
                  placeholder="Например: Первый танец"
                  maxLength={80}
                />
              </label>

              <label>
                Тип события
                <select
                  value={draft.event ?? ""}
                  onChange={(event) => updateDraft(slot, "event", event.target.value)}
                >
                  <option value="">Выберите</option>
                  {eventOptions.map((option) => (
                    <option value={option} key={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </label>

              <label>
                Описание
                <textarea
                  value={draft.description ?? ""}
                  onChange={(event) => updateDraft(slot, "description", event.target.value)}
                  placeholder="Коротко о настроении песни"
                  maxLength={160}
                  rows={3}
                />
              </label>

              <label className="file-drop">
                <UploadCloud size={22} aria-hidden="true" />
                <span>{files[slot]?.name || song.fileName || "Выбрать MP3"}</span>
                <input
                  type="file"
                  accept="audio/mpeg,audio/mp3,.mp3"
                  onChange={(event) => updateFile(slot, event.target.files)}
                />
              </label>

              {song.url ? (
                <audio className="admin-audio" controls preload="none" src={song.url}>
                  Прослушать
                </audio>
              ) : (
                <div className="admin-audio-placeholder">
                  <Music2 size={18} aria-hidden="true" />
                  Нет файла
                </div>
              )}

              <div className="admin-card-actions">
                <button className="admin-save" type="submit" disabled={isBusy}>
                  {isBusy ? (
                    <Loader2 className="spin-icon" size={18} aria-hidden="true" />
                  ) : (
                    <Save size={18} aria-hidden="true" />
                  )}
                  Сохранить
                </button>
                <button
                  className="admin-clear"
                  type="button"
                  onClick={() => clearSlot(slot)}
                  disabled={isBusy || !song.url}
                  title="Очистить слот"
                >
                  <Trash2 size={18} aria-hidden="true" />
                </button>
              </div>
            </form>
          );
        })}
      </section>
    </main>
  );
}
