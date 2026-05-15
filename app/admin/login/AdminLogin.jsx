"use client";

import Link from "next/link";
import { ArrowLeft, LockKeyhole, LogIn, ShieldAlert } from "lucide-react";
import { useState } from "react";

export function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function submitLogin(event) {
    event.preventDefault();
    setBusy(true);
    setError("");

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Не удалось войти.");
      }

      window.location.assign("/admin");
    } catch (loginError) {
      setError(loginError instanceof Error ? loginError.message : "Не удалось войти.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="admin-page login-page">
      <Link className="admin-back" href="/">
        <ArrowLeft size={18} aria-hidden="true" />
        На сайт
      </Link>

      <form className="login-card" onSubmit={submitLogin}>
        <span className="login-mark">
          <LockKeyhole size={28} aria-hidden="true" />
        </span>
        <p className="eyebrow dark">
          <ShieldAlert size={18} aria-hidden="true" />
          закрытая админка
        </p>
        <h1>Введите пароль</h1>
        <label>
          Пароль администратора
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            autoComplete="current-password"
            autoFocus
            required
          />
        </label>
        {error ? <div className="login-error">{error}</div> : null}
        <button className="admin-save login-button" type="submit" disabled={busy}>
          <LogIn size={18} aria-hidden="true" />
          {busy ? "Проверяем" : "Войти"}
        </button>
      </form>
    </main>
  );
}
