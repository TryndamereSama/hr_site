// MC1 HUB — RH Assistant Chat Widget v3.2
// Floating chat bubble + panel connected to the rh_assistant Flask API

const API_URL = window.RH_ASSISTANT_API_URL || 'http://localhost:5000';
const SESSION_KEY = 'rh_chat_authed';

// ─── State ───
let _state = 'login'; // 'login' | 'chat' | 'ticket' | 'success' | 'tickets' | 'ticket-detail'
let _open = false;
let _messages = []; // { role: 'user'|'bot', text }
let _suggestTicket = false;
let _ticketCategories = [];
let _typing = false;
let _myTickets = [];
let _currentTicketId = null;
let _ticketsLoading = false;

// ─── Root elements ───
let bubble, panel;

// ─── Init ───
export function initChatWidget() {
  _injectHTML();
  _bindEvents();

  if (sessionStorage.getItem(SESSION_KEY)) {
    _state = 'chat';
  }
  _render();
}

// ─── HTML Injection ───
function _injectHTML() {
  bubble = document.createElement('button');
  bubble.id = 'rh-chat-bubble';
  bubble.setAttribute('aria-label', 'Abrir assistente de RH');
  bubble.setAttribute('aria-expanded', 'false');
  bubble.innerHTML = _iconChat();
  document.body.appendChild(bubble);

  panel = document.createElement('div');
  panel.id = 'rh-chat-panel';
  panel.setAttribute('role', 'dialog');
  panel.setAttribute('aria-label', 'RH Assistente');
  panel.setAttribute('aria-hidden', 'true');
  document.body.appendChild(panel);
}

// ─── SVG icons ───
function _iconChat() {
  return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
  </svg>`;
}
function _iconClose() {
  return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
  </svg>`;
}
function _iconBack() {
  return `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
    <polyline points="15 18 9 12 15 6"/>
  </svg>`;
}
function _iconTickets() {
  return `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"/>
    <rect x="9" y="3" width="6" height="4" rx="2"/>
    <line x1="9" y1="12" x2="15" y2="12"/><line x1="9" y1="16" x2="13" y2="16"/>
  </svg>`;
}

// ─── Render ───
function _render() {
  _renderBubble();
  _renderPanel();
}

function _renderBubble() {
  if (_open) {
    bubble.innerHTML = _iconClose();
    bubble.setAttribute('aria-expanded', 'true');
  } else {
    bubble.innerHTML = _iconChat();
    bubble.setAttribute('aria-expanded', 'false');
  }
}

function _renderPanel() {
  panel.className = _open ? 'open' : '';
  panel.setAttribute('aria-hidden', _open ? 'false' : 'true');

  switch (_state) {
    case 'login':         panel.innerHTML = _loginHTML();        break;
    case 'chat':          panel.innerHTML = _chatHTML();         break;
    case 'ticket':        panel.innerHTML = _ticketHTML();       break;
    case 'success':       panel.innerHTML = _successHTML();      break;
    case 'tickets':       panel.innerHTML = _ticketsHTML();      break;
    case 'ticket-detail': panel.innerHTML = _ticketDetailHTML(); break;
  }

  _bindPanelEvents();

  if (_state === 'chat') {
    const msgs = panel.querySelector('#chat-messages');
    if (msgs) msgs.scrollTop = msgs.scrollHeight;
  }
}

// ─── Screen: Login ───
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

// ─── Screen: Chat ───
function _chatHTML() {
  const msgHTML = _messages.map(m => {
    const cls = m.role === 'bot' ? 'chat-msg-bot' : 'chat-msg-user';
    return `<div class="chat-msg ${cls}"><div class="chat-bubble">${_escapeHTML(m.text)}</div></div>`;
  }).join('');

  const typingHTML = _typing ? `
    <div class="chat-msg chat-msg-bot">
      <div class="chat-bubble chat-typing"><span></span><span></span><span></span></div>
    </div>` : '';

  const suggestBanner = _suggestTicket ? `
    <div class="chat-suggest-banner">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
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
      <button class="chat-header-action" id="chat-tickets-btn" title="Meus chamados" aria-label="Meus chamados">
        ${_iconTickets()}
      </button>
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

// ─── Screen: Open Ticket Form ───
function _ticketHTML() {
  const catOptions = _ticketCategories.map(c => `<option value="${_escapeAttr(c)}">${_escapeHTML(c)}</option>`).join('');
  return `
    <div class="chat-header">
      <button class="chat-header-back" id="chat-back-btn" aria-label="Voltar ao chat">${_iconBack()}</button>
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

// ─── Screen: Success ───
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
      <button id="chat-view-tickets-btn" class="chat-submit-btn" style="margin-top:var(--space-4,16px)">Ver meus chamados</button>
      <button id="chat-back-chat-btn" class="chat-btn-ghost">Voltar ao chat</button>
    </div>`;
}

// ─── Screen: My Tickets List ───
function _ticketsHTML() {
  if (_ticketsLoading) {
    return `
      <div class="chat-header">
        <button class="chat-header-back" id="chat-back-btn" aria-label="Voltar ao chat">${_iconBack()}</button>
        <div class="chat-header-info">
          <span class="chat-header-name">Meus Chamados</span>
          <span class="chat-header-status">MC1 Global</span>
        </div>
      </div>
      <div class="chat-tickets-screen">
        <div class="chat-tickets-empty">
          <div class="chat-typing" style="justify-content:center"><span></span><span></span><span></span></div>
        </div>
      </div>`;
  }

  if (_myTickets.length === 0) {
    return `
      <div class="chat-header">
        <button class="chat-header-back" id="chat-back-btn" aria-label="Voltar ao chat">${_iconBack()}</button>
        <div class="chat-header-info">
          <span class="chat-header-name">Meus Chamados</span>
          <span class="chat-header-status">MC1 Global</span>
        </div>
      </div>
      <div class="chat-tickets-screen">
        <div class="chat-tickets-empty">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"/>
            <rect x="9" y="3" width="6" height="4" rx="2"/>
          </svg>
          <p>Nenhum chamado aberto ainda.</p>
          <button id="chat-new-ticket-btn" class="chat-submit-btn" style="margin-top:12px">Abrir novo chamado</button>
        </div>
      </div>`;
  }

  const cardsHTML = _myTickets.map(t => {
    const statusClass = _ticketStatusClass(t.status);
    const date = _fmtDate(t.data_abertura);
    const hasAction = t.status === 'Aguardando Colaborador' || t.status === 'Resolvido';
    const actionDot = hasAction ? '<span class="chat-ticket-dot"></span>' : '';
    return `
      <div class="chat-ticket-card" data-id="${_escapeAttr(t.id)}">
        <div class="chat-ticket-card-top">
          <span class="chat-ticket-badge ${statusClass}">${_escapeHTML(t.status)}</span>
          ${actionDot}
          <span class="chat-ticket-date">${date}</span>
        </div>
        <div class="chat-ticket-card-cat">${_escapeHTML(t.categoria)}</div>
        <div class="chat-ticket-card-desc">${_escapeHTML(t.descricao.slice(0, 80))}${t.descricao.length > 80 ? '…' : ''}</div>
        <div class="chat-ticket-card-id">#${_escapeHTML(t.id)}</div>
      </div>`;
  }).join('');

  return `
    <div class="chat-header">
      <button class="chat-header-back" id="chat-back-btn" aria-label="Voltar ao chat">${_iconBack()}</button>
      <div class="chat-header-info">
        <span class="chat-header-name">Meus Chamados</span>
        <span class="chat-header-status">${_myTickets.length} chamado${_myTickets.length !== 1 ? 's' : ''}</span>
      </div>
      <button class="chat-header-action" id="chat-new-ticket-btn2" title="Novo chamado" aria-label="Novo chamado">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
        </svg>
      </button>
    </div>
    <div class="chat-tickets-screen" id="chat-tickets-list">
      ${cardsHTML}
    </div>`;
}

// ─── Screen: Ticket Detail ───
function _ticketDetailHTML() {
  const t = _myTickets.find(x => x.id === _currentTicketId);
  if (!t) {
    return `
      <div class="chat-header">
        <button class="chat-header-back" id="chat-back-tickets-btn">${_iconBack()}</button>
        <div class="chat-header-info"><span class="chat-header-name">Chamado</span></div>
      </div>
      <div class="chat-tickets-screen"><div class="chat-tickets-empty"><p>Chamado não encontrado.</p></div></div>`;
  }

  const statusClass  = _ticketStatusClass(t.status);
  const interacoes   = t.interacoes || [];

  const timelineHTML = interacoes.map(i => {
    const isCollab = i.autor === 'Colaborador';
    const isSystem = i.autor === 'Sistema';
    return `
      <div class="chat-timeline-item ${isCollab ? 'chat-tl-collab' : isSystem ? 'chat-tl-system' : 'chat-tl-rh'}">
        <div class="chat-tl-meta">${_escapeHTML(i.autor)} · ${_fmtDate(i.data)}</div>
        <div class="chat-tl-text">${_escapeHTML(i.texto)}</div>
      </div>`;
  }).join('');

  // Action section based on status
  let actionHTML = '';
  if (t.status === 'Aguardando Colaborador') {
    actionHTML = `
      <div class="chat-ticket-action-box">
        <div class="chat-ticket-action-title">O RH precisa de mais informações</div>
        <div class="chat-field">
          <label for="ticket-reply">Sua resposta</label>
          <textarea id="ticket-reply" rows="3" placeholder="Descreva as informações solicitadas…" maxlength="1000"></textarea>
        </div>
        <div id="chat-reply-error" class="chat-error" style="display:none"></div>
        <button id="chat-reply-btn" class="chat-submit-btn">Enviar resposta</button>
      </div>`;
  } else if (t.status === 'Resolvido') {
    actionHTML = `
      <div class="chat-ticket-action-box">
        <div class="chat-ticket-action-title">Chamado resolvido — avalie o atendimento</div>
        <div class="chat-stars" id="chat-stars" data-selected="0">
          ${[1,2,3,4,5].map(n => `<button class="chat-star" data-val="${n}" aria-label="${n} estrela${n>1?'s':''}">★</button>`).join('')}
        </div>
        <div id="chat-rating-error" class="chat-error" style="display:none"></div>
        <button id="chat-rate-btn" class="chat-submit-btn" style="margin-top:8px">Confirmar e fechar</button>
        <button id="chat-reopen-btn" class="chat-btn-ghost chat-btn-reopen">Reabrir chamado</button>
      </div>`;
  }

  return `
    <div class="chat-header">
      <button class="chat-header-back" id="chat-back-tickets-btn" aria-label="Voltar à lista">${_iconBack()}</button>
      <div class="chat-header-info">
        <span class="chat-header-name">#${_escapeHTML(t.id)}</span>
        <span class="chat-header-status">${_escapeHTML(t.categoria)}</span>
      </div>
      <span class="chat-ticket-badge ${statusClass}" style="font-size:10px;padding:3px 8px;margin-right:4px">${_escapeHTML(t.status)}</span>
    </div>
    <div class="chat-ticket-detail">
      <div class="chat-detail-meta">
        <span>Aberto em ${_fmtDate(t.data_abertura)}</span>
        ${t.prioridade ? `<span class="chat-prio-badge chat-prio-${t.prioridade.toLowerCase()}">${t.prioridade}</span>` : ''}
        ${t.responsavel_assumiu ? `<span>Atendido por <strong>${_escapeHTML(t.responsavel_assumiu)}</strong></span>` : ''}
      </div>

      <div class="chat-timeline">
        ${timelineHTML || '<div class="chat-tl-system"><div class="chat-tl-text">Nenhuma interação registrada.</div></div>'}
      </div>

      ${actionHTML}
    </div>`;
}

// ─── Event Binding ───
function _bindEvents() {
  bubble.addEventListener('click', _togglePanel);
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && _open) _closePanel();
  });
  document.addEventListener('mousedown', e => {
    if (_open && !panel.contains(e.target) && e.target !== bubble) _closePanel();
  });
}

function _bindPanelEvents() {
  if (_state === 'login') {
    const form     = panel.querySelector('#chat-login-form');
    const cpfInput = panel.querySelector('#chat-cpf');
    if (form)     form.addEventListener('submit', _handleLogin);
    if (cpfInput) cpfInput.addEventListener('input', _formatCPF);
  }

  if (_state === 'chat') {
    panel.querySelector('#chat-input-form')?.addEventListener('submit', _handleSend);
    panel.querySelector('#chat-clear-btn')?.addEventListener('click', _handleClear);
    panel.querySelector('#chat-logout-btn')?.addEventListener('click', _handleLogout);
    panel.querySelector('#chat-open-ticket-btn')?.addEventListener('click', _handleOpenTicket);
    panel.querySelector('#chat-tickets-btn')?.addEventListener('click', _handleOpenTickets);
  }

  if (_state === 'ticket') {
    panel.querySelector('#chat-ticket-form')?.addEventListener('submit', _handleTicketSubmit);
    panel.querySelector('#chat-back-btn')?.addEventListener('click', () => { _state = 'chat'; _renderPanel(); });
  }

  if (_state === 'success') {
    panel.querySelector('#chat-back-chat-btn')?.addEventListener('click', () => {
      _suggestTicket = false; _state = 'chat'; _renderPanel();
    });
    panel.querySelector('#chat-view-tickets-btn')?.addEventListener('click', _handleOpenTickets);
  }

  if (_state === 'tickets') {
    panel.querySelector('#chat-back-btn')?.addEventListener('click', () => { _state = 'chat'; _renderPanel(); });
    panel.querySelector('#chat-new-ticket-btn')?.addEventListener('click', _handleOpenTicket);
    panel.querySelector('#chat-new-ticket-btn2')?.addEventListener('click', _handleOpenTicket);
    panel.querySelectorAll('.chat-ticket-card').forEach(card => {
      card.addEventListener('click', () => _handleOpenTicketDetail(card.dataset.id));
    });
  }

  if (_state === 'ticket-detail') {
    panel.querySelector('#chat-back-tickets-btn')?.addEventListener('click', () => { _state = 'tickets'; _renderPanel(); });

    // Star rating
    const starsEl = panel.querySelector('#chat-stars');
    if (starsEl) {
      panel.querySelectorAll('.chat-star').forEach(btn => {
        btn.addEventListener('click', () => {
          const val = parseInt(btn.dataset.val);
          starsEl.dataset.selected = val;
          panel.querySelectorAll('.chat-star').forEach((s, i) => {
            s.classList.toggle('active', i < val);
          });
        });
      });
    }

    panel.querySelector('#chat-reply-btn')?.addEventListener('click', _handleReply);
    panel.querySelector('#chat-rate-btn')?.addEventListener('click', _handleRate);
    panel.querySelector('#chat-reopen-btn')?.addEventListener('click', _handleReopen);
  }
}

// ─── Panel toggle ───
function _togglePanel() {
  _open ? _closePanel() : _openPanel();
}

function _openPanel() {
  _open = true;
  _render();
  if (_state === 'login') {
    requestAnimationFrame(() => panel.querySelector('#chat-cpf')?.focus());
  } else if (_state === 'chat') {
    requestAnimationFrame(() => panel.querySelector('#chat-input')?.focus());
  }
}

function _closePanel() {
  _open = false;
  _renderBubble();
  panel.classList.remove('open');
  panel.setAttribute('aria-hidden', 'true');
}

// ─── Login ───
async function _handleLogin(e) {
  e.preventDefault();
  const cpfRaw = panel.querySelector('#chat-cpf').value.replace(/\D/g, '');
  const pwd    = panel.querySelector('#chat-pwd').value;
  const errEl  = panel.querySelector('#chat-login-error');
  const btn    = panel.querySelector('#chat-login-btn');

  if (cpfRaw.length !== 11) { _showError(errEl, 'Informe um CPF válido com 11 dígitos.'); return; }
  if (!pwd)                  { _showError(errEl, 'Informe sua senha.'); return; }

  btn.disabled = true;
  btn.textContent = 'Entrando…';
  _hideError(errEl);

  try {
    const res  = await fetch(`${API_URL}/api/login`, {
      method: 'POST', credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ cpf: cpfRaw, password: pwd }),
    });
    const data = await res.json();

    if (data.success) {
      sessionStorage.setItem(SESSION_KEY, '1');
      _messages = [{ role: 'bot', text: `Olá${data.nome ? ', ' + data.nome.split(' ')[0] : ''}! Sou o assistente de RH da MC1. Como posso te ajudar hoje?` }];
      _state = 'chat';
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

// ─── Chat send ───
async function _handleSend(e) {
  e.preventDefault();
  const input = panel.querySelector('#chat-input');
  const text  = input.value.trim();
  if (!text || _typing) return;

  input.value = '';
  _messages.push({ role: 'user', text });
  _typing = true;
  _suggestTicket = false;
  _renderPanel();

  try {
    const res = await fetch(`${API_URL}/api/chat`, {
      method: 'POST', credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: text }),
    });

    if (res.status === 401) {
      sessionStorage.removeItem(SESSION_KEY);
      _state = 'login'; _messages = []; _typing = false; _render(); return;
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

// ─── Clear ───
async function _handleClear() {
  try { await fetch(`${API_URL}/api/clear`, { method: 'POST', credentials: 'include' }); } catch { }
  _messages = []; _suggestTicket = false; _typing = false;
  _renderPanel();
}

// ─── Logout ───
function _handleLogout() {
  sessionStorage.removeItem(SESSION_KEY);
  _messages = []; _suggestTicket = false; _typing = false; _myTickets = [];
  _state = 'login'; _render();
}

// ─── Open ticket form ───
async function _handleOpenTicket() {
  if (_ticketCategories.length === 0) {
    try {
      const res  = await fetch(`${API_URL}/api/categorias`, { credentials: 'include' });
      const data = await res.json();
      _ticketCategories = data.categorias || data || [];
    } catch { }
  }
  _state = 'ticket'; _renderPanel();
}

// ─── Submit ticket ───
async function _handleTicketSubmit(e) {
  e.preventDefault();
  const cat   = panel.querySelector('#ticket-cat').value;
  const desc  = panel.querySelector('#ticket-desc').value.trim();
  const email = panel.querySelector('#ticket-email').value.trim();
  const errEl = panel.querySelector('#chat-ticket-error');
  const btn   = panel.querySelector('#chat-ticket-btn');

  if (!cat)           { _showError(errEl, 'Selecione uma categoria.'); return; }
  if (desc.length < 10) { _showError(errEl, 'Descreva sua solicitação com pelo menos 10 caracteres.'); return; }

  btn.disabled = true; btn.textContent = 'Enviando…'; _hideError(errEl);

  try {
    const res  = await fetch(`${API_URL}/api/chamado/abrir`, {
      method: 'POST', credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ categoria: cat, descricao: desc, email }),
    });
    const data = await res.json();

    if (data.success) { _state = 'success'; _renderPanel(); }
    else {
      _showError(errEl, data.message || 'Erro ao abrir chamado. Tente novamente.');
      btn.disabled = false; btn.textContent = 'Enviar Chamado';
    }
  } catch {
    _showError(errEl, 'Não foi possível conectar ao servidor.');
    btn.disabled = false; btn.textContent = 'Enviar Chamado';
  }
}

// ─── Open tickets list ───
async function _handleOpenTickets() {
  _state = 'tickets'; _ticketsLoading = true; _renderPanel();
  try {
    const res  = await fetch(`${API_URL}/api/chamado/meus`, { credentials: 'include' });
    if (res.status === 401) { sessionStorage.removeItem(SESSION_KEY); _state = 'login'; _render(); return; }
    const data = await res.json();
    _myTickets = data.chamados || [];
  } catch {
    _myTickets = [];
  }
  _ticketsLoading = false; _renderPanel();
}

// ─── Open ticket detail ───
async function _handleOpenTicketDetail(id) {
  _currentTicketId = id;
  // Fetch fresh detail
  try {
    const res  = await fetch(`${API_URL}/api/chamado/detalhe/${id}`, { credentials: 'include' });
    const data = await res.json();
    if (data.success) {
      const idx = _myTickets.findIndex(t => t.id === id);
      if (idx >= 0) _myTickets[idx] = data.chamado;
      else _myTickets.push(data.chamado);
    }
  } catch { }
  _state = 'ticket-detail'; _renderPanel();
}

// ─── Reply to ticket (Aguardando Colaborador) ───
async function _handleReply() {
  const texto = panel.querySelector('#ticket-reply')?.value.trim();
  const errEl = panel.querySelector('#chat-reply-error');
  const btn   = panel.querySelector('#chat-reply-btn');

  if (!texto || texto.length < 5) { _showError(errEl, 'Escreva sua resposta com pelo menos 5 caracteres.'); return; }

  btn.disabled = true; btn.textContent = 'Enviando…'; _hideError(errEl);

  try {
    const res  = await fetch(`${API_URL}/api/chamado/responder`, {
      method: 'POST', credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: _currentTicketId, texto }),
    });
    const data = await res.json();

    if (data.success) {
      const idx = _myTickets.findIndex(t => t.id === _currentTicketId);
      if (idx >= 0) _myTickets[idx] = data.chamado;
      _renderPanel();
    } else {
      _showError(errEl, data.message || 'Erro ao enviar resposta.');
      btn.disabled = false; btn.textContent = 'Enviar resposta';
    }
  } catch {
    _showError(errEl, 'Não foi possível conectar ao servidor.');
    btn.disabled = false; btn.textContent = 'Enviar resposta';
  }
}

// ─── Rate ticket (Resolvido → Fechado) ───
async function _handleRate() {
  const starsEl = panel.querySelector('#chat-stars');
  const nota    = parseInt(starsEl?.dataset.selected || '0');
  const errEl   = panel.querySelector('#chat-rating-error');
  const btn     = panel.querySelector('#chat-rate-btn');

  if (!nota || nota < 1) { _showError(errEl, 'Selecione uma nota de 1 a 5 estrelas.'); return; }

  btn.disabled = true; btn.textContent = 'Enviando…'; _hideError(errEl);

  try {
    const res  = await fetch(`${API_URL}/api/chamado/avaliar`, {
      method: 'POST', credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: _currentTicketId, nota }),
    });
    const data = await res.json();

    if (data.success) {
      const idx = _myTickets.findIndex(t => t.id === _currentTicketId);
      if (idx >= 0) _myTickets[idx] = data.chamado;
      _renderPanel();
    } else {
      _showError(errEl, data.message || 'Erro ao avaliar chamado.');
      btn.disabled = false; btn.textContent = 'Confirmar e fechar';
    }
  } catch {
    _showError(errEl, 'Não foi possível conectar ao servidor.');
    btn.disabled = false; btn.textContent = 'Confirmar e fechar';
  }
}

// ─── Reopen ticket ───
async function _handleReopen() {
  const motivo = prompt('Por que deseja reabrir este chamado? (opcional)') || '';
  try {
    const res  = await fetch(`${API_URL}/api/chamado/reabrir`, {
      method: 'POST', credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: _currentTicketId, motivo }),
    });
    const data = await res.json();

    if (data.success) {
      const idx = _myTickets.findIndex(t => t.id === _currentTicketId);
      if (idx >= 0) _myTickets[idx] = data.chamado;
      _renderPanel();
    } else {
      alert(data.message || 'Erro ao reabrir chamado.');
    }
  } catch {
    alert('Não foi possível conectar ao servidor.');
  }
}

// ─── CPF mask ───
function _formatCPF(e) {
  let v = e.target.value.replace(/\D/g, '').slice(0, 11);
  if (v.length > 9)      v = v.replace(/(\d{3})(\d{3})(\d{3})(\d{1,2})/, '$1.$2.$3-$4');
  else if (v.length > 6) v = v.replace(/(\d{3})(\d{3})(\d{1,3})/, '$1.$2.$3');
  else if (v.length > 3) v = v.replace(/(\d{3})(\d{1,3})/, '$1.$2');
  e.target.value = v;
}

// ─── Ticket status CSS class ───
function _ticketStatusClass(status) {
  const map = {
    'Aberto':                 'status-aberto',
    'Em Atendimento':         'status-em-atendimento',
    'Aguardando Colaborador': 'status-aguardando',
    'Resolvido':              'status-resolvido',
    'Reaberto':               'status-reaberto',
    'Fechado':                'status-fechado',
  };
  return map[status] || 'status-aberto';
}

// ─── Date formatter ───
function _fmtDate(iso) {
  if (!iso) return '—';
  const d = new Date(iso);
  return d.toLocaleDateString('pt-BR') + ' ' + d.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
}

// ─── Error helpers ───
function _showError(el, msg) { if (!el) return; el.textContent = msg; el.style.display = 'block'; }
function _hideError(el)      { if (!el) return; el.style.display = 'none'; }

// ─── Security helpers ───
function _escapeHTML(str) {
  return String(str)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#039;');
}
function _escapeAttr(str) {
  return String(str).replace(/"/g, '&quot;').replace(/'/g, '&#039;');
}
