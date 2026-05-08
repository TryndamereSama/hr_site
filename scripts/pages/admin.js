// MC1 HUB — Admin Panel

import { FIREBASE_CONFIGURED, db, auth } from '../firebase.js';
import { invalidateNoticiasCache } from '../data/noticias.js';
import { t } from '../i18n.js';

// ─── Constants ───
const COUNTRIES = [
  { code: 'BR', name: 'Brasil', flag: '🇧🇷' },
  { code: 'MX', name: 'México', flag: '🇲🇽' },
  { code: 'AR', name: 'Argentina', flag: '🇦🇷' },
  { code: 'CO', name: 'Colômbia', flag: '🇨🇴' },
  { code: 'CL', name: 'Chile', flag: '🇨🇱' },
  { code: 'PE', name: 'Peru', flag: '🇵🇪' },
];

const SECTIONS = [
  { key: 'rh',          label: 'RH & Benefícios' },
  { key: 'financeiro',  label: 'Financeiro' },
  { key: 'marketing',   label: 'Marketing' },
  { key: 'operacional', label: 'Operacional' },
  { key: 'governanca',  label: 'Governança' },
  { key: 'treinamentos',label: 'Treinamentos' },
  { key: 'noticias',    label: 'Notícias' },
  { key: 'links',       label: 'Links Úteis' },
];

const NEWS_TAGS = [
  { value: 'comunicado',  label: 'Comunicado' },
  { value: 'sindpd',      label: 'SINDPD' },
  { value: 'pagamento',   label: 'Pagamento' },
  { value: 'programas',   label: 'Programas' },
  { value: 'bemestar',    label: 'Bem-estar' },
  { value: 'eventos',     label: 'Eventos' },
  { value: 'tecnologia',  label: 'Tecnologia' },
  { value: 'cultura',     label: 'Cultura' },
  { value: 'negocios',    label: 'Negócios' },
];

const GRADIENTS = [
  'linear-gradient(135deg,#004b71,#0077b6)',
  'linear-gradient(135deg,#1a6fa3,#38b2d8)',
  'linear-gradient(135deg,#0d4b2e,#1a8c57)',
  'linear-gradient(135deg,#6b21a8,#9333ea)',
  'linear-gradient(135deg,#92400e,#d97706)',
  'linear-gradient(135deg,#991b1b,#ef4444)',
  'linear-gradient(135deg,#1e3a5f,#3b82f6)',
  'linear-gradient(135deg,#134e4a,#14b8a6)',
];

// ─── Toast helper ───
let _toastTimer = null;
function showToast(msg, type = 'success') {
  let el = document.getElementById('admin-toast');
  if (!el) {
    el = document.createElement('div');
    el.id = 'admin-toast';
    el.className = 'admin-toast';
    document.body.appendChild(el);
  }
  el.textContent = msg;
  el.className = `admin-toast ${type} show`;
  clearTimeout(_toastTimer);
  _toastTimer = setTimeout(() => { el.classList.remove('show'); }, 3000);
}

// ─── Modal helper ───
function openFormModal({ title, body, footer, size = 'lg' }) {
  // Use existing modal component if available, else build a lightweight inline one
  if (window._openModal) {
    window._openModal({ title, body, footer, size });
    return;
  }
  let overlay = document.getElementById('admin-modal-overlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.id = 'admin-modal-overlay';
    overlay.style.cssText = 'position:fixed;inset:0;z-index:1000;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,0.5);padding:var(--space-4)';
    document.body.appendChild(overlay);
  }
  const maxW = size === 'lg' ? '680px' : '480px';
  overlay.innerHTML = `
    <div style="background:var(--color-surface);border-radius:var(--radius-2xl);width:100%;max-width:${maxW};max-height:90vh;overflow-y:auto;box-shadow:var(--shadow-xl)">
      <div style="display:flex;align-items:center;justify-content:space-between;padding:var(--space-5) var(--space-6);border-bottom:1px solid var(--color-outline-subtle)">
        <h3 style="font-size:var(--text-lg);font-weight:700;color:var(--color-on-surface);margin:0">${title}</h3>
        <button id="admin-modal-close" style="background:none;border:none;cursor:pointer;color:var(--color-on-surface-variant);padding:4px;border-radius:var(--radius-md);display:flex">
          <svg width="20" height="20"><use href="#icon-close"/></svg>
        </button>
      </div>
      <div style="padding:var(--space-6)">${body}</div>
      ${footer ? `<div style="padding:var(--space-4) var(--space-6);border-top:1px solid var(--color-outline-subtle);display:flex;justify-content:flex-end;gap:var(--space-3)">${footer}</div>` : ''}
    </div>`;
  overlay.style.display = 'flex';
  overlay.querySelector('#admin-modal-close').onclick = closeModal;
  overlay.onclick = (e) => { if (e.target === overlay) closeModal(); };
}

function closeModal() {
  const overlay = document.getElementById('admin-modal-overlay');
  if (overlay) overlay.style.display = 'none';
}

// ─── Firestore helpers ───
async function _getFirestore() {
  const { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, query, orderBy, serverTimestamp } =
    await import('https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js');
  return { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, query, orderBy, serverTimestamp };
}

async function fetchComunicados() {
  const fs = await _getFirestore();
  const q = fs.query(fs.collection(db, 'comunicados'), fs.orderBy('date', 'desc'));
  const snap = await fs.getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

async function saveComunicado(data, existingId = null) {
  const fs = await _getFirestore();
  if (existingId) {
    await fs.updateDoc(fs.doc(db, 'comunicados', existingId), { ...data, updatedAt: fs.serverTimestamp() });
  } else {
    await fs.addDoc(fs.collection(db, 'comunicados'), { ...data, createdAt: fs.serverTimestamp() });
  }
  invalidateNoticiasCache();
}

async function deleteComunicado(id) {
  const fs = await _getFirestore();
  await fs.deleteDoc(fs.doc(db, 'comunicados', id));
  invalidateNoticiasCache();
}

async function fetchVisibility() {
  const fs = await _getFirestore();
  const snap = await fs.getDocs(fs.collection(db, 'config'));
  const result = {};
  snap.docs.forEach(d => { result[d.id] = d.data(); });
  return result;
}

async function saveVisibility(country, sections) {
  const fs = await _getFirestore();
  await fs.updateDoc(fs.doc(db, 'config', country), { sections });
}

// ─── Tag label lookup ───
function tagLabel(tagValue) {
  const found = NEWS_TAGS.find(t => t.value === tagValue);
  return found ? found.label : tagValue;
}

// ─── Date formatter ───
function fmtDate(dateStr) {
  if (!dateStr) return '—';
  try {
    return new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' }).format(new Date(dateStr));
  } catch { return dateStr; }
}

// ─── Comunicados Tab ───
async function renderComunicadosTab(panel) {
  panel.innerHTML = `<div class="admin-spinner"><div class="spinner"></div></div>`;

  let comunicados = [];
  try {
    comunicados = await fetchComunicados();
  } catch (e) {
    panel.innerHTML = `<p class="text-muted" style="padding:var(--space-8)">Erro ao carregar comunicados: ${e.message}</p>`;
    return;
  }

  const tableRows = comunicados.length === 0
    ? `<tr><td colspan="5"><div class="admin-empty"><svg width="40" height="40" style="opacity:.3"><use href="#icon-newspaper"/></svg><p style="margin-top:var(--space-3)">Nenhum comunicado ainda</p></div></td></tr>`
    : comunicados.map(c => `
        <tr>
          <td class="col-title">${c.title || '—'}</td>
          <td class="col-tag"><span class="chip">${tagLabel(c.tag)}</span></td>
          <td class="col-date">${fmtDate(c.date)}</td>
          <td class="col-status">
            <span class="status-badge ${c.published ? 'published' : 'draft'}">
              <span class="status-dot"></span>
              ${c.published ? 'Publicado' : 'Rascunho'}
            </span>
          </td>
          <td class="col-actions">
            <div class="admin-row-actions">
              <button class="btn-icon-sm" title="Editar" data-action="edit" data-id="${c.id}">
                <svg width="14" height="14"><use href="#icon-edit"/></svg>
              </button>
              <button class="btn-icon-sm danger" title="Excluir" data-action="delete" data-id="${c.id}" data-title="${(c.title || '').replace(/"/g, '&quot;')}">
                <svg width="14" height="14"><use href="#icon-trash"/></svg>
              </button>
            </div>
          </td>
        </tr>`).join('');

  panel.innerHTML = `
    <div class="admin-toolbar">
      <h2>Comunicados <span style="font-size:var(--text-sm);font-weight:400;color:var(--color-on-surface-variant)">(${comunicados.length})</span></h2>
      <button class="btn btn-primary" id="btn-new-comunicado">
        <svg width="14" height="14"><use href="#icon-plus"/></svg>Novo comunicado
      </button>
    </div>
    <div class="admin-table-wrap">
      <table class="admin-table">
        <thead>
          <tr>
            <th class="col-title">Título</th>
            <th class="col-tag">Categoria</th>
            <th class="col-date">Data</th>
            <th class="col-status">Status</th>
            <th class="col-actions"></th>
          </tr>
        </thead>
        <tbody id="comunicados-tbody">${tableRows}</tbody>
      </table>
    </div>`;

  // New comunicado
  panel.querySelector('#btn-new-comunicado').addEventListener('click', () => {
    openComunicadoForm(null, () => renderComunicadosTab(panel));
  });

  // Edit / delete via delegation
  panel.querySelector('#comunicados-tbody').addEventListener('click', async (e) => {
    const btn = e.target.closest('[data-action]');
    if (!btn) return;
    const { action, id, title } = btn.dataset;

    if (action === 'edit') {
      const item = comunicados.find(c => c.id === id);
      openComunicadoForm(item, () => renderComunicadosTab(panel));
    }

    if (action === 'delete') {
      if (!confirm(`Excluir "${title}"? Esta ação não pode ser desfeita.`)) return;
      try {
        await deleteComunicado(id);
        showToast('Comunicado excluído');
        renderComunicadosTab(panel);
      } catch (err) {
        showToast('Erro ao excluir: ' + err.message, 'error');
      }
    }
  });
}

// ─── Comunicado form modal ───
function openComunicadoForm(item, onSaved) {
  const isEdit = !!item;
  const tagOptions = NEWS_TAGS.map(t =>
    `<option value="${t.value}" ${item?.tag === t.value ? 'selected' : ''}>${t.label}</option>`
  ).join('');

  const gradientOptions = GRADIENTS.map((g, i) =>
    `<option value="${g}" ${(item?.gradient || GRADIENTS[0]) === g ? 'selected' : ''}>Gradiente ${i + 1}</option>`
  ).join('');

  const countryOptions = ['all', ...COUNTRIES.map(c => c.code)].map(code =>
    `<option value="${code}" ${(item?.country || 'all') === code ? 'selected' : ''}>
      ${code === 'all' ? 'Todos os países' : (COUNTRIES.find(c => c.code === code)?.name || code)}
    </option>`
  ).join('');

  openFormModal({
    title: isEdit ? 'Editar comunicado' : 'Novo comunicado',
    size: 'lg',
    body: `
      <form class="admin-form" id="comunicado-form">
        <div class="form-field">
          <label class="form-label">Título <span>*</span></label>
          <input class="form-input" name="title" required placeholder="Ex: Pagamento de salários — Maio 2025" value="${item?.title || ''}" />
        </div>
        <div class="form-field">
          <label class="form-label">Resumo <span>*</span></label>
          <textarea class="form-textarea" name="excerpt" required placeholder="Breve descrição para aparecer nos cards">${item?.excerpt || ''}</textarea>
        </div>
        <div class="form-row">
          <div class="form-field">
            <label class="form-label">Categoria <span>*</span></label>
            <select class="form-select" name="tag">${tagOptions}</select>
          </div>
          <div class="form-field">
            <label class="form-label">Autor</label>
            <input class="form-input" name="author" placeholder="Nome do autor" value="${item?.author || 'Equipe RH'}" />
          </div>
        </div>
        <div class="form-row">
          <div class="form-field">
            <label class="form-label">Data <span>*</span></label>
            <input class="form-input" type="date" name="date" required value="${item?.date || new Date().toISOString().slice(0,10)}" />
          </div>
          <div class="form-field">
            <label class="form-label">Tempo de leitura</label>
            <input class="form-input" name="readTime" placeholder="Ex: 3 min" value="${item?.readTime || '2 min'}" />
          </div>
        </div>
        <div class="form-row">
          <div class="form-field">
            <label class="form-label">País</label>
            <select class="form-select" name="country">${countryOptions}</select>
          </div>
          <div class="form-field">
            <label class="form-label">Gradiente do card</label>
            <select class="form-select" name="gradient">${gradientOptions}</select>
          </div>
        </div>
        <div class="form-field">
          <label class="form-label">URL da imagem de capa</label>
          <input class="form-input" name="image" type="url" placeholder="https://... (opcional)" value="${item?.image || ''}" />
          <span class="form-hint">Deixe em branco para usar o gradiente como fundo.</span>
        </div>
        <div class="form-field">
          <label class="form-label">Conteúdo (HTML) <span>*</span></label>
          <textarea class="form-textarea tall" name="body" required placeholder="<p>Prezados colaboradores...</p>">${item?.body || ''}</textarea>
          <span class="form-hint">Suporta tags HTML: &lt;p&gt; &lt;h2&gt; &lt;h3&gt; &lt;ul&gt; &lt;li&gt; &lt;strong&gt; &lt;em&gt; &lt;a&gt;</span>
        </div>
        <label class="form-check">
          <input type="checkbox" name="published" ${item?.published ? 'checked' : ''} />
          <span class="form-check-label">Publicar imediatamente</span>
        </label>
      </form>`,
    footer: `
      <button class="btn btn-ghost" id="modal-cancel-btn">Cancelar</button>
      <button class="btn btn-primary" id="modal-save-btn">
        <svg width="14" height="14"><use href="#icon-check"/></svg>
        ${isEdit ? 'Salvar alterações' : 'Publicar comunicado'}
      </button>`,
  });

  document.getElementById('modal-cancel-btn').onclick = closeModal;

  document.getElementById('modal-save-btn').onclick = async () => {
    const form = document.getElementById('comunicado-form');
    if (!form.reportValidity()) return;

    const fd = new FormData(form);
    const data = {
      title:     fd.get('title').trim(),
      excerpt:   fd.get('excerpt').trim(),
      tag:       fd.get('tag'),
      author:    fd.get('author').trim() || 'Equipe RH',
      date:      fd.get('date'),
      readTime:  fd.get('readTime').trim() || '2 min',
      country:   fd.get('country'),
      gradient:  fd.get('gradient'),
      image:     fd.get('image').trim() || null,
      body:      fd.get('body').trim(),
      published: form.querySelector('[name=published]').checked,
    };

    const saveBtn = document.getElementById('modal-save-btn');
    saveBtn.disabled = true;
    saveBtn.textContent = 'Salvando...';

    try {
      await saveComunicado(data, isEdit ? item.id : null);
      closeModal();
      showToast(isEdit ? 'Comunicado atualizado!' : 'Comunicado criado!');
      onSaved();
    } catch (err) {
      showToast('Erro ao salvar: ' + err.message, 'error');
      saveBtn.disabled = false;
      saveBtn.innerHTML = `<svg width="14" height="14"><use href="#icon-check"/></svg> ${isEdit ? 'Salvar alterações' : 'Publicar comunicado'}`;
    }
  };
}

// ─── Visibility Tab ───
async function renderVisibilityTab(panel) {
  panel.innerHTML = `<div class="admin-spinner"><div class="spinner"></div></div>`;

  let config = {};
  try {
    config = await fetchVisibility();
  } catch (e) {
    // Empty config is fine — default to all visible
  }

  // Build state object: { BR: { rh: true, financeiro: true, ... }, MX: {...} }
  const state = {};
  COUNTRIES.forEach(c => {
    state[c.code] = {};
    SECTIONS.forEach(s => {
      const stored = config[c.code]?.sections?.[s.key];
      state[c.code][s.key] = stored !== false; // default visible
    });
  });

  panel.innerHTML = `
    <div class="admin-toolbar">
      <div>
        <h2>Visibilidade por País</h2>
        <p class="body-sm text-muted" style="margin:0">Controle quais seções do portal cada país pode ver.</p>
      </div>
    </div>
    <div class="visibility-grid" id="visibility-grid"></div>
    <div class="visibility-save-bar">
      <span class="body-sm text-muted" id="visibility-status"></span>
      <button class="btn btn-primary" id="btn-save-visibility">Salvar configurações</button>
    </div>`;

  const grid = panel.querySelector('#visibility-grid');

  COUNTRIES.forEach(country => {
    const card = document.createElement('div');
    card.className = 'visibility-card';
    card.innerHTML = `
      <h3>${country.flag} ${country.name}</h3>
      ${SECTIONS.map(sec => `
        <div class="visibility-item">
          <span>${sec.label}</span>
          <label class="toggle" title="${sec.label}">
            <input type="checkbox" data-country="${country.code}" data-section="${sec.key}"
              ${state[country.code][sec.key] ? 'checked' : ''} />
            <span class="toggle-slider"></span>
          </label>
        </div>`).join('')}`;
    grid.appendChild(card);
  });

  // Track changes
  grid.querySelectorAll('input[type=checkbox]').forEach(cb => {
    cb.addEventListener('change', () => {
      const { country, section } = cb.dataset;
      state[country][section] = cb.checked;
    });
  });

  panel.querySelector('#btn-save-visibility').addEventListener('click', async () => {
    const btn = panel.querySelector('#btn-save-visibility');
    const status = panel.querySelector('#visibility-status');
    btn.disabled = true;
    btn.textContent = 'Salvando...';
    status.textContent = '';

    try {
      await Promise.all(
        COUNTRIES.map(c => saveVisibility(c.code, state[c.code]))
      );
      showToast('Visibilidade salva!');
      status.textContent = `Salvo às ${new Intl.DateTimeFormat('pt-BR', { timeStyle: 'short' }).format(new Date())}`;
    } catch (err) {
      showToast('Erro ao salvar: ' + err.message, 'error');
    } finally {
      btn.disabled = false;
      btn.textContent = 'Salvar configurações';
    }
  });
}

// ─── Main render ───
export function renderAdmin(container) {
  // Guard: Firebase must be configured
  if (!FIREBASE_CONFIGURED) {
    container.innerHTML = `
      <div class="admin-wrap">
        <div class="admin-login">
          <div class="admin-login-card">
            <div class="admin-login-icon">
              <svg width="32" height="32"><use href="#icon-shield"/></svg>
            </div>
            <h2>Painel Admin</h2>
            <p>Firebase ainda não está configurado.<br>Preencha os valores em <code>scripts/firebase.js</code> para ativar o painel.</p>
            <a href="#/" class="btn btn-ghost" style="width:100%;justify-content:center">← Voltar ao início</a>
          </div>
        </div>
      </div>`;
    return;
  }

  // Show login screen initially; auth state will redirect
  container.innerHTML = `
    <div class="admin-wrap">
      <div class="admin-login" id="admin-login-screen">
        <div class="admin-login-card">
          <div class="admin-login-icon">
            <svg width="32" height="32"><use href="#icon-shield"/></svg>
          </div>
          <h2>Painel Admin</h2>
          <p>Acesso restrito a contas <strong>@mc1global.com</strong></p>
          <button class="btn-google" id="btn-google-login">
            <svg width="18" height="18" viewBox="0 0 18 18">
              <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z"/>
              <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z"/>
              <path fill="#FBBC05" d="M3.964 10.706A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.706V4.962H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.038l3.007-2.332z"/>
              <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.962L3.964 7.294C4.672 5.163 6.656 3.58 9 3.58z"/>
            </svg>
            Entrar com Google
          </button>
          <p class="admin-login-note">Apenas contas @mc1global.com são autorizadas</p>
        </div>
      </div>
    </div>`;

  // Lazily init Firebase Auth
  _initAuth(container);
}

async function _initAuth(container) {
  let GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut;
  try {
    const authModule = await import('https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js');
    GoogleAuthProvider  = authModule.GoogleAuthProvider;
    signInWithPopup     = authModule.signInWithPopup;
    onAuthStateChanged  = authModule.onAuthStateChanged;
    signOut             = authModule.signOut;
  } catch (e) {
    showToast('Erro ao carregar Firebase Auth', 'error');
    return;
  }

  // Google login button
  const loginBtn = container.querySelector('#btn-google-login');
  if (loginBtn) {
    loginBtn.addEventListener('click', async () => {
      loginBtn.disabled = true;
      loginBtn.textContent = 'Entrando...';
      try {
        const provider = new GoogleAuthProvider();
        provider.setCustomParameters({ hd: 'mc1global.com' });
        await signInWithPopup(auth, provider);
      } catch (err) {
        loginBtn.disabled = false;
        loginBtn.innerHTML = `<svg width="18" height="18" viewBox="0 0 18 18"><path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z"/><path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z"/><path fill="#FBBC05" d="M3.964 10.706A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.706V4.962H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.038l3.007-2.332z"/><path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.962L3.964 7.294C4.672 5.163 6.656 3.58 9 3.58z"/></svg> Entrar com Google`;
        if (err.code !== 'auth/popup-closed-by-user') {
          showToast('Falha no login: ' + err.message, 'error');
        }
      }
    });
  }

  // Auth state observer — renders dashboard or login
  onAuthStateChanged(auth, (user) => {
    if (!user) {
      _renderLogin(container);
      return;
    }

    const email = user.email || '';
    if (!email.endsWith('@mc1global.com')) {
      signOut(auth);
      showToast('Acesso negado: use uma conta @mc1global.com', 'error');
      return;
    }

    _renderDashboard(container, user, () => signOut(auth).then(() => _renderLogin(container)));
  });
}

// ─── Re-render login ───
function _renderLogin(container) {
  container.querySelector('.admin-wrap').innerHTML = `
    <div class="admin-login" id="admin-login-screen">
      <div class="admin-login-card">
        <div class="admin-login-icon">
          <svg width="32" height="32"><use href="#icon-shield"/></svg>
        </div>
        <h2>Painel Admin</h2>
        <p>Acesso restrito a contas <strong>@mc1global.com</strong></p>
        <button class="btn-google" id="btn-google-login">
          <svg width="18" height="18" viewBox="0 0 18 18">
            <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z"/>
            <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z"/>
            <path fill="#FBBC05" d="M3.964 10.706A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.706V4.962H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.038l3.007-2.332z"/>
            <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.962L3.964 7.294C4.672 5.163 6.656 3.58 9 3.58z"/></svg>
          Entrar com Google
        </button>
        <p class="admin-login-note">Apenas contas @mc1global.com são autorizadas</p>
      </div>
    </div>`;
  // Re-init auth (reattach listener on new DOM)
  _initAuth(container);
}

// ─── Dashboard ───
function _renderDashboard(container, user, onSignOut) {
  const initials = (user.displayName || user.email || 'A').split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();

  container.querySelector('.admin-wrap').innerHTML = `
    <!-- Admin Header -->
    <header class="admin-header">
      <div class="container admin-header-inner">
        <a href="#/" class="admin-logo">
          <svg width="20" height="20"><use href="#icon-home"/></svg>
          MC1 Hub
          <span class="admin-badge">Admin</span>
        </a>
        <div class="admin-user">
          ${user.photoURL
            ? `<img src="${user.photoURL}" alt="" class="admin-avatar" />`
            : `<div class="admin-avatar-fallback">${initials}</div>`}
          <span>${user.displayName || user.email}</span>
          <button class="btn btn-ghost btn-sm" id="btn-signout">Sair</button>
        </div>
      </div>
    </header>

    <!-- Tabs -->
    <nav class="admin-tabs">
      <div class="container" style="display:flex;padding-left:var(--space-4);padding-right:var(--space-4)">
        <button class="admin-tab-btn active" data-panel="comunicados">
          <svg width="14" height="14"><use href="#icon-newspaper"/></svg>
          Comunicados
        </button>
        <button class="admin-tab-btn" data-panel="visibilidade">
          <svg width="14" height="14"><use href="#icon-globe"/></svg>
          Visibilidade por País
        </button>
      </div>
    </nav>

    <!-- Tab Panels -->
    <div class="container">
      <div id="admin-panel-comunicados" class="admin-tab-panel active"></div>
      <div id="admin-panel-visibilidade" class="admin-tab-panel"></div>
    </div>`;

  // Sign out
  container.querySelector('#btn-signout').addEventListener('click', onSignOut);

  // Tab switching
  const tabBtns = container.querySelectorAll('.admin-tab-btn');
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.toggle('active', b === btn));
      const panelName = btn.dataset.panel;
      container.querySelectorAll('.admin-tab-panel').forEach(p => {
        p.classList.toggle('active', p.id === `admin-panel-${panelName}`);
      });
      // Lazy-render tabs on first activation
      if (panelName === 'visibilidade') {
        const panel = container.querySelector('#admin-panel-visibilidade');
        if (!panel.dataset.loaded) {
          panel.dataset.loaded = '1';
          renderVisibilityTab(panel);
        }
      }
    });
  });

  // Load comunicados immediately
  renderComunicadosTab(container.querySelector('#admin-panel-comunicados'));
}
