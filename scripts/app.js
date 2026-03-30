// MC1 HUB — Application Bootstrap

import { route, initRouter } from './router.js';
import { initScrollReveal, initCounters, animateProgressBars } from './animations.js';
import { initNavbar, initFooter } from './navbar.js';
import { buildSearchIndex } from './search.js';
import { initSearchOverlay } from '../components/search-overlay.js';

// Pages
import { renderHome }        from './pages/home.js';
import { renderNoticias, renderNoticia } from './pages/noticias.js';
import { renderRH }          from './pages/rh.js';
import { renderPoliticas }   from './pages/politicas.js';
import { renderTreinamentos} from './pages/treinamentos.js';
import { renderLinks }       from './pages/links.js';
import { renderContato }     from './pages/contato.js';

// ─── Register Routes ───
route('#/',               (el) => { renderHome(el);         postRender(); });
route('#/noticias',       (el) => { renderNoticias(el);     postRender(); });
route('#/noticia/:id',    (el, p) => { renderNoticia(el, p); postRender(); });
route('#/rh',             (el) => { renderRH(el);           postRender(); });
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
  buildSearchIndex();
  initSearchOverlay();

  // 4. Router (renders current route)
  initRouter();
});
