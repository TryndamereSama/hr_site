// MC1 HUB — Home Page Renderer

import { getNoticiasRecentes } from '../data/noticias.js';
import { beneficios } from '../data/beneficios.js';
import { createCard } from '../../components/card.js';

export function renderHome(container) {
  const news = getNoticiasRecentes(3);

  container.innerHTML = `
    <!-- ═══ HERO ═══ -->
    <section class="hero-section" aria-label="Boas-vindas">
      <div class="hero-bg" aria-hidden="true"></div>
      <div class="hero-content container">
        <div class="hero-text" data-reveal>
          <span class="chip chip-teal" style="margin-bottom: var(--space-5)">✦ MC1 Global · 2026</span>
          <h1 class="display-lg hero-headline">
            Seu espaço<br>no <em class="hero-accent">MC1 Hub.</em>
          </h1>
          <p class="hero-sub">
            Um espaço criado para simplificar, conectar e evoluir a forma como vivemos o dia a dia na empresa.
          </p>
          <div class="hero-actions" data-reveal data-reveal-delay="200">
            <a href="#/noticias" class="btn btn-primary btn-lg">
              Ver Novidades
              <svg width="18" height="18"><use href="#icon-arrow-right"/></svg>
            </a>
            <a href="#/rh" class="btn btn-ghost btn-lg">
              Meus Benefícios
            </a>
          </div>
        </div>
        <div class="hero-visual" data-reveal="right" data-reveal-delay="150" aria-hidden="true">
          <div class="hero-card-float hero-card-1">
            <div style="display:flex;align-items:center;gap:10px;margin-bottom:8px">
              <div style="width:32px;height:32px;border-radius:50%;background:linear-gradient(135deg,#004b71,#006494);display:flex;align-items:center;justify-content:center;color:white;font-size:11px;font-weight:700">VF</div>
              <span style="font-size:13px;font-weight:600;color:var(--color-on-surface)">Bom dia, Vitor!</span>
            </div>
            <div style="font-size:12px;color:var(--color-on-surface-variant)">Você tem 1 day off disponível 🎂</div>
          </div>
          <div class="hero-card-float hero-card-2">
            <div style="font-size:11px;font-weight:500;color:var(--color-primary);margin-bottom:6px;letter-spacing:.04em;text-transform:uppercase">SINDPD 2026</div>
            <div style="font-size:13px;font-weight:600;color:var(--color-on-surface)">Reajuste de 5,5% aprovado</div>
          </div>
          <div class="hero-orb hero-orb-1" aria-hidden="true"></div>
          <div class="hero-orb hero-orb-2" aria-hidden="true"></div>
        </div>
      </div>
    </section>

    <!-- ═══ QUICK ACCESS ═══ -->
    <section class="section-sm" style="background: var(--color-surface-container-low);" aria-label="Acesso rápido">
      <div class="container">
        <p class="label-md" style="color:var(--color-primary); margin-bottom:var(--space-5)">Acesso Rápido</p>
        <div id="quick-links-grid" class="scroll-row quick-links-row"></div>
      </div>
    </section>

    <!-- ═══ FEATURED NEWS ═══ -->
    <section class="section" aria-labelledby="news-heading">
      <div class="container">
        <div class="flex-between section-heading">
          <div>
            <span class="label-md" style="color:var(--color-primary)">Comunicados</span>
            <h2 class="headline-lg" id="news-heading">Últimas Notícias</h2>
          </div>
          <a href="#/noticias" class="btn btn-ghost hover-arrow">
            Ver todas <svg width="16" height="16"><use href="#icon-arrow-right"/></svg>
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
            <span class="label-md" style="color:var(--color-primary)">Seus Benefícios</span>
            <h2 class="headline-lg" id="benefits-heading">Bem-estar em primeiro lugar</h2>
          </div>
          <a href="#/rh" class="btn btn-ghost hover-arrow">
            Ver todos <svg width="16" height="16"><use href="#icon-arrow-right"/></svg>
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
            <span class="label-md" style="color:var(--color-primary); margin-bottom:var(--space-3); display:block">Recurso</span>
            <h2 class="headline-lg" style="margin-bottom:var(--space-4)">Calendário Corporativo 2026</h2>
            <p class="body-lg text-muted" style="max-width:44ch; margin-bottom:var(--space-6)">
              Feriados nacionais, pontos facultativos e datas importantes do ano já estão disponíveis para consulta e download.
            </p>
            <a href="#/politicas" class="btn btn-primary">
              Acessar Calendário
              <svg width="16" height="16"><use href="#icon-arrow-right"/></svg>
            </a>
          </div>
          <div class="calendar-callout-visual" aria-hidden="true">
            <div class="calendar-mini">
              <div class="cal-header">
                <span>Março 2026</span>
              </div>
              <div class="cal-grid">
                ${['D','S','T','Q','Q','S','S'].map(d => `<span class="cal-day-head">${d}</span>`).join('')}
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
    { title: 'Notícias',     icon: 'icon-newspaper', href: '#/noticias',     gradient: 'linear-gradient(135deg,#004b71,#006494)' },
    { title: 'RH',           icon: 'icon-users',     href: '#/rh',           gradient: 'linear-gradient(135deg,#283593,#3949ab)' },
    { title: 'Documentos',   icon: 'icon-document',  href: '#/politicas',    gradient: 'linear-gradient(135deg,#d97706,#f59e0b)' },
    { title: 'Treinamentos', icon: 'icon-book',      href: '#/treinamentos', gradient: 'linear-gradient(135deg,#c62828,#e53935)' },
    { title: 'Links Úteis',  icon: 'icon-link',      href: '#/links',        gradient: 'linear-gradient(135deg,#00695c,#00897b)' },
    { title: 'Contato',      icon: 'icon-mail',      href: '#/contato',      gradient: 'linear-gradient(135deg,#4a148c,#6a1b9a)' },
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
      href: `#/noticia/${n.id}`,
      revealDelay: i * 100,
    });
    newsGrid.appendChild(card);
  });

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
