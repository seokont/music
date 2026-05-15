"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  AudioWaveform,
  Building2,
  CalendarDays,
  Check,
  Clock3,
  Gift,
  Headphones,
  Heart,
  Mic2,
  Music2,
  PartyPopper,
  Play,
  Send,
  Sparkles,
  Star,
  Trophy,
  Wand2,
  X,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { getContent, getLocale, localeOrder, locales } from "../content";
import { SongExamples } from "./SongExamples";

const eventIcons = {
  wedding: Heart,
  birthday: Gift,
  corporate: Building2,
  party: PartyPopper,
};

function sectionHref(locale, id) {
  return `${locale.path === "/" ? "" : locale.path}#${id}`;
}

export function SongLanding({ localeId }) {
  const locale = getLocale(localeId);
  const t = getContent(localeId);
  const [activeEvent, setActiveEvent] = useState(t.events[0].id);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [isOrderSubmitting, setIsOrderSubmitting] = useState(false);
  const [orderStatus, setOrderStatus] = useState(null);
  const [orderForm, setOrderForm] = useState({
    name: "",
    contact: "",
    event: "",
    style: "",
    deadline: "",
    description: "",
  });

  useEffect(() => {
    document.documentElement.lang = locale.lang;
    document.documentElement.dir = locale.dir;
  }, [locale.dir, locale.lang]);

  useEffect(() => {
    setActiveEvent(t.events[0].id);
  }, [localeId, t.events]);

  useEffect(() => {
    const root = document.querySelector(".site-shell");
    const animatedElements = Array.from(root?.querySelectorAll("[data-animate]") ?? []);

    if (!animatedElements.length) {
      return undefined;
    }

    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !("IntersectionObserver" in window)
    ) {
      animatedElements.forEach((element) => element.classList.add("is-visible"));
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      {
        rootMargin: "0px 0px -8% 0px",
        threshold: 0.14,
      },
    );

    animatedElements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, [localeId]);

  const selected = useMemo(
    () => t.events.find((event) => event.id === activeEvent) ?? t.events[0],
    [activeEvent, t.events],
  );
  const SelectedIcon = eventIcons[selected.id] ?? Music2;
  const FlowArrow = locale.dir === "rtl" ? ArrowLeft : ArrowRight;
  const modalCopy = t.orderModal;

  useEffect(() => {
    if (!isOrderModalOpen) {
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        setIsOrderModalOpen(false);
      }
    }

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOrderModalOpen]);

  function openOrderModal() {
    setOrderForm((currentForm) => ({
      ...currentForm,
      event: currentForm.event || selected.label,
    }));
    setOrderStatus(null);
    setIsOrderModalOpen(true);
  }

  function closeOrderModal() {
    setIsOrderModalOpen(false);
    setOrderStatus(null);
  }

  function handleOrderFieldChange(event) {
    const { name, value } = event.target;

    setOrderForm((currentForm) => ({
      ...currentForm,
      [name]: value,
    }));
  }

  async function handleOrderSubmit(event) {
    event.preventDefault();

    const eventLabel = orderForm.event.trim() || selected.label;
    setIsOrderSubmitting(true);
    setOrderStatus(null);

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...orderForm,
          event: eventLabel,
          locale: locale.id,
        }),
      });

      if (!response.ok) {
        throw new Error("ORDER_SEND_FAILED");
      }

      setOrderStatus({ type: "success", message: modalCopy.success });
      setOrderForm({
        name: "",
        contact: "",
        event: eventLabel,
        style: "",
        deadline: "",
        description: "",
      });
    } catch {
      setOrderStatus({ type: "error", message: modalCopy.error });
    } finally {
      setIsOrderSubmitting(false);
    }
  }

  return (
    <main className="site-shell" lang={locale.lang} dir={locale.dir}>
      <section className="hero" id="top">
        <Image
          src="/song-studio-stage.png"
          alt={t.imageAlt}
          fill
          priority
          sizes="100vw"
          className="hero-image"
        />
        <div className="hero-overlay" />
        <div className="hero-wave wave-one" />
        <div className="hero-wave wave-two" />

        <header className="topbar" aria-label={t.navAria}>
          <Link className="brand" href={locale.path} aria-label="PlaysOnline">
            <span className="brand-mark">
              <AudioWaveform size={24} aria-hidden="true" />
            </span>
            <span>PlaysOnline</span>
          </Link>
          <nav className="nav-links">
            {t.nav.map((item) => (
              <a href={sectionHref(locale, item.href)} key={item.href}>
                {item.label}
              </a>
            ))}
          </nav>
          <nav className="language-switcher" aria-label={t.languageAria}>
            {localeOrder.map((id) => {
              const item = locales[id];

              return (
                <Link
                  className={id === locale.id ? "language-link active" : "language-link"}
                  href={item.path}
                  hrefLang={item.lang}
                  aria-current={id === locale.id ? "page" : undefined}
                  title={item.name}
                  key={id}
                >
                  {item.short}
                </Link>
              );
            })}
          </nav>
          <a className="nav-cta" href={sectionHref(locale, "brief")}>
            <Mic2 size={18} aria-hidden="true" />
            {t.briefLabel}
          </a>
        </header>

        <div className="hero-grid">
          <div className="hero-copy" data-animate="fade-up">
            <p className="eyebrow">
              <Sparkles size={18} aria-hidden="true" />
              {t.hero.eyebrow}
            </p>
            <h1>{t.hero.title}</h1>
            <p className="hero-lead">{t.hero.lead}</p>
            <div className="hero-actions">
              <a className="button primary" href={sectionHref(locale, "brief")}>
                <Wand2 size={20} aria-hidden="true" />
                {t.hero.primary}
              </a>
              <a className="button secondary" href={sectionHref(locale, "formats")}>
                <Play size={20} aria-hidden="true" />
                {t.hero.secondary}
              </a>
            </div>
            <dl className="hero-stats">
              {t.hero.stats.map(([value, label]) => (
                <div key={label}>
                  <dt>{value}</dt>
                  <dd>{label}</dd>
                </div>
              ))}
            </dl>
          </div>

          <section
            className="composer"
            id="brief"
            aria-label={t.composer.aria}
            data-animate="scale"
            style={{ "--delay": "120ms" }}
          >
            <div className="composer-top">
              <span>
                <Headphones size={19} aria-hidden="true" />
                {t.composer.title}
              </span>
              <span className="live-dot">{t.composer.badge}</span>
            </div>

            <div className="event-tabs" role="tablist" aria-label={t.composer.tabsAria}>
              {t.events.map((event) => {
                const Icon = eventIcons[event.id] ?? Music2;
                const isActive = activeEvent === event.id;

                return (
                  <button
                    className={isActive ? "event-tab active" : "event-tab"}
                    type="button"
                    key={event.id}
                    onClick={() => setActiveEvent(event.id)}
                    aria-pressed={isActive}
                  >
                    <Icon size={18} aria-hidden="true" />
                    <span>{event.label}</span>
                  </button>
                );
              })}
            </div>

            <div className={`track-preview ${selected.accent}`}>
              <div className="track-cover" aria-hidden="true">
                <SelectedIcon size={34} />
                <div className="equalizer">
                  <span />
                  <span />
                  <span />
                  <span />
                </div>
              </div>
              <div className="track-copy">
                <p>{selected.tempo}</p>
                <h2>{selected.title}</h2>
                <span>{selected.line}</span>
              </div>
            </div>

            <div className="studio-controls" aria-label={t.composer.controlsAria}>
              <div>
                <span>{t.composer.warmth}</span>
                <strong>83%</strong>
              </div>
              <div className="control-line">
                <span style={{ "--level": "78%" }} />
              </div>
              <div>
                <span>{t.composer.drive}</span>
                <strong>91%</strong>
              </div>
              <div className="control-line alt">
                <span style={{ "--level": "91%" }} />
              </div>
            </div>

            <button
              className="button composer-button"
              type="button"
              onClick={openOrderModal}
            >
              <Send size={19} aria-hidden="true" />
              {t.composer.send}
            </button>
          </section>
        </div>
      </section>

      <section className="ticker" aria-label={t.formatsAria} data-animate="fade">
        <div>
          {[...t.formats, ...t.formats].map((item, index) => (
            <span key={`${item}-${index}`}>
              <Star size={16} aria-hidden="true" />
              {item}
            </span>
          ))}
        </div>
      </section>

      <section className="section occasions" id="formats">
        <div className="section-heading" data-animate="fade-up">
          <p className="eyebrow dark">
            <CalendarDays size={18} aria-hidden="true" />
            {t.occasions.eyebrow}
          </p>
          <h2>{t.occasions.title}</h2>
        </div>
        <div className="occasion-grid">
          {t.occasions.items.map((item, index) => (
            <article
              className="occasion-card"
              key={item.title}
              data-animate="card"
              style={{ "--delay": `${index * 80}ms` }}
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <SongExamples copy={t.examples} locale={locale} />

      <section className="section why-section">
        <div className="why-inner">
          <div className="why-copy" data-animate="fade-up">
            <p className="eyebrow dark">
              <Trophy size={18} aria-hidden="true" />
              {t.why.eyebrow}
            </p>
            <h2>{t.why.title}</h2>
            <h3>{t.why.subtitle}</h3>
            <p>{t.why.text}</p>
          </div>
          <div className="why-benefits" data-animate="scale" style={{ "--delay": "120ms" }}>
            <h3>{t.why.benefitsTitle}</h3>
            <ul>
              {t.why.benefits.map((benefit, index) => (
                <li
                  key={benefit}
                  data-animate="fade-up"
                  style={{ "--delay": `${index * 60}ms` }}
                >
                  <Check size={18} aria-hidden="true" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section process" id="process">
        <div className="section-heading" data-animate="fade-up">
          <p className="eyebrow dark">
            <Music2 size={18} aria-hidden="true" />
            {t.process.eyebrow}
          </p>
          <h2>{t.process.title}</h2>
        </div>
        <div className="process-grid">
          {t.process.steps.map((step, index) => (
            <article
              className="process-step"
              key={step.title}
              data-animate="card"
              style={{ "--delay": `${index * 80}ms` }}
            >
              <div className="step-number">{index + 1}</div>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section prices" id="prices">
        <div className="section-heading" data-animate="fade-up">
          <p className="eyebrow dark">
            <Clock3 size={18} aria-hidden="true" />
            {t.prices.eyebrow}
          </p>
          <h2>{t.prices.title}</h2>
        </div>
        <div className="price-grid">
          {t.prices.packages.map((pack, index) => (
            <article
              className={pack.featured ? "price-card featured" : "price-card"}
              key={pack.name}
              data-animate="card"
              style={{ "--delay": `${index * 90}ms` }}
            >
              <div>
                <h3>{pack.name}</h3>
                <p>{pack.detail}</p>
              </div>
              <strong>{pack.price}</strong>
              <ul>
                {pack.features.map((feature) => (
                  <li key={feature}>
                    <Check size={17} aria-hidden="true" />
                    {feature}
                  </li>
                ))}
              </ul>
              <a className="price-link" href={sectionHref(locale, "brief")}>
                {t.prices.choose}
                <FlowArrow size={18} aria-hidden="true" />
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className="final-cta" data-animate="fade-up">
        <div>
          <p className="eyebrow">
            <Sparkles size={18} aria-hidden="true" />
            {t.finalCta.eyebrow}
          </p>
          <h2>{t.finalCta.title}</h2>
        </div>
        <a className="button primary" href={sectionHref(locale, "brief")}>
          <Mic2 size={20} aria-hidden="true" />
          {t.finalCta.button}
        </a>
      </section>

      <footer className="site-footer" data-animate="fade">
        <Link className="footer-brand" href={locale.path} aria-label="PlaysOnline">
          <span className="brand-mark">
            <AudioWaveform size={22} aria-hidden="true" />
          </span>
          <span>PlaysOnline</span>
        </Link>
        <nav className="footer-links" aria-label="Legal">
          {t.footer.links.map((item) => (
            <a href={`/${item.toLowerCase().replaceAll(" ", "-")}`} key={item}>
              {item}
            </a>
          ))}
        </nav>
        <p>©2026</p>
      </footer>

      <a className="back-to-top" href={sectionHref(locale, "top")} aria-label={t.backToTop}>
        <ArrowUp size={20} aria-hidden="true" />
        <span>{t.backToTop}</span>
      </a>

      {isOrderModalOpen ? (
        <div
          className="order-modal-backdrop"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              closeOrderModal();
            }
          }}
        >
          <section
            className="order-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="order-modal-title"
          >
            <button
              className="modal-close"
              type="button"
              onClick={closeOrderModal}
              aria-label={modalCopy.close}
            >
              <X size={20} aria-hidden="true" />
            </button>
            <div className="order-modal-head">
              <p className="eyebrow dark">
                <Send size={18} aria-hidden="true" />
                {modalCopy.eyebrow}
              </p>
              <h2 id="order-modal-title">{modalCopy.title}</h2>
              <p>{modalCopy.intro}</p>
            </div>
            <form className="order-form" onSubmit={handleOrderSubmit}>
              <label>
                <span>{modalCopy.fields.name}</span>
                <input
                  name="name"
                  value={orderForm.name}
                  onChange={handleOrderFieldChange}
                  placeholder={modalCopy.placeholders.name}
                  required
                />
              </label>
              <label>
                <span>{modalCopy.fields.contact}</span>
                <input
                  name="contact"
                  value={orderForm.contact}
                  onChange={handleOrderFieldChange}
                  placeholder={modalCopy.placeholders.contact}
                  required
                />
              </label>
              <label>
                <span>{modalCopy.fields.event}</span>
                <select
                  name="event"
                  value={orderForm.event}
                  onChange={handleOrderFieldChange}
                  required
                >
                  <option value="">{modalCopy.placeholders.event}</option>
                  {t.events.map((event) => (
                    <option value={event.label} key={event.id}>
                      {event.label}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                <span>{modalCopy.fields.style}</span>
                <input
                  name="style"
                  value={orderForm.style}
                  onChange={handleOrderFieldChange}
                  placeholder={modalCopy.placeholders.style}
                />
              </label>
              <label>
                <span>{modalCopy.fields.deadline}</span>
                <input
                  name="deadline"
                  value={orderForm.deadline}
                  onChange={handleOrderFieldChange}
                  placeholder={modalCopy.placeholders.deadline}
                />
              </label>
              <label className="wide">
                <span>{modalCopy.fields.description}</span>
                <textarea
                  name="description"
                  value={orderForm.description}
                  onChange={handleOrderFieldChange}
                  placeholder={modalCopy.placeholders.description}
                  rows={5}
                  required
                />
              </label>
              <button className="button primary order-submit" type="submit" disabled={isOrderSubmitting}>
                <Send size={19} aria-hidden="true" />
                {isOrderSubmitting ? modalCopy.submitting : modalCopy.submit}
              </button>
              {orderStatus ? (
                <p className={`order-message ${orderStatus.type}`} role="status">
                  {orderStatus.message}
                </p>
              ) : null}
            </form>
          </section>
        </div>
      ) : null}
    </main>
  );
}
