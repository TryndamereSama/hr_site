// MC1 HUB — Navbar Component

import { navigate } from './router.js';

export function initNavbar() {
  const navbar = document.getElementById('navbar');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileBackdrop = document.getElementById('mobile-menu-backdrop');

  if (!navbar) return;

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
            <svg width="16" height="16"><use href="#icon-home"/></svg>Home
          </a></li>
          <li><a href="#/noticias" class="nav-link">
            <svg width="16" height="16"><use href="#icon-newspaper"/></svg>Notícias
          </a></li>

          <!-- Departamentos Dropdown -->
          <li class="nav-item-dropdown" id="nav-dept-item">
            <button class="nav-dropdown-trigger" id="nav-dept-trigger" aria-haspopup="true" aria-expanded="false">
              <svg width="16" height="16"><use href="#icon-users"/></svg>
              Departamentos
              <svg class="dropdown-chevron" width="13" height="13"><use href="#icon-chevron-right"/></svg>
            </button>
            <ul class="nav-dropdown" id="nav-dept-menu" role="menu">
              <li role="none">
                <a href="#/rh" class="nav-link nav-dropdown-item" role="menuitem">
                  <div class="nav-dropdown-icon" style="background:linear-gradient(135deg,#004b71,#006494)">
                    <svg width="16" height="16"><use href="#icon-heart"/></svg>
                  </div>
                  <span class="nav-dropdown-label">
                    <strong>RH</strong>
                    <small>Benefícios & Comunicados</small>
                  </span>
                </a>
              </li>
              <li role="none">
                <a href="#/financeiro" class="nav-link nav-dropdown-item" role="menuitem">
                  <div class="nav-dropdown-icon" style="background:linear-gradient(135deg,#059669,#10b981)">
                    <svg width="16" height="16"><use href="#icon-document"/></svg>
                  </div>
                  <span class="nav-dropdown-label">
                    <strong>Financeiro</strong>
                    <small>Em breve</small>
                  </span>
                </a>
              </li>
              <li role="none">
                <a href="#/governanca" class="nav-link nav-dropdown-item" role="menuitem">
                  <div class="nav-dropdown-icon" style="background:linear-gradient(135deg,#4a148c,#6a1b9a)">
                    <svg width="16" height="16"><use href="#icon-shield"/></svg>
                  </div>
                  <span class="nav-dropdown-label">
                    <strong>Governança</strong>
                    <small>Em breve</small>
                  </span>
                </a>
              </li>
            </ul>
          </li>

          <li><a href="#/politicas" class="nav-link">
            <svg width="16" height="16"><use href="#icon-document"/></svg>Documentos
          </a></li>
          <li><a href="#/treinamentos" class="nav-link">
            <svg width="16" height="16"><use href="#icon-book"/></svg>Treinamentos
          </a></li>
          <li><a href="#/links" class="nav-link">
            <svg width="16" height="16"><use href="#icon-link"/></svg>Links
          </a></li>
          <li><a href="#/contato" class="nav-link">
            <svg width="16" height="16"><use href="#icon-mail"/></svg>Contato
          </a></li>
        </ul>
      </nav>

      <!-- Actions -->
      <div class="nav-actions">
        <!-- Search -->
        <button class="nav-icon-btn" id="nav-search-btn" aria-label="Abrir busca (Ctrl+K)" title="Buscar (Ctrl+K)">
          <svg width="20" height="20"><use href="#icon-search"/></svg>
        </button>
        <span class="nav-search-hint" aria-hidden="true">Ctrl K</span>

        <!-- User Avatar -->
        <button class="nav-user" aria-label="Menu do usuário" aria-expanded="false">
          <div class="avatar avatar-md" style="background: linear-gradient(135deg, #004b71, #006494); color: white;">VF</div>
          <div class="nav-user-info">
            <span class="nav-user-name">Vitor Faria</span>
            <span class="nav-user-role">Colaborador</span>
          </div>
        </button>

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

  // ─── Dropdown (desktop) ───
  const deptItem    = document.getElementById('nav-dept-item');
  const deptTrigger = document.getElementById('nav-dept-trigger');
  const deptMenu    = document.getElementById('nav-dept-menu');

  const openDropdown = () => {
    deptItem.classList.add('open');
    deptTrigger.setAttribute('aria-expanded', 'true');
  };

  const closeDropdown = () => {
    deptItem.classList.remove('open');
    deptTrigger.setAttribute('aria-expanded', 'false');
  };

  // Click trigger to toggle
  deptTrigger?.addEventListener('click', (e) => {
    e.stopPropagation();
    deptItem.classList.contains('open') ? closeDropdown() : openDropdown();
  });

  // Hover support (mouse users)
  deptItem?.addEventListener('mouseenter', openDropdown);
  deptItem?.addEventListener('mouseleave', closeDropdown);

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!deptItem?.contains(e.target)) closeDropdown();
  });

  // Close on Esc
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeDropdown();
  });

  // Close dropdown when a menu item is clicked
  deptMenu?.querySelectorAll('.nav-dropdown-item').forEach(item => {
    item.addEventListener('click', closeDropdown);
  });

  // ─── Mobile Menu ───
  if (mobileMenu) {
    mobileMenu.innerHTML = `
      <div class="mobile-menu-header">
        <div class="mobile-user-card" style="width:100%">
          <div class="avatar avatar-md" style="background: linear-gradient(135deg, #004b71, #006494); color: white;">VF</div>
          <div>
            <div class="title-md" style="color:var(--color-on-surface)">Vitor Faria</div>
            <div class="body-md text-muted">Colaborador</div>
          </div>
        </div>
        <button class="mobile-menu-close" id="mobile-close-btn" aria-label="Fechar menu">
          <svg width="18" height="18"><use href="#icon-close"/></svg>
        </button>
      </div>
      <nav aria-label="Navegação mobile">
        <a href="#/" class="mobile-nav-link"><svg width="20" height="20"><use href="#icon-home"/></svg>Home</a>
        <a href="#/noticias" class="mobile-nav-link"><svg width="20" height="20"><use href="#icon-newspaper"/></svg>Notícias</a>

        <!-- Departamentos accordion -->
        <div class="mobile-nav-group" id="mobile-dept-group">
          <button class="mobile-nav-group-trigger" id="mobile-dept-trigger" aria-expanded="false">
            <span style="display:flex;align-items:center;gap:var(--space-3)">
              <svg width="20" height="20"><use href="#icon-users"/></svg>Departamentos
            </span>
            <svg class="mobile-group-chevron" width="16" height="16"><use href="#icon-chevron-right"/></svg>
          </button>
          <div class="mobile-nav-sub" id="mobile-dept-sub" hidden>
            <a href="#/rh"         class="mobile-nav-link mobile-nav-sublink"><svg width="18" height="18"><use href="#icon-heart"/></svg>RH</a>
            <a href="#/financeiro" class="mobile-nav-link mobile-nav-sublink"><svg width="18" height="18"><use href="#icon-document"/></svg>Financeiro</a>
            <a href="#/governanca" class="mobile-nav-link mobile-nav-sublink"><svg width="18" height="18"><use href="#icon-shield"/></svg>Governança</a>
          </div>
        </div>

        <a href="#/politicas"    class="mobile-nav-link"><svg width="20" height="20"><use href="#icon-document"/></svg>Documentos</a>
        <a href="#/treinamentos" class="mobile-nav-link"><svg width="20" height="20"><use href="#icon-book"/></svg>Treinamentos</a>
        <a href="#/links"        class="mobile-nav-link"><svg width="20" height="20"><use href="#icon-link"/></svg>Links Úteis</a>
        <a href="#/contato"      class="mobile-nav-link"><svg width="20" height="20"><use href="#icon-mail"/></svg>Contato</a>
      </nav>
      <div style="margin-top: auto; padding-top: var(--space-6);">
        <button class="nav-icon-btn" id="mobile-search-btn" aria-label="Buscar" style="width:100%; justify-content:flex-start; gap: var(--space-3); padding: var(--space-3) var(--space-4); border-radius: var(--radius-lg); background: var(--color-surface-container-low);">
          <svg width="20" height="20"><use href="#icon-search"/></svg>
          <span style="font-size: var(--text-sm); color: var(--color-on-surface-muted)">Buscar no MC1 Hub...</span>
        </button>
      </div>
    `;
  }

  // ─── Mobile Departamentos accordion ───
  const mobileDeptTrigger = document.getElementById('mobile-dept-trigger');
  const mobileDeptSub     = document.getElementById('mobile-dept-sub');

  mobileDeptTrigger?.addEventListener('click', () => {
    const isOpen = mobileDeptTrigger.getAttribute('aria-expanded') === 'true';
    mobileDeptTrigger.setAttribute('aria-expanded', String(!isOpen));
    mobileDeptSub.hidden = isOpen;
    mobileDeptTrigger.classList.toggle('open', !isOpen);
  });

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

  // Close mobile menu on nav link click
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

  // ─── Keyboard shortcut Ctrl+K ───
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
          <p class="footer-tagline">Um espaço criado para simplificar, conectar e evoluir a forma como vivemos o dia a dia na MC1 Global.</p>
        </div>
        <div>
          <h4 class="footer-col-title">Navegação</h4>
          <ul class="footer-links">
            <li><a href="#/">Home</a></li>
            <li><a href="#/noticias">Notícias</a></li>
            <li><a href="#/rh">RH & Benefícios</a></li>
            <li><a href="#/politicas">Documentos</a></li>
          </ul>
        </div>
        <div>
          <h4 class="footer-col-title">Departamentos</h4>
          <ul class="footer-links">
            <li><a href="#/rh">RH</a></li>
            <li><a href="#/financeiro">Financeiro</a></li>
            <li><a href="#/governanca">Governança</a></li>
          </ul>
        </div>
        <div>
          <h4 class="footer-col-title">Contato RH</h4>
          <ul class="footer-links">
            <li><a href="mailto:rh@mc1global.com">rh@mc1global.com</a></li>
            <li><a href="tel:+551134567890">(11) 3456-7890</a></li>
            <li><a href="#/contato">Enviar mensagem</a></li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        <p class="footer-copy">© 2026 MC1 Global. Todos os direitos reservados.</p>
        <div class="footer-legal">
          <a href="#">Privacidade</a>
          <a href="#">Termos de Uso</a>
          <a href="#">Acessibilidade</a>
        </div>
      </div>
    </div>
  `;
}
