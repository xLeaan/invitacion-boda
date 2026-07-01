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

const SprigDivider = () => (
  <svg viewBox="0 0 200 24" width="160" height="20" fill="none">
    <path d="M2 12 H198" stroke="var(--olive)" strokeWidth="1" />
    <circle cx="100" cy="12" r="4" fill="var(--coral)" />
    <circle cx="84" cy="12" r="2.5" fill="var(--olive)" />
    <circle cx="116" cy="12" r="2.5" fill="var(--olive)" />
  </svg>
);

const RingsIcon = ({ size = 50 }) => (
  <svg width={size} height={size} viewBox="0 0 60 60" fill="none">
    <circle cx="24" cy="34" r="14" stroke="var(--berry)" strokeWidth="2.2" />
    <circle cx="38" cy="34" r="14" stroke="var(--olive)" strokeWidth="2.2" />
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
        <svg className="wavy-frame" viewBox="0 0 340 600" preserveAspectRatio="none">
          <path
            d="M 20 12
       Q 60 2, 100 12 T 180 12 T 260 12 T 320 12
       Q 330 60, 322 110 T 328 190 T 320 270 T 316 370 T 337 440 T 324 480 T 336 570
       Q 310 580, 260 580 T 190 588 T 120 580 T 10 588
       Q 25 500, 16 460 T 10 380 T 18 300 T 12 220 T 18 140 T 12 60 T 20 12 Z"
            fill="none"
            stroke="var(--olive)"
            strokeWidth="3"
          />
        </svg>
        <Reveal delay={120}>
          <div className="hero-bodys">
            <img
              src="/cuerpos.png"
              alt="cuerpos"
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

      {/* DETAILS */}
      <section className="details">
        <Reveal>
          <div className="oval-card">
            <img src="/marco.png" alt="" className="oval-bg" />
            <Reveal delay={120}>
              <div className="hero-petals">
                <img
                  src="/disco.png"
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
              {/* <Car size={64} /> */}
              <img
                src="/carro.png"
                alt="car"
                style={{ width: "15%" }}
              />
            </div>
            <p className="label">Lugar</p>
            <p className="value">Hacienda La Capilla</p>
            <p className="value" style={{ fontSize: 16, opacity: 0.85 }}>
              Subachoque (Bogotá) — Cundinamarca
            </p>
            <p className="value" style={{ fontSize: 15, opacity: 0.7, marginTop: 6 }}>
              Autopista Medellín – Calle 80 <br />Puente de Piedra km 1
              <br />
              Subachoque - Cundinamarca
            </p>
            <Reveal delay={150}>
              <p className="envelope-note">✉ Lluvia de sobres</p>
            </Reveal>
            <a className="map-btn" href={MAPS_URL} target="_blank" rel="noreferrer">
              📍 Ver ubicación
            </a>
          </div>
        </Reveal>

      </section>
      <img
        src="/boleto_avion.png"
        alt=""
        style={{
          position: "absolute",
          top: 1020,
          right: 30,
          width: 90,
          height: "auto",
          opacity: 0.6,
          pointerEvents: "none",
          zIndex: 1,
          transform: "rotate(-30deg)"
        }}
      />
      <img
        src="/flor1.png"
        alt=""
        style={{
          position: "absolute",
          top: 1160,
          right: 10,
          width: 60,
          height: "auto",
          opacity: 0.6,
          pointerEvents: "none",
          zIndex: 1,
          transform: "rotate(12deg)"
        }}
      />
      <img
        src="/ESTRE.png"
        alt=""
        style={{
          position: "absolute",
          top: 1224,
          right: 2,
          width: 40,
          height: "auto",
          opacity: 0.6,
          pointerEvents: "none",
          zIndex: 1,
          transform: "rotate(1deg)"
        }}
      />
      <img
        src="/camara.png"
        alt=""
        style={{
          position: "absolute",
          top: 1040,
          left: 40,
          width: 80,
          height: "auto",
          opacity: 0.6,
          pointerEvents: "none",
          zIndex: 1,
          transform: "rotate(-20deg)"
        }}
      />
      <img
        src="/flor1.png"
        alt=""
        style={{
          position: "absolute",
          top: 1000,
          left: -1,
          width: 80,
          height: "auto",
          opacity: 0.6,
          pointerEvents: "none",
          zIndex: 1,
          transform: "rotate(12deg)"
        }}
      />
      <img
        src="/botella.png"
        alt=""
        style={{
          position: "absolute",
          top: 1100,
          left: 15,
          width: 50,
          height: "auto",
          opacity: 0.6,
          pointerEvents: "none",
          zIndex: 1,
          transform: "rotate(12deg)"
        }}
      />
      <img
        src="/ESTRE.png"
        alt=""
        style={{
          position: "absolute",
          top: 1620,
          left: 10,
          width: 50,
          height: "auto",
          opacity: 0.6,
          pointerEvents: "none",
          zIndex: 1,
          transform: "rotate(1deg)"
        }}
      />
      <img
        src="/champan.png"
        alt=""
        style={{
          position: "absolute",
          top: 1660,
          left: 10,
          width: 80,
          height: "auto",
          opacity: 0.6,
          pointerEvents: "none",
          zIndex: 1,
          transform: "rotate(1deg)"
        }}
      />
      <img
        src="/champan.png"
        alt=""
        style={{
          position: "absolute",
          top: 1690,
          left: 70,
          width: 70,
          height: "auto",
          opacity: 0.6,
          pointerEvents: "none",
          zIndex: 1,
          transform: "rotate(-25deg)"
        }}
      />
      <img
        src="/flor1.png"
        alt=""
        style={{
          position: "absolute",
          top: 1630,
          right: 5,
          width: 80,
          height: "auto",
          opacity: 0.6,
          pointerEvents: "none",
          zIndex: 1,
          transform: "rotate(1deg)"
        }}
      />
      <img
        src="/anillos.png"
        alt=""
        style={{
          position: "absolute",
          top: 1696,
          right: 41,
          width: 120,
          height: "auto",
          opacity: 0.9,
          pointerEvents: "none",
          zIndex: 1,
          transform: "rotate(1deg)"
        }}
      />

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
      <img
        src="/botella.png"
        alt=""
        style={{
          position: "absolute",
          top: 2260,
          left: 15,
          width: 60,
          height: "auto",
          opacity: 0.6,
          pointerEvents: "none",
          zIndex: 1,
          transform: "rotate(-160deg)"
        }}
      />
      <img
        src="/flor1.png"
        alt=""
        style={{
          position: "absolute",
          top: 2260,
          right: 5,
          width: 100,
          height: "auto",
          opacity: 0.6,
          pointerEvents: "none",
          zIndex: 1,
          transform: "rotate(-160deg)"
        }}
      />
      <img
        src="/camara.png"
        alt=""
        style={{
          position: "absolute",
          top: 2386,
          right: -30,
          width: 80,
          height: "auto",
          opacity: 0.6,
          pointerEvents: "none",
          zIndex: 1,
          transform: "rotate(-66deg)"
        }}
      />
      <img
        src="/anillos.png"
        alt=""
        style={{
          position: "absolute",
          top: 2460,
          right: -10,
          width: 100,
          height: "auto",
          opacity: 1.9,
          pointerEvents: "none",
          zIndex: 4,
          transform: "rotate(20deg)"
        }}
      />
      <img
        src="/disco.png"
        alt=""
        style={{
          position: "absolute",
          top: 2460,
          left: -17,
          width: 130,
          height: "auto",
          opacity: 0.3,
          pointerEvents: "none",
          zIndex: 4,
          transform: "rotate(-30deg)"
        }}
      />
      <section className="schedule">
        <div className="schedule-frame">
          <img src="/marco02.png" alt="" className="schedule-bg" />
          <div className="schedule-content">
            <Reveal>
              <div style={{ display: "flex", justifyContent: "center", marginBottom: 18 }}>
                <img
                  src="/champan.png" alt="champan" style={{ width: 50, height: "auto", transform: "rotate(5deg)" }}
                />
                <img
                  src="/champan.png" alt="champan" style={{ width: 40, height: 70, transform: "rotate(-40deg)" }}
                />
              </div>
              <h2 className="schedule-title">Cronograma del Evento</h2>
            </Reveal>
            <div className="timeline">
              <Reveal delay={0}>
                <div className="t-item">
                  <p className="t-title">Ceremonia Religiosa</p>
                  <p className="t-time">Hora: 4:30 pm</p>
                </div>
              </Reveal>
              <Reveal delay={120}>
                <div className="t-item">
                  <p className="t-title">Cóctel de Bienvenida</p>
                  <p className="t-time">Hora: 5:30 pm</p>
                </div>
              </Reveal>
              <Reveal delay={240}>
                <div className="t-item">
                  <p className="t-title">Recepción y Fiesta</p>
                  <p className="t-time">Hora: 7:00 pm</p>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
      <img
        src="/champan.png"
        alt=""
        style={{
          position: "absolute",
          top: 2750,
          left: 5,
          width: 70,
          height: "auto",
          opacity: 0.9,
          pointerEvents: "none",
          zIndex: 4,
          transform: "rotate(-10deg)"
        }}
      />

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
            <img
              src="/carro.png"
              alt="anillos"
              style={{ width: 90, height: "auto" }}
            />
          </div>
        </Reveal>
      </section>
    </div>
  );
}