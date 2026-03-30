// MC1 HUB — Full-Screen Search Overlay

import { searchQuery, groupResults } from '../scripts/search.js';
import { navigate } from '../scripts/router.js';

export function initSearchOverlay() {
  const overlay = document.getElementById('search-overlay');
  if (!overlay) return;

  overlay.innerHTML = `
    <div class="search-backdrop" id="search-backdrop"></div>
    <div class="search-dialog" role="search">
      <div class="search-input-wrap">
        <svg width="20" height="20" class="search-icon"><use href="#icon-search"/></svg>
        <input
          type="search"
          id="search-input"
          class="search-input"
          placeholder="Buscar benefícios, notícias, documentos..."
          autocomplete="off"
          spellcheck="false"
        />
        <button class="search-esc-btn" id="search-close" aria-label="Fechar busca">
          <span>esc</span>
        </button>
      </div>
      <div class="search-results" id="search-results" aria-live="polite" aria-atomic="true">
        <div class="search-empty-state">
          <svg width="40" height="40"><use href="#icon-search"/></svg>
          <p>Digite para buscar no MC1 Hub</p>
          <p class="label-md text-faint">Notícias, benefícios, documentos, links...</p>
        </div>
      </div>
    </div>
  `;

  const input = document.getElementById('search-input');
  const results = document.getElementById('search-results');
  const backdrop = document.getElementById('search-backdrop');
  const closeBtn = document.getElementById('search-close');

  let selectedIndex = -1;
  let currentResults = [];
  let debounceTimer = null;

  // ─── Open / Close ───
  function open() {
    overlay.classList.add('search-overlay-open');
    document.body.style.overflow = 'hidden';
    setTimeout(() => input?.focus(), 100);
    selectedIndex = -1;
  }

  function close() {
    overlay.classList.remove('search-overlay-open');
    document.body.style.overflow = '';
    if (input) input.value = '';
    renderEmpty();
    selectedIndex = -1;
    currentResults = [];
  }

  // Expose globally for navbar trigger
  window._openSearch = open;

  backdrop?.addEventListener('click', close);
  closeBtn?.addEventListener('click', close);

  // Escape key
  document.addEventListener('keydown', e => {
    if (!overlay.classList.contains('search-overlay-open')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowDown') { e.preventDefault(); moveSelection(1); }
    if (e.key === 'ArrowUp')   { e.preventDefault(); moveSelection(-1); }
    if (e.key === 'Enter')     { e.preventDefault(); selectCurrent(); }
  });

  // ─── Input handler with debounce ───
  input?.addEventListener('input', () => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      const q = input.value.trim();
      if (q.length < 2) { renderEmpty(); currentResults = []; return; }
      const found = searchQuery(q);
      currentResults = found;
      renderResults(groupResults(found), q);
      selectedIndex = -1;
    }, 150);
  });

  // ─── Render results ───
  function renderResults(groups, query) {
    const keys = Object.keys(groups);
    if (keys.length === 0) {
      results.innerHTML = `
        <div class="search-empty-state">
          <svg width="36" height="36"><use href="#icon-search"/></svg>
          <p>Nenhum resultado para "<strong>${escHtml(query)}</strong>"</p>
          <p class="label-md text-faint">Tente palavras-chave como: benefício, SINDPD, treinamento</p>
        </div>
      `;
      return;
    }

    let html = '';
    let flatIndex = 0;

    keys.forEach(type => {
      const group = groups[type];
      html += `<div class="search-group">
        <p class="search-group-label">${group.label}</p>
        <ul class="search-group-items">`;
      group.items.forEach(item => {
        html += `
          <li class="search-result-item" data-flat="${flatIndex}" data-href="${escHtml(item.href)}" data-external="${item.isExternal || false}">
            <div class="search-result-dot" style="background: ${item.gradient || 'var(--color-primary)'}"></div>
            <div class="search-result-text">
              <span class="search-result-title">${highlight(item.title, query)}</span>
              <span class="search-result-sub">${escHtml(item.subtitle || '')}</span>
            </div>
            <svg width="14" height="14" class="search-result-arrow"><use href="#icon-arrow-right"/></svg>
          </li>`;
        flatIndex++;
      });
      html += `</ul></div>`;
    });

    results.innerHTML = html;

    results.querySelectorAll('.search-result-item').forEach(item => {
      item.addEventListener('click', () => {
        const href = item.dataset.href;
        const isExternal = item.dataset.external === 'true';
        close();
        if (isExternal) window.open(href, '_blank', 'noopener,noreferrer');
        else navigate(href);
      });
      item.addEventListener('mouseenter', () => {
        selectedIndex = parseInt(item.dataset.flat, 10);
        updateSelection();
      });
    });
  }

  function renderEmpty() {
    results.innerHTML = `
      <div class="search-empty-state">
        <svg width="40" height="40"><use href="#icon-search"/></svg>
        <p>Digite para buscar no MC1 Hub</p>
        <p class="label-md text-faint">Notícias, benefícios, documentos, links...</p>
      </div>
    `;
  }

  function moveSelection(dir) {
    const items = results.querySelectorAll('.search-result-item');
    if (!items.length) return;
    selectedIndex = Math.max(0, Math.min(items.length - 1, selectedIndex + dir));
    updateSelection();
    items[selectedIndex]?.scrollIntoView({ block: 'nearest' });
  }

  function updateSelection() {
    results.querySelectorAll('.search-result-item').forEach((item, i) => {
      item.classList.toggle('selected', i === selectedIndex);
    });
  }

  function selectCurrent() {
    const item = results.querySelector(`.search-result-item[data-flat="${selectedIndex}"]`);
    if (item) item.click();
    else if (currentResults[0]) {
      const first = currentResults[0];
      close();
      if (first.isExternal) window.open(first.href, '_blank', 'noopener,noreferrer');
      else navigate(first.href);
    }
  }
}

// ─── Helpers ───
function escHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function highlight(text, query) {
  if (!query) return escHtml(text);
  const escaped = escHtml(text);
  const terms = query.trim().split(/\s+/).filter(Boolean);
  let result = escaped;
  terms.forEach(term => {
    const regex = new RegExp(`(${term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    result = result.replace(regex, '<mark>$1</mark>');
  });
  return result;
}
