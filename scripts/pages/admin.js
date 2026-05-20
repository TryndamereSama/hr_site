// MC1 HUB — Admin Panel

import { FIREBASE_CONFIGURED, db, auth } from '../firebase.js';
import { invalidateNoticiasCache, noticias as staticNoticias } from '../data/noticias.js';
import { t } from '../i18n.js';
import {
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
} from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js';

// ─── Allowed admin accounts (fase de testes) ───
const ALLOWED_TEST_EMAILS = [
  'thevinivini100@gmail.com',
];

// ─── Constants ───
const COUNTRIES = [
  { code: 'BR', name: 'Brasil',          flag: '🇧🇷', langLabel: 'PT / Brasil' },
  { code: 'MX', name: 'América Latina',  flag: '🇲🇽', langLabel: 'ES / América Latina' },
  { code: 'US', name: 'Global / EN',     flag: '🌍',  langLabel: 'EN / Global' },
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
  const { collection, getDocs, addDoc, updateDoc, deleteDoc, setDoc, doc, query, orderBy, serverTimestamp } =
    await import('https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js');
  return { collection, getDocs, addDoc, updateDoc, deleteDoc, setDoc, doc, query, orderBy, serverTimestamp };
}

async function fetchComunicados() {
  const fs = await _getFirestore();
  // No orderBy → no composite index required; sort client-side
  const snap = await fs.getDocs(fs.collection(db, 'comunicados'));
  return snap.docs
    .map(d => ({ id: d.id, ...d.data() }))
    .sort((a, b) => new Date(b.date) - new Date(a.date));
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
  // Use setDoc with merge so doc is created if it doesn't exist yet (e.g. 'US')
  await fs.setDoc(fs.doc(db, 'config', country), { sections }, { merge: true });
}

// ─── Migrate static noticias → Firestore ───
async function migrateStaticNoticias(panel) {
  if (!confirm(`Importar ${staticNoticias.length} artigos estáticos para o Firestore?\n\nArtigos com ID já existente serão ignorados.`)) return;

  const fs = await _getFirestore();
  const { collection, getDocs, setDoc, doc } = fs;

  // Fetch existing IDs to skip duplicates
  const snap = await getDocs(collection(db, 'comunicados'));
  const existingIds = new Set(snap.docs.map(d => d.id));

  let added = 0, skipped = 0;
  const errors = [];

  for (const n of staticNoticias) {
    if (existingIds.has(n.id)) { skipped++; continue; }
    try {
      // Map static countries array → new countries array format
      const srcCountries = n.countries || [];
      const countries = srcCountries.includes('ALL') || srcCountries.length === 0
        ? ['BR', 'MX', 'US']
        : srcCountries.filter(c => ['BR', 'MX', 'US'].includes(c));
      await setDoc(doc(db, 'comunicados', n.id), {
        title:     n.title,
        excerpt:   n.excerpt || '',
        tag:       n.tag || 'comunicado',
        author:    n.author || 'Equipe RH',
        date:      n.date,
        readTime:  n.readTime || '2 min',
        countries,
        gradient:  n.gradient || GRADIENTS[0],
        image:     n.image || null,
        body:      n.body || '',
        published: true,
        featured:  n.featured || false,
      });
      added++;
    } catch (e) {
      errors.push(`${n.id}: ${e.message}`);
    }
  }

  invalidateNoticiasCache();

  if (errors.length) {
    showToast(`${added} importados, ${skipped} ignorados, ${errors.length} erros`, 'error');
    console.error('[Migrate] Erros:', errors);
  } else {
    showToast(`${added} artigos importados! ${skipped} já existiam.`, 'success');
  }

  // Reload table
  renderComunicadosTab(panel);
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
  let fetchError = null;
  try {
    comunicados = await fetchComunicados();
  } catch (e) {
    fetchError = e.message;
  }

  const tableRows = fetchError
    ? `<tr><td colspan="5"><div class="admin-empty"><p style="color:var(--color-error,#dc2626)">Erro ao carregar: ${fetchError}</p></div></td></tr>`
    : comunicados.length === 0
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
      <div style="display:flex;gap:var(--space-2)">
        <button class="btn btn-ghost btn-sm" id="btn-migrate-noticias" title="Importar artigos estáticos do código para o Firestore">
          <svg width="14" height="14"><use href="#icon-upload"/></svg>Importar estáticos
        </button>
        <button class="btn btn-primary" id="btn-new-comunicado">
          <svg width="14" height="14"><use href="#icon-plus"/></svg>Novo comunicado
        </button>
      </div>
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

  // Migrate static noticias
  panel.querySelector('#btn-migrate-noticias').addEventListener('click', () => migrateStaticNoticias(panel));

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

// ─── Template definitions ───
const TEMPLATES = [
  { value: 'livre',           label: '📝 Livre — HTML direto' },
  { value: 'comunicado',      label: '📢 Comunicado Geral' },
  { value: 'aniversariantes', label: '🎂 Aniversariantes' },
  { value: 'evento',          label: '🎤 Evento / Palestra' },
  { value: 'boasvindas',      label: '👋 Boas-vindas' },
  { value: 'pagamento',       label: '💰 Pagamento / RH' },
  { value: 'beneficio',       label: '⭐ Benefício / Programa' },
];

const COUNTRY_FLAGS = { BR:'🇧🇷', MX:'🇲🇽', AR:'🇦🇷', CO:'🇨🇴', CL:'🇨🇱', PE:'🇵🇪' };

// ─── Template field renderers ───
function _tplFields(tpl, td) {
  const d = td || {};
  switch (tpl) {

    case 'aniversariantes': {
      const entries = (d.entries || [{ flag:'🇧🇷', day:'', name:'', dept:'' }])
        .map((e,i) => _birthdayRow(e, i)).join('');
      return `
        <div class="form-field">
          <label class="form-label">Mês e Ano <span>*</span></label>
          <input class="form-input" name="tpl_month" required placeholder="Ex: Maio de 2026" value="${d.month||''}" />
        </div>
        <div class="form-field">
          <label class="form-label">Aniversariantes</label>
          <div id="birthday-list" style="display:flex;flex-direction:column;gap:var(--space-2)">${entries}</div>
          <button type="button" class="btn btn-ghost btn-sm" id="btn-add-birthday" style="margin-top:var(--space-2);align-self:flex-start">
            + Adicionar aniversariante
          </button>
        </div>`;
    }

    case 'evento': {
      return `
        <div class="form-field">
          <label class="form-label">Texto de introdução</label>
          <textarea class="form-textarea" name="tpl_intro" placeholder="A MC1 Global convida...">${d.intro||''}</textarea>
        </div>
        <div class="form-row">
          <div class="form-field">
            <label class="form-label">Data do evento <span>*</span></label>
            <input class="form-input" name="tpl_event_date" required placeholder="Ex: 18 de março de 2026" value="${d.event_date||''}" />
          </div>
          <div class="form-field">
            <label class="form-label">Horário</label>
            <input class="form-input" name="tpl_event_time" placeholder="Ex: 15h00 (BRT)" value="${d.event_time||''}" />
          </div>
        </div>
        <div class="form-row">
          <div class="form-field">
            <label class="form-label">Formato</label>
            <select class="form-select" name="tpl_event_format">
              ${['Online','Presencial','Híbrido'].map(f=>`<option ${d.event_format===f?'selected':''}>${f}</option>`).join('')}
            </select>
          </div>
          <div class="form-field">
            <label class="form-label">Nome do palestrante</label>
            <input class="form-input" name="tpl_speaker_name" placeholder="Nome completo" value="${d.speaker_name||''}" />
          </div>
        </div>
        <div class="form-field">
          <label class="form-label">Bio do palestrante</label>
          <textarea class="form-textarea" name="tpl_speaker_bio" placeholder="Enfermeira com 12 anos de experiência...">${d.speaker_bio||''}</textarea>
        </div>
        <div class="form-field">
          <label class="form-label">Texto de encerramento</label>
          <textarea class="form-textarea" name="tpl_closing" placeholder="Salve a data na sua agenda...">${d.closing||''}</textarea>
        </div>`;
    }

    case 'boasvindas': {
      const companies = (d.companies || ['']).map((c,i)=>
        `<div class="tpl-list-row" style="display:flex;gap:var(--space-2)">
          <input class="form-input" name="tpl_company" placeholder="Nome da empresa" value="${c}" style="flex:1"/>
          <button type="button" class="btn btn-ghost btn-sm tpl-remove-row">✕</button>
        </div>`).join('');
      return `
        <div class="form-field">
          <label class="form-label">Nome completo <span>*</span></label>
          <input class="form-input" name="tpl_person_name" required placeholder="Ex: Gilberto Márquez Ramírez" value="${d.person_name||''}" />
        </div>
        <div class="form-field">
          <label class="form-label">Cargo / Função <span>*</span></label>
          <input class="form-input" name="tpl_role" required placeholder="Ex: Diretor Comercial para México e América Central" value="${d.role||''}" />
        </div>
        <div class="form-row">
          <div class="form-field">
            <label class="form-label">Anos de experiência</label>
            <input class="form-input" name="tpl_exp_years" placeholder="Ex: 26" value="${d.exp_years||''}" />
          </div>
          <div class="form-field">
            <label class="form-label">Segmento / setor</label>
            <input class="form-input" name="tpl_sector" placeholder="Ex: tecnologia e negócios" value="${d.sector||''}" />
          </div>
        </div>
        <div class="form-field">
          <label class="form-label">Empresas anteriores</label>
          <div id="companies-list" style="display:flex;flex-direction:column;gap:var(--space-2)">${companies}</div>
          <button type="button" class="btn btn-ghost btn-sm" id="btn-add-company" style="margin-top:var(--space-2)">+ Adicionar empresa</button>
        </div>
        <div class="form-field">
          <label class="form-label">Áreas de atuação / expertise</label>
          <input class="form-input" name="tpl_expertise" placeholder="Ex: CPG, Consumo, Serviços e Consultoria" value="${d.expertise||''}" />
        </div>
        <div class="form-field">
          <label class="form-label">Mensagem de boas-vindas</label>
          <textarea class="form-textarea" name="tpl_welcome_msg" placeholder="Sejam muito bem-vindos!...">${d.welcome_msg||'Seja muito bem-vindo(a)! Estamos muito felizes em tê-lo(a) na equipe MC1. 🎉'}</textarea>
        </div>`;
    }

    case 'comunicado':
    case 'pagamento': {
      const sections = (d.sections || [{ title:'', content:'' }]).map((s,i)=>_sectionRow(s,i)).join('');
      return `
        ${tpl==='comunicado'?`<div class="form-field">
          <label class="form-label">Texto de introdução</label>
          <textarea class="form-textarea" name="tpl_intro" placeholder="A MC1 Global informa...">${d.intro||''}</textarea>
        </div>`:''}
        <div class="form-field">
          <label class="form-label">Seções</label>
          <div id="sections-list" style="display:flex;flex-direction:column;gap:var(--space-4)">${sections}</div>
          <button type="button" class="btn btn-ghost btn-sm" id="btn-add-section" style="margin-top:var(--space-2)">+ Adicionar seção</button>
        </div>
        <div class="form-field">
          <label class="form-check" style="cursor:pointer">
            <input type="checkbox" name="tpl_show_callout" ${d.show_callout!==false?'checked':''} />
            <span class="form-check-label">Mostrar box de contato (Dúvidas? Entre em contato com o RH)</span>
          </label>
          <input class="form-input" name="tpl_callout_email" placeholder="rh@mc1global.com" value="${d.callout_email||'rh@mc1global.com'}" style="margin-top:var(--space-2)" />
        </div>`;
    }

    case 'beneficio': {
      const steps = (d.steps || ['']).map((s,i)=>
        `<div class="tpl-list-row" style="display:flex;gap:var(--space-2);align-items:flex-start">
          <span style="font-weight:700;color:var(--color-primary);min-width:24px;padding-top:10px">${i+1}.</span>
          <input class="form-input" name="tpl_step" placeholder="Passo ${i+1}" value="${s}" style="flex:1"/>
          <button type="button" class="btn btn-ghost btn-sm tpl-remove-row" style="margin-top:4px">✕</button>
        </div>`).join('');
      return `
        <div class="form-field">
          <label class="form-label">Texto de introdução <span>*</span></label>
          <textarea class="form-textarea" name="tpl_intro" required placeholder="Com a MC1 você tem acesso ao...">${d.intro||''}</textarea>
        </div>
        <div class="form-field">
          <label class="form-label">Nome do benefício / programa</label>
          <input class="form-input" name="tpl_benefit_name" placeholder="Ex: Zenklub" value="${d.benefit_name||''}" />
        </div>
        <div class="form-field">
          <label class="form-label">Como participar / usar</label>
          <div id="steps-list" style="display:flex;flex-direction:column;gap:var(--space-2)">${steps}</div>
          <button type="button" class="btn btn-ghost btn-sm" id="btn-add-step" style="margin-top:var(--space-2)">+ Adicionar passo</button>
        </div>
        <div class="form-field">
          <label class="form-label">Detalhe / valor do benefício</label>
          <textarea class="form-textarea" name="tpl_benefit_detail" placeholder="Você tem acesso a...">${d.benefit_detail||''}</textarea>
        </div>
        <div class="form-field">
          <label class="form-check" style="cursor:pointer">
            <input type="checkbox" name="tpl_show_callout" ${d.show_callout!==false?'checked':''} />
            <span class="form-check-label">Mostrar box de contato</span>
          </label>
          <input class="form-input" name="tpl_callout_email" placeholder="rh@mc1global.com" value="${d.callout_email||'rh@mc1global.com'}" style="margin-top:var(--space-2)" />
        </div>`;
    }

    default: // livre
      return `
        <div class="form-field">
          <label class="form-label">Conteúdo (HTML) <span>*</span></label>
          <textarea class="form-textarea tall" name="body" required placeholder="<p>Prezados colaboradores...</p>">${d.body||''}</textarea>
          <span class="form-hint">Tags: &lt;p&gt; &lt;h3&gt; &lt;ul&gt; &lt;li&gt; &lt;strong&gt; &lt;em&gt; &lt;a&gt; &lt;img&gt;</span>
        </div>`;
  }
}

function _birthdayRow(e, i) {
  const flagOptions = Object.entries(COUNTRY_FLAGS).map(([code, flag]) =>
    `<option value="${flag}" ${e.flag===flag?'selected':''}>${flag} ${code}</option>`).join('');
  return `<div class="tpl-list-row birthday-row" style="display:grid;grid-template-columns:90px 55px 1fr 1fr auto;gap:var(--space-2);align-items:center">
    <select class="form-select" name="tpl_flag" style="padding:6px 4px">${flagOptions}</select>
    <input class="form-input" name="tpl_day" placeholder="Dia" value="${e.day||''}" style="text-align:center" />
    <input class="form-input" name="tpl_name" placeholder="Nome completo" value="${e.name||''}" />
    <input class="form-input" name="tpl_dept" placeholder="Área / Cargo" value="${e.dept||''}" />
    <button type="button" class="btn btn-ghost btn-sm tpl-remove-row" title="Remover">✕</button>
  </div>`;
}

function _sectionRow(s, i) {
  return `<div class="tpl-list-row section-row" style="display:flex;flex-direction:column;gap:var(--space-2);padding:var(--space-3);background:var(--color-surface-container-low);border-radius:var(--radius-lg)">
    <div style="display:flex;gap:var(--space-2);align-items:center">
      <input class="form-input" name="tpl_section_title" placeholder="Título da seção (H3)" value="${s.title||''}" style="flex:1" />
      <button type="button" class="btn btn-ghost btn-sm tpl-remove-row" title="Remover seção">✕</button>
    </div>
    <textarea class="form-textarea" name="tpl_section_content" placeholder="Conteúdo da seção...">${s.content||''}</textarea>
  </div>`;
}

// ─── Body HTML generators ───
function _buildBodyFromTemplate(form, tpl, imageUrl) {
  const v = n => (form.querySelector(`[name=${n}]`)?.value || '').trim();
  const img = (src, alt) => src ? `<img src="${src}" alt="${alt}" style="width:100%; border-radius:12px; margin-bottom:1.5rem;" />\n` : '';
  const callout = (email) => `<p style="margin-top:1.5rem;padding:1rem 1.25rem;background:var(--color-surface-container-low);border-left:3px solid var(--color-primary);border-radius:0 var(--radius-md) var(--radius-md) 0;">Dúvidas? Entre em contato com o RH pelo e-mail <strong>${email}</strong>.</p>`;

  switch (tpl) {
    case 'aniversariantes': {
      const month = v('tpl_month');
      const rows = form.querySelectorAll('.birthday-row');
      const items = Array.from(rows).map(row => {
        const flag = row.querySelector('[name=tpl_flag]').value;
        const day  = row.querySelector('[name=tpl_day]').value.padStart(2,'0');
        const name = row.querySelector('[name=tpl_name]').value.trim();
        const dept = row.querySelector('[name=tpl_dept]').value.trim();
        return `        <li>${flag} <strong>${day}</strong> — ${name}${dept?' · '+dept:''}</li>`;
      }).join('\n');
      const year = new Date().getFullYear();
      return `${img(imageUrl, `Aniversariantes de ${month}`)}<p>A MC1 Global celebra junto com todos os colaboradores que completam mais um ano de vida em ${month}. Este é um momento especial para reconhecer cada pessoa que faz parte da nossa equipe!</p>\n<h3>Aniversariantes do Mês</h3>\n<ul style="padding-left:1.5rem;margin:1rem 0;display:flex;flex-direction:column;gap:0.5rem;">\n${items}\n</ul>\n<h3>Day Off de Aniversário 🎁</h3>\n<p>Todo aniversariante ganha um dia livre para comemorar da forma que quiser — basta alinhar a data com sua liderança. Não quer folgar exatamente no dia? Sem problema! Você pode escolher outra data dentro do mesmo ano.</p>\n<p>E tem mais: no mês do seu aniversário você também recebe um <strong>crédito de R$ 50,00 no cartão Flash</strong> para aproveitar do seu jeito!</p>\n<p>Que ${year} seja repleto de conquistas, saúde e realizações para todos! 🎉</p>`.trim();
    }

    case 'evento': {
      const intro = v('tpl_intro');
      const eDate = v('tpl_event_date');
      const eTime = v('tpl_event_time');
      const eFormat = v('tpl_event_format');
      const sName = v('tpl_speaker_name');
      const sBio  = v('tpl_speaker_bio');
      const closing = v('tpl_closing');
      let out = img(imageUrl, 'Evento');
      if (intro) out += `<p>${intro}</p>\n`;
      out += `<h3>Detalhes do Evento</h3>\n<ul style="padding-left:1.5rem;margin:1rem 0;display:flex;flex-direction:column;gap:0.5rem;">\n`;
      if (eDate)   out += `  <li><strong>Data:</strong> ${eDate}</li>\n`;
      if (eTime)   out += `  <li><strong>Horário:</strong> ${eTime}</li>\n`;
      if (eFormat) out += `  <li><strong>Formato:</strong> ${eFormat}</li>\n`;
      out += `</ul>\n`;
      if (sName || sBio) {
        out += `<h3>Sobre o Palestrante</h3>\n`;
        if (sName && sBio) out += `<p><strong>${sName}</strong> — ${sBio}</p>\n`;
        else if (sBio) out += `<p>${sBio}</p>\n`;
      }
      if (closing) out += `<p>${closing}</p>\n`;
      return out.trim();
    }

    case 'boasvindas': {
      const pName   = v('tpl_person_name');
      const role    = v('tpl_role');
      const expYears= v('tpl_exp_years');
      const sector  = v('tpl_sector');
      const expertise = v('tpl_expertise');
      const welcomeMsg = v('tpl_welcome_msg');
      const companies = Array.from(form.querySelectorAll('[name=tpl_company]'))
        .map(i => i.value.trim()).filter(Boolean);
      let out = img(imageUrl, `Boas-vindas ${pName}`);
      out += `<p>A MC1 Global tem o prazer de anunciar a chegada de <strong>${pName}</strong>, que assume o cargo de <strong>${role}</strong>.</p>\n`;
      if (expYears || sector) {
        out += `<h3>Trajetória Profissional</h3>\n<p>${pName} traz consigo${expYears?` <strong>${expYears} anos de experiência</strong>`:''}${sector?` no setor de ${sector}`:''}${companies.length?', com passagens por empresas de grande relevância no mercado:':'.'}${!companies.length?'':''}</p>\n`;
        if (companies.length) {
          out += `<ul style="padding-left:1.5rem;margin:1rem 0;display:flex;flex-direction:column;gap:0.5rem;">\n`;
          companies.forEach(c => { out += `  <li><strong>${c}</strong></li>\n`; });
          out += `</ul>\n`;
        }
      }
      if (expertise) {
        out += `<h3>Áreas de Atuação</h3>\n<p>Sua expertise abrange os segmentos de <strong>${expertise}</strong>.</p>\n`;
      }
      if (welcomeMsg) out += `<p>${welcomeMsg}</p>\n`;
      return out.trim();
    }

    case 'comunicado':
    case 'pagamento': {
      const intro = v('tpl_intro');
      const showCallout = form.querySelector('[name=tpl_show_callout]')?.checked;
      const calloutEmail = v('tpl_callout_email') || 'rh@mc1global.com';
      const titleRows    = Array.from(form.querySelectorAll('[name=tpl_section_title]'));
      const contentRows  = Array.from(form.querySelectorAll('[name=tpl_section_content]'));
      let out = img(imageUrl, 'Comunicado');
      if (intro) out += `<p>${intro}</p>\n`;
      titleRows.forEach((titleEl, i) => {
        const title   = titleEl.value.trim();
        const content = (contentRows[i]?.value || '').trim();
        if (title) out += `<h3>${title}</h3>\n`;
        if (content) {
          // Auto-detect bullet lists (lines starting with - or •)
          if (content.includes('\n')) {
            const lines = content.split('\n').map(l => l.trim()).filter(Boolean);
            const isList = lines.every(l => l.startsWith('-') || l.startsWith('•'));
            if (isList) {
              out += `<ul style="padding-left:1.5rem;margin:1rem 0;display:flex;flex-direction:column;gap:0.5rem;">\n`;
              lines.forEach(l => { out += `  <li>${l.replace(/^[-•]\s*/,'')}</li>\n`; });
              out += `</ul>\n`;
            } else {
              lines.forEach(l => { out += `<p>${l}</p>\n`; });
            }
          } else {
            out += `<p>${content}</p>\n`;
          }
        }
      });
      if (showCallout) out += callout(calloutEmail);
      return out.trim();
    }

    case 'beneficio': {
      const intro        = v('tpl_intro');
      const benefitName  = v('tpl_benefit_name');
      const benefitDetail= v('tpl_benefit_detail');
      const showCallout  = form.querySelector('[name=tpl_show_callout]')?.checked;
      const calloutEmail = v('tpl_callout_email') || 'rh@mc1global.com';
      const steps = Array.from(form.querySelectorAll('[name=tpl_step]'))
        .map(i => i.value.trim()).filter(Boolean);
      let out = img(imageUrl, benefitName);
      if (intro) out += `<p>${intro}</p>\n`;
      if (steps.length) {
        out += `<h3>Como participar</h3>\n<ul style="padding-left:1.5rem;margin:1rem 0;display:flex;flex-direction:column;gap:0.5rem;">\n`;
        steps.forEach(s => { out += `  <li>${s}</li>\n`; });
        out += `</ul>\n`;
      }
      if (benefitDetail) out += `<h3>Sobre o benefício</h3>\n<p>${benefitDetail}</p>\n`;
      if (showCallout) out += callout(calloutEmail);
      return out.trim();
    }

    default:
      return (form.querySelector('[name=body]')?.value || '').trim();
  }
}

// ─── Extract templateData from existing item ───
function _extractTemplateData(item) {
  // If item has stored templateData, use it
  if (item?.templateData) return item.templateData;
  // Otherwise return body for 'livre' editing
  return { body: item?.body || '' };
}

// ─── Normalise legacy country field → countries array ───
function _itemCountries(item) {
  if (!item) return ['BR', 'MX', 'US']; // new article: all audiences by default
  if (Array.isArray(item.countries) && item.countries.length > 0) return item.countries;
  // Legacy single string
  const c = (item.country || 'all').toLowerCase();
  if (c === 'all') return ['BR', 'MX', 'US'];
  return [c.toUpperCase()];
}

// ─── Comunicado form modal ───
function openComunicadoForm(item, onSaved) {
  const isEdit    = !!item;
  const activeTpl = item?.templateType || 'livre';
  const td        = _extractTemplateData(item);

  const tagOptions = NEWS_TAGS.map(t =>
    `<option value="${t.value}" ${item?.tag === t.value ? 'selected' : ''}>${t.label}</option>`
  ).join('');

  const gradientOptions = GRADIENTS.map((g, i) =>
    `<option value="${g}" ${(item?.gradient || GRADIENTS[0]) === g ? 'selected' : ''}>Gradiente ${i + 1}</option>`
  ).join('');

  const itemCountries = _itemCountries(item);
  const audienceCheckboxes = COUNTRIES.map(c => `
    <label class="form-check" style="flex:1;min-width:140px;cursor:pointer">
      <input type="checkbox" name="countries" value="${c.code}" ${itemCountries.includes(c.code) ? 'checked' : ''} />
      <span class="form-check-label">${c.flag} ${c.langLabel}</span>
    </label>`).join('');

  const templateOptions = TEMPLATES.map(t =>
    `<option value="${t.value}" ${activeTpl === t.value ? 'selected' : ''}>${t.label}</option>`
  ).join('');

  openFormModal({
    title: isEdit ? 'Editar comunicado' : 'Novo comunicado',
    size: 'lg',
    body: `
      <form class="admin-form" id="comunicado-form">
        <!-- Template selector -->
        <div class="form-field" style="background:var(--color-surface-container-low);padding:var(--space-3) var(--space-4);border-radius:var(--radius-lg);border:1px solid var(--color-outline-subtle)">
          <label class="form-label">Tipo de publicação</label>
          <select class="form-select" name="templateType" id="tpl-selector">${templateOptions}</select>
        </div>

        <!-- Common fields -->
        <div class="form-field">
          <label class="form-label">Título <span>*</span></label>
          <input class="form-input" name="title" required placeholder="Ex: Parabéns aos Aniversariantes de Maio!" value="${item?.title || ''}" />
        </div>
        <div class="form-field">
          <label class="form-label">Resumo <span>*</span></label>
          <textarea class="form-textarea" name="excerpt" required placeholder="Breve descrição para o card">${item?.excerpt || ''}</textarea>
        </div>
        <div class="form-row">
          <div class="form-field">
            <label class="form-label">Categoria <span>*</span></label>
            <select class="form-select" name="tag">${tagOptions}</select>
          </div>
          <div class="form-field">
            <label class="form-label">Autor</label>
            <input class="form-input" name="author" value="${item?.author || 'Equipe RH'}" />
          </div>
        </div>
        <div class="form-row">
          <div class="form-field">
            <label class="form-label">Data <span>*</span></label>
            <input class="form-input" type="date" name="date" required value="${item?.date || new Date().toISOString().slice(0,10)}" />
          </div>
          <div class="form-field">
            <label class="form-label">Tempo de leitura</label>
            <input class="form-input" name="readTime" value="${item?.readTime || '2 min'}" />
          </div>
        </div>
        <div class="form-field">
          <label class="form-label">Público-alvo <span>*</span></label>
          <div style="display:flex;gap:var(--space-3);flex-wrap:wrap">${audienceCheckboxes}</div>
          <span class="form-hint">Sem seleção = visível para todos os públicos.</span>
        </div>
        <div class="form-field">
          <label class="form-label">Gradiente do card</label>
          <select class="form-select" name="gradient">${gradientOptions}</select>
        </div>
        <div class="form-row">
          <div class="form-field">
            <label class="form-label">Imagem do card</label>
            <input class="form-input" name="image" id="image-card-input" type="text"
              placeholder="assets/images/capa.jpg"
              value="${item?.image || ''}" />
            <span class="form-hint">Thumbnail exibido na listagem de notícias.</span>
            <div id="image-card-preview-wrap" style="margin-top:var(--space-2);${item?.image ? '' : 'display:none'}">
              <img id="image-card-preview" src="${item?.image || ''}"
                alt="Preview do card"
                style="width:100%;height:90px;object-fit:cover;border-radius:var(--radius-lg);border:1px solid var(--color-outline-subtle);"
                onerror="this.closest('[id]').style.display='none'" />
            </div>
          </div>
          <div class="form-field">
            <label class="form-label">Imagem dentro do artigo</label>
            <input class="form-input" name="bodyImage" id="image-body-input" type="text"
              placeholder="assets/images/detalhe.jpg"
              value="${item?.bodyImage || item?.image || ''}" />
            <span class="form-hint">Imagem exibida no topo do conteúdo do comunicado.</span>
            <div id="image-body-preview-wrap" style="margin-top:var(--space-2);${(item?.bodyImage || item?.image) ? '' : 'display:none'}">
              <img id="image-body-preview" src="${item?.bodyImage || item?.image || ''}"
                alt="Preview do artigo"
                style="width:100%;height:90px;object-fit:cover;border-radius:var(--radius-lg);border:1px solid var(--color-outline-subtle);"
                onerror="this.closest('[id]').style.display='none'" />
            </div>
          </div>
        </div>

        <!-- Template-specific fields (dynamic) -->
        <div id="tpl-fields">${_tplFields(activeTpl, td)}</div>

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

  const form   = document.getElementById('comunicado-form');
  const tplDiv = document.getElementById('tpl-fields');

  // ─── Template selector change ───
  document.getElementById('tpl-selector').addEventListener('change', (e) => {
    tplDiv.innerHTML = _tplFields(e.target.value, {});
    _initTplInteractivity(form, e.target.value);
  });

  // ─── Init interactivity for current template ───
  _initTplInteractivity(form, activeTpl);

  // ─── Live image preview (card + body) ───
  function _bindPreview(inputId, wrapId, previewId) {
    const inp  = document.getElementById(inputId);
    const wrap = document.getElementById(wrapId);
    const img  = document.getElementById(previewId);
    if (!inp || !wrap || !img) return;
    inp.addEventListener('input', () => {
      const val = inp.value.trim();
      if (val) { img.src = val; wrap.style.display = ''; }
      else      { wrap.style.display = 'none'; img.src = ''; }
    });
  }
  _bindPreview('image-card-input', 'image-card-preview-wrap', 'image-card-preview');
  _bindPreview('image-body-input', 'image-body-preview-wrap', 'image-body-preview');

  document.getElementById('modal-cancel-btn').onclick = closeModal;

  document.getElementById('modal-save-btn').onclick = async () => {
    if (!form.reportValidity()) return;

    const fd        = new FormData(form);
    const tpl       = fd.get('templateType');
    const imgCard   = fd.get('image').trim() || null;
    const imgBody   = fd.get('bodyImage').trim() || imgCard; // fallback to card image

    // Build templateData snapshot for re-editing later
    const templateData = _snapshotTemplateData(form, tpl);

    const body = _buildBodyFromTemplate(form, tpl, imgBody);

    if (!body.trim() && tpl !== 'livre') {
      showToast('Preencha o conteúdo antes de salvar', 'error'); return;
    }

    const selectedCountries = fd.getAll('countries'); // ['BR','MX','US'] subset
    const data = {
      title:        fd.get('title').trim(),
      excerpt:      fd.get('excerpt').trim(),
      tag:          fd.get('tag'),
      author:       fd.get('author').trim() || 'Equipe RH',
      date:         fd.get('date'),
      readTime:     fd.get('readTime').trim() || '2 min',
      countries:    selectedCountries.length ? selectedCountries : ['BR', 'MX', 'US'],
      gradient:     fd.get('gradient'),
      image:        imgCard,
      bodyImage:    imgBody,
      body,
      templateType: tpl,
      templateData,
      published:    form.querySelector('[name=published]').checked,
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

// ─── Snapshot template data for re-editing ───
function _snapshotTemplateData(form, tpl) {
  const v = n => (form.querySelector(`[name=${n}]`)?.value || '').trim();
  switch (tpl) {
    case 'aniversariantes': {
      const entries = Array.from(form.querySelectorAll('.birthday-row')).map(row => ({
        flag: row.querySelector('[name=tpl_flag]').value,
        day:  row.querySelector('[name=tpl_day]').value,
        name: row.querySelector('[name=tpl_name]').value.trim(),
        dept: row.querySelector('[name=tpl_dept]').value.trim(),
      }));
      return { month: v('tpl_month'), entries };
    }
    case 'evento':
      return { intro: v('tpl_intro'), event_date: v('tpl_event_date'), event_time: v('tpl_event_time'),
               event_format: v('tpl_event_format'), speaker_name: v('tpl_speaker_name'),
               speaker_bio: v('tpl_speaker_bio'), closing: v('tpl_closing') };
    case 'boasvindas': {
      const companies = Array.from(form.querySelectorAll('[name=tpl_company]')).map(i=>i.value.trim()).filter(Boolean);
      return { person_name: v('tpl_person_name'), role: v('tpl_role'), exp_years: v('tpl_exp_years'),
               sector: v('tpl_sector'), companies, expertise: v('tpl_expertise'), welcome_msg: v('tpl_welcome_msg') };
    }
    case 'comunicado':
    case 'pagamento': {
      const titles   = Array.from(form.querySelectorAll('[name=tpl_section_title]')).map(i=>i.value.trim());
      const contents = Array.from(form.querySelectorAll('[name=tpl_section_content]')).map(i=>i.value.trim());
      const sections = titles.map((t,i) => ({ title: t, content: contents[i]||'' }));
      return { intro: v('tpl_intro'), sections,
               show_callout: form.querySelector('[name=tpl_show_callout]')?.checked,
               callout_email: v('tpl_callout_email') };
    }
    case 'beneficio': {
      const steps = Array.from(form.querySelectorAll('[name=tpl_step]')).map(i=>i.value.trim()).filter(Boolean);
      return { intro: v('tpl_intro'), benefit_name: v('tpl_benefit_name'), steps,
               benefit_detail: v('tpl_benefit_detail'),
               show_callout: form.querySelector('[name=tpl_show_callout]')?.checked,
               callout_email: v('tpl_callout_email') };
    }
    default:
      return { body: (form.querySelector('[name=body]')?.value || '').trim() };
  }
}

// ─── Dynamic row interactivity ───
function _initTplInteractivity(form, tpl) {
  // Generic remove row handler
  form.addEventListener('click', (e) => {
    if (e.target.closest('.tpl-remove-row')) {
      const row = e.target.closest('.tpl-list-row');
      if (row) row.remove();
    }
  });

  if (tpl === 'aniversariantes') {
    const addBtn = form.querySelector('#btn-add-birthday');
    if (addBtn) {
      addBtn.onclick = () => {
        const list = form.querySelector('#birthday-list');
        const idx  = list.querySelectorAll('.birthday-row').length;
        list.insertAdjacentHTML('beforeend', _birthdayRow({flag:'🇧🇷',day:'',name:'',dept:''}, idx));
      };
    }
  }

  if (tpl === 'boasvindas') {
    const addBtn = form.querySelector('#btn-add-company');
    if (addBtn) {
      addBtn.onclick = () => {
        const list = form.querySelector('#companies-list');
        list.insertAdjacentHTML('beforeend',
          `<div class="tpl-list-row" style="display:flex;gap:var(--space-2)">
            <input class="form-input" name="tpl_company" placeholder="Nome da empresa" style="flex:1"/>
            <button type="button" class="btn btn-ghost btn-sm tpl-remove-row">✕</button>
          </div>`);
      };
    }
  }

  if (tpl === 'comunicado' || tpl === 'pagamento') {
    const addBtn = form.querySelector('#btn-add-section');
    if (addBtn) {
      addBtn.onclick = () => {
        const list = form.querySelector('#sections-list');
        const idx  = list.querySelectorAll('.section-row').length;
        list.insertAdjacentHTML('beforeend', _sectionRow({ title:'', content:'' }, idx));
      };
    }
  }

  if (tpl === 'beneficio') {
    const addBtn = form.querySelector('#btn-add-step');
    if (addBtn) {
      addBtn.onclick = () => {
        const list = form.querySelector('#steps-list');
        const idx  = list.querySelectorAll('.tpl-list-row').length;
        list.insertAdjacentHTML('beforeend',
          `<div class="tpl-list-row" style="display:flex;gap:var(--space-2);align-items:flex-start">
            <span style="font-weight:700;color:var(--color-primary);min-width:24px;padding-top:10px">${idx+1}.</span>
            <input class="form-input" name="tpl_step" placeholder="Passo ${idx+1}" style="flex:1"/>
            <button type="button" class="btn btn-ghost btn-sm tpl-remove-row" style="margin-top:4px">✕</button>
          </div>`);
      };
    }
  }
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
          <p>Acesso restrito a administradores</p>
          <button class="btn-google" id="btn-google-login">
            <svg width="18" height="18" viewBox="0 0 18 18">
              <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z"/>
              <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z"/>
              <path fill="#FBBC05" d="M3.964 10.706A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.706V4.962H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.038l3.007-2.332z"/>
              <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.962L3.964 7.294C4.672 5.163 6.656 3.58 9 3.58z"/>
            </svg>
            Entrar com Google
          </button>
          <p class="admin-login-note">Apenas administradores autorizados</p>
        </div>
      </div>
    </div>`;

  // Lazily init Firebase Auth
  _initAuth(container);
}

// ─── Module-level auth state (observer set up only once) ───
let _adminContainer = null;
let _authObserverSetup = false;

const GOOGLE_SVG = `<svg width="18" height="18" viewBox="0 0 18 18"><path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z"/><path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z"/><path fill="#FBBC05" d="M3.964 10.706A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.706V4.962H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.038l3.007-2.332z"/><path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.962L3.964 7.294C4.672 5.163 6.656 3.58 9 3.58z"/></svg>`;

function _initAuth(container) {
  // Always update container reference (may change on re-navigation)
  _adminContainer = container;

  // Event delegation on container — survives any button re-render inside it
  container.addEventListener('click', async (e) => {
    const btn = e.target.closest('#btn-google-login');
    if (!btn) return;

    btn.disabled = true;
    btn.textContent = 'Entrando...';
    try {
      const provider = new GoogleAuthProvider();
      // Re-enable before production: provider.setCustomParameters({ hd: 'mc1global.com' });
      await signInWithPopup(auth, provider);
    } catch (err) {
      btn.disabled = false;
      btn.innerHTML = `${GOOGLE_SVG} Entrar com Google`;
      if (err.code !== 'auth/popup-closed-by-user') {
        showToast('Falha no login: ' + err.message, 'error');
      }
    }
  });

  // Auth state observer — only once for the lifetime of the module
  if (_authObserverSetup) return;
  _authObserverSetup = true;

  onAuthStateChanged(auth, (user) => {
    if (!_adminContainer) return; // admin page not active

    if (!user) {
      // Only re-render if dashboard is showing (not already on login screen)
      if (!_adminContainer.querySelector('#admin-login-screen')) {
        _renderLoginHTML(_adminContainer);
      }
      return;
    }

    const email = user.email || '';
    const isAllowed = ALLOWED_TEST_EMAILS.includes(email);
    if (!isAllowed) {
      signOut(auth);
      showToast('Acesso negado: conta não autorizada', 'error');
      return;
    }

    _renderDashboard(_adminContainer, user, () => {
      signOut(auth).then(() => _renderLoginHTML(_adminContainer));
    });
  });
}

// ─── Render login HTML only (no _initAuth — observer already running) ───
function _renderLoginHTML(container) {
  container.querySelector('.admin-wrap').innerHTML = `
    <div class="admin-login" id="admin-login-screen">
      <div class="admin-login-card">
        <div class="admin-login-icon">
          <svg width="32" height="32"><use href="#icon-shield"/></svg>
        </div>
        <h2>Painel Admin</h2>
        <p>Acesso restrito a administradores</p>
        <button class="btn-google" id="btn-google-login">
          <svg width="18" height="18" viewBox="0 0 18 18">
            <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z"/>
            <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z"/>
            <path fill="#FBBC05" d="M3.964 10.706A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.706V4.962H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.038l3.007-2.332z"/>
            <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.962L3.964 7.294C4.672 5.163 6.656 3.58 9 3.58z"/></svg>
          Entrar com Google
        </button>
        <p class="admin-login-note">Apenas administradores autorizados</p>
      </div>
    </div>`;
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
