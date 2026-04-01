// MC1 HUB — Home Page Renderer

import { getLocalizedNoticiasRecentes } from '../data/noticias.js';
import { beneficios } from '../data/beneficios.js';
import { createCard } from '../../components/card.js';
import { t } from '../i18n.js';

export function renderHome(container) {
  const news = getLocalizedNoticiasRecentes(3);
  const latestNews = news[0];

  container.innerHTML = `
    <!-- ═══ HERO CAROUSEL ═══ -->
    <section class="hero-section" aria-label="Destaques">

      <!-- Slide 1: Boas-vindas -->
      <div class="hero-slide active" data-slide="0">
        <div class="hero-bg" aria-hidden="true">
          <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=80"
               alt="" class="hero-bg-img" loading="eager" />
          <div class="hero-bg-overlay"></div>
        </div>
        <div class="hero-content container">
          <div class="hero-text" data-reveal>
            <span class="chip chip-teal" style="margin-bottom: var(--space-5)">${t('home.chip')}</span>
            <h1 class="display-lg hero-headline">
              ${t('home.hero.title1')}<br><em class="hero-accent">${t('home.hero.title2')}</em>
            </h1>
            <p class="hero-sub">
              ${t('home.hero.sub')}
            </p>
            <div class="hero-actions" data-reveal data-reveal-delay="200">
              <a href="#/noticias" class="btn btn-primary btn-lg">
                ${t('home.hero.cta_news')}
                <svg width="18" height="18"><use href="#icon-arrow-right"/></svg>
              </a>
              <a href="#/rh" class="btn btn-ghost btn-lg">${t('home.hero.cta_benefits')}</a>
            </div>
          </div>
          <div class="hero-visual" data-reveal="right" data-reveal-delay="150" aria-hidden="true">
            <div class="hero-card-float hero-card-1">
              <div style="display:flex;align-items:center;gap:10px;margin-bottom:8px">
                <div style="width:32px;height:32px;border-radius:50%;background:linear-gradient(135deg,#004b71,#006494);display:flex;align-items:center;justify-content:center;color:white;font-size:11px;font-weight:700">MC1</div>
                <span style="font-size:13px;font-weight:600;color:white">${t('home.hero.greeting')}</span>
              </div>
              <div style="font-size:12px;color:rgba(255,255,255,0.7)">${t('home.hero.dayoff')}</div>
            </div>
            <div class="hero-card-float hero-card-2">
              <div style="font-size:11px;font-weight:500;color:#5ba8d4;margin-bottom:6px;letter-spacing:.04em;text-transform:uppercase">${t('home.hero.sindpd')}</div>
              <div style="font-size:13px;font-weight:600;color:white">${t('home.hero.sindpd_text')}</div>
            </div>
            <div class="hero-orb hero-orb-1" aria-hidden="true"></div>
            <div class="hero-orb hero-orb-2" aria-hidden="true"></div>
          </div>
        </div>
      </div>

      <!-- Slide 2: Última Notícia -->
      <div class="hero-slide" data-slide="1">
        <div class="hero-bg" aria-hidden="true">
          ${latestNews.image ? `<img src="${latestNews.image}" alt="" class="hero-bg-img" loading="eager" />` : ''}
          <div class="hero-bg-overlay hero-bg-overlay-news" style="${!latestNews.image ? `background: ${latestNews.gradient};` : ''}"></div>
        </div>
        <div class="hero-news-content container">
          <div class="hero-news-inner">
            <span class="chip chip-teal" style="margin-bottom:var(--space-4)">${t('home.hero.slide_news')}</span>
            <p class="label-md" style="color:rgba(255,255,255,0.55); margin-bottom:var(--space-3)">${latestNews.dateLabel} · ${latestNews.tagLabel}</p>
            <h2 class="display-lg hero-headline" style="max-width:20ch">${latestNews.title}</h2>
            <p class="hero-sub">${latestNews.excerpt}</p>
            <div class="hero-actions">
              <a href="#/noticia/${latestNews.id}" class="btn btn-primary btn-lg" style="text-decoration:none">
                ${t('home.hero.read_now')} <svg width="18" height="18"><use href="#icon-arrow-right"/></svg>
              </a>
              <a href="#/noticias" class="btn btn-ghost btn-lg" style="text-decoration:none">${t('home.hero.see_all')}</a>
            </div>
          </div>
        </div>
      </div>

      <!-- Navigation Dots -->
      <div class="hero-dots" role="tablist" aria-label="Navegação do banner">
        <button class="hero-dot active" data-slide="0" aria-label="${t('home.hero.slide1_label')}"></button>
        <button class="hero-dot" data-slide="1" aria-label="${t('home.hero.slide2_label')}"></button>
      </div>

    </section>

    <!-- ═══ QUICK ACCESS ═══ -->
    <section class="section-sm" style="background: var(--color-surface-container-low);" aria-label="Acesso rápido">
      <div class="container">
        <p class="label-md" style="color:var(--color-primary); margin-bottom:var(--space-5)">${t('home.quick.label')}</p>
        <div id="quick-links-grid" class="scroll-row quick-links-row"></div>
      </div>
    </section>

    <!-- ═══ FEATURED NEWS ═══ -->
    <section class="section" aria-labelledby="news-heading">
      <div class="container">
        <div class="flex-between section-heading">
          <div>
            <span class="label-md" style="color:var(--color-primary)">${t('home.news.label')}</span>
            <h2 class="headline-lg" id="news-heading">${t('home.news.title')}</h2>
          </div>
          <a href="#/noticias" class="btn btn-ghost hover-arrow">
            ${t('home.news.see_all')} <svg width="16" height="16"><use href="#icon-arrow-right"/></svg>
          </a>
        </div>
        <div id="home-news-grid" class="grid grid-3"></div>
      </div>
    </section>

    <!-- ═══ BENEFITS HIGHLIGHT ═══ -->
    <section class="section-sm" style="background: var(--color-surface-container-low);" aria-labelledby="benefits-heading">
      <div class="container">
        <div class="flex-between mb-8">
          <div>
            <span class="label-md" style="color:var(--color-primary)">${t('home.benefits.label')}</span>
            <h2 class="headline-lg" id="benefits-heading">${t('home.benefits.title')}</h2>
          </div>
          <a href="#/rh" class="btn btn-ghost hover-arrow">
            ${t('home.benefits.see_all')} <svg width="16" height="16"><use href="#icon-arrow-right"/></svg>
          </a>
        </div>
        <div id="home-benefits-row" class="scroll-row"></div>
      </div>
    </section>

    <!-- ═══ CALENDAR CALLOUT ═══ -->
    <section class="section">
      <div class="container">
        <div class="calendar-callout" data-reveal>
          <div class="calendar-callout-content">
            <div class="icon-wrap icon-wrap-xl icon-teal" style="margin-bottom: var(--space-5)">
              <svg width="32" height="32"><use href="#icon-calendar"/></svg>
            </div>
            <span class="label-md" style="color:var(--color-primary); margin-bottom:var(--space-3); display:block">${t('home.calendar.label')}</span>
            <h2 class="headline-lg" style="margin-bottom:var(--space-4)">${t('home.calendar.title')}</h2>
            <p class="body-lg text-muted" style="max-width:44ch; margin-bottom:var(--space-6)">
              ${t('home.calendar.desc')}
            </p>
            <a href="#/politicas" class="btn btn-primary">
              ${t('home.calendar.cta')}
              <svg width="16" height="16"><use href="#icon-arrow-right"/></svg>
            </a>
          </div>
          <div class="calendar-callout-visual" aria-hidden="true">
            <div class="calendar-mini">
              <div class="cal-header">
                <span>${t('home.calendar.month')}</span>
              </div>
              <div class="cal-grid">
                ${t('home.calendar.days').split(',').map(d => `<span class="cal-day-head">${d}</span>`).join('')}
                ${Array.from({length:35}, (_,i) => {
                  const day = i - 5;
                  if (day < 1 || day > 31) return `<span class="cal-day cal-day-empty"></span>`;
                  const isToday = day === 26;
                  const isHoliday = [15].includes(day);
                  return `<span class="cal-day ${isToday ? 'cal-day-today' : ''} ${isHoliday ? 'cal-day-holiday' : ''}">${day}</span>`;
                }).join('')}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;

  // ─── Quick Links ───
  const quickLinks = [
    { title: t('home.quick.news'),     icon: 'icon-newspaper', href: '#/noticias',     gradient: 'linear-gradient(135deg,#004b71,#006494)' },
    { title: t('home.quick.rh'),       icon: 'icon-users',     href: '#/rh',           gradient: 'linear-gradient(135deg,#283593,#3949ab)' },
    { title: t('home.quick.docs'),     icon: 'icon-document',  href: '#/politicas',    gradient: 'linear-gradient(135deg,#d97706,#f59e0b)' },
    // training hidden temporarily

    { title: t('home.quick.links'),    icon: 'icon-link',      href: '#/links',        gradient: 'linear-gradient(135deg,#00695c,#00897b)' },
    { title: t('home.quick.contact'),  icon: 'icon-mail',      href: '#/contato',      gradient: 'linear-gradient(135deg,#4a148c,#6a1b9a)' },
  ];

  const quickGrid = container.querySelector('#quick-links-grid');
  quickLinks.forEach((ql, i) => {
    const card = createCard({ type: 'quick-link', ...ql, revealDelay: i * 80 });
    quickGrid.appendChild(card);
  });

  // ─── News cards ───
  const newsGrid = container.querySelector('#home-news-grid');
  news.forEach((n, i) => {
    const card = createCard({
      type: 'news',
      title: n.title,
      excerpt: n.excerpt,
      tagLabel: n.tagLabel,
      dateLabel: n.dateLabel,
      gradient: n.gradient,
      image: n.image,
      href: `#/noticia/${n.id}`,
      revealDelay: i * 100,
    });
    newsGrid.appendChild(card);
  });

  // ─── Hero Carousel ───
  (function () {
    const slides = container.querySelectorAll('.hero-slide');
    const dots   = container.querySelectorAll('.hero-dot');
    let current  = 0;
    let timer;

    function goTo(n) {
      slides[current].classList.remove('active');
      dots[current].classList.remove('active');
      current = (n + slides.length) % slides.length;
      slides[current].classList.add('active');
      dots[current].classList.add('active');
    }

    function start() { timer = setInterval(() => goTo(current + 1), 6000); }

    dots.forEach(dot => dot.addEventListener('click', () => {
      clearInterval(timer);
      goTo(parseInt(dot.dataset.slide));
      start();
    }));

    start();
  })();

  // ─── Benefits scroll row ───
  const benefitsRow = container.querySelector('#home-benefits-row');
  beneficios.forEach((b, i) => {
    const miniCard = document.createElement('div');
    miniCard.className = 'benefit-mini-card';
    miniCard.setAttribute('data-reveal', '');
    miniCard.setAttribute('data-reveal-delay', String(i * 60));
    miniCard.style.cursor = 'pointer';
    miniCard.innerHTML = `
      <div class="icon-wrap icon-wrap-md" style="background: ${b.gradient}; color:white; margin-bottom: var(--space-3)">
        <svg width="22" height="22"><use href="#${b.icon}"/></svg>
      </div>
      <span style="font-size:var(--text-sm); font-weight:var(--weight-medium); color:var(--color-on-surface); text-align:center; line-height:1.3">${b.name}</span>
    `;
    miniCard.addEventListener('click', () => { window.location.hash = '#/rh'; });
    benefitsRow.appendChild(miniCard);
  });
}
