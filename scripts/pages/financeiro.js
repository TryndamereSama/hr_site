// MC1 HUB — Financeiro Page

import { t } from '../i18n.js';

export function renderFinanceiro(container) {
  container.innerHTML = `
    <section class="section-sm" style="background: var(--color-surface-container-low);">
      <div class="container">
        <nav class="breadcrumb" aria-label="Caminho de navegação">
          <a href="#/">${t('common.home')}</a>
          <svg width="14" height="14"><use href="#icon-chevron-right"/></svg>
          <span>${t('finance.breadcrumb')}</span>
        </nav>
        <div class="page-header" style="padding-top:var(--space-6)">
          <span class="label-md" style="color:var(--color-primary)">${t('common.department')}</span>
          <h1>${t('finance.title')}</h1>
          <p>${t('finance.subtitle')}</p>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div style="
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: var(--space-6);
          max-width: 720px;
          margin: 0 auto;
        ">

          <!-- Políticas de Compras -->
          <a href="#/financeiro/compras" style="text-decoration: none;" data-reveal>
            <div style="
              background: var(--color-surface-lowest);
              border-radius: var(--radius-2xl);
              box-shadow: var(--shadow-sm);
              padding: var(--space-8);
              display: flex;
              flex-direction: column;
              align-items: flex-start;
              gap: var(--space-4);
              transition: box-shadow var(--transition-base), transform var(--transition-base);
              cursor: pointer;
              height: 100%;
            " onmouseenter="this.style.boxShadow='var(--shadow-md)';this.style.transform='translateY(-2px)'"
               onmouseleave="this.style.boxShadow='var(--shadow-sm)';this.style.transform='translateY(0)'">
              <div class="icon-wrap icon-wrap-lg" style="
                background: linear-gradient(135deg, #059669, #10b981);
                color: white;
              ">
                <svg width="24" height="24"><use href="#icon-document"/></svg>
              </div>
              <div>
                <span class="chip chip-primary" style="margin-bottom: var(--space-2)">${t('common.coming_soon')}</span>
                <h2 class="title-lg" style="margin-bottom: var(--space-2)">${t('finance.compras')}</h2>
                <p class="body-md text-muted">${t('finance.compras.sub')}</p>
              </div>
              <span style="
                display: inline-flex;
                align-items: center;
                gap: var(--space-2);
                font-size: var(--text-sm);
                font-weight: var(--weight-semibold);
                color: var(--color-primary);
                margin-top: auto;
              ">
                Ver página
                <svg width="14" height="14"><use href="#icon-chevron-right"/></svg>
              </span>
            </div>
          </a>

          <!-- Políticas de Viagens -->
          <a href="#/financeiro/viagens" style="text-decoration: none;" data-reveal>
            <div style="
              background: var(--color-surface-lowest);
              border-radius: var(--radius-2xl);
              box-shadow: var(--shadow-sm);
              padding: var(--space-8);
              display: flex;
              flex-direction: column;
              align-items: flex-start;
              gap: var(--space-4);
              transition: box-shadow var(--transition-base), transform var(--transition-base);
              cursor: pointer;
              height: 100%;
            " onmouseenter="this.style.boxShadow='var(--shadow-md)';this.style.transform='translateY(-2px)'"
               onmouseleave="this.style.boxShadow='var(--shadow-sm)';this.style.transform='translateY(0)'">
              <div class="icon-wrap icon-wrap-lg" style="
                background: linear-gradient(135deg, #0284c7, #38bdf8);
                color: white;
              ">
                <svg width="24" height="24"><use href="#icon-link"/></svg>
              </div>
              <div>
                <span class="chip chip-primary" style="margin-bottom: var(--space-2)">${t('common.coming_soon')}</span>
                <h2 class="title-lg" style="margin-bottom: var(--space-2)">${t('finance.viagens')}</h2>
                <p class="body-md text-muted">${t('finance.viagens.sub')}</p>
              </div>
              <span style="
                display: inline-flex;
                align-items: center;
                gap: var(--space-2);
                font-size: var(--text-sm);
                font-weight: var(--weight-semibold);
                color: var(--color-primary);
                margin-top: auto;
              ">
                Ver página
                <svg width="14" height="14"><use href="#icon-chevron-right"/></svg>
              </span>
            </div>
          </a>

        </div>
      </div>
    </section>
  `;
}
