// MC1 HUB — Notícias Page Renderer

import { getLocalizedNoticias, getLocalizedNoticia } from '../data/noticias.js';
import { createCard } from '../../components/card.js';
import { t } from '../i18n.js';
import { getCountry } from '../i18n.js';

// ─── All News Page ───
export async function renderNoticias(container) {
  const allLabel = t('news.filter_all');
  const noticias = await getLocalizedNoticias();
  const categories = [allLabel, ...new Set(noticias.map(n => n.tagLabel))];
  let activeFilter = allLabel;

  container.innerHTML = `
    <section class="section-sm" style="background: var(--color-surface-container-low);">
      <div class="container">
        <nav class="breadcrumb" aria-label="Caminho de navegação">
          <a href="#/">${t('common.home')}</a>
          <svg width="14" height="14"><use href="#icon-chevron-right"/></svg>
          <span>${t('news.breadcrumb')}</span>
        </nav>
        <div class="page-header" style="padding-top:var(--space-6)">
          <span class="label-md" style="color:var(--color-primary)">${t('news.label')}</span>
          <h1>${t('news.title')}</h1>
          <p>${t('news.subtitle')}</p>
        </div>
        <!-- Filter -->
        <div class="flex flex-wrap gap-3 mb-8" id="noticias-filters" role="group" aria-label="Filtros de categoria">
          ${categories.map(cat => `
            <button class="chip chip-filter ${cat === allLabel ? 'active' : ''}" data-filter="${cat}" aria-pressed="${cat === allLabel}">${cat}</button>
          `).join('')}
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div id="noticias-grid" class="grid grid-3"></div>
      </div>
    </section>
  `;

  const grid = container.querySelector('#noticias-grid');
  const filterBtns = container.querySelectorAll('.chip-filter');

  function renderCards(filter) {
    grid.innerHTML = '';
    const filtered = filter === allLabel ? noticias : noticias.filter(n => n.tagLabel === filter);

    if (filtered.length === 0) {
      const msg = noticias.length === 0 ? t('country.no_news') : t('news.empty');
      grid.innerHTML = `
        <div class="empty-state" style="grid-column:1/-1">
          <svg width="48" height="48"><use href="#icon-newspaper"/></svg>
          <p class="title-md text-muted">${msg}</p>
        </div>`;
      return;
    }

    filtered.forEach((n, i) => {
      const card = createCard({
        type: 'news',
        title: n.title,
        excerpt: n.excerpt,
        tagLabel: n.tagLabel,
        dateLabel: n.dateLabel,
        gradient: n.gradient,
        image: n.image,
        href: `#/noticia/${n.id}`,
        revealDelay: i * 80,
      });
      grid.appendChild(card);
    });

    // Re-observe reveal elements
    if (window._revealObserver) {
      grid.querySelectorAll('[data-reveal]').forEach(el => window._revealObserver.observe(el));
    }
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      activeFilter = btn.dataset.filter;
      filterBtns.forEach(b => {
        b.classList.toggle('active', b === btn);
        b.setAttribute('aria-pressed', b === btn ? 'true' : 'false');
      });
      renderCards(activeFilter);
    });
  });

  renderCards(allLabel);
}

// ─── Single Article Page ───
export async function renderNoticia(container, { id }) {
  const noticia = await getLocalizedNoticia(id);

  if (!noticia) {
    container.innerHTML = `
      <div class="section container text-center">
        <p class="text-muted">${t('news.not_found')}</p>
        <a href="#/noticias" class="btn btn-primary mt-6">${t('news.not_found_back')}</a>
      </div>`;
    return;
  }

  const others = (await getLocalizedNoticias()).filter(n => n.id !== id).slice(0, 3);

  container.innerHTML = `
    <!-- Article Hero -->
    <div class="article-hero" style="background: ${noticia.gradient}; position:relative; overflow:hidden;">
      ${noticia.image ? `
        <img src="${noticia.image}" alt="" loading="eager"
          style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:center;" />
        <div style="position:absolute;inset:0;background:linear-gradient(160deg,rgba(5,15,30,0.88) 0%,rgba(10,25,45,0.80) 100%);"></div>
      ` : ''}
      <div class="container" style="position:relative;z-index:1;padding-top:var(--space-20); padding-bottom:var(--space-16)">
        <nav class="breadcrumb" aria-label="Caminho" style="color:rgba(255,255,255,0.7)">
          <a href="#/" style="color:rgba(255,255,255,0.7)">${t('common.home')}</a>
          <svg width="14" height="14"><use href="#icon-chevron-right"/></svg>
          <a href="#/noticias" style="color:rgba(255,255,255,0.7)">${t('news.breadcrumb')}</a>
          <svg width="14" height="14"><use href="#icon-chevron-right"/></svg>
          <span style="color:white">${noticia.tagLabel}</span>
        </nav>
        <div style="max-width: 700px; margin-top: var(--space-8)" data-reveal>
          <span class="chip" style="background:rgba(255,255,255,0.2); color:white; margin-bottom:var(--space-4)">${noticia.tagLabel}</span>
          <h1 style="font-size:var(--text-display-sm); color:white; font-weight:800; letter-spacing:-0.025em; line-height:1.15; margin-bottom:var(--space-5)">${noticia.title}</h1>
          <div style="display:flex; align-items:center; gap:var(--space-4); color:rgba(255,255,255,0.75); font-size:var(--text-sm)">
            <span>${noticia.dateLabel}</span>
            <span>·</span>
            <span>${noticia.author}</span>
            <span>·</span>
            <span>${noticia.readTime} ${t('news.reading_time')}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Article Body -->
    <section class="section">
      <div class="container">
        <div class="article-layout">
          <article class="article-body" data-reveal>
            <p class="body-lg" style="font-size:1.125rem; color:var(--color-on-surface-variant); margin-bottom:var(--space-8);">${noticia.excerpt}</p>
            <div class="article-content">${noticia.body}</div>
            <div style="margin-top:var(--space-10); padding-top:var(--space-8); border-top: 1px solid var(--color-outline-subtle)">
              <a href="#/noticias" class="btn btn-ghost">
                ${t('news.back')}
              </a>
            </div>
          </article>
          <aside class="article-sidebar" data-reveal data-reveal-delay="150">
            <h3 class="title-md" style="margin-bottom:var(--space-6)">${t('news.other')}</h3>
            <div style="display:flex; flex-direction:column; gap:var(--space-4)">
              ${others.map(n => `
                <a href="#/noticia/${n.id}" class="sidebar-news-card">
                  <div style="width:56px;height:56px;border-radius:var(--radius-md);background:${n.gradient};flex-shrink:0;overflow:hidden;position:relative;">
                    ${n.image ? `<img src="${n.image}" alt="" loading="lazy" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;" onerror="this.style.display='none'" />` : ''}
                  </div>
                  <div>
                    <p style="font-size:var(--text-sm); font-weight:600; color:var(--color-on-surface); line-height:1.4; margin-bottom:4px">${n.title}</p>
                    <span class="label-md text-faint">${n.dateLabel}</span>
                  </div>
                </a>
              `).join('')}
            </div>
          </aside>
        </div>
      </div>
    </section>
  `;
}
