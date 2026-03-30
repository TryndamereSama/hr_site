// MC1 HUB — SPA Hash Router

const routes = {};
let currentRoute = null;
let isTransitioning = false;

// ─── Register a route ───
export function route(path, handler) {
  routes[path] = handler;
}

// ─── Parse current hash ───
function parseHash() {
  const hash = window.location.hash || '#/';
  // Support parameterized routes like #/noticia/some-id
  for (const pattern of Object.keys(routes)) {
    if (pattern.includes(':')) {
      const regexStr = '^' + pattern.replace(/:[^/]+/g, '([^/]+)') + '$';
      const regex = new RegExp(regexStr);
      const match = hash.match(regex);
      if (match) {
        const paramNames = (pattern.match(/:[^/]+/g) || []).map(p => p.slice(1));
        const params = {};
        paramNames.forEach((name, i) => { params[name] = match[i + 1]; });
        return { pattern, params };
      }
    } else if (hash === pattern) {
      return { pattern, params: {} };
    }
  }
  return { pattern: '#/', params: {} };
}

// ─── Navigate to a path ───
export function navigate(path) {
  window.location.hash = path;
}

// ─── Render current route ───
async function render() {
  if (isTransitioning) return;
  isTransitioning = true;

  const { pattern, params } = parseHash();
  const handler = routes[pattern] || routes['#/'];
  const appContent = document.getElementById('app-content');

  if (!appContent) { isTransitioning = false; return; }

  // Exit animation
  appContent.classList.add('page-exit');

  await new Promise(resolve => setTimeout(resolve, 150));

  // Clear and re-render
  appContent.innerHTML = '';
  appContent.classList.remove('page-exit');

  // Update active nav
  updateActiveNav(pattern);

  // Run handler
  try {
    await handler(appContent, params);
  } catch (err) {
    console.error('[Router] Error rendering route:', pattern, err);
    appContent.innerHTML = `
      <div class="section container text-center">
        <p class="text-muted">Erro ao carregar a página. Tente novamente.</p>
      </div>
    `;
  }

  // Enter animation
  appContent.classList.add('page-enter');
  appContent.addEventListener('animationend', () => {
    appContent.classList.remove('page-enter');
  }, { once: true });

  // Scroll to top
  window.scrollTo({ top: 0, behavior: 'instant' });

  // Trigger scroll reveal observer
  if (window._revealObserver) {
    document.querySelectorAll('[data-reveal]').forEach(el => {
      window._revealObserver.observe(el);
    });
  }

  currentRoute = pattern;
  isTransitioning = false;
}

// ─── Update active nav link ───
function updateActiveNav(pattern) {
  const allLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
  allLinks.forEach(link => {
    link.classList.remove('active');
    const href = link.getAttribute('href');
    // Exact match, or pattern starts with the href (for nested routes)
    if (href === pattern || (href !== '#/' && pattern.startsWith(href.replace(/\/$/, '')))) {
      link.classList.add('active');
    } else if (href === '#/' && (pattern === '#/' || pattern === '')) {
      link.classList.add('active');
    }
  });
}

// ─── Init router ───
export function initRouter() {
  window.addEventListener('hashchange', render);
  render(); // render initial route
}

export function getCurrentRoute() { return currentRoute; }
