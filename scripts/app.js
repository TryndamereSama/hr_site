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
