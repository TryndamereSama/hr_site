// MC1 HUB — RH Assistant Chat Widget v3.0
// Floating chat bubble + panel connected to the rh_assistant Flask API

const API_URL = window.RH_ASSISTANT_API_URL || 'http://localhost:5000';
const SESSION_KEY = 'rh_chat_authed';

// ─── State ───
let _state = 'login'; // 'login' | 'chat' | 'ticket' | 'success'
let _open = false;
let _messages = []; // { role: 'user'|'bot', text }
let _suggestTicket = false;
let _ticketCategories = [];
let _typing = false;

// ─── Root elements ───
let bubble, panel;

// ─── Init ───
export function initChatWidget() {
  _injectHTML();
  _bindEvents();

  // If user already logged in this session, go straight to chat
  if (sessionStorage.getItem(SESSION_KEY)) {
    _state = 'chat';
  }
  _render();
}

// ─── HTML Injection ───
function _injectHTML() {
  // Bubble button
  bubble = document.createElement('button');
  bubble.id = 'rh-chat-bubble';
  bubble.setAttribute('aria-label', 'Abrir assistente de RH');
  bubble.setAttribute('aria-expanded', 'false');
  bubble.innerHTML = `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
    </svg>`;
  document.body.appendChild(bubble);

  // Chat panel
  panel = document.createElement('div');
  panel.id = 'rh-chat-panel';
  panel.setAttribute('role', 'dialog');
  panel.setAttribute('aria-label', 'RH Assistente');
  panel.setAttribute('aria-hidden', 'true');
  document.body.appendChild(panel);
}

// ─── Render ───
function _render() {
  _renderBubble();
  _renderPanel();
}

function _renderBubble() {
  // Swap icon when open
  if (_open) {
    bubble.innerHTML = `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
      </svg>`;
    bubble.setAttribute('aria-expanded', 'true');
  } else {
    bubble.innerHTML = `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
      </svg>`;
    bubble.setAttribute('aria-expanded', 'false');
  }
}

function _renderPanel() {
  panel.className = _open ? 'open' : '';
  panel.setAttribute('aria-hidden', _open ? 'false' : 'true');

  switch (_state) {
    case 'login':   panel.innerHTML = _loginHTML(); break;
    case 'chat':    panel.innerHTML = _chatHTML();  break;
    case 'ticket':  panel.innerHTML = _ticketHTML(); break;
    case 'success': panel.innerHTML = _successHTML(); break;
  }

  _bindPanelEvents();

  // Scroll chat to bottom
  if (_state === 'chat') {
    const msgs = panel.querySelector('#chat-messages');
    if (msgs) msgs.scrollTop = msgs.scrollHeight;
  }
}

// ─── Screen templates ───
function _loginHTML() {
  return `
    <div class="chat-header">
      <div class="chat-header-avatar">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
        </svg>
      </div>
      <div class="chat-header-info">
        <span class="chat-header-name">RH Assistente</span>
        <span class="chat-header-status">MC1 Global</span>
      </div>
    </div>
    <div class="chat-login-screen">
      <div class="chat-login-icon">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
        </svg>
      </div>
      <h3>Assistente de RH</h3>
      <p>Entre com seu CPF e senha do sistema para acessar o assistente.</p>
      <form id="chat-login-form" novalidate>
        <div class="chat-field">
          <label for="chat-cpf">CPF</label>
          <input id="chat-cpf" type="text" inputmode="numeric" placeholder="000.000.000-00" maxlength="14" autocomplete="username" />
        </div>
        <div class="chat-field">
          <label for="chat-pwd">Senha</label>
          <input id="chat-pwd" type="password" placeholder="Sua senha" autocomplete="current-password" />
        </div>
        <div id="chat-login-error" class="chat-error" style="display:none"></div>
        <button type="submit" class="chat-submit-btn" id="chat-login-btn">Entrar</button>
      </form>
    </div>`;
}

function _chatHTML() {
  const msgHTML = _messages.map(m => {
    if (m.role === 'bot') {
      return `<div class="chat-msg chat-msg-bot"><div class="chat-bubble">${_escapeHTML(m.text)}</div></div>`;
    }
    return `<div class="chat-msg chat-msg-user"><div class="chat-bubble">${_escapeHTML(m.text)}</div></div>`;
  }).join('');

  const typingHTML = _typing ? `
    <div class="chat-msg chat-msg-bot">
      <div class="chat-bubble chat-typing">
        <span></span><span></span><span></span>
      </div>
    </div>` : '';

  const suggestBanner = _suggestTicket ? `
    <div class="chat-suggest-banner">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M14.5 10c-.83 0-1.5-.67-1.5-1.5v-5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5v5c0 .83-.67 1.5-1.5 1.5z"/>
        <path d="M20.5 10H19V8.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>
        <path d="M9.5 14c.83 0 1.5.67 1.5 1.5v5c0 .83-.67 1.5-1.5 1.5S8 21.33 8 20.5v-5c0-.83.67-1.5 1.5-1.5z"/>
        <path d="M3.5 14H5v1.5c0 .83-.67 1.5-1.5 1.5S2 16.33 2 15.5 2.67 14 3.5 14z"/>
        <path d="M14 14.5c0-.83.67-1.5 1.5-1.5h5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5h-5c-.83 0-1.5-.67-1.5-1.5z"/>
        <path d="M15.5 19H14v1.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5-.67-1.5-1.5-1.5z"/>
        <path d="M10 9.5C10 8.67 9.33 8 8.5 8H3.5C2.67 8 2 8.67 2 9.5S2.67 11 3.5 11h5c.83 0 1.5-.67 1.5-1.5z"/>
        <path d="M8.5 5H10V3.5C10 2.67 9.33 2 8.5 2S7 2.67 7 3.5 7.67 5 8.5 5z"/>
      </svg>
      Parece que você precisa de mais ajuda. Deseja abrir um chamado?
      <button id="chat-open-ticket-btn" class="chat-suggest-action">Abrir chamado</button>
    </div>` : '';

  return `
    <div class="chat-header">
      <div class="chat-header-avatar">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
        </svg>
      </div>
      <div class="chat-header-info">
        <span class="chat-header-name">RH Assistente</span>
        <span class="chat-header-status online">Online</span>
      </div>
      <button class="chat-header-action" id="chat-clear-btn" title="Limpar conversa" aria-label="Limpar conversa">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-3.51"/>
        </svg>
      </button>
      <button class="chat-header-action" id="chat-logout-btn" title="Sair" aria-label="Sair da sessão">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
        </svg>
      </button>
    </div>
    ${suggestBanner}
    <div id="chat-messages" class="chat-messages">
      ${msgHTML}
      ${typingHTML}
    </div>
    <form id="chat-input-form" class="chat-input-bar">
      <input id="chat-input" type="text" placeholder="Digite sua dúvida..." autocomplete="off" maxlength="500" />
      <button type="submit" class="chat-send-btn" aria-label="Enviar">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
        </svg>
      </button>
    </form>`;
}

function _ticketHTML() {
  const catOptions = _ticketCategories.map(c => `<option value="${_escapeAttr(c)}">${_escapeHTML(c)}</option>`).join('');
  return `
    <div class="chat-header">
      <button class="chat-header-back" id="chat-back-btn" aria-label="Voltar ao chat">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="15 18 9 12 15 6"/>
        </svg>
      </button>
      <div class="chat-header-info">
        <span class="chat-header-name">Abrir Chamado</span>
        <span class="chat-header-status">RH · MC1 Global</span>
      </div>
    </div>
    <div class="chat-ticket-screen">
      <form id="chat-ticket-form" novalidate>
        <div class="chat-field">
          <label for="ticket-cat">Categoria</label>
          <select id="ticket-cat">
            <option value="">Selecione…</option>
            ${catOptions}
          </select>
        </div>
        <div class="chat-field">
          <label for="ticket-desc">Descrição</label>
          <textarea id="ticket-desc" rows="4" placeholder="Descreva sua solicitação com detalhes…" maxlength="1000"></textarea>
        </div>
        <div class="chat-field">
          <label for="ticket-email">E-mail de retorno (opcional)</label>
          <input id="ticket-email" type="email" placeholder="seu@email.com" />
        </div>
        <div id="chat-ticket-error" class="chat-error" style="display:none"></div>
        <button type="submit" class="chat-submit-btn" id="chat-ticket-btn">Enviar Chamado</button>
      </form>
    </div>`;
}

function _successHTML() {
  return `
    <div class="chat-header">
      <div class="chat-header-avatar">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="20 6 9 17 4 12"/>
        </svg>
      </div>
      <div class="chat-header-info">
        <span class="chat-header-name">Chamado Aberto</span>
        <span class="chat-header-status">RH · MC1 Global</span>
      </div>
    </div>
    <div class="chat-success-screen">
      <div class="chat-success-icon">
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
          <polyline points="22 4 12 14.01 9 11.01"/>
        </svg>
      </div>
      <h3>Chamado enviado!</h3>
      <p>A equipe de RH receberá sua solicitação e entrará em contato em breve.</p>
      <button id="chat-back-chat-btn" class="chat-submit-btn" style="margin-top:var(--space-4)">Voltar ao chat</button>
    </div>`;
}

// ─── Event Binding ───
function _bindEvents() {
  bubble.addEventListener('click', _togglePanel);

  // Close on Escape
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && _open) _closePanel();
  });

  // Close on outside click
  document.addEventListener('mousedown', e => {
    if (_open && !panel.contains(e.target) && e.target !== bubble) _closePanel();
  });
}

function _bindPanelEvents() {
  if (_state === 'login') {
    const form = panel.querySelector('#chat-login-form');
    const cpfInput = panel.querySelector('#chat-cpf');
    if (form) form.addEventListener('submit', _handleLogin);
    if (cpfInput) cpfInput.addEventListener('input', _formatCPF);
  }

  if (_state === 'chat') {
    const form = panel.querySelector('#chat-input-form');
    const clearBtn = panel.querySelector('#chat-clear-btn');
    const logoutBtn = panel.querySelector('#chat-logout-btn');
    const ticketBtn = panel.querySelector('#chat-open-ticket-btn');
    if (form) form.addEventListener('submit', _handleSend);
    if (clearBtn) clearBtn.addEventListener('click', _handleClear);
    if (logoutBtn) logoutBtn.addEventListener('click', _handleLogout);
    if (ticketBtn) ticketBtn.addEventListener('click', _handleOpenTicket);
  }

  if (_state === 'ticket') {
    const form = panel.querySelector('#chat-ticket-form');
    const backBtn = panel.querySelector('#chat-back-btn');
    if (form) form.addEventListener('submit', _handleTicketSubmit);
    if (backBtn) backBtn.addEventListener('click', () => { _state = 'chat'; _renderPanel(); });
  }

  if (_state === 'success') {
    const backBtn = panel.querySelector('#chat-back-chat-btn');
    if (backBtn) backBtn.addEventListener('click', () => {
      _suggestTicket = false;
      _state = 'chat';
      _renderPanel();
    });
  }
}

// ─── Panel toggle ───
function _togglePanel() {
  _open ? _closePanel() : _openPanel();
}

function _openPanel() {
  _open = true;
  _render();
  // Focus first input if login screen
  if (_state === 'login') {
    requestAnimationFrame(() => {
      const input = panel.querySelector('#chat-cpf');
      if (input) input.focus();
    });
  } else if (_state === 'chat') {
    requestAnimationFrame(() => {
      const input = panel.querySelector('#chat-input');
      if (input) input.focus();
    });
  }
}

function _closePanel() {
  _open = false;
  _renderBubble();
  panel.classList.remove('open');
  panel.setAttribute('aria-hidden', 'true');
}

// ─── Login handler ───
async function _handleLogin(e) {
  e.preventDefault();
  const cpfRaw = panel.querySelector('#chat-cpf').value.replace(/\D/g, '');
  const pwd = panel.querySelector('#chat-pwd').value;
  const errEl = panel.querySelector('#chat-login-error');
  const btn = panel.querySelector('#chat-login-btn');

  if (cpfRaw.length !== 11) {
    _showError(errEl, 'Informe um CPF válido com 11 dígitos.');
    return;
  }
  if (!pwd) {
    _showError(errEl, 'Informe sua senha.');
    return;
  }

  btn.disabled = true;
  btn.textContent = 'Entrando…';
  _hideError(errEl);

  try {
    const res = await fetch(`${API_URL}/api/login`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ cpf: cpfRaw, password: pwd }),
    });
    const data = await res.json();

    if (data.success) {
      sessionStorage.setItem(SESSION_KEY, '1');
      _messages = [];
      _state = 'chat';
      // Greet the user
      _messages.push({ role: 'bot', text: `Olá${data.nome ? ', ' + data.nome.split(' ')[0] : ''}! 👋 Sou o assistente de RH da MC1. Como posso te ajudar hoje?` });
      _render();
    } else {
      _showError(errEl, data.message || 'CPF ou senha incorretos.');
      btn.disabled = false;
      btn.textContent = 'Entrar';
    }
  } catch {
    _showError(errEl, 'Não foi possível conectar ao servidor. Verifique se o RH Assistant está rodando.');
    btn.disabled = false;
    btn.textContent = 'Entrar';
  }
}

// ─── Chat send handler ───
async function _handleSend(e) {
  e.preventDefault();
  const input = panel.querySelector('#chat-input');
  const text = input.value.trim();
  if (!text || _typing) return;

  input.value = '';
  _messages.push({ role: 'user', text });
  _typing = true;
  _suggestTicket = false;
  _renderPanel();

  try {
    const res = await fetch(`${API_URL}/api/chat`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: text }),
    });

    if (res.status === 401) {
      // Session expired
      sessionStorage.removeItem(SESSION_KEY);
      _state = 'login';
      _messages = [];
      _typing = false;
      _render();
      return;
    }

    const data = await res.json();
    _typing = false;

    if (data.success) {
      _messages.push({ role: 'bot', text: data.response });
      if (data.sugerir_chamado) {
        _suggestTicket = true;
        _ticketCategories = data.categorias || [];
      }
    } else {
      _messages.push({ role: 'bot', text: 'Ocorreu um erro ao processar sua mensagem. Tente novamente.' });
    }
  } catch {
    _typing = false;
    _messages.push({ role: 'bot', text: 'Não consegui me conectar ao servidor. Verifique sua conexão.' });
  }

  _renderPanel();
}

// ─── Clear conversation ───
async function _handleClear() {
  try {
    await fetch(`${API_URL}/api/clear`, {
      method: 'POST',
      credentials: 'include',
    });
  } catch { /* silent */ }
  _messages = [];
  _suggestTicket = false;
  _typing = false;
  _renderPanel();
}

// ─── Logout ───
function _handleLogout() {
  sessionStorage.removeItem(SESSION_KEY);
  _messages = [];
  _suggestTicket = false;
  _typing = false;
  _state = 'login';
  _render();
}

// ─── Open ticket screen ───
async function _handleOpenTicket() {
  if (_ticketCategories.length === 0) {
    try {
      const res = await fetch(`${API_URL}/api/categorias`, { credentials: 'include' });
      const data = await res.json();
      _ticketCategories = data.categorias || data || [];
    } catch { /* use empty */ }
  }
  _state = 'ticket';
  _renderPanel();
}

// ─── Ticket submit ───
async function _handleTicketSubmit(e) {
  e.preventDefault();
  const cat = panel.querySelector('#ticket-cat').value;
  const desc = panel.querySelector('#ticket-desc').value.trim();
  const email = panel.querySelector('#ticket-email').value.trim();
  const errEl = panel.querySelector('#chat-ticket-error');
  const btn = panel.querySelector('#chat-ticket-btn');

  if (!cat) { _showError(errEl, 'Selecione uma categoria.'); return; }
  if (desc.length < 10) { _showError(errEl, 'Descreva sua solicitação com pelo menos 10 caracteres.'); return; }

  btn.disabled = true;
  btn.textContent = 'Enviando…';
  _hideError(errEl);

  try {
    const res = await fetch(`${API_URL}/api/chamado/abrir`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ categoria: cat, descricao: desc, email }),
    });
    const data = await res.json();

    if (data.success) {
      _state = 'success';
      _renderPanel();
    } else {
      _showError(errEl, data.message || 'Erro ao abrir chamado. Tente novamente.');
      btn.disabled = false;
      btn.textContent = 'Enviar Chamado';
    }
  } catch {
    _showError(errEl, 'Não foi possível conectar ao servidor.');
    btn.disabled = false;
    btn.textContent = 'Enviar Chamado';
  }
}

// ─── CPF mask ───
function _formatCPF(e) {
  let v = e.target.value.replace(/\D/g, '').slice(0, 11);
  if (v.length > 9) v = v.replace(/(\d{3})(\d{3})(\d{3})(\d{1,2})/, '$1.$2.$3-$4');
  else if (v.length > 6) v = v.replace(/(\d{3})(\d{3})(\d{1,3})/, '$1.$2.$3');
  else if (v.length > 3) v = v.replace(/(\d{3})(\d{1,3})/, '$1.$2');
  e.target.value = v;
}

// ─── Error helpers ───
function _showError(el, msg) {
  if (!el) return;
  el.textContent = msg;
  el.style.display = 'block';
}
function _hideError(el) {
  if (!el) return;
  el.style.display = 'none';
}

// ─── Security helpers ───
function _escapeHTML(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
function _escapeAttr(str) {
  return String(str).replace(/"/g, '&quot;').replace(/'/g, '&#039;');
}
