import React, { useEffect, useRef } from "react";
import "@/App.css";
import Sphere from "@/components/Sphere";
import DreamMap from "@/components/DreamMap";
import { SigilQuadrature, SigilOuroboros, KeyGlyph, FooterSeal } from "@/components/Sigils";
import FractalDots from "@/components/FractalDots";

const APP_URL = "https://app.innercore.art";
const TG_URL = "https://t.me/post_cybercore";

const useFadeIn = () => {
  const ref = useRef(null);
  useEffect(() => {
    const els = document.querySelectorAll(".fade-in");
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);
  return ref;
};

const Nav = () => (
  <nav className="container-ms pt-8 pb-2 flex items-center justify-between" data-testid="site-nav">
    <a href="#top" className="flex items-center gap-3 no-underline" data-testid="brand-mark">
      <span style={{ color: "var(--copper)" }}>
        <SigilQuadrature size={22} />
      </span>
      <span className="font-serif text-[19px] tracking-[0.02em]" style={{ color: "var(--cream)" }}>
        innerCore
      </span>
    </a>
    <div className="hidden md:flex items-center gap-9 text-[13px]" style={{ color: "var(--stone)" }}>
      <a href="#what" className="hover:text-[color:var(--cream)] transition-colors" style={{ color: "inherit", textDecoration: "none" }} data-testid="nav-what">что это</a>
      <a href="#how" className="hover:text-[color:var(--cream)] transition-colors" style={{ color: "inherit", textDecoration: "none" }} data-testid="nav-how">метод</a>
      <a href="#map" className="hover:text-[color:var(--cream)] transition-colors" style={{ color: "inherit", textDecoration: "none" }} data-testid="nav-map">карта</a>
      <a href="#privacy" className="hover:text-[color:var(--cream)] transition-colors" style={{ color: "inherit", textDecoration: "none" }} data-testid="nav-privacy">приватность</a>
    </div>
    <a href={APP_URL} className="btn-ghost" data-testid="nav-cta">открыть →</a>
  </nav>
);

const Hero = () => (
  <section id="top" className="container-ms relative pt-10 md:pt-16 pb-16 md:pb-24" data-testid="hero-section">
    <div className="grid md:grid-cols-2 gap-12 md:gap-8 items-center">
      <div className="relative">
        <div className="flex items-center gap-3 mb-7" style={{ color: "var(--stone)" }}>
          <span style={{ color: "var(--copper)" }}>
            <SigilOuroboros size={42} />
          </span>
          <span className="text-[11px] tracking-[0.32em] uppercase">opus minor · 2026</span>
        </div>
        <h1 className="font-serif text-[44px] sm:text-[58px] md:text-[68px] leading-[0.98] tracking-[-0.015em]" data-testid="hero-title">
          Карта твоих<br/>
          <span style={{ color: "var(--copper)" }}>снов.</span>
        </h1>
        <p className="mt-7 max-w-[440px] text-[17px]" style={{ color: "var(--cream-dim)" }} data-testid="hero-subtitle">
          Дневник сновидений с юнгианским анализом. Записывай — и наблюдай, как из ночного потока проступает структура.
        </p>
        <div className="mt-10 flex items-center gap-6">
          <a href={APP_URL} className="btn-copper" data-testid="hero-cta-open-app">
            Открыть приложение
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M2 7 H12 M8 3 L12 7 L8 11" stroke="currentColor" strokeWidth="1.2" />
            </svg>
          </a>
          <a href="#what" className="text-[13px] tracking-[0.12em] uppercase hover:underline" style={{ color: "var(--stone)", textDecoration: "none" }} data-testid="hero-scroll-down">
            ↓ что это
          </a>
        </div>

        <div className="mt-14 flex items-center gap-6 text-[12px]" style={{ color: "var(--stone)" }}>
          <span className="flex items-center gap-2">
            <span className="w-1 h-1 rounded-full" style={{ background: "var(--copper)" }}></span>
            архетипы
          </span>
          <span>·</span>
          <span>символы</span>
          <span>·</span>
          <span>векторная карта</span>
          <span>·</span>
          <span>e2e-шифрование</span>
        </div>
      </div>

      <div className="relative" data-testid="hero-sphere">
        <Sphere />
        <div className="mt-2 text-center font-serif italic text-[14px]" style={{ color: "var(--stone)" }}>
          quod superius sicut quod inferius — что вверху, то и внизу
        </div>
      </div>
    </div>
  </section>
);

const WhatItIs = () => (
  <section id="what" className="relative overflow-hidden fade-in" data-testid="section-what">
    <div className="absolute inset-0 pointer-events-none" data-testid="fractal-bg-what">
      <FractalDots variant="copper" density={60} opacity={0.9} />
    </div>
    <div className="container-ms relative py-20 md:py-28 z-[2]">
      <div className="max-w-[760px]">
        <div className="text-[11px] tracking-[0.32em] uppercase mb-6" style={{ color: "var(--copper)" }}>
          — i. prima materia
        </div>
        <p className="font-serif text-[26px] sm:text-[32px] md:text-[36px] leading-[1.3]" style={{ color: "var(--cream)" }}>
          Записывай сны простым языком. innerCore раскладывает их на <span style={{ color: "var(--copper)" }}>архетипы</span>, символы и связи с другими твоими снами. Со временем складывается карта — твоё личное бессознательное в форме.
        </p>
      </div>
    </div>
  </section>
);

const HowItWorks = () => {
  const cards = [
    {
      glyph: "☿",
      label: "Mercurius",
      title: "Записать",
      text: "Веди дневник снов. Голосом или текстом, в любое время.",
    },
    {
      glyph: "🜍",
      label: "Sulphur",
      title: "Понять",
      text: "Каждый сон получает разбор: архетипы, мотивы, эмоциональный тон.",
    },
    {
      glyph: "🜔",
      label: "Sal",
      title: "Увидеть",
      text: "Сны соединяются в карту. Повторяющиеся темы становятся видимыми.",
    },
  ];
  return (
    <section id="how" className="container-ms py-20 md:py-28 fade-in" data-testid="section-how">
      <div className="flex items-baseline justify-between mb-12 flex-wrap gap-4">
        <h2 className="font-serif text-[32px] sm:text-[42px] md:text-[52px] leading-[1.02]" data-testid="how-title">
          Триада<br/>метода
        </h2>
        <div className="text-[12px] tracking-[0.32em] uppercase" style={{ color: "var(--stone)" }}>
          — ii. mercurius · sulphur · sal
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-px" style={{ background: "var(--hairline)" }}>
        {cards.map((c, i) => (
          <div key={i} className="card-ms" data-testid={`how-card-${i}`} style={{ borderRadius: 0, borderWidth: 0 }}>
            <div className="flex items-center justify-between mb-7">
              <span className="glyph">{c.glyph}</span>
              <span className="text-[10px] tracking-[0.32em] uppercase" style={{ color: "var(--stone)" }}>
                {String(i + 1).padStart(2, "0")} · {c.label}
              </span>
            </div>
            <h3 className="font-serif text-[28px] mb-3">{c.title}</h3>
            <p className="text-[15px]" style={{ color: "var(--cream-dim)" }}>{c.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

const MapSection = () => (
  <section id="map" className="container-ms py-20 md:py-28 fade-in" data-testid="section-map">
    <div className="grid md:grid-cols-12 gap-10 items-center">
      <div className="md:col-span-5">
        <div className="text-[11px] tracking-[0.32em] uppercase mb-6" style={{ color: "var(--copper)" }}>
          — iii. mappa somniorum
        </div>
        <h2 className="font-serif text-[34px] sm:text-[44px] md:text-[52px] leading-[1.04] mb-6">
          Карта снов
        </h2>
        <p className="text-[16px] mb-4" style={{ color: "var(--cream-dim)" }}>
          Каждый сон — точка. Похожие сны — кластеры. Архетипы — созвездия.
        </p>
        <p className="text-[15px] italic font-serif" style={{ color: "var(--stone)" }}>
          Математическая близость векторов — как близость смыслов.
        </p>
      </div>
      <div className="md:col-span-7" data-testid="dream-map-demo">
        <DreamMap />
      </div>
    </div>
  </section>
);

const Privacy = () => (
  <section id="privacy" className="relative overflow-hidden fade-in" data-testid="section-privacy">
    <div className="absolute inset-0 pointer-events-none" data-testid="fractal-bg-privacy">
      <FractalDots variant="cinnabar" density={64} opacity={0.85} />
    </div>
    <div className="container-ms relative py-20 md:py-28 z-[2]">
      <div className="grid md:grid-cols-12 gap-10 items-start max-w-[1000px] mx-auto">
        <div className="md:col-span-3 flex md:justify-end">
          <div style={{ color: "var(--copper)" }}>
            <KeyGlyph size={64} />
          </div>
        </div>
        <div className="md:col-span-9">
          <div className="text-[11px] tracking-[0.32em] uppercase mb-5" style={{ color: "var(--copper)" }}>
            — iv. sigillum
          </div>
          <h2 className="font-serif text-[30px] sm:text-[38px] md:text-[44px] leading-[1.06] mb-6">
            Сны не покидают тебя.
          </h2>
          <p className="text-[17px] max-w-[620px]" style={{ color: "var(--cream-dim)" }}>
            Содержимое снов шифруется на твоём устройстве перед отправкой. На сервере — только шифротекст. Ни Google, ни мы, никто другой не видит, что тебе снилось.
          </p>
        </div>
      </div>
    </div>
  </section>
);

const DeepBlock = () => (
  <section className="container-ms py-20 md:py-28 fade-in" data-testid="section-deep">
    <details className="border-t border-b hairline py-8 md:py-10 max-w-[900px] mx-auto" data-testid="deep-details">
      <summary className="flex items-center justify-between gap-4 cursor-pointer group">
        <h2 className="font-serif text-[24px] sm:text-[30px] md:text-[34px] leading-[1.1]">
          Для тех, кто глубже
        </h2>
        <span className="font-serif text-[28px] transition-transform" style={{ color: "var(--copper)" }} aria-hidden="true">
          +
        </span>
      </summary>
      <div className="mt-8 max-w-[680px] text-[16px] space-y-5" style={{ color: "var(--cream-dim)" }}>
        <p>
          <span className="font-serif italic" style={{ color: "var(--cream)" }}>Юнгианская модель психики.</span> Сознание как малая поверхность, под которой — слои личного и коллективного бессознательного.
        </p>
        <p>
          <span className="font-serif italic" style={{ color: "var(--cream)" }}>Архетипы</span> как структурные паттерны — Тень, Анима, Самость, Герой, Мудрый старец. Они не образы, а формы, в которые отливаются образы.
        </p>
        <p>
          <span className="font-serif italic" style={{ color: "var(--cream)" }}>Векторная база данных</span> как форма для индивидуальной карты символов. Каждый сон — точка в пространстве смыслов; повторение и кластеризация раскрывают паттерн.
        </p>
        <p>
          <span className="font-serif italic" style={{ color: "var(--cream)" }}>Открытая методология.</span> Статьи о методе и его обосновании — в Telegram-канале{" "}
          <a href={TG_URL} target="_blank" rel="noreferrer" style={{ color: "var(--copper)" }} className="hover:underline" data-testid="deep-tg-link">
            CyberCore
          </a>.
        </p>
      </div>
    </details>
  </section>
);

const FinalCTA = () => (
  <section className="container-ms py-24 md:py-32 fade-in text-center" data-testid="section-final-cta">
    <div className="flex justify-center mb-10" style={{ color: "var(--copper)" }}>
      <SigilQuadrature size={48} />
    </div>
    <h2 className="font-serif text-[36px] sm:text-[48px] md:text-[60px] leading-[1.02] max-w-[760px] mx-auto mb-10">
      Сегодня ночью<br/>что-то приснится.
    </h2>
    <a href={APP_URL} className="btn-copper" data-testid="final-cta-open-app">
      Открыть приложение
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
        <path d="M2 7 H12 M8 3 L12 7 L8 11" stroke="currentColor" strokeWidth="1.2" />
      </svg>
    </a>
    <div className="mt-7 text-[13px]" style={{ color: "var(--stone)" }}>
      Канал автора{" "}
      <a href={TG_URL} target="_blank" rel="noreferrer" style={{ color: "var(--cream-dim)" }} className="hover:underline" data-testid="final-tg-link">
        @CyberCore
      </a>{" "}
      — про снотолкование, бессознательное и киберпанк.
    </div>
  </section>
);

const Footer = () => (
  <footer className="border-t hairline mt-10" data-testid="site-footer">
    <div className="container-ms py-10 flex flex-col md:flex-row gap-6 md:items-center md:justify-between">
      <div className="text-[12px] tracking-[0.18em] uppercase" style={{ color: "var(--stone)" }}>
        © 2026 · innerCore
      </div>
      <div className="flex items-center gap-7 text-[13px]" style={{ color: "var(--stone)" }}>
        <a href={`mailto:hi@innercore.art`} className="hover:text-[color:var(--cream)]" style={{ color: "inherit", textDecoration: "none" }} data-testid="footer-contact">
          контакт
        </a>
        <a href="#privacy" className="hover:text-[color:var(--cream)]" style={{ color: "inherit", textDecoration: "none" }} data-testid="footer-privacy">
          политика приватности
        </a>
        <a href={TG_URL} target="_blank" rel="noreferrer" className="hover:text-[color:var(--cream)]" style={{ color: "inherit", textDecoration: "none" }} data-testid="footer-telegram">
          telegram
        </a>
      </div>
      <div style={{ color: "var(--copper)" }} className="md:ml-auto">
        <FooterSeal size={26} />
      </div>
    </div>
  </footer>
);

function App() {
  useFadeIn();
  return (
    <div className="App relative" data-testid="app-root">
      <Nav />
      <Hero />
      <div className="container-ms"><div className="h-px hairline border-t" /></div>
      <WhatItIs />
      <div className="container-ms"><div className="h-px hairline border-t" /></div>
      <HowItWorks />
      <div className="container-ms"><div className="h-px hairline border-t" /></div>
      <MapSection />
      <div className="container-ms"><div className="h-px hairline border-t" /></div>
      <Privacy />
      <DeepBlock />
      <div className="container-ms"><div className="h-px hairline border-t" /></div>
      <FinalCTA />
      <Footer />
    </div>
  );
}

export default App;
