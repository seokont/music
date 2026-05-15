"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "playsonline_cookie_preferences";
const COOKIE_NAME = "playsonline_cookie_preferences";
const ONE_YEAR = 60 * 60 * 24 * 365;

const defaultPreferences = {
  necessary: true,
  functional: false,
  analytics: false,
  marketing: false,
};

function readStoredPreferences() {
  try {
    const value = window.localStorage.getItem(STORAGE_KEY);
    return value ? JSON.parse(value) : null;
  } catch {
    return null;
  }
}

function savePreferences(preferences) {
  const nextPreferences = {
    ...defaultPreferences,
    ...preferences,
    necessary: true,
  };
  const serialized = JSON.stringify(nextPreferences);

  window.localStorage.setItem(STORAGE_KEY, serialized);
  document.cookie = `${COOKIE_NAME}=${encodeURIComponent(
    serialized,
  )}; Max-Age=${ONE_YEAR}; Path=/; SameSite=Lax`;
}

export function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [preferences, setPreferences] = useState(defaultPreferences);

  useEffect(() => {
    const savedPreferences = readStoredPreferences();

    if (savedPreferences) {
      setPreferences({ ...defaultPreferences, ...savedPreferences, necessary: true });
      return;
    }

    setIsVisible(true);
  }, []);

  function commitPreferences(nextPreferences) {
    savePreferences(nextPreferences);
    setPreferences({ ...defaultPreferences, ...nextPreferences, necessary: true });
    setIsVisible(false);
    setIsSettingsOpen(false);
  }

  function updatePreference(name) {
    setPreferences((currentPreferences) => ({
      ...currentPreferences,
      [name]: !currentPreferences[name],
    }));
  }

  if (!isVisible) {
    return null;
  }

  return (
    <section className="cookie-banner" aria-label="Cookie preferences">
      <div className="cookie-copy">
        <strong>We use cookies</strong>
        <p>
          We use cookies to improve your browsing experience, analyze website traffic, and
          personalize content. You can accept all cookies, reject non-essential cookies, or
          manage your preferences.
        </p>
        <a href="/cookie-policy">Cookie Policy</a>
      </div>

      {isSettingsOpen ? (
        <div className="cookie-settings">
          <label>
            <input type="checkbox" checked disabled />
            <span>Strictly Necessary</span>
          </label>
          <label>
            <input
              type="checkbox"
              checked={preferences.functional}
              onChange={() => updatePreference("functional")}
            />
            <span>Functional</span>
          </label>
          <label>
            <input
              type="checkbox"
              checked={preferences.analytics}
              onChange={() => updatePreference("analytics")}
            />
            <span>Analytics</span>
          </label>
          <label>
            <input
              type="checkbox"
              checked={preferences.marketing}
              onChange={() => updatePreference("marketing")}
            />
            <span>Marketing</span>
          </label>
        </div>
      ) : null}

      <div className="cookie-actions">
        <button
          className="cookie-button primary"
          type="button"
          onClick={() =>
            commitPreferences({
              necessary: true,
              functional: true,
              analytics: true,
              marketing: true,
            })
          }
        >
          Accept All
        </button>
        <button
          className="cookie-button"
          type="button"
          onClick={() => commitPreferences(defaultPreferences)}
        >
          Reject Non-Essential
        </button>
        {isSettingsOpen ? (
          <button
            className="cookie-button"
            type="button"
            onClick={() => commitPreferences(preferences)}
          >
            Save Preferences
          </button>
        ) : (
          <button className="cookie-button" type="button" onClick={() => setIsSettingsOpen(true)}>
            Cookie Settings
          </button>
        )}
      </div>
    </section>
  );
}
