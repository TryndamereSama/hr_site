// MC1 HUB — Application Bootstrap

import { route, initRouter } from './router.js';
import { applyTranslations } from './i18n.js';
import { initScrollReveal, initCounters, animateProgressBars } from './animations.js';
import { initNavbar, initFooter } from './navbar.js';
import { buildSearchIndex } from './search.js';
import { initSearchOverlay } from '../components/search-overlay.js';
import { initChatWidget }   from '../components/chat-widget.js';

// Pages
import { renderHome }        from './pages/home.js';
import { renderNoticias, renderNoticia } from './pages/noticias.js';
import { renderRH }          from './pages/rh.js';
import { renderFinanceiro }  from './pages/financeiro.js';
import { renderCompras }             from './pages/compras.js';
import { renderViagens }             from './pages/viagens.js';
import { renderSobreMC1 }           from './pages/sobre-mc1.js';
import { renderClientesMC1 }        from './pages/clientes-mc1.js';
import { renderAvisosOperacionais }  from './pages/avisos-operacionais.js';
import { renderMarketing }           from './pages/marketing.js';
import { renderGovernanca }  from './pages/governanca.js';
import { renderPoliticas }   from './pages/politicas.js';
import { renderTreinamentos} from './pages/treinamentos.js';
import { renderLinks }       from './pages/links.js';
import { renderContato }     from './pages/contato.js';
import { renderAdmin }       from './pages/admin.js';

// ─── Register Routes ───
route('#/',               async (el) => { await renderHome(el);          postRender(); });
route('#/noticias',       async (el) => { await renderNoticias(el);      postRender(); });
route('#/noticia/:id',    async (el, p) => { await renderNoticia(el, p); postRender(); });
route('#/rh',             async (el) => { await renderRH(el);            postRender(); });
route('#/admin',          (el) => { renderAdmin(el); });
route('#/financeiro',          (el) => { renderFinanceiro(el);  postRender(); });
route('#/financeiro/compras',      (el) => { renderCompras(el);            postRender(); });
route('#/financeiro/viagens',      (el) => { renderViagens(el);            postRender(); });
route('#/operacional/sobre',       (el) => { renderSobreMC1(el);           postRender(); });
route('#/operacional/clientes',    (el) => { renderClientesMC1(el);        postRender(); });
route('#/operacional/avisos',      (el) => { renderAvisosOperacionais(el); postRender(); });
route('#/marketing',               (el) => { renderMarketing(el);          postRender(); });
route('#/governanca',     (el) => { renderGovernanca(el);   postRender(); });
route('#/politicas',      (el) => { renderPoliticas(el);    postRender(); });
route('#/treinamentos',   (el) => { renderTreinamentos(el); postRender(true); });
route('#/links',          (el) => { renderLinks(el);        postRender(); });
route('#/contato',        (el) => { renderContato(el);      postRender(); });

// ─── Post-render hook (runs after every page change) ───
function postRender(withProgress = false) {
  // Re-observe all new [data-reveal] elements
  setTimeout(() => {
    if (window._revealObserver) {
      document.querySelectorAll('[data-reveal]').forEach(el => {
        if (!el.classList.contains('is-visible')) {
          window._revealObserver.observe(el);
        }
      });
    }
    initCounters();
    if (withProgress) animateProgressBars();
  }, 50);
}

// ─── Boot ───
document.addEventListener('DOMContentLoaded', () => {
  // 1. Shared layout
  initNavbar();
  initFooter();

  // 2. Animations
  initScrollReveal();

  // 3. Search
  buildSearchIndex().catch(e => console.warn('[Search] index error:', e));
  initSearchOverlay();

  // 4. Router (renders current route)
  initRouter();

  // 5. Chat widget
  initChatWidget();

  // 6. Easter egg — Konami Code (↑↑↓↓←→←→BA)
  const KONAMI = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
  let _konamiIdx = 0;
  document.addEventListener('keydown', (e) => {
    if (e.key === KONAMI[_konamiIdx]) {
      _konamiIdx++;
      if (_konamiIdx === KONAMI.length) {
        _konamiIdx = 0;
        _showKonamiEgg();
      }
    } else {
      _konamiIdx = e.key === KONAMI[0] ? 1 : 0;
    }
  });

  function _showKonamiEgg() {
    if (document.getElementById('konami-overlay')) return;
    const overlay = document.createElement('div');
    overlay.id = 'konami-overlay';
    overlay.style.cssText = `
      position:fixed;inset:0;z-index:99999;
      background:rgba(0,0,0,0.85);
      display:flex;align-items:center;justify-content:center;
      cursor:pointer;animation:konami-fade-in 0.4s ease;
    `;
    overlay.innerHTML = `
      <div style="text-align:center;animation:konami-pop 0.5s cubic-bezier(0.34,1.56,0.64,1)">
        <img src="assets/images/Gemini_Generated_Image_2iy6r42iy6r42iy6.png"
          alt="#DNAMC1er"
          style="max-height:80vh;max-width:90vw;border-radius:16px;box-shadow:0 24px 64px rgba(0,0,0,0.6)" />
        <p style="color:rgba(255,255,255,0.5);font-size:12px;margin-top:12px">clique para fechar</p>
      </div>`;
    document.body.appendChild(overlay);

    // inject keyframes once
    if (!document.getElementById('konami-styles')) {
      const s = document.createElement('style');
      s.id = 'konami-styles';
      s.textContent = `
        @keyframes konami-fade-in { from { opacity:0 } to { opacity:1 } }
        @keyframes konami-pop { from { transform:scale(0.5);opacity:0 } to { transform:scale(1);opacity:1 } }
      `;
      document.head.appendChild(s);
    }

    const close = () => overlay.remove();
    overlay.addEventListener('click', close);
    document.addEventListener('keydown', close, { once: true });
  }

  // 6. Language change — update data-i18n elements + rebuild search + re-render current page
  window.addEventListener('langchange', () => {
    applyTranslations();
    buildSearchIndex().catch(() => {});
    window.dispatchEvent(new Event('hashchange'));
  });

  // 7. Country change — rebuild search + re-render current page
  window.addEventListener('countrychange', () => {
    applyTranslations();
    buildSearchIndex().catch(() => {});
    window.dispatchEvent(new Event('hashchange'));
  });
});
