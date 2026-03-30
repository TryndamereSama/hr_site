// MC1 HUB — Modal Component

let activeModal = null;

export function openModal({ title, body, footer = '', size = 'md' }) {
  // Remove existing
  closeModal(false);

  const root = document.getElementById('modal-root');
  if (!root) return;

  const sizeClass = size === 'lg' ? 'modal-lg' : size === 'sm' ? 'modal-sm' : '';

  root.innerHTML = `
    <div class="modal-backdrop" id="modal-backdrop" role="presentation"></div>
    <div class="modal-container ${sizeClass}" role="dialog" aria-modal="true" aria-label="${title}">
      <div class="modal-header">
        <h2 class="modal-title title-lg">${title}</h2>
        <button class="modal-close-btn" id="modal-close" aria-label="Fechar">
          <svg width="20" height="20"><use href="#icon-close"/></svg>
        </button>
      </div>
      <div class="modal-body">${body}</div>
      ${footer ? `<div class="modal-footer">${footer}</div>` : ''}
    </div>
  `;

  root.style.display = 'flex';
  document.body.style.overflow = 'hidden';

  // Focus trap
  const modal = root.querySelector('.modal-container');
  activeModal = modal;

  // Animate in
  requestAnimationFrame(() => {
    root.classList.add('modal-open');
  });

  // Listeners
  document.getElementById('modal-close')?.addEventListener('click', closeModal);
  document.getElementById('modal-backdrop')?.addEventListener('click', closeModal);
  document.addEventListener('keydown', onEsc);

  // Focus first focusable element
  setTimeout(() => {
    const focusable = modal?.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    focusable?.focus();
  }, 100);
}

export function closeModal(animate = true) {
  const root = document.getElementById('modal-root');
  if (!root || root.style.display === 'none') return;

  document.removeEventListener('keydown', onEsc);

  if (animate) {
    root.classList.add('modal-closing');
    setTimeout(() => {
      root.classList.remove('modal-open', 'modal-closing');
      root.style.display = 'none';
      root.innerHTML = '';
      document.body.style.overflow = '';
      activeModal = null;
    }, 200);
  } else {
    root.classList.remove('modal-open', 'modal-closing');
    root.style.display = 'none';
    root.innerHTML = '';
    document.body.style.overflow = '';
    activeModal = null;
  }
}

function onEsc(e) {
  if (e.key === 'Escape') closeModal();
}
