// MC1 HUB — RH Page Renderer

import { getLocalizedBeneficios } from '../data/beneficios.js';
import { contatos, avatarGradients } from '../data/contatos.js';
import { getLocalizedNoticias } from '../data/noticias.js';
import { createCard } from '../../components/card.js';
import { openModal } from '../../components/modal.js';
import { t } from '../i18n.js';

// Tags considered RH-related
const RH_TAGS = ['sindpd', 'pagamento', 'programas', 'comunicado', 'bemestar'];

export async function renderRH(container) {
  const comunicados = (await getLocalizedNoticias())
    .filter(n => RH_TAGS.includes(n.tag))
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  container.innerHTML = `
    <!-- Page Header -->
    <section class="section-sm" style="background: var(--color-surface-container-low);">
      <div class="container">
        <nav class="breadcrumb" aria-label="Caminho">
          <a href="#/">${t('common.home')}</a>
          <svg width="14" height="14"><use href="#icon-chevron-right"/></svg>
          <span>${t('rh.breadcrumb')}</span>
        </nav>
        <div class="page-header" style="padding-top:var(--space-6)">
          <span class="label-md" style="color:var(--color-primary)">${t('rh.label')}</span>
          <h1>${t('rh.title')}</h1>
          <p>${t('rh.subtitle')}</p>
        </div>
        <!-- Tabs -->
        <div class="tabs" role="tablist" aria-label="Seções de RH">
          <button class="tab-btn active" data-tab="beneficios" role="tab" aria-selected="true" aria-controls="tab-beneficios">
            <svg width="14" height="14" style="display:inline;margin-right:6px"><use href="#icon-heart"/></svg>${t('rh.tab.benefits')}
          </button>
          <button class="tab-btn" data-tab="comunicados" role="tab" aria-selected="false" aria-controls="tab-comunicados">
            <svg width="14" height="14" style="display:inline;margin-right:6px"><use href="#icon-newspaper"/></svg>${t('rh.tab.news')}
            <span class="tab-badge">${comunicados.length}</span>
          </button>
          <button class="tab-btn" data-tab="contatos" role="tab" aria-selected="false" aria-controls="tab-contatos">
            <svg width="14" height="14" style="display:inline;margin-right:6px"><use href="#icon-users"/></svg>${t('rh.tab.contacts')}
          </button>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">

        <!-- ─── Benefícios Tab ─── -->
        <div id="tab-beneficios" class="tab-panel active" role="tabpanel">
          <div class="grid grid-3" id="beneficios-grid"></div>
        </div>

        <!-- ─── Comunicados Tab ─── -->
        <div id="tab-comunicados" class="tab-panel" role="tabpanel">
          <p class="body-md text-muted" style="margin-bottom: var(--space-8)">
            ${t('rh.news.desc')}
          </p>
          <div id="comunicados-grid" class="grid grid-3"></div>
        </div>

        <!-- ─── Contatos Tab ─── -->
        <div id="tab-contatos" class="tab-panel" role="tabpanel">
          <div class="grid grid-3" id="contatos-grid"></div>
        </div>

      </div>
    </section>
  `;

  // ─── Tab logic ───
  const tabBtns = container.querySelectorAll('.tab-btn');
  const tabPanels = container.querySelectorAll('.tab-panel');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.tab;
      tabBtns.forEach(b => {
        b.classList.toggle('active', b === btn);
        b.setAttribute('aria-selected', b === btn ? 'true' : 'false');
      });
      tabPanels.forEach(p => {
        p.classList.toggle('active', p.id === `tab-${target}`);
      });
      if (window._revealObserver) {
        container.querySelectorAll('[data-reveal]').forEach(el => window._revealObserver.observe(el));
      }
    });
  });

  // ─── Benefits Grid ───
  const beneficiosGrid = container.querySelector('#beneficios-grid');
  const benefList = getLocalizedBeneficios();
  if (benefList.length === 0) {
    beneficiosGrid.innerHTML = `
      <div class="empty-state" style="grid-column:1/-1">
        <svg width="48" height="48"><use href="#icon-heart"/></svg>
        <p class="title-md text-muted">${t('country.no_benefits')}</p>
      </div>`;
  } else {
    benefList.forEach((b, i) => {
      const card = createCard({
        type: 'benefit',
        name: b.name,
        shortDesc: b.shortDesc,
        icon: b.icon,
        gradient: b.gradient,
        logo: b.logo || null,
        revealDelay: i * 60,
        onClick: () => openBenefitModal(b),
      });
      beneficiosGrid.appendChild(card);
    });
  }

  // ─── Comunicados Grid ───
  const comunicadosGrid = container.querySelector('#comunicados-grid');
  comunicados.forEach((n, i) => {
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
    comunicadosGrid.appendChild(card);
  });

  // ─── Contacts Grid ───
  const contatosGrid = container.querySelector('#contatos-grid');
  contatos.forEach((c, i) => {
    const card = createCard({
      type: 'contact',
      name: c.name,
      role: c.role,
      email: c.email,
      initials: c.initials,
      gradient: avatarGradients[c.colorIndex % avatarGradients.length],
      areas: c.areas,
      revealDelay: i * 80,
    });
    contatosGrid.appendChild(card);
  });
}

// ─── Benefit Detail Modal ───
function openBenefitModal(b) {
  openModal({
    title: b.name,
    body: `
      <div style="display:flex; align-items:center; gap:var(--space-4); padding:var(--space-6); background:var(--color-surface-container-low); border-radius:var(--radius-xl); margin-bottom:var(--space-6)">
        <div class="icon-wrap icon-wrap-xl" style="background:${b.gradient}; color:white;">
          <svg width="32" height="32"><use href="#${b.icon}"/></svg>
        </div>
        <div>
          <span class="chip chip-primary">${b.category}</span>
          <p class="body-md text-muted" style="margin-top:var(--space-2)">${t('rh.modal.provided_by')} <strong>${b.provider}</strong></p>
        </div>
      </div>
      <div style="margin-bottom:var(--space-6)">
        <p class="body-lg" style="color:var(--color-on-surface-variant); margin-bottom:var(--space-4)">${b.description}</p>
        <p class="body-md text-muted">${b.details}</p>
      </div>
      <div style="background:rgba(0,75,113,0.06); border-radius:var(--radius-lg); padding:var(--space-4)">
        <p class="label-md" style="color:var(--color-primary); margin-bottom:var(--space-2)">${t('rh.modal.how_to_access')}</p>
        <p class="body-md" style="color:var(--color-on-surface)">${b.howToAccess}</p>
      </div>
    `,
    footer: `
      <a href="https://drive.google.com/drive/u/0/folders/1gzJQIwfm2LnXdfFKP33Hsg-PIu6Yddk1" target="_blank" rel="noopener noreferrer" class="btn btn-primary">
        <svg width="14" height="14"><use href="#icon-download"/></svg>${t('common.download')}
      </a>
    `,
    size: 'md',
  });
}
