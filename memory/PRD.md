# innerCore — Landing Page PRD

## Original problem statement
Single-page landing для innerCore — приложения для записи снов и юнгианского анализа.
Эстетика "тихой алхимической лаборатории". Тёмная тема. Кириллица. Чистая статика (yarn build).

## User personas
- Думающий пользователь, ищущий инструмент саморефлексии (не оккультный сувенир)
- Аудитория канала @CyberCore — снотолкование + AI + киберпанк

## Core requirements (static)
- React + Tailwind, no backend
- Палитра: ink #0F1118, cream #E8E1D4, copper #B87333, cinnabar #8B0000, stone #8B8578
- Fonts: EB Garamond (headings) + Manrope (body), оба с кириллицей
- Тёмная тема — основная и единственная
- Адаптив desktop/tablet/mobile
- Lighthouse 90+, чистая статика на выходе
- Без AI в копии, без эмодзи (кроме алхимических Unicode), без cookies/newsletter popups, без GA

## What's been implemented (2026-12)
- Hero: заголовок «Карта твоих снов», подзаголовок, CTA → https://app.innercore.art, оуроборос-печать, анимированная SVG-сфера (~64 точек, медленное вращение + counter-rotation, twinkle, constellation lines)
- Section "Что это" — три предложения, drop-cap опционально
- Section "Триада метода" — 3 карточки с алхимическими символами ☿ 🜍 🜔 (Mercurius / Sulphur / Sal)
- Section "Карта снов" — демо-SVG карты снов: 6 кластеров с подписями на латыни/русском, halo glows, faint connection lines, HUD-оверлей
- Section "Sigillum" — ключ-иконка + encryption copy
- Collapsible "Для тех, кто глубже" — 4 параграфа + ссылка на https://t.me/post_cybercore
- Final CTA — повтор кнопки + tg-link
- Footer — © · контакт · privacy · telegram + footer seal
- Микро-взаимодействия: fade-in on scroll (IntersectionObserver), hover-эффекты CTA, twinkle dream points, prefers-reduced-motion поддержка
- Production build: 66 KB JS + 10 KB CSS (gzip)

## File map
- `/app/frontend/src/App.js` — все секции
- `/app/frontend/src/components/Sphere.jsx` — hero-сфера
- `/app/frontend/src/components/DreamMap.jsx` — демо-карта
- `/app/frontend/src/components/Sigils.jsx` — alchemical sigils SVG
- `/app/frontend/src/index.css` — токены дизайна, анимации
- `/app/frontend/public/index.html` — fonts, meta

## Testing
Iteration 1 (testing_agent_v3): 100% pass, no issues, all 18 acceptance criteria verified.

## Backlog (P1)
- Plausible analytics opt-in блок
- Микро-секция "примеры разбора сна" (до/после)
- Pricing-блок (если будет монетизация)
- Open Graph картинка
- Sitemap.xml + robots.txt для SEO

## Backlog (P2)
- Тонкая light-тема как переключатель
- Localization (EN)
- Кейсы пользователей / testimonial-блок
