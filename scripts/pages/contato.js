// MC1 HUB — Contato Interno Page Renderer

import { contatos, avatarGradients } from '../data/contatos.js';
import { t } from '../i18n.js';

export function renderContato(container) {
  container.innerHTML = `
    <section class="section-sm" style="background: var(--color-surface-container-low);">
      <div class="container">
        <nav class="breadcrumb" aria-label="Caminho">
          <a href="#/">${t('common.home')}</a>
          <svg width="14" height="14"><use href="#icon-chevron-right"/></svg>
          <span>${t('contact.breadcrumb')}</span>
        </nav>
        <div class="page-header" style="padding-top:var(--space-6)">
          <span class="label-md" style="color:var(--color-primary)">${t('contact.label')}</span>
          <h1>${t('contact.title')}</h1>
          <p>${t('contact.subtitle')}</p>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div style="max-width: 640px; margin: 0 auto; display: flex; flex-direction: column; gap: var(--space-8);">

          <!-- Canais de contato -->
          <div data-reveal>
            <h2 class="headline-md" style="margin-bottom:var(--space-6)">${t('contact.channels')}</h2>
            <div style="display:flex; flex-direction:column; gap:var(--space-4)">
              <div style="display:flex; align-items:center; gap:var(--space-4); padding:var(--space-5); background:var(--color-surface-lowest); border-radius:var(--radius-xl); box-shadow:var(--shadow-sm)">
                <div class="icon-wrap icon-wrap-md icon-teal">
                  <svg width="20" height="20"><use href="#icon-mail"/></svg>
                </div>
                <div>
                  <p class="label-md text-muted">${t('contact.email_label')}</p>
                  <a href="mailto:rh@mc1global.com" style="font-weight:600; color:var(--color-primary); font-size:var(--text-sm)">rh@mc1global.com</a>
                </div>
              </div>
            </div>
          </div>

          <!-- Equipe -->
          <div data-reveal data-reveal-delay="100">
            <h2 class="headline-md" style="margin-bottom:var(--space-6)">${t('contact.team')}</h2>
            <div style="display:flex; flex-direction:column; gap:var(--space-4)" id="contact-team-list"></div>
          </div>

        </div>
      </div>
    </section>
  `;

  // ─── Team list ───
  const teamList = container.querySelector('#contact-team-list');
  contatos.forEach(c => {
    const item = document.createElement('div');
    item.style.cssText = 'display:flex; align-items:center; gap:var(--space-3); padding:var(--space-4); background:var(--color-surface-lowest); border-radius:var(--radius-xl); box-shadow:var(--shadow-xs)';
    item.innerHTML = `
      <div class="avatar avatar-md" style="background: ${avatarGradients[c.colorIndex]}; color:white; flex-shrink:0">${c.initials}</div>
      <div style="flex:1; min-width:0">
        <p style="font-weight:600; font-size:var(--text-sm); white-space:nowrap; overflow:hidden; text-overflow:ellipsis">${c.name}</p>
        <p class="label-lg text-muted" style="white-space:nowrap; overflow:hidden; text-overflow:ellipsis">${c.role}</p>
      </div>
      <a href="mailto:${c.email}" class="btn btn-surface btn-sm" aria-label="E-mail para ${c.name}">
        <svg width="14" height="14"><use href="#icon-mail"/></svg>
      </a>
    `;
    teamList.appendChild(item);
  });
}
