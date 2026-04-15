// MC1 HUB — Navbar Component

import { navigate } from './router.js';
import { getLang, setLang, getCountry, setCountry, t, applyTranslations } from './i18n.js';

export function initNavbar() {
  const navbar = document.getElementById('navbar');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileBackdrop = document.getElementById('mobile-menu-backdrop');

  if (!navbar) return;

  const lang    = getLang();
  const country = getCountry();

  // ─── Render navbar HTML ───
  navbar.innerHTML = `
    <div class="nav-inner">
      <!-- Logo -->
      <a href="#/" class="nav-logo" aria-label="MC1 Hub — Página inicial">
        <div class="nav-logo-mark" aria-hidden="true">MC1</div>
        <div class="nav-logo-text">
          <span class="nav-logo-name">MC1 Hub</span>
          <span class="nav-logo-sub">Intranet</span>
        </div>
      </a>

      <!-- Desktop Nav Links -->
      <nav aria-label="Navegação principal">
        <ul class="nav-links" role="list">
          <li><a href="#/" class="nav-link">
            <svg width="16" height="16"><use href="#icon-home"/></svg>
            <span data-i18n="nav.home">${t('nav.home')}</span>
          </a></li>
          <li><a href="#/noticias" class="nav-link">
            <svg width="16" height="16"><use href="#icon-newspaper"/></svg>
            <span data-i18n="nav.news">${t('nav.news')}</span>
          </a></li>

          <!-- Departamentos Dropdown -->
          <li class="nav-item-dropdown" id="nav-dept-item">
            <button class="nav-dropdown-trigger" id="nav-dept-trigger" aria-haspopup="true" aria-expanded="false">
              <svg width="16" height="16"><use href="#icon-users"/></svg>
              <span data-i18n="nav.departments">${t('nav.departments')}</span>
              <svg class="dropdown-chevron" width="13" height="13"><use href="#icon-chevron-right"/></svg>
            </button>
            <ul class="nav-dropdown" id="nav-dept-menu" role="menu">
              <li role="none">
                <div class="nav-dropdown-card">
                  <a href="#/rh" class="nav-link nav-dropdown-item" role="menuitem">
                    <div class="nav-dropdown-icon" style="background:linear-gradient(135deg,#004b71,#006494)">
                      <svg width="16" height="16"><use href="#icon-heart"/></svg>
                    </div>
                    <span class="nav-dropdown-label">
                      <strong data-i18n="nav.rh">${t('nav.rh')}</strong>
                      <small data-i18n="nav.rh.sub">${t('nav.rh.sub')}</small>
                    </span>
                  </a>
                  <a href="#/financeiro" class="nav-link nav-dropdown-item" role="menuitem">
                    <div class="nav-dropdown-icon" style="background:linear-gradient(135deg,#059669,#10b981)">
                      <svg width="16" height="16"><use href="#icon-document"/></svg>
                    </div>
                    <span class="nav-dropdown-label">
                      <strong data-i18n="nav.finance">${t('nav.finance')}</strong>
                      <small data-i18n="nav.finance.sub">${t('nav.finance.sub')}</small>
                    </span>
                  </a>
                  <a href="#/governanca" class="nav-link nav-dropdown-item" role="menuitem">
                    <div class="nav-dropdown-icon" style="background:linear-gradient(135deg,#4a148c,#6a1b9a)">
                      <svg width="16" height="16"><use href="#icon-shield"/></svg>
                    </div>
                    <span class="nav-dropdown-label">
                      <strong data-i18n="nav.governance">${t('nav.governance')}</strong>
                      <small data-i18n="nav.governance.sub">${t('nav.governance.sub')}</small>
                    </span>
                  </a>
                  <a href="#/marketing" class="nav-link nav-dropdown-item" role="menuitem">
                    <div class="nav-dropdown-icon" style="background:linear-gradient(135deg,#db2777,#ec4899)">
                      <svg width="16" height="16"><use href="#icon-star"/></svg>
                    </div>
                    <span class="nav-dropdown-label">
                      <strong data-i18n="nav.marketing">${t('nav.marketing')}</strong>
                      <small data-i18n="nav.marketing.sub">${t('nav.marketing.sub')}</small>
                    </span>
                  </a>
                </div>
              </li>
            </ul>
          </li>

          <!-- Operacional Dropdown -->
          <li class="nav-item-dropdown" id="nav-ops-item">
            <button class="nav-dropdown-trigger" id="nav-ops-trigger" aria-haspopup="true" aria-expanded="false">
              <svg width="16" height="16"><use href="#icon-zap"/></svg>
              <span data-i18n="nav.operacional">${t('nav.operacional')}</span>
              <svg class="dropdown-chevron" width="13" height="13"><use href="#icon-chevron-right"/></svg>
            </button>
            <ul class="nav-dropdown" id="nav-ops-menu" role="menu">
              <li role="none">
                <div class="nav-dropdown-card">
                  <a href="#/operacional/sobre" class="nav-link nav-dropdown-item" role="menuitem">
                    <div class="nav-dropdown-icon" style="background:linear-gradient(135deg,#1e40af,#3b82f6)">
                      <svg width="16" height="16"><use href="#icon-book"/></svg>
                    </div>
                    <span class="nav-dropdown-label">
                      <strong data-i18n="nav.operacional.sobre">${t('nav.operacional.sobre')}</strong>
                      <small data-i18n="nav.operacional.sobre.sub">${t('nav.operacional.sobre.sub')}</small>
                    </span>
                  </a>
                  <a href="#/operacional/clientes" class="nav-link nav-dropdown-item" role="menuitem">
                    <div class="nav-dropdown-icon" style="background:linear-gradient(135deg,#0d9488,#14b8a6)">
                      <svg width="16" height="16"><use href="#icon-users"/></svg>
                    </div>
                    <span class="nav-dropdown-label">
                      <strong data-i18n="nav.operacional.clientes">${t('nav.operacional.clientes')}</strong>
                      <small data-i18n="nav.operacional.clientes.sub">${t('nav.operacional.clientes.sub')}</small>
                    </span>
                  </a>
                  <a href="#/operacional/avisos" class="nav-link nav-dropdown-item" role="menuitem">
                    <div class="nav-dropdown-icon" style="background:linear-gradient(135deg,#ea580c,#f97316)">
                      <svg width="16" height="16"><use href="#icon-newspaper"/></svg>
                    </div>
                    <span class="nav-dropdown-label">
                      <strong data-i18n="nav.operacional.avisos">${t('nav.operacional.avisos')}</strong>
                      <small data-i18n="nav.operacional.avisos.sub">${t('nav.operacional.avisos.sub')}</small>
                    </span>
                  </a>
                </div>
              </li>
            </ul>
          </li>

          <li><a href="#/politicas" class="nav-link">
            <svg width="16" height="16"><use href="#icon-document"/></svg>
            <span data-i18n="nav.docs">${t('nav.docs')}</span>
          </a></li>
          <!-- training tab hidden temporarily -->

          <li><a href="#/links" class="nav-link">
            <svg width="16" height="16"><use href="#icon-link"/></svg>
            <span data-i18n="nav.links">${t('nav.links')}</span>
          </a></li>
          <li><a href="#/contato" class="nav-link">
            <svg width="16" height="16"><use href="#icon-mail"/></svg>
            <span data-i18n="nav.contact">${t('nav.contact')}</span>
          </a></li>
        </ul>
      </nav>

      <!-- Actions -->
      <div class="nav-actions">
        <!-- Locale Switcher (country + language combined) -->
        <div class="locale-switcher" id="nav-locale-switcher" role="group" aria-label="Idioma e País">
          <button class="locale-btn ${lang === 'pt' ? 'active' : ''}" data-locale-country="BR" data-locale-lang="pt" title="Brasil — Português">
            <img src="assets/images/flags/br.svg" alt="Brasil" class="locale-flag"> PT
          </button>
          <button class="locale-btn ${lang === 'es' ? 'active' : ''}" data-locale-country="MX" data-locale-lang="es" title="México — Español">
            <img src="assets/images/flags/es.svg" alt="España" class="locale-flag"> ES
          </button>
          <button class="locale-btn ${lang === 'en' ? 'active' : ''}" data-locale-lang="en" title="English">
            <img src="assets/images/flags/gb.svg" alt="UK" class="locale-flag"> EN
          </button>
        </div>

        <!-- Search -->
        <button class="nav-icon-btn" id="nav-search-btn" aria-label="Abrir busca (Ctrl+K)" title="Buscar (Ctrl+K)">
          <svg width="20" height="20"><use href="#icon-search"/></svg>
        </button>
        <span class="nav-search-hint" aria-hidden="true">Ctrl K</span>

        <!-- Hamburger (mobile) -->
        <button class="nav-hamburger" id="nav-hamburger" aria-label="Abrir menu" aria-expanded="false" aria-controls="mobile-menu">
          <svg width="22" height="22"><use href="#icon-menu" id="hamburger-icon"/></svg>
        </button>
      </div>
    </div>
  `;

  // ─── Glassmorphism on scroll ───
  const onScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 24);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ─── Locale Switcher (country + language combined) ───
  document.getElementById('nav-locale-switcher')?.addEventListener('click', (e) => {
    const btn = e.target.closest('.locale-btn');
    if (!btn) return;
    if (btn.dataset.localeCountry) setCountry(btn.dataset.localeCountry);
    if (btn.dataset.localeLang) setLang(btn.dataset.localeLang);
  });

  // ─── Dropdown (desktop) — generic factory ───
  function makeDropdown(itemId, triggerId, menuId) {
    const item    = document.getElementById(itemId);
    const trigger = document.getElementById(triggerId);
    const menu    = document.getElementById(menuId);
    let timer     = null;

    const closeAll = () => {
      document.querySelectorAll('.nav-item-dropdown.open').forEach(el => {
        el.classList.remove('open');
        el.querySelector('.nav-dropdown-trigger')?.setAttribute('aria-expanded', 'false');
      });
    };

    const open = () => {
      clearTimeout(timer);
      closeAll();
      item?.classList.add('open');
      trigger?.setAttribute('aria-expanded', 'true');
    };

    const close = () => {
      item?.classList.remove('open');
      trigger?.setAttribute('aria-expanded', 'false');
    };

    const scheduleClose = () => { timer = setTimeout(close, 120); };

    trigger?.addEventListener('click', (e) => {
      e.stopPropagation();
      item?.classList.contains('open') ? close() : open();
    });

    item?.addEventListener('mouseenter', open);
    item?.addEventListener('mouseleave', scheduleClose);
    menu?.addEventListener('mouseenter', () => clearTimeout(timer));
    menu?.addEventListener('mouseleave', scheduleClose);
    menu?.querySelectorAll('.nav-dropdown-item').forEach(el => el.addEventListener('click', close));

    return { open, close };
  }

  const deptDrop = makeDropdown('nav-dept-item', 'nav-dept-trigger', 'nav-dept-menu');
  const opsDrop  = makeDropdown('nav-ops-item',  'nav-ops-trigger',  'nav-ops-menu');

  document.addEventListener('click', () => { deptDrop.close(); opsDrop.close(); });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') { deptDrop.close(); opsDrop.close(); }
  });

  // ─── Mobile Menu ───
  if (mobileMenu) {
    mobileMenu.innerHTML = `
      <div class="mobile-menu-header">
        <span class="title-md" style="color:var(--color-on-surface)" data-i18n="nav.menu">${t('nav.menu')}</span>
        <button class="mobile-menu-close" id="mobile-close-btn" aria-label="Fechar menu">
          <svg width="18" height="18"><use href="#icon-close"/></svg>
        </button>
      </div>

      <!-- Locale switcher mobile -->
      <div class="locale-switcher locale-switcher-mobile" id="mobile-locale-switcher" role="group" aria-label="Idioma e País">
        <button class="locale-btn ${lang === 'pt' ? 'active' : ''}" data-locale-country="BR" data-locale-lang="pt">
          <img src="assets/images/flags/br.svg" alt="Brasil" class="locale-flag"> Brasil — PT
        </button>
        <button class="locale-btn ${lang === 'es' ? 'active' : ''}" data-locale-country="MX" data-locale-lang="es">
          <img src="assets/images/flags/es.svg" alt="España" class="locale-flag"> México — ES
        </button>
        <button class="locale-btn ${lang === 'en' ? 'active' : ''}" data-locale-lang="en">
          <img src="assets/images/flags/gb.svg" alt="UK" class="locale-flag"> English — EN
        </button>
      </div>

      <nav aria-label="Navegação mobile">
        <a href="#/" class="mobile-nav-link"><svg width="20" height="20"><use href="#icon-home"/></svg><span data-i18n="nav.home">${t('nav.home')}</span></a>
        <a href="#/noticias" class="mobile-nav-link"><svg width="20" height="20"><use href="#icon-newspaper"/></svg><span data-i18n="nav.news">${t('nav.news')}</span></a>

        <!-- Departamentos accordion -->
        <div class="mobile-nav-group" id="mobile-dept-group">
          <button class="mobile-nav-group-trigger" id="mobile-dept-trigger" aria-expanded="false">
            <span style="display:flex;align-items:center;gap:var(--space-3)">
              <svg width="20" height="20"><use href="#icon-users"/></svg>
              <span data-i18n="nav.departments">${t('nav.departments')}</span>
            </span>
            <svg class="mobile-group-chevron" width="16" height="16"><use href="#icon-chevron-right"/></svg>
          </button>
          <div class="mobile-nav-sub" id="mobile-dept-sub" hidden>
            <a href="#/rh"         class="mobile-nav-link mobile-nav-sublink"><svg width="18" height="18"><use href="#icon-heart"/></svg><span data-i18n="nav.rh">${t('nav.rh')}</span></a>
            <a href="#/financeiro" class="mobile-nav-link mobile-nav-sublink"><svg width="18" height="18"><use href="#icon-document"/></svg><span data-i18n="nav.finance">${t('nav.finance')}</span></a>
            <a href="#/governanca" class="mobile-nav-link mobile-nav-sublink"><svg width="18" height="18"><use href="#icon-shield"/></svg><span data-i18n="nav.governance">${t('nav.governance')}</span></a>
            <a href="#/marketing"  class="mobile-nav-link mobile-nav-sublink"><svg width="18" height="18"><use href="#icon-star"/></svg><span data-i18n="nav.marketing">${t('nav.marketing')}</span></a>
          </div>
        </div>

        <!-- Operacional accordion -->
        <div class="mobile-nav-group" id="mobile-ops-group">
          <button class="mobile-nav-group-trigger" id="mobile-ops-trigger" aria-expanded="false">
            <span style="display:flex;align-items:center;gap:var(--space-3)">
              <svg width="20" height="20"><use href="#icon-zap"/></svg>
              <span data-i18n="nav.operacional">${t('nav.operacional')}</span>
            </span>
            <svg class="mobile-group-chevron" width="16" height="16"><use href="#icon-chevron-right"/></svg>
          </button>
          <div class="mobile-nav-sub" id="mobile-ops-sub" hidden>
            <a href="#/operacional/sobre"    class="mobile-nav-link mobile-nav-sublink"><svg width="18" height="18"><use href="#icon-book"/></svg><span data-i18n="nav.operacional.sobre">${t('nav.operacional.sobre')}</span></a>
            <a href="#/operacional/clientes" class="mobile-nav-link mobile-nav-sublink"><svg width="18" height="18"><use href="#icon-users"/></svg><span data-i18n="nav.operacional.clientes">${t('nav.operacional.clientes')}</span></a>
            <a href="#/operacional/avisos"   class="mobile-nav-link mobile-nav-sublink"><svg width="18" height="18"><use href="#icon-newspaper"/></svg><span data-i18n="nav.operacional.avisos">${t('nav.operacional.avisos')}</span></a>
          </div>
        </div>

        <a href="#/politicas"    class="mobile-nav-link"><svg width="20" height="20"><use href="#icon-document"/></svg><span data-i18n="nav.docs">${t('nav.docs')}</span></a>
        <!-- training tab hidden temporarily -->
        <a href="#/links"        class="mobile-nav-link"><svg width="20" height="20"><use href="#icon-link"/></svg><span data-i18n="nav.links">${t('nav.links')}</span></a>
        <a href="#/contato"      class="mobile-nav-link"><svg width="20" height="20"><use href="#icon-mail"/></svg><span data-i18n="nav.contact">${t('nav.contact')}</span></a>
      </nav>
      <div style="margin-top: auto; padding-top: var(--space-6);">
        <button class="nav-icon-btn" id="mobile-search-btn" aria-label="Buscar" style="width:100%; justify-content:flex-start; gap: var(--space-3); padding: var(--space-3) var(--space-4); border-radius: var(--radius-lg); background: var(--color-surface-container-low);">
          <svg width="20" height="20"><use href="#icon-search"/></svg>
          <span data-i18n="nav.search_placeholder" style="font-size: var(--text-sm); color: var(--color-on-surface-muted)">${t('nav.search_placeholder')}</span>
        </button>
      </div>
    `;
  }

  // ─── Mobile locale switcher ───
  document.getElementById('mobile-locale-switcher')?.addEventListener('click', (e) => {
    const btn = e.target.closest('.locale-btn');
    if (!btn) return;
    if (btn.dataset.localeCountry) setCountry(btn.dataset.localeCountry);
    if (btn.dataset.localeLang) setLang(btn.dataset.localeLang);
  });

  // ─── Mobile accordion factory ───
  function makeMobileAccordion(triggerId, subId) {
    const trigger = document.getElementById(triggerId);
    const sub     = document.getElementById(subId);
    trigger?.addEventListener('click', () => {
      const isOpen = trigger.getAttribute('aria-expanded') === 'true';
      trigger.setAttribute('aria-expanded', String(!isOpen));
      if (sub) sub.hidden = isOpen;
      trigger.classList.toggle('open', !isOpen);
    });
  }

  makeMobileAccordion('mobile-dept-trigger', 'mobile-dept-sub');
  makeMobileAccordion('mobile-ops-trigger',  'mobile-ops-sub');

  // ─── Hamburger toggle ───
  const hamburger = document.getElementById('nav-hamburger');
  const closeBtn  = document.getElementById('mobile-close-btn');

  const openMenu = () => {
    mobileMenu?.classList.add('open');
    mobileBackdrop?.classList.add('open');
    hamburger?.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  };

  const closeMenu = () => {
    mobileMenu?.classList.remove('open');
    mobileBackdrop?.classList.remove('open');
    hamburger?.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  };

  hamburger?.addEventListener('click', openMenu);
  closeBtn?.addEventListener('click', closeMenu);
  mobileBackdrop?.addEventListener('click', closeMenu);

  mobileMenu?.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // ─── Search trigger ───
  const openSearch = () => {
    if (window._openSearch) window._openSearch();
  };

  document.getElementById('nav-search-btn')?.addEventListener('click', openSearch);
  document.getElementById('mobile-search-btn')?.addEventListener('click', () => {
    closeMenu();
    setTimeout(openSearch, 300);
  });

  document.addEventListener('keydown', e => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      openSearch();
    }
  });
}

// ─── Render footer ───
export function initFooter() {
  const footer = document.getElementById('footer');
  if (!footer) return;

  footer.innerHTML = `
    <div class="footer-inner">
      <div class="footer-top">
        <div class="footer-brand">
          <a href="#/" class="footer-logo" aria-label="MC1 Hub">
            <div class="footer-logo-mark" aria-hidden="true">MC1</div>
            <span class="footer-logo-name">MC1 Hub</span>
          </a>
          <p class="footer-tagline" data-i18n="footer.tagline">${t('footer.tagline')}</p>
        </div>
        <div>
          <h4 class="footer-col-title" data-i18n="footer.navigation">${t('footer.navigation')}</h4>
          <ul class="footer-links">
            <li><a href="#/" data-i18n="nav.home">${t('nav.home')}</a></li>
            <li><a href="#/noticias" data-i18n="nav.news">${t('nav.news')}</a></li>
            <li><a href="#/rh">RH & Benefícios</a></li>
            <li><a href="#/politicas" data-i18n="nav.docs">${t('nav.docs')}</a></li>
          </ul>
        </div>
        <div>
          <h4 class="footer-col-title" data-i18n="footer.departments">${t('footer.departments')}</h4>
          <ul class="footer-links">
            <li><a href="#/rh" data-i18n="nav.rh">${t('nav.rh')}</a></li>
            <li><a href="#/financeiro" data-i18n="nav.finance">${t('nav.finance')}</a></li>
            <li><a href="#/governanca" data-i18n="nav.governance">${t('nav.governance')}</a></li>
          </ul>
        </div>
        <div>
          <h4 class="footer-col-title" data-i18n="footer.contact_rh">${t('footer.contact_rh')}</h4>
          <ul class="footer-links">
            <li><a href="mailto:rh@mc1global.com">rh@mc1global.com</a></li>
            <li><a href="#/contato" data-i18n="footer.hr_team">${t('footer.hr_team')}</a></li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        <p class="footer-copy" data-i18n="footer.rights">${t('footer.rights')}</p>
        <div class="footer-legal">
          <a href="#" data-i18n="footer.privacy">${t('footer.privacy')}</a>
          <a href="#" data-i18n="footer.terms">${t('footer.terms')}</a>
          <a href="#" data-i18n="footer.accessibility">${t('footer.accessibility')}</a>
        </div>
      </div>
    </div>
  `;
}
