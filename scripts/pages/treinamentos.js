// MC1 HUB — Treinamentos Page Renderer

import { treinamentos, getTreinamentosEmAndamento, treinamentosCategories } from '../data/treinamentos.js';
import { createCard } from '../../components/card.js';
import { t } from '../i18n.js';

export function renderTreinamentos(container) {
  let activeCategory = 'Todos';
  const emAndamento = getTreinamentosEmAndamento();

  container.innerHTML = `
    <section class="section-sm" style="background: var(--color-surface-container-low);">
      <div class="container">
        <nav class="breadcrumb" aria-label="Caminho">
          <a href="#/">${t('common.home')}</a>
          <svg width="14" height="14"><use href="#icon-chevron-right"/></svg>
          <span>${t('training.breadcrumb')}</span>
        </nav>
        <div class="page-header" style="padding-top:var(--space-6)">
          <span class="label-md" style="color:var(--color-primary)">${t('training.label')}</span>
          <h1>${t('training.title')}</h1>
          <p>${t('training.subtitle')}</p>
        </div>
        <div class="flex flex-wrap gap-3" id="training-filters" role="group" aria-label="Filtros">
          ${treinamentosCategories.map(cat => `
            <button class="chip chip-filter ${cat === 'Todos' ? 'active' : ''}" data-filter="${cat}">${cat}</button>
          `).join('')}
        </div>
      </div>
    </section>

    <!-- Em Andamento -->
    ${emAndamento.length ? `
    <section class="section-sm" aria-labelledby="progress-heading">
      <div class="container">
        <h2 class="headline-md" id="progress-heading" style="margin-bottom:var(--space-6)">
          <svg width="20" height="20" style="display:inline; margin-right:8px; color:var(--color-primary); vertical-align:-3px"><use href="#icon-play"/></svg>
          ${t('training.in_progress')}
        </h2>
        <div style="display:flex; flex-direction:column; gap:var(--space-4)" id="progress-list">
          ${emAndamento.map(tr => `
            <div class="card card-flat" style="padding:var(--space-4);" data-reveal>
              <div style="display:flex; align-items:center; gap:var(--space-4)">
                <div style="width:48px;height:48px;border-radius:var(--radius-lg);background:${tr.gradient};flex-shrink:0;display:flex;align-items:center;justify-content:center;">
                  <svg width="22" height="22" style="color:white"><use href="#icon-play"/></svg>
                </div>
                <div style="flex:1; min-width:0">
                  <p style="font-weight:600; font-size:var(--text-sm); margin-bottom:6px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis">${tr.title}</p>
                  <div style="display:flex; align-items:center; gap:var(--space-3)">
                    <div class="progress-bar" style="flex:1">
                      <div class="progress-bar-fill" data-width="${tr.progress}"></div>
                    </div>
                    <span class="label-lg text-muted">${tr.progress}%</span>
                  </div>
                </div>
                <button class="btn btn-primary btn-sm" style="flex-shrink:0">${t('training.continue')}</button>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </section>
    ` : ''}

    <!-- All Courses -->
    <section class="section">
      <div class="container">
        <div id="training-grid" class="grid grid-3"></div>
      </div>
    </section>
  `;

  const grid = container.querySelector('#training-grid');
  const filterBtns = container.querySelectorAll('.chip-filter');

  function renderCourses(filter) {
    grid.innerHTML = '';
    const filtered = filter === 'Todos' ? treinamentos : treinamentos.filter(tr => tr.category === filter);

    if (!filtered.length) {
      grid.innerHTML = `<div class="empty-state" style="grid-column:1/-1"><svg width="40" height="40"><use href="#icon-book"/></svg><p class="title-md text-muted">${t('training.empty')}</p></div>`;
      return;
    }

    filtered.forEach((tr, i) => {
      const card = createCard({
        type: 'course',
        title: tr.title,
        instructor: tr.instructor,
        category: tr.category,
        durationLabel: tr.durationLabel,
        level: tr.level,
        progress: tr.progress,
        gradient: tr.gradient,
        revealDelay: i * 80,
      });
      grid.appendChild(card);
    });

    if (window._revealObserver) {
      grid.querySelectorAll('[data-reveal]').forEach(el => window._revealObserver.observe(el));
    }

    // Animate progress bars
    import('../../scripts/animations.js').then(({ animateProgressBars }) => animateProgressBars());
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      activeCategory = btn.dataset.filter;
      filterBtns.forEach(b => b.classList.toggle('active', b === btn));
      renderCourses(activeCategory);
    });
  });

  renderCourses('Todos');

  // Animate progress bars after initial render
  import('../../scripts/animations.js').then(({ animateProgressBars }) => animateProgressBars());
}
