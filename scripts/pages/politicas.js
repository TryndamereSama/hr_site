// MC1 HUB — Políticas & Documentos Page Renderer

import { manuais, manuaisCategories } from '../data/manuais.js';
import { createCard } from '../../components/card.js';
import { openModal } from '../../components/modal.js';
import { t } from '../i18n.js';

export function renderPoliticas(container) {
  let activeCategory = 'Todos';
  let searchQuery = '';

  container.innerHTML = `
    <section class="section-sm" style="background: var(--color-surface-container-low);">
      <div class="container">
        <nav class="breadcrumb" aria-label="Caminho">
          <a href="#/">${t('common.home')}</a>
          <svg width="14" height="14"><use href="#icon-chevron-right"/></svg>
          <span>${t('docs.breadcrumb')}</span>
        </nav>
        <div class="page-header" style="padding-top:var(--space-6)">
          <span class="label-md" style="color:var(--color-primary)">${t('docs.label')}</span>
          <h1>${t('docs.title')}</h1>
          <p>${t('docs.subtitle')}</p>
        </div>
        <!-- Search & Filter Row -->
        <div style="display:flex; align-items:center; gap:var(--space-4); flex-wrap:wrap; margin-bottom:var(--space-6)">
          <div style="position:relative; flex:1; min-width:220px;">
            <svg width="16" height="16" style="position:absolute; left:12px; top:50%; transform:translateY(-50%); color:var(--color-on-surface-muted)"><use href="#icon-search"/></svg>
            <input
              type="search"
              id="docs-search"
              class="form-input"
              placeholder="${t('docs.search_placeholder')}"
              style="padding-left:40px; background:var(--color-surface-lowest)"
              aria-label="${t('docs.search_placeholder')}"
            />
          </div>
        </div>
        <div class="flex flex-wrap gap-3" id="docs-filters" role="group" aria-label="Filtro por categoria">
          ${manuaisCategories.map(cat => `
            <button class="chip chip-filter ${cat === 'Todos' ? 'active' : ''}" data-filter="${cat}">${cat}</button>
          `).join('')}
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <p class="label-lg text-muted mb-6" id="docs-count">${manuais.length} ${t('docs.documents')}</p>
        <div id="docs-list" style="display:flex; flex-direction:column; gap:var(--space-3)"></div>
      </div>
    </section>
  `;

  const list = container.querySelector('#docs-list');
  const countEl = container.querySelector('#docs-count');
  const filterBtns = container.querySelectorAll('.chip-filter');
  const searchInput = container.querySelector('#docs-search');

  function renderDocs() {
    list.innerHTML = '';
    const q = searchQuery.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    const filtered = manuais.filter(m => {
      const matchCat = activeCategory === 'Todos' || m.category === activeCategory;
      const matchSearch = !q || (m.name + m.category + (m.tags || []).join(' ')).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').includes(q);
      return matchCat && matchSearch;
    });

    countEl.textContent = `${filtered.length} ${t('docs.documents')}`;

    if (!filtered.length) {
      list.innerHTML = `<div class="empty-state"><svg width="40" height="40"><use href="#icon-document"/></svg><p class="title-md text-muted">${t('docs.empty')}</p></div>`;
      return;
    }

    filtered.forEach((m, i) => {
      const card = createCard({
        type: 'document',
        name: m.name,
        category: m.category,
        lastUpdatedLabel: m.lastUpdatedLabel,
        fileType: m.fileType,
        fileSize: m.fileSize,
        gradient: m.gradient,
        revealDelay: i * 50,
        onClick: () => openDocModal(m),
      });
      list.appendChild(card);
    });

    if (window._revealObserver) {
      list.querySelectorAll('[data-reveal]').forEach(el => window._revealObserver.observe(el));
    }
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      activeCategory = btn.dataset.filter;
      filterBtns.forEach(b => b.classList.toggle('active', b === btn));
      renderDocs();
    });
  });

  searchInput?.addEventListener('input', () => {
    searchQuery = searchInput.value;
    renderDocs();
  });

  renderDocs();
}

function openDocModal(m) {
  openModal({
    title: m.name,
    body: `
      <div style="display:flex; align-items:center; gap:var(--space-4); padding:var(--space-5); background:var(--color-surface-container-low); border-radius:var(--radius-xl); margin-bottom:var(--space-6)">
        <div class="icon-wrap icon-wrap-xl" style="background:${m.gradient}; color:white; flex-shrink:0">
          <svg width="28" height="28"><use href="#icon-document"/></svg>
        </div>
        <div style="display:flex; flex-wrap:wrap; gap:var(--space-2)">
          <span class="chip chip-primary">${m.category}</span>
          <span class="chip chip-surface">v${m.version}</span>
          <span class="chip chip-surface">${m.fileType} · ${m.fileSize}</span>
          <span class="chip chip-surface">${t('docs.updated')} ${m.lastUpdatedLabel}</span>
        </div>
      </div>
      <p class="body-lg text-muted" style="margin-bottom:var(--space-5)">${m.description}</p>
      <div class="article-content">${m.details}</div>
    `,
    footer: `
      <button class="btn btn-primary" onclick="alert('${t('common.download_soon')}')">
        <svg width="14" height="14"><use href="#icon-download"/></svg>${t('common.download')}
      </button>
    `,
  });
}
