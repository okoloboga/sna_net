import React, { useEffect, useState } from "react";
import "@/App.css";
import { Menu, X, Plus } from "lucide-react";
import Sphere from "@/components/Sphere";
import DreamMap from "@/components/DreamMap";
import { SigilQuadrature, SigilOuroboros, KeyGlyph, FooterSeal } from "@/components/Sigils";
import FractalDots from "@/components/FractalDots";
import FractalTrees from "@/components/FractalTrees";

const APP_URL = "https://app.innercore.art";
const TG_URL = "https://t.me/post_cybercore";

const useFadeIn = () => {
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
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);
};

const NAV_LINKS = [
  { href: "#manifest", label: "манифест", testid: "nav-manifest" },
  { href: "#how", label: "инструмент", testid: "nav-how" },
  { href: "#map", label: "карта", testid: "nav-map" },
  { href: "#reading", label: "о методе", testid: "nav-reading" },
  { href: "#faq", label: "faq", testid: "nav-faq" },
];

const Nav = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const close = () => setOpen(false);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "nav-scrolled" : ""}`}
      data-testid="site-nav"
    >
      <nav className="container-ms py-4 md:py-5 flex items-center justify-between">
        <a href="#top" onClick={close} className="flex items-center gap-3 no-underline" data-testid="brand-mark">
          <span style={{ color: "var(--copper)" }}>
            <SigilQuadrature size={22} />
          </span>
          <span className="font-serif text-[18px] md:text-[19px] tracking-[0.02em]" style={{ color: "var(--cream)" }}>
            innerCore
          </span>
        </a>

        <div className="hidden md:flex items-center gap-7 lg:gap-9 text-[13px]" style={{ color: "var(--stone)" }}>
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="hover:text-[color:var(--cream)] transition-colors"
              style={{ color: "inherit", textDecoration: "none" }}
              data-testid={l.testid}
            >
              {l.label}
            </a>
          ))}
        </div>

        <a href={APP_URL} className="btn-ghost nav-cta-desktop" data-testid="nav-cta">открыть →</a>

        <button
          className="md:hidden p-2 -mr-2 text-[color:var(--cream)]"
          aria-label={open ? "Закрыть меню" : "Открыть меню"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          data-testid="mobile-menu-toggle"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${open ? "max-h-[520px] opacity-100" : "max-h-0 opacity-0"}`}
        data-testid="mobile-menu"
        style={{ background: "rgba(15, 17, 24, 0.97)", borderTop: open ? "1px solid var(--hairline)" : "none" }}
      >
        <div className="container-ms py-6 flex flex-col gap-5">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={close}
              className="font-serif text-[22px]"
              style={{ color: "var(--cream)", textDecoration: "none" }}
              data-testid={`m-${l.testid}`}
            >
              {l.label}
            </a>
          ))}
          <a href={APP_URL} onClick={close} className="btn-copper mt-2 self-start" data-testid="mobile-cta">
            Открыть приложение
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M2 7 H12 M8 3 L12 7 L8 11" stroke="currentColor" strokeWidth="1.2" />
            </svg>
          </a>
        </div>
      </div>
    </header>
  );
};

const Hero = () => (
  <section
    id="top"
    className="relative overflow-hidden min-h-screen flex items-center"
    data-testid="hero-section"
  >
    <div className="container-ms w-full pt-28 md:pt-24 pb-12 md:pb-16">
      <div className="grid md:grid-cols-12 gap-10 md:gap-8 items-center">
        <div className="relative order-2 md:order-1 md:col-span-7">
          <div className="flex items-center gap-3 mb-6 md:mb-7" style={{ color: "var(--stone)" }}>
            <span style={{ color: "var(--copper)" }}>
              <SigilOuroboros size={38} />
            </span>
            <span className="text-[10px] md:text-[11px] tracking-[0.32em] uppercase">opus minor · 2026</span>
          </div>
          <h1
            className="font-serif text-[34px] sm:text-[46px] md:text-[58px] lg:text-[64px] leading-[1.02] tracking-[-0.015em] max-w-[760px]"
            data-testid="hero-title"
          >
            Твоё внимание уходит куда угодно,{" "}
            <span style={{ color: "var(--copper)" }}>кроме тебя.</span>
          </h1>
          <p className="mt-6 md:mt-8 max-w-[520px] text-[16px] md:text-[18px]" style={{ color: "var(--cream-dim)" }} data-testid="hero-subtitle">
            innerCore — место, где оно возвращается. Дневник сновидений с юнгианским анализом.
          </p>
          <div className="mt-8 md:mt-10 flex items-center gap-5 md:gap-6 flex-wrap">
            <a href={APP_URL} className="btn-copper" data-testid="hero-cta-open-app">
              Открыть приложение
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M2 7 H12 M8 3 L12 7 L8 11" stroke="currentColor" strokeWidth="1.2" />
              </svg>
            </a>
            <a
              href="#manifest"
              className="text-[12px] md:text-[13px] tracking-[0.12em] uppercase hover:underline"
              style={{ color: "var(--stone)", textDecoration: "none" }}
              data-testid="hero-scroll-down"
            >
              ↓ читать манифест
            </a>
          </div>

          <div className="mt-10 md:mt-14 flex items-center gap-3 md:gap-6 text-[11px] md:text-[12px] flex-wrap" style={{ color: "var(--stone)" }}>
            <span className="flex items-center gap-2">
              <span className="w-1 h-1 rounded-full" style={{ background: "var(--copper)" }}></span>
              архетипы
            </span>
            <span>·</span>
            <span>символы</span>
            <span>·</span>
            <span>векторная карта</span>
            <span className="hidden sm:inline">·</span>
            <span className="hidden sm:inline">e2e-шифрование</span>
          </div>
        </div>

        <div className="relative order-1 md:order-2 md:col-span-5 max-w-[420px] md:max-w-none mx-auto w-full" data-testid="hero-sphere">
          <Sphere />
          <div className="mt-2 text-center font-serif italic text-[12px] md:text-[14px] px-4" style={{ color: "var(--stone)" }}>
            quod superius sicut quod inferius — что вверху, то и внизу
          </div>
        </div>
      </div>
    </div>
  </section>
);

const SubBlock = ({ kicker, title, children }) => (
  <div className="mb-14 md:mb-20 max-w-[720px]">
    {kicker && (
      <div className="text-[10px] md:text-[11px] tracking-[0.32em] uppercase mb-4" style={{ color: "var(--copper)" }}>
        {kicker}
      </div>
    )}
    <h3 className="font-serif text-[24px] sm:text-[30px] md:text-[36px] leading-[1.15] mb-5 md:mb-6" style={{ color: "var(--cream)" }}>
      {title}
    </h3>
    <div className="space-y-4 md:space-y-5 text-[15px] md:text-[17px]" style={{ color: "var(--cream-dim)" }}>
      {children}
    </div>
  </div>
);

const Manifesto = () => (
  <section id="manifest" className="relative overflow-hidden min-h-screen fade-in" data-testid="section-manifest">
    <div className="absolute inset-0 pointer-events-none" data-testid="fractal-bg-manifest">
      <FractalDots variant="copper" density={62} opacity={0.85} />
    </div>
    <div className="container-ms relative w-full py-24 md:py-32 z-[2]">
      <div className="mb-14 md:mb-20 max-w-[820px]">
        <div className="text-[10px] md:text-[11px] tracking-[0.32em] uppercase mb-6" style={{ color: "var(--copper)" }}>
          — i. manifesto
        </div>
        <h2
          className="font-serif text-[32px] sm:text-[44px] md:text-[58px] leading-[1.04] tracking-[-0.01em]"
          data-testid="manifest-title"
        >
          Кому ты на самом деле принадлежишь?
        </h2>
      </div>

      <SubBlock kicker="— внимание">
        <p>
          Интернет забирает внимание. Работа забирает внимание. Учёба забирает внимание. Новости, реклама, чаты, чужие мнения, чужие ожидания — каждый требует свою долю. И каждый получает.
        </p>
        <p>
          А ты? Сколько внимания доходит до тебя самого? Час в день? Десять минут? Совсем ничего?
        </p>
        <p className="font-serif italic" style={{ color: "var(--cream)" }}>
          Это не философский вопрос. Это вопрос о том, кто ты есть.
        </p>
        <p>
          Когда внимание уходит вовне — внутри становится пусто. И тогда любая внешняя проблема — на работе, в семье, со здоровьем — встречает не тебя, а пустое место.
        </p>
      </SubBlock>

      <SubBlock kicker="— конфликт" title="Откуда берутся конфликты">
        <p>
          Большинство конфликтов между людьми — не про деньги, не про власть, не про обиды. Они про то, что внутри у одного человека пусто, и он требует, чтобы другой это заполнил. А другой тоже пустой. И они сталкиваются.
        </p>
        <p>
          Невозможно любить кого-то, не любя себя. То, что выглядит как любовь к другому без любви к себе — это переадресация: попытка получить от другого то, что должно быть у тебя внутри. Поэтому первое — внимание к себе. Второе — внимание к близким. Всё остальное идёт из этого порядка.
        </p>
      </SubBlock>

      <SubBlock kicker="— тело" title="Психика — это и есть здоровье">
        <p>
          Психика — это нервная система. Нервная система регулирует органы, гормоны, эмоции, отношения. Когда психика не услышана — болеют органы. Когда психика не понята — рушатся отношения. Когда внутренний конфликт не разобран — он выходит наружу симптомом: бессонницей, гипертонией, скандалом, увольнением, разводом.
        </p>
        <p>
          Психология — не «мягкая» наука рядом с серьёзной медициной. Психология — корень медицины. Лечение симптома без работы с причиной — это бесконечная борьба со следствиями.
        </p>
      </SubBlock>

      <SubBlock kicker="— практика" title="Куда смотреть">
        <p>
          Внимание возвращается через простые практики. Одна из самых прямых — работа со снами. Днём психика защищена ролями, словами и привычками. Ночью защит нет. Снится то, что есть.
        </p>
        <p className="font-serif italic text-[17px] md:text-[20px]" style={{ color: "var(--cream)" }}>
          innerCore — инструмент для этой работы.
        </p>
      </SubBlock>
    </div>
  </section>
);

const TOOL_CARDS = [
  {
    glyph: "☿",
    label: "Mercurius",
    title: "Записывает",
    intro: "Сразу после пробуждения — текстом или голосом.",
    body: "Сон забывается в первые минуты, поэтому запись делается короткой и быстрой. Пара минут — и материал сохранён.",
  },
  {
    glyph: "🜍",
    label: "Sulphur",
    title: "Разбирает",
    intro: "Каждый сон проходит через юнгианский разбор.",
    body: "Какие архетипы появились, какие мотивы повторяются из прошлых снов, какой эмоциональный тон, какие фигуры активны. Не магия — рабочая модель психики.",
  },
  {
    glyph: "🜔",
    label: "Sal",
    title: "Складывает карту",
    intro: "Один сон ничего не значит. Сто снов — складываются в карту.",
    body: "Какие архетипы возвращаются, какие сюжеты повторяются, какие темы ты годами обходишь, а они всё равно приходят. Эта карта — твоя.",
  },
];

const Tool = () => (
  <section id="how" className="relative min-h-screen flex items-center fade-in" data-testid="section-how">
    <div className="container-ms w-full py-24 md:py-32">
      <div className="flex items-baseline justify-between mb-12 md:mb-16 flex-wrap gap-4">
        <div>
          <div className="text-[10px] md:text-[11px] tracking-[0.32em] uppercase mb-4" style={{ color: "var(--copper)" }}>
            — ii. instrumentum
          </div>
          <h2 className="font-serif text-[32px] sm:text-[44px] md:text-[56px] leading-[1.02]" data-testid="how-title">
            Что делает<br/>innerCore
          </h2>
        </div>
        <div className="text-[10px] md:text-[12px] tracking-[0.32em] uppercase font-serif italic" style={{ color: "var(--stone)" }}>
          mercurius · sulphur · sal
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-px" style={{ background: "var(--hairline)" }}>
        {TOOL_CARDS.map((c, i) => (
          <div key={i} className="card-ms" data-testid={`how-card-${i}`} style={{ borderRadius: 0, borderWidth: 0 }}>
            <div className="flex items-center justify-between mb-6 md:mb-8">
              <span className="glyph">{c.glyph}</span>
              <span className="text-[10px] tracking-[0.32em] uppercase" style={{ color: "var(--stone)" }}>
                {String(i + 1).padStart(2, "0")} · {c.label}
              </span>
            </div>
            <h3 className="font-serif text-[26px] md:text-[30px] mb-4">{c.title}</h3>
            <p className="text-[15px] md:text-[16px] mb-4 font-serif italic" style={{ color: "var(--cream)" }}>{c.intro}</p>
            <p className="text-[14px] md:text-[15px]" style={{ color: "var(--cream-dim)" }}>{c.body}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const MapAndPrivacy = () => (
  <section id="map" className="relative overflow-hidden min-h-screen fade-in" data-testid="section-map">
    <div className="absolute inset-0 pointer-events-none" data-testid="fractal-bg-map">
      <FractalDots variant="cinnabar" density={56} opacity={0.7} />
    </div>
    <div className="container-ms relative w-full py-24 md:py-32 z-[2]">
      <div className="grid md:grid-cols-12 gap-10 md:gap-12 items-start">
        <div className="md:col-span-5">
          <div className="text-[10px] md:text-[11px] tracking-[0.32em] uppercase mb-5" style={{ color: "var(--copper)" }}>
            — iii. mappa somniorum
          </div>
          <h2 className="font-serif text-[32px] sm:text-[44px] md:text-[52px] leading-[1.04] mb-6">
            Карта
          </h2>
          <p className="text-[15px] md:text-[17px] mb-4" style={{ color: "var(--cream-dim)" }}>
            Каждый сон превращается в точку. Похожие сны притягиваются — образуют кластеры. Кластеры собираются в созвездия архетипов. Чем дольше пишешь — тем точнее карта.
          </p>
          <p className="text-[14px] md:text-[15px] italic font-serif" style={{ color: "var(--stone)" }}>
            Это работает математически: каждый сон превращается в вектор смыслов. Близкие смыслы — близкие точки в пространстве. Юнгианская модель ложится на векторную базу данных как ключ в замок.
          </p>
        </div>
        <div className="md:col-span-7" data-testid="dream-map-demo">
          <DreamMap />
        </div>
      </div>

      <div className="mt-20 md:mt-28 grid md:grid-cols-12 gap-8 md:gap-12 items-start max-w-[1100px]" data-testid="block-privacy">
        <div className="md:col-span-3 flex md:justify-end">
          <div style={{ color: "var(--copper)" }}>
            <KeyGlyph size={60} />
          </div>
        </div>
        <div className="md:col-span-9">
          <div className="text-[10px] md:text-[11px] tracking-[0.32em] uppercase mb-4" style={{ color: "var(--copper)" }}>
            — iv. sigillum
          </div>
          <h3 className="font-serif text-[28px] sm:text-[36px] md:text-[42px] leading-[1.08] mb-6">
            Сны — самое личное,<br className="hidden md:inline" /> что может быть.
          </h3>
          <p className="text-[15px] md:text-[17px] mb-4 max-w-[640px]" style={{ color: "var(--cream-dim)" }}>
            innerCore шифрует содержимое снов на твоём устройстве до того, как они уйдут на сервер. На сервере хранится только шифротекст. Ни Google, ни сотрудники innerCore, ни хостинг, ни кто-либо ещё не может прочитать, что тебе снилось.
          </p>
          <p className="text-[14px] md:text-[15px] italic font-serif max-w-[620px]" style={{ color: "var(--stone)" }}>
            Ключ от твоего архива есть только у тебя. Это не маркетинг — это архитектура.
          </p>
        </div>
      </div>
    </div>
  </section>
);

const ReadingArticle = ({ kicker, title, children }) => (
  <article className="mb-16 md:mb-20 max-w-[720px]" data-testid={`reading-article`}>
    <div className="text-[10px] md:text-[11px] tracking-[0.32em] uppercase mb-3" style={{ color: "var(--copper)" }}>
      {kicker}
    </div>
    <h3 className="font-serif text-[24px] sm:text-[30px] md:text-[34px] leading-[1.18] mb-5 md:mb-6" style={{ color: "var(--cream)" }}>
      {title}
    </h3>
    <div className="space-y-4 text-[15px] md:text-[16px] leading-[1.75]" style={{ color: "var(--cream-dim)" }}>
      {children}
    </div>
  </article>
);

const Reading = () => (
  <section id="reading" className="relative min-h-screen fade-in" data-testid="section-reading">
    <div className="container-ms w-full py-24 md:py-32">
      <div className="mb-14 md:mb-20 max-w-[820px]">
        <div className="text-[10px] md:text-[11px] tracking-[0.32em] uppercase mb-6" style={{ color: "var(--copper)" }}>
          — v. lectio
        </div>
        <h2 className="font-serif text-[32px] sm:text-[44px] md:text-[56px] leading-[1.04] tracking-[-0.01em]">
          О методе
        </h2>
        <p className="mt-5 text-[15px] md:text-[16px] italic font-serif max-w-[620px]" style={{ color: "var(--stone)" }}>
          Несколько коротких текстов о том, что стоит за приложением. Юнг, архетипы, практика дневника снов.
        </p>
      </div>

      <ReadingArticle kicker="— чтение I" title="Зачем вести дневник снов">
        <p>
          Юнгианский подход к снам отличается от популярных сонников и таблиц «что значит, если приснилась вода». В аналитической психологии Карла Густава Юнга сны рассматриваются как прямые сообщения от бессознательного — той части психики, которую дневное сознание не контролирует и редко слышит.
        </p>
        <p>
          Каждый сон — индивидуальное послание конкретному человеку. У одного человека вода может быть символом перемен, у другого — забытым страхом из детства, у третьего — образом матери. Универсальных толкований нет. Есть устойчивые структуры — архетипы — которые проявляются у каждого человека по-своему.
        </p>
        <p>
          Дневник снов — это первый и обязательный инструмент любой серьёзной работы со сновидениями.
        </p>
      </ReadingArticle>

      <ReadingArticle kicker="— чтение II" title="Что такое архетипы Юнга">
        <p>
          Архетипы — это базовые структуры психики, общие для всех людей. Юнг выделил их в результате анализа тысяч снов своих пациентов и сопоставления с мифами разных культур, религиозными традициями, герметическими текстами, фольклором.
        </p>
        <p>
          Главные архетипы: <span className="font-serif italic" style={{ color: "var(--cream)" }}>Тень</span> — то, что человек в себе не признаёт и отрицает; <span className="font-serif italic" style={{ color: "var(--cream)" }}>Анима</span> и <span className="font-serif italic" style={{ color: "var(--cream)" }}>Анимус</span> — внутренние образы противоположного пола, влияющие на выбор партнёра; <span className="font-serif italic" style={{ color: "var(--cream)" }}>Самость</span> — центр психики, к которому направлено развитие личности; <span className="font-serif italic" style={{ color: "var(--cream)" }}>Персона</span> — социальная маска, роль для внешнего мира; <span className="font-serif italic" style={{ color: "var(--cream)" }}>Старый Мудрец</span>, <span className="font-serif italic" style={{ color: "var(--cream)" }}>Великая Мать</span>, <span className="font-serif italic" style={{ color: "var(--cream)" }}>Дитя</span>, <span className="font-serif italic" style={{ color: "var(--cream)" }}>Трикстер</span>.
        </p>
        <p>
          Эти фигуры появляются в снах не случайно — они отражают активную работу психики, обращённую к самому сновидцу. Юнг описал архетипы в работах «Архетипы и коллективное бессознательное», «Психология и алхимия», «Человек и его символы».
        </p>
      </ReadingArticle>

      <ReadingArticle kicker="— чтение III" title="Как работа со снами влияет на жизнь">
        <p>
          Юнгианский анализ — это не предсказание будущего и не объяснение прошлого. Это процесс индивидуации — становления собой, постепенного интегрирования отщеплённых частей психики.
        </p>
        <p>
          Через регулярную работу со снами человек начинает видеть свои повторяющиеся паттерны: какие фигуры возвращаются в сюжетах, какие конфликты живут внутри, какие части психики проецируются на других людей и создают конфликты в отношениях, какие темы игнорируются и поэтому проявляются через симптомы тела или болезни.
        </p>
        <p>
          Это медленная, но фундаментальная работа. Юнгианские терапевты работают с пациентами годами. Современные цифровые инструменты — приложения для дневников снов, разборы, карты сновидений — не заменяют терапию, но делают её первый шаг доступным каждому, кто готов слушать себя.
        </p>
      </ReadingArticle>

      <ReadingArticle kicker="— чтение IV" title="Дневник снов как ежедневная практика">
        <p>
          Самое сложное в работе со снами — их запомнить. Сон забывается в первые минуты после пробуждения, и без записи материал теряется. Регулярный дневник сновидений — единственный способ сохранить материал для анализа.
        </p>
        <p>
          innerCore делает запись простой: голосом сразу после пробуждения, текстом — когда удобнее. Из накопленных снов складывается индивидуальная карта повторяющихся образов и архетипов.
        </p>
        <p>
          Со временем становится видно: ты обходишь стороной одну и ту же тему годами, а она всё равно приходит к тебе во сне. Это и есть точка, в которой начинается настоящая работа над собой.
        </p>
      </ReadingArticle>
    </div>
  </section>
);

const FAQ_ITEMS = [
  {
    q: "Это работает с моделью. Это не подмена психотерапевта?",
    a: (
      <>
        <p>Нет. Разбор от модели — не психотерапия. Терапевт работает с человеком в комнате, видит реакции, держит контейнер для эмоций.</p>
        <p>innerCore — инструмент для записи и первичного разбора. Если возникают трудные темы — иди к специалисту. innerCore хорошо работает рядом с терапией: между сессиями есть, что приносить.</p>
      </>
    ),
  },
  {
    q: "Я не разбираюсь в Юнге. Это для меня?",
    a: (
      <>
        <p>Да. Знать теорию заранее не нужно. Каждый встреченный архетип объясняется простыми словами в контексте конкретного сна.</p>
        <p>Юнгианский язык приходит сам через практику. Через месяц записей ты уже начнёшь узнавать свою Тень в лицо.</p>
      </>
    ),
  },
  {
    q: "А если я не вижу снов или не помню их?",
    a: (
      <>
        <p>Сны видят все люди — каждую ночь по 4–6 эпизодов. Не запоминается — другое. Это тренируется.</p>
        <p><span className="font-serif italic" style={{ color: "var(--cream)" }}>Первое:</span> будильник на тихий звук, чтобы не выбрасывать себя из сна. <span className="font-serif italic" style={{ color: "var(--cream)" }}>Второе:</span> лежать неподвижно 30 секунд после пробуждения, восстанавливая сюжет. <span className="font-serif italic" style={{ color: "var(--cream)" }}>Третье:</span> записать сразу, даже три предложения. Через неделю-две сны начнут возвращаться.</p>
      </>
    ),
  },
  {
    q: "Сколько нужно снов, чтобы появилась карта?",
    a: (
      <>
        <p>Десять снов — уже видна структура. Пятьдесят — отчётливые кластеры. Сто и больше — устойчивые архетипы и темы.</p>
        <p>Это не быстрый продукт. Это медленная практика. И именно медленность здесь — преимущество.</p>
      </>
    ),
  },
  {
    q: "Как именно с приватностью?",
    a: (
      <p>Содержимое снов шифруется на твоём устройстве до отправки. На сервере — только шифротекст. Ключ хранится у тебя. Ни сотрудники innerCore, ни хостинг-провайдер, ни внешние сервисы не имеют доступа к плейнтексту твоих снов.</p>
    ),
  },
  {
    q: "Можно работать без интернета?",
    a: (
      <p>Запись — да, в офлайн-режиме. Анализ требует подключения, потому что разбор идёт через языковую модель. Карта обновляется при следующем выходе в сеть.</p>
    ),
  },
];

const FAQItem = ({ q, a, i }) => (
  <details className="faq-item border-b hairline py-6 md:py-7" data-testid={`faq-item-${i}`}>
    <summary className="flex items-start justify-between gap-6 cursor-pointer group">
      <h3 className="font-serif text-[19px] sm:text-[22px] md:text-[26px] leading-[1.25]" style={{ color: "var(--cream)" }}>
        {q}
      </h3>
      <span className="shrink-0 mt-1" style={{ color: "var(--copper)" }} aria-hidden="true">
        <Plus size={22} className="faq-plus transition-transform duration-300" />
      </span>
    </summary>
    <div className="mt-5 max-w-[640px] space-y-3 md:space-y-4 text-[15px] md:text-[16px] leading-[1.75]" style={{ color: "var(--cream-dim)" }}>
      {a}
    </div>
  </details>
);

const FAQSection = () => (
  <section id="faq" className="relative min-h-screen fade-in" data-testid="section-faq">
    <div className="container-ms w-full py-24 md:py-32">
      <div className="mb-12 md:mb-16 max-w-[820px]">
        <div className="text-[10px] md:text-[11px] tracking-[0.32em] uppercase mb-6" style={{ color: "var(--copper)" }}>
          — vi. quaestiones
        </div>
        <h2 className="font-serif text-[32px] sm:text-[44px] md:text-[56px] leading-[1.04] tracking-[-0.01em]">
          Частые вопросы
        </h2>
      </div>
      <div className="max-w-[860px] border-t hairline">
        {FAQ_ITEMS.map((it, i) => (
          <FAQItem key={i} i={i} q={it.q} a={it.a} />
        ))}
      </div>
    </div>
  </section>
);

const FinalCTA = () => (
  <section id="final" className="relative overflow-hidden min-h-screen flex items-center fade-in" data-testid="section-final-cta">
    <div className="absolute inset-0 pointer-events-none" data-testid="fractal-trees-bg">
      <FractalTrees />
    </div>
    <div className="container-ms relative w-full py-24 md:py-32 text-center z-[2]">
      <div className="flex justify-center mb-8 md:mb-10" style={{ color: "var(--copper)" }}>
        <SigilQuadrature size={44} />
      </div>
      <h2 className="font-serif text-[34px] sm:text-[48px] md:text-[60px] leading-[1.02] max-w-[760px] mx-auto mb-8 md:mb-10">
        Сегодня ночью<br/>что-то приснится.
      </h2>
      <a href={APP_URL} className="btn-copper" data-testid="final-cta-open-app">
        Открыть приложение
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
          <path d="M2 7 H12 M8 3 L12 7 L8 11" stroke="currentColor" strokeWidth="1.2" />
        </svg>
      </a>
      <div className="mt-6 md:mt-7 text-[12px] md:text-[13px] px-4" style={{ color: "var(--stone)" }}>
        Канал автора{" "}
        <a href={TG_URL} target="_blank" rel="noreferrer" style={{ color: "var(--cream-dim)" }} className="hover:underline" data-testid="final-tg-link">
          @CyberCore
        </a>{" "}
        — про снотолкование, AI и киберпанк.
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="relative border-t hairline" data-testid="site-footer">
    <div className="container-ms py-10 flex flex-col md:flex-row gap-6 md:items-center md:justify-between">
      <div className="text-[11px] md:text-[12px] tracking-[0.18em] uppercase" style={{ color: "var(--stone)" }}>
        © 2026 · innerCore
      </div>
      <div className="flex items-center gap-5 md:gap-7 text-[12px] md:text-[13px] flex-wrap" style={{ color: "var(--stone)" }}>
        <a href="mailto:hi@innercore.art" className="hover:text-[color:var(--cream)]" style={{ color: "inherit", textDecoration: "none" }} data-testid="footer-contact">
          контакт
        </a>
        <a href="#map" className="hover:text-[color:var(--cream)]" style={{ color: "inherit", textDecoration: "none" }} data-testid="footer-privacy">
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
      <main>
        <Hero />
        <Manifesto />
        <Tool />
        <MapAndPrivacy />
        <Reading />
        <FAQSection />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}

export default App;
