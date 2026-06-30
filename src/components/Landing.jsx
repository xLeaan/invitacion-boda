import React, { useEffect, useRef, useState } from "react";
import "../styles/Landing.css"

const WEDDING_DATE = new Date("2027-01-08T16:30:00-05:00");
const MAPS_URL = "https://share.google/uALLQos2oA2E4lWSL";
const WA_ANA = "https://wa.me/573107968918?text=" + encodeURIComponent("¡Hola Ana Sofía! Confirmo mi asistencia a su boda 💍");
const WA_JUAN = "https://wa.me/573017790917?text=" + encodeURIComponent("¡Hola Juan Pablo! Confirmo mi asistencia a su boda 💍");

function useCountdown(target) {
  const [left, setLeft] = useState(target - new Date());
  useEffect(() => {
    const id = setInterval(() => setLeft(target - new Date()), 1000);
    return () => clearInterval(id);
  }, [target]);
  const clamp = Math.max(left, 0);
  const d = Math.floor(clamp / 86400000);
  const h = Math.floor((clamp / 3600000) % 24);
  const m = Math.floor((clamp / 60000) % 60);
  const s = Math.floor((clamp / 1000) % 60);
  return { d, h, m, s, done: left <= 0 };
}

function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setVisible(true)),
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function Reveal({ children, delay = 0, className = "" }) {
  const [ref, visible] = useReveal();
  return (
    <div
      ref={ref}
      className={`reveal ${visible ? "is-visible" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

/* ---------- decorative SVGs (originales, no copian la pieza subida) ---------- */

const Flower = ({ size = 60, color = "var(--coral)", style }) => (
  <svg width={size} height={size} viewBox="0 0 60 60" style={style} fill="none">
    {[0, 60, 120, 180, 240, 300].map((rot) => (
      <ellipse
        key={rot}
        cx="30"
        cy="16"
        rx="9"
        ry="15"
        fill={color}
        opacity="0.85"
        transform={`rotate(${rot} 30 30)`}
      />
    ))}
    <circle cx="30" cy="30" r="6" fill="var(--olive-dark)" />
  </svg>
);

const SprigDivider = () => (
  <svg viewBox="0 0 200 24" width="160" height="20" fill="none">
    <path d="M2 12 H198" stroke="var(--olive)" strokeWidth="1" />
    <circle cx="100" cy="12" r="4" fill="var(--coral)" />
    <circle cx="84" cy="12" r="2.5" fill="var(--olive)" />
    <circle cx="116" cy="12" r="2.5" fill="var(--olive)" />
  </svg>
);

const Glasses = ({ size = 56 }) => (
  <svg width={size} height={size} viewBox="0 0 60 60" fill="none">
    <path d="M16 8 L20 38 Q20 44 24 44" stroke="var(--berry)" strokeWidth="1.6" />
    <path d="M44 8 L40 38 Q40 44 36 44" stroke="var(--berry)" strokeWidth="1.6" />
    <line x1="24" y1="44" x2="24" y2="52" stroke="var(--berry)" strokeWidth="1.6" />
    <line x1="36" y1="44" x2="36" y2="52" stroke="var(--berry)" strokeWidth="1.6" />
    <line x1="18" y1="52" x2="30" y2="52" stroke="var(--berry)" strokeWidth="1.6" />
    <line x1="30" y1="52" x2="42" y2="52" stroke="var(--berry)" strokeWidth="1.6" />
    <path d="M16 8 L44 8" stroke="var(--berry)" strokeWidth="1.6" />
    <path d="M17.5 14 L42.5 14" stroke="var(--berry)" strokeWidth="1.2" opacity="0.6" />
  </svg>
);

const RingsIcon = ({ size = 50 }) => (
  <svg width={size} height={size} viewBox="0 0 60 60" fill="none">
    <circle cx="24" cy="34" r="14" stroke="var(--berry)" strokeWidth="2.2" />
    <circle cx="38" cy="34" r="14" stroke="var(--olive)" strokeWidth="2.2" />
  </svg>
);

const Car = ({ size = 70 }) => (
  <svg width={size} height={size * 0.6} viewBox="0 0 100 60" fill="none">
    <path
      d="M10 42 Q8 24 28 22 L36 12 H64 L74 22 Q92 24 90 42 Z"
      stroke="var(--berry)"
      strokeWidth="2"
      fill="none"
    />
    <circle cx="28" cy="44" r="7" stroke="var(--berry)" strokeWidth="2" />
    <circle cx="72" cy="44" r="7" stroke="var(--berry)" strokeWidth="2" />
    <line x1="40" y1="22" x2="40" y2="12" stroke="var(--berry)" strokeWidth="1.5" />
  </svg>
);

/* ---------- main component ---------- */

export default function Landing() {
  const { d, h, m, s, done } = useCountdown(WEDDING_DATE);

  return (
    <div className="invite-root">

      <div className="frame-border" />

      {/* HERO */}
      <section className="hero">
        <Reveal>
          <div className="monogram">
            <img
                src="/AJ.png"
                alt="AJ"
                style={{ width: "140%", height: "140%", objectFit: "contain" }}
            />
          </div>
        </Reveal>
        <Reveal delay={120}>
          <div className="hero-petals">
            <img 
                src="/cuerpos.png"
                alt="cuerpos"
                style={{ width: "105%", height: "180%" }}
            />
          </div>
        </Reveal>
        <Reveal delay={200}>
          <h1 className="names">Ana Sofía &amp; Juan Pablo</h1>
        </Reveal>
        <Reveal delay={300}>
          <p className="hero-text">
            Con inmensa alegría queremos compartir con ustedes uno de los
            momentos más importantes de nuestras vidas.
          </p>
        </Reveal>
        <Reveal delay={400}>
          <div className="ribbon">
            Queremos que nos acompañes a celebrar nuestro amor<br />
            y el inicio de esta nueva etapa juntos.
          </div>
        </Reveal>
        <div className="down-arrow">⌄</div>
      </section>

      <Flower size={70} color="var(--coral)" style={{ position: "absolute", top: 420, left: -18, opacity: 0.5 }} />
      <Flower size={50} color="var(--pink)" style={{ position: "absolute", top: 560, right: -10, opacity: 0.6 }} />

      {/* DETAILS */}
      <section className="details">
        <Reveal>
          <div className="oval-card">
            <Reveal delay={120}>
            <div className="hero-petals">
                <img 
                    src="/discoball.png"
                    alt="cuerpos"
                    style={{ width: "30%", height: "70%" }}
                />
            </div>
            </Reveal>
            <p className="label">Fecha</p>
            <p className="value">Viernes, 08 de enero de 2027</p>
            <p className="label">Hora</p>
            <p className="value">4:30 pm</p>
            <div style={{ display: "flex", justifyContent: "center", margin: "18px 0" }}>
              <Car size={64} />
            </div>
            <p className="label">Lugar</p>
            <p className="value">Hacienda La Capilla</p>
            <p className="value" style={{ fontSize: 16, opacity: 0.85 }}>
              Subachoque (Bogotá) — Cundinamarca
            </p>
            <p className="value" style={{ fontSize: 15, opacity: 0.7, marginTop: 6 }}>
              Autopista Medellín – Calle 80, Puente de Piedra km 1 
              <br />
              Subachoque - Cundinamarca
            </p>
            <a className="map-btn" href={MAPS_URL} target="_blank" rel="noreferrer">
              📍 Ver ubicación
            </a>
          </div>
        </Reveal>
        <Reveal delay={150}>
          <p className="envelope-note">✉ Lluvia de sobres</p>
        </Reveal>
      </section>

      {/* COUNTDOWN + RSVP */}
      <section className="countdown" style={{ background: "var(--paper)" }}>
        <Reveal>
          <SprigDivider />
        </Reveal>
        <Reveal delay={100}>
          <p className="label" style={{ marginTop: 14 }}>Faltan</p>
        </Reveal>
        <Reveal delay={180}>
          <div className="count-grid">
            <div className="count-cell"><div className="count-num">{done ? 0 : d}</div><div className="count-unit">días</div></div>
            <div className="count-cell"><div className="count-num">{done ? 0 : h}</div><div className="count-unit">hrs</div></div>
            <div className="count-cell"><div className="count-num">{done ? 0 : m}</div><div className="count-unit">min</div></div>
            <div className="count-cell"><div className="count-num">{done ? 0 : s}</div><div className="count-unit">seg</div></div>
          </div>
        </Reveal>

        <Reveal delay={260}>
          <p className="label" style={{ marginTop: 38 }}>Confirmación de Asistencia</p>
          <p className="rsvp-deadline">Por favor confirmar antes del 15 de agosto de 2026.</p>
        </Reveal>

        <Reveal delay={340}>
          <div className="rsvp-btns">
            <a className="wa-btn" href={WA_ANA} target="_blank" rel="noreferrer">💬 Confirmar con Ana Sofía</a>
            <a className="wa-btn" href={WA_JUAN} target="_blank" rel="noreferrer">💬 Confirmar con Juan Pablo</a>
          </div>
        </Reveal>
      </section>

      {/* SCHEDULE */}
      <section className="schedule">
        <Reveal>
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 18 }}>
            <Glasses size={50} />
          </div>
          <h2 className="schedule-title">Cronograma del Evento</h2>
        </Reveal>
        <div className="timeline">
          <Reveal delay={0}>
            <div className="t-item">
              <p className="t-title">Ceremonia Religiosa</p>
              <p className="t-time">4:30 pm</p>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="t-item">
              <p className="t-title">Cóctel de Bienvenida</p>
              <p className="t-time">5:30 pm</p>
            </div>
          </Reveal>
          <Reveal delay={240}>
            <div className="t-item">
              <p className="t-title">Recepción y Fiesta</p>
              <p className="t-time">7:00 pm</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* DRESS CODE */}
      <section className="dress" style={{ background: "var(--paper)" }}>
        <Reveal>
          <RingsIcon size={48} />
          <h2 className="dress-code-title" style={{ marginTop: 14 }}>Código de Vestimenta</h2>
          <p className="value">Formal</p>
          <p className="value" style={{ fontSize: 16, opacity: 0.85 }}>
            Recomendamos prendas que protejan del frío.
          </p>
        </Reveal>
        <Reveal delay={140}>
          <p style={{ color: "var(--berry)", marginTop: 14, fontSize: 17 }}>Colores reservados</p>
          <div className="swatches">
            <div className="swatch" style={{ background: "#fbfaf5" }} title="Blanco" />
            <div className="swatch" style={{ background: "#f1e8d2" }} title="Marfil" />
            <div className="swatch" style={{ background: "var(--pink)" }} title="Rosado" />        
          </div>
          <div>
                <p>(Blanco, Marfil, Rosado)</p>
            </div>
        </Reveal>
        <Reveal delay={220}>
          <div className="adults-note">
            Aunque adoramos a los más pequeños, hemos decidido que nuestra boda
            sea una celebración <strong>solo para adultos</strong>. Gracias por
            acompañarnos y comprender esta decisión tan especial para nosotros.
          </div>
        </Reveal>
      </section>

      {/* CLOSING */}
      <section className="closing">
        <Reveal>
          <SprigDivider />
        </Reveal>
        <Reveal delay={120}>
          <div className="closing-banner" style={{ marginTop: 24 }}>
            ¡Te esperamos para celebrar<br />juntos este día tan especial!
          </div>
        </Reveal>
        <Reveal delay={240}>
          <p className="closing-sign">Ana Sofía &amp; Juan Pablo</p>
        </Reveal>
        <Reveal delay={300}>
          <div style={{ display: "flex", justifyContent: "center", marginTop: 18 }}>
            <Car size={70} />
          </div>
        </Reveal>
      </section>
    </div>
  );
}