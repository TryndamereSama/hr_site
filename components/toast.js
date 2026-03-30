// MC1 HUB — Toast Notification System

const toastQueue = [];
let toastContainer = null;

function getContainer() {
  if (!toastContainer) {
    toastContainer = document.getElementById('toast-container');
  }
  return toastContainer;
}

const icons = {
  success: '#icon-check',
  error:   '#icon-close',
  info:    '#icon-star',
  warning: '#icon-zap',
};

const colors = {
  success: 'var(--color-success)',
  error:   'var(--color-error)',
  info:    'var(--color-primary)',
  warning: 'var(--color-warning)',
};

export function showToast({ message, type = 'success', duration = 4000, title = '' }) {
  const container = getContainer();
  if (!container) return;

  const id = `toast-${Date.now()}-${Math.random().toString(36).slice(2)}`;
  const iconHref = icons[type] || icons.info;
  const color = colors[type] || colors.info;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.id = id;
  toast.setAttribute('role', 'status');
  toast.innerHTML = `
    <div class="toast-icon" style="color: ${color}">
      <svg width="18" height="18"><use href="${iconHref}"/></svg>
    </div>
    <div class="toast-content">
      ${title ? `<p class="toast-title">${title}</p>` : ''}
      <p class="toast-message">${message}</p>
    </div>
    <button class="toast-close" aria-label="Fechar notificação">
      <svg width="14" height="14"><use href="#icon-close"/></svg>
    </button>
  `;

  // Close button
  toast.querySelector('.toast-close')?.addEventListener('click', () => dismissToast(id));

  container.appendChild(toast);

  // Animate in (frame delay so CSS transition fires)
  requestAnimationFrame(() => {
    requestAnimationFrame(() => toast.classList.add('toast-visible'));
  });

  // Auto dismiss
  const timer = setTimeout(() => dismissToast(id), duration);
  toast._timer = timer;

  return id;
}

export function dismissToast(id) {
  const toast = document.getElementById(id);
  if (!toast) return;

  clearTimeout(toast._timer);
  toast.classList.add('toast-hiding');
  toast.addEventListener('animationend', () => toast.remove(), { once: true });
}
