// MC1 HUB — Políticas de Viagens (Placeholder)

import { t } from '../i18n.js';

export function renderViagens(container) {
  container.innerHTML = `
    <section class="section-sm" style="background: var(--color-surface-container-low);">
      <div class="container">
        <nav class="breadcrumb" aria-label="Caminho de navegação">
          <a href="#/">${t('common.home')}</a>
          <svg width="14" height="14"><use href="#icon-chevron-right"/></svg>
          <a href="#/financeiro">${t('finance.breadcrumb')}</a>
          <svg width="14" height="14"><use href="#icon-chevron-right"/></svg>
          <span>${t('finance.viagens.breadcrumb')}</span>
        </nav>
        <div class="page-header" style="padding-top:var(--space-6)">
          <span class="label-md" style="color:var(--color-primary)">${t('common.department')} — ${t('finance.breadcrumb')}</span>
          <h1>${t('finance.viagens')}</h1>
          <p>${t('finance.viagens.sub')}</p>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div style="
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: var(--space-20) var(--space-8);
          background: var(--color-surface-lowest);
          border-radius: var(--radius-2xl);
          box-shadow: var(--shadow-sm);
          max-width: 560px;
          margin: 0 auto;
        " data-reveal>
          <div class="icon-wrap icon-wrap-xl" style="
            background: linear-gradient(135deg, #0284c7, #38bdf8);
            color: white;
            margin-bottom: var(--space-6);
          ">
            <svg width="36" height="36"><use href="#icon-link"/></svg>
          </div>
          <span class="chip chip-primary" style="margin-bottom: var(--space-4)">${t('common.coming_soon')}</span>
          <h2 class="headline-lg" style="margin-bottom: var(--space-4)">${t('common.page_building')}</h2>
          <p class="body-lg text-muted" style="max-width: 38ch; margin-bottom: var(--space-8)">
            ${t('finance.viagens.coming_soon_desc')}
          </p>
          <div style="display:flex; gap: var(--space-3); flex-wrap: wrap; justify-content: center;">
            <a href="#/financeiro" class="btn btn-outline">
              <svg width="16" height="16"><use href="#icon-chevron-right" style="transform:rotate(180deg);display:block"/></svg>
              ${t('finance.breadcrumb')}
            </a>
            <a href="#/" class="btn btn-primary">
              <svg width="16" height="16"><use href="#icon-home"/></svg>
              ${t('common.back_home')}
            </a>
          </div>
        </div>
      </div>
    </section>
  `;
}
