// MC1 HUB — Universal Card Factory

/**
 * createCard(options) → HTMLElement
 *
 * options: {
 *   type: 'news' | 'benefit' | 'document' | 'link' | 'course' | 'contact' | 'quick-link',
 *   title, subtitle, description, tag, tagLabel, date, icon,
 *   href, onClick, gradient, progress, isExternal,
 *   revealDelay
 * }
 */
export function createCard(options = {}) {
  const {
    type = 'generic',
    title = '',
    subtitle = '',
    description = '',
    tag = '',
    tagLabel = '',
    date = '',
    icon = 'icon-document',
    href = '#',
    onClick,
    gradient = 'linear-gradient(135deg, #004b71, #006494)',
    progress,
    isExternal = false,
    revealDelay = 0,
  } = options;

  const card = document.createElement('article');
  card.className = `card card-${type}`;
  card.setAttribute('data-reveal', '');
  if (revealDelay) card.setAttribute('data-reveal-delay', String(revealDelay));

  switch (type) {
    case 'news':
      return buildNewsCard(card, options);
    case 'benefit':
      return buildBenefitCard(card, options);
    case 'document':
      return buildDocumentCard(card, options);
    case 'link':
      return buildLinkCard(card, options);
    case 'course':
      return buildCourseCard(card, options);
    case 'contact':
      return buildContactCard(card, options);
    case 'quick-link':
      return buildQuickLinkCard(card, options);
    default:
      card.innerHTML = `<div class="card-body"><h3 class="title-lg">${title}</h3></div>`;
      return card;
  }
}

// ─── News Card ───
function buildNewsCard(card, { title, excerpt, tagLabel, dateLabel, gradient, href, revealDelay, image }) {
  card.style.cursor = 'pointer';
  const thumbContent = image
    ? `<img src="${image}" alt="" loading="lazy" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;" onerror="this.style.display='none'" />`
    : `<svg width="40" height="40" style="color:rgba(255,255,255,0.5)"><use href="#icon-newspaper"/></svg>`;
  card.innerHTML = `
    <div class="card-thumb" style="background: ${gradient}; min-height: 180px; position:relative; overflow:hidden;">
      ${thumbContent}
    </div>
    <div class="card-body">
      ${tagLabel ? `<span class="chip chip-primary" style="margin-bottom: var(--space-3)">${tagLabel}</span>` : ''}
      <h3 class="title-lg" style="margin-bottom: var(--space-3); line-height: var(--leading-snug);">${title}</h3>
      ${excerpt ? `<p class="body-md text-muted" style="display: -webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden; margin-bottom: var(--space-4);">${excerpt}</p>` : ''}
      <div style="display:flex; align-items:center; justify-content:space-between; margin-top:auto">
        ${dateLabel ? `<span class="label-lg text-faint">${dateLabel}</span>` : ''}
        <span style="display:flex; align-items:center; gap:4px; font-size:var(--text-sm); font-weight:600; color:var(--color-primary)">
          Ler mais <svg width="14" height="14"><use href="#icon-arrow-right"/></svg>
        </span>
      </div>
    </div>
  `;
  card.addEventListener('click', () => { window.location.hash = href; });
  return card;
}

// ─── Benefit Card ───
function buildBenefitCard(card, { name, shortDesc, icon, gradient, logo, onClick }) {
  const accentColor = extractFirstColor(gradient);
  const logoSrc = _logoSrc(logo);
  card.style.cursor = 'pointer';
  card.innerHTML = `
    <div class="card-body card-body-lg">
      <div class="icon-wrap icon-wrap-lg" style="background: ${accentColor}1a; color: ${accentColor}; margin-bottom: var(--space-5);">
        ${logoSrc ? `<img src="${logoSrc}" alt="" loading="lazy"
          style="width:28px;height:28px;object-fit:contain;border-radius:4px;"
          onload="var p=this.parentElement;p.style.background='white';p.style.border='1px solid rgba(0,0,0,0.08)';this.nextElementSibling.style.display='none'"
          onerror="this.style.display='none'">` : ''}
        <svg width="28" height="28"><use href="#${icon}"/></svg>
      </div>
      <h3 class="title-lg" style="margin-bottom: var(--space-3)">${name}</h3>
      <p class="body-md text-muted">${shortDesc}</p>
      <div style="margin-top: var(--space-5)">
        <span style="display:inline-flex; align-items:center; gap:4px; font-size:var(--text-sm); font-weight:600; color:var(--color-primary)">
          Saiba mais <svg width="14" height="14"><use href="#icon-arrow-right"/></svg>
        </span>
      </div>
    </div>
  `;
  if (onClick) card.addEventListener('click', onClick);
  return card;
}

// ─── Document Card ───
function buildDocumentCard(card, { name, category, lastUpdatedLabel, fileType, fileSize, gradient, onClick }) {
  card.className = 'card card-document card-border';
  card.style.cursor = 'pointer';
  card.innerHTML = `
    <div class="card-body" style="display:flex; align-items:center; gap: var(--space-4);">
      <div class="icon-wrap icon-wrap-lg" style="background: ${gradient}; color: white; flex-shrink:0;">
        <svg width="26" height="26"><use href="#icon-document"/></svg>
      </div>
      <div style="flex:1; min-width:0;">
        <h3 class="title-md" style="margin-bottom: var(--space-1); white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${name}</h3>
        <div style="display:flex; align-items:center; gap: var(--space-3); flex-wrap:wrap; margin-top: var(--space-2)">
          <span class="chip chip-primary">${category}</span>
          <span class="label-lg text-faint">${lastUpdatedLabel || ''}</span>
          ${fileType ? `<span class="label-lg text-faint">${fileType} · ${fileSize || ''}</span>` : ''}
        </div>
      </div>
      <button class="btn btn-ghost btn-sm" style="flex-shrink:0;" aria-label="Ver ${name}">
        <svg width="14" height="14"><use href="#icon-download"/></svg>Ver
      </button>
    </div>
  `;
  card.addEventListener('click', onClick);
  return card;
}

// ─── Link Card ───
function buildLinkCard(card, { name, description, category, gradient, logo, href, isExternal }) {
  const logoSrc = _logoSrc(logo);
  card.style.cursor = 'pointer';
  card.innerHTML = `
    <div class="card-body card-body-lg">
      <div class="card-link-thumb" style="width:44px; height:44px; border-radius: var(--radius-lg); background: ${gradient}; display:flex; align-items:center; justify-content:center; color:white; font-size:18px; font-weight:700; margin-bottom:var(--space-4);">
        ${logoSrc ? `<img src="${logoSrc}" alt="" loading="lazy"
          style="width:28px;height:28px;object-fit:contain;border-radius:4px;"
          onload="var p=this.parentElement;p.style.background='white';p.style.border='1px solid rgba(0,0,0,0.08)';this.nextElementSibling.style.display='none'"
          onerror="this.style.display='none'">` : ''}
        <span>${name.charAt(0)}</span>
      </div>
      <h3 class="title-md" style="margin-bottom: var(--space-2)">${name}</h3>
      <p class="body-md text-muted" style="display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden; margin-bottom: var(--space-4);">${description}</p>
      <div style="display:flex; align-items:center; justify-content:space-between; margin-top: auto;">
        <span class="chip chip-surface">${category}</span>
        <svg width="16" height="16" style="color:var(--color-on-surface-muted)">
          <use href="${isExternal ? '#icon-external-link' : '#icon-arrow-right'}"/>
        </svg>
      </div>
    </div>
  `;
  card.addEventListener('click', () => {
    if (isExternal) window.open(href, '_blank', 'noopener,noreferrer');
    else window.location.hash = href;
  });
  return card;
}

// ─── Course Card ───
function buildCourseCard(card, { title, instructor, category, durationLabel, level, progress = 0, gradient, onClick }) {
  const enrolled = progress > 0;
  card.style.cursor = 'pointer';
  card.innerHTML = `
    <div class="card-thumb" style="background: ${gradient}; min-height: 140px; position:relative;">
      <svg width="36" height="36" style="color:rgba(255,255,255,0.6)"><use href="#icon-play"/></svg>
      <span class="chip" style="position:absolute; top:12px; right:12px; background:rgba(255,255,255,0.18); color:white; backdrop-filter:blur(8px);">${durationLabel}</span>
      <span class="chip" style="position:absolute; top:12px; left:12px; background:rgba(255,255,255,0.18); color:white; backdrop-filter:blur(8px);">${level}</span>
    </div>
    <div class="card-body">
      <span class="label-md" style="color:var(--color-primary); margin-bottom:var(--space-2); display:block">${category}</span>
      <h3 class="title-md" style="margin-bottom:var(--space-2); line-height:var(--leading-snug)">${title}</h3>
      <p class="body-md text-muted" style="margin-bottom:var(--space-4)">${instructor}</p>
      ${progress >= 0 ? `
        <div style="display:flex; align-items:center; gap:var(--space-3); margin-bottom:var(--space-4)">
          <div class="progress-bar" style="flex:1">
            <div class="progress-bar-fill" data-width="${progress}"></div>
          </div>
          <span class="label-lg text-muted">${progress}%</span>
        </div>
      ` : ''}
      <button class="btn btn-${progress === 100 ? 'surface' : 'primary'} btn-sm w-full">
        ${progress === 100 ? '✓ Concluído' : progress > 0 ? 'Continuar' : 'Acessar'}
      </button>
    </div>
  `;
  if (onClick) card.addEventListener('click', onClick);
  return card;
}

// ─── Contact Card ───
function buildContactCard(card, { name, role, email, initials, gradient, areas }) {
  card.innerHTML = `
    <div class="card-body card-body-lg">
      <div style="display:flex; align-items:center; gap:var(--space-4); margin-bottom:var(--space-4)">
        <div class="avatar avatar-lg" style="background: ${gradient}; color:white; flex-shrink:0">${initials}</div>
        <div>
          <h3 class="title-md">${name}</h3>
          <p class="body-md text-muted">${role}</p>
        </div>
      </div>
      ${areas ? `
        <div style="display:flex; flex-wrap:wrap; gap:var(--space-2); margin-bottom:var(--space-4)">
          ${areas.map(a => `<span class="chip chip-primary">${a}</span>`).join('')}
        </div>
      ` : ''}
      <a href="mailto:${email}" class="btn btn-ghost btn-sm w-full" style="text-decoration:none">
        <svg width="14" height="14"><use href="#icon-mail"/></svg>${email}
      </a>
    </div>
  `;
  return card;
}

// ─── Quick Link Card ───
function buildQuickLinkCard(card, { title, icon, href, gradient, revealDelay }) {
  card.className = 'card card-quick-link';
  card.style.cursor = 'pointer';
  card.style.textAlign = 'center';
  card.innerHTML = `
    <div class="card-body card-body-sm" style="display:flex; flex-direction:column; align-items:center; gap:var(--space-3); padding:var(--space-5)">
      <div class="icon-wrap icon-wrap-md" style="background: ${gradient}; color:white;">
        <svg width="22" height="22"><use href="#${icon}"/></svg>
      </div>
      <span style="font-size:var(--text-sm); font-weight:var(--weight-medium); color:var(--color-on-surface)">${title}</span>
    </div>
  `;
  card.addEventListener('click', () => { window.location.hash = href; });
  return card;
}

// ─── Helper: extract first color from gradient string ───
function extractFirstColor(gradient) {
  const match = gradient.match(/#([0-9a-fA-F]{3,8})/);
  return match ? match[0] : '#004b71';
}

// ─── Helper: domain → logo URL (Google Favicon API) ───
function _logoSrc(domain) {
  return domain ? `https://www.google.com/s2/favicons?domain=${domain}&sz=128` : null;
}
