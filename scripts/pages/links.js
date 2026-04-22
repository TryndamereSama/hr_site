// MC1 HUB — Links Úteis Page Renderer

import { links, linksCategories } from '../data/links.js';
import { createCard } from '../../components/card.js';
import { t } from '../i18n.js';

export function renderLinks(container) {
  let activeCategory = 'Todos';

  container.innerHTML = `
    <section class="section-sm" style="background: var(--color-surface-container-low);">
      <div class="container">
        <nav class="breadcrumb" aria-label="Caminho">
          <a href="#/">${t('common.home')}</a>
          <svg width="14" height="14"><use href="#icon-chevron-right"/></svg>
          <span>${t('links.breadcrumb')}</span>
        </nav>
        <div class="page-header" style="padding-top:var(--space-6)">
          <span class="label-md" style="color:var(--color-primary)">${t('links.label')}</span>
          <h1>${t('links.title')}</h1>
          <p>${t('links.subtitle')}</p>
        </div>
        <div class="flex flex-wrap gap-3" id="links-filters" role="group" aria-label="Filtros">
          ${linksCategories.map(cat => `
            <button class="chip chip-filter ${cat === 'Todos' ? 'active' : ''}" data-filter="${cat}">${cat}</button>
          `).join('')}
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div id="links-grid" class="grid grid-4"></div>
      </div>
    </section>
  `;

  const grid = container.querySelector('#links-grid');
  const filterBtns = container.querySelectorAll('.chip-filter');

  function renderLinkCards(filter) {
    grid.innerHTML = '';
    const filtered = filter === 'Todos' ? links : links.filter(l => l.category === filter);

    if (!filtered.length) {
      grid.innerHTML = `<div class="empty-state" style="grid-column:1/-1"><svg width="40" height="40"><use href="#icon-link"/></svg><p class="title-md text-muted">${t('links.empty')}</p></div>`;
      return;
    }

    filtered.forEach((l, i) => {
      const card = createCard({
        type: 'link',
        name: l.name,
        description: l.description,
        category: l.category,
        href: l.url,
        isExternal: l.isExternal,
        gradient: l.gradient,
        logo: l.logo || null,
        revealDelay: i * 60,
      });
      grid.appendChild(card);
    });

    if (window._revealObserver) {
      grid.querySelectorAll('[data-reveal]').forEach(el => window._revealObserver.observe(el));
    }
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      activeCategory = btn.dataset.filter;
      filterBtns.forEach(b => b.classList.toggle('active', b === btn));
      renderLinkCards(activeCategory);
    });
  });

  renderLinkCards('Todos');
}
