// MC1 HUB — Scroll Reveal & Animations

// ─── Scroll Reveal (IntersectionObserver) ───
export function initScrollReveal() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const delay = el.dataset.revealDelay || '0';
          setTimeout(() => {
            el.classList.add('is-visible');
          }, parseInt(delay, 10));
          observer.unobserve(el);
        }
      });
    },
    {
      root: null,
      rootMargin: '0px 0px -60px 0px',
      threshold: 0.08,
    }
  );

  // Store globally so the router can re-attach after page changes
  window._revealObserver = observer;

  // Observe all current [data-reveal] elements
  observeRevealElements();
  return observer;
}

export function observeRevealElements() {
  if (!window._revealObserver) return;
  document.querySelectorAll('[data-reveal]').forEach(el => {
    if (!el.classList.contains('is-visible')) {
      window._revealObserver.observe(el);
    }
  });
}

// ─── Animated Counter ───
export function animateCounter(el, target, duration = 1200, suffix = '') {
  const start = 0;
  const startTime = performance.now();

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    // Ease out cubic
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.floor(start + (target - start) * eased);
    el.textContent = current + suffix;
    if (progress < 1) requestAnimationFrame(update);
    else el.textContent = target + suffix;
  }

  requestAnimationFrame(update);
}

// ─── Init counters when they enter viewport ───
export function initCounters() {
  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.dataset.count, 10);
          const suffix = el.dataset.suffix || '';
          const duration = parseInt(el.dataset.duration || '1200', 10);
          animateCounter(el, target, duration, suffix);
          counterObserver.unobserve(el);
        }
      });
    },
    { threshold: 0.5 }
  );

  document.querySelectorAll('[data-count]').forEach(el => {
    counterObserver.observe(el);
  });
}

// ─── Progress Bar Animation ───
export function animateProgressBars() {
  const progressObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const fill = entry.target;
          const width = fill.dataset.width || '0';
          fill.style.width = width + '%';
          progressObserver.unobserve(fill);
        }
      });
    },
    { threshold: 0.3 }
  );

  document.querySelectorAll('.progress-bar-fill[data-width]').forEach(el => {
    el.style.width = '0%';
    el.style.transition = 'width 1.2s cubic-bezier(0.16, 1, 0.3, 1)';
    progressObserver.observe(el);
  });
}
