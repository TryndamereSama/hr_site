// MC1 HUB — RH Assistant Chat Widget v3.2
// Floating chat bubble + panel connected to the rh_assistant Flask API

const API_URL = window.RH_ASSISTANT_API_URL || 'http://localhost:5000';
const SESSION_KEY = 'rh_chat_authed';

// ─── State ───
let _state = 'login'; // 'login' | 'login_senha' | 'ativacao' | 'chat' | 'ticket' | 'success' | 'tickets' | 'ticket-detail'
let _open = false;
// Armazena CPF e nome durante o fluxo de login em 2 passos
let _pendingCPF  = '';
let _pendingNome = '';
let _messages = []; // { role: 'user'|'bot', text }
let _suggestTicket = false;
let _ticketCategories = [];
let _typing = false;
let _myTickets = [];
let _currentTicketId = null;
let _ticketsLoading = false;
let _chatFile = null;       // File attached to the current chat message
let _ticketFiles = [];      // Files attached to the new ticket form (max 3)
let _replyFile = null;      // File attached to the ticket reply

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
    case 'login_senha':   panel.innerHTML = _loginSenhaHTML();   break;
    case 'ativacao':      panel.innerHTML = _ativacaoHTML();     break;
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

// ─── Screen helpers ───
function _chatLoginHeader() {
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
    </div>`;
}

// ─── Screen: Login — Passo 1 (CPF) ───
function _loginHTML() {
  return `
    ${_chatLoginHeader()}
    <div class="chat-login-screen">
      <div class="chat-login-icon">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
        </svg>
      </div>
      <h3>Assistente de RH</h3>
      <p>Informe seu CPF para continuar.</p>
      <form id="chat-cpf-form" novalidate>
        <div class="chat-field">
          <label for="chat-cpf">CPF</label>
          <input id="chat-cpf" type="text" inputmode="numeric" placeholder="000.000.000-00" maxlength="14" autocomplete="username" />
        </div>
        <div id="chat-login-error" class="chat-error" style="display:none"></div>
        <button type="submit" class="chat-submit-btn" id="chat-cpf-btn">
          Continuar
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="margin-left:4px"><polyline points="9 18 15 12 9 6"/></svg>
        </button>
      </form>
    </div>`;
}

// ─── Screen: Login — Passo 2a (Senha para usuário existente) ───
function _loginSenhaHTML() {
  const primeiroNome = _pendingNome ? _pendingNome.split(' ')[0] : '';
  return `
    ${_chatLoginHeader()}
    <div class="chat-login-screen">
      <div class="chat-login-icon chat-login-icon-sm">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
        </svg>
      </div>
      ${primeiroNome ? `<h3>Olá, ${primeiroNome}!</h3><p>Informe sua senha para entrar.</p>` : `<h3>Bem-vindo de volta!</h3><p>Informe sua senha para entrar.</p>`}
      <form id="chat-pwd-form" novalidate>
        <div class="chat-field">
          <label for="chat-pwd">Senha</label>
          <input id="chat-pwd" type="password" placeholder="Sua senha" autocomplete="current-password" />
        </div>
        <div id="chat-login-error" class="chat-error" style="display:none"></div>
        <button type="submit" class="chat-submit-btn" id="chat-pwd-btn">Entrar</button>
        <button type="button" class="chat-back-link" id="chat-back-cpf-btn">
          ${_iconBack()} Trocar CPF
        </button>
      </form>
    </div>`;
}

// ─── Screen: Ativação — Primeiro Acesso ───
function _ativacaoHTML() {
  const primeiroNome = _pendingNome ? _pendingNome.split(' ')[0] : '';
  return `
    ${_chatLoginHeader()}
    <div class="chat-login-screen">
      <div class="chat-login-icon chat-login-icon-activation">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        </svg>
      </div>
      <div class="chat-activation-badge">Primeiro Acesso</div>
      <h3>${primeiroNome ? `Olá, ${primeiroNome}! 👋` : 'Bem-vindo(a)!'}</h3>
      <p>Crie uma senha para ativar sua conta e acessar o Assistente de RH.</p>
      <form id="chat-activation-form" novalidate>
        <div class="chat-field">
          <label for="chat-new-pwd">Criar senha <span style="color:var(--color-text-muted);font-weight:400">(mín. 6 caracteres)</span></label>
          <input id="chat-new-pwd" type="password" placeholder="Crie uma senha" autocomplete="new-password" />
        </div>
        <div class="chat-field">
          <label for="chat-confirm-pwd">Confirmar senha</label>
          <input id="chat-confirm-pwd" type="password" placeholder="Repita a senha" autocomplete="new-password" />
        </div>
        <div id="chat-pwd-strength" class="chat-pwd-strength" style="display:none">
          <div class="chat-pwd-strength-bar"><div id="chat-pwd-strength-fill" class="chat-pwd-strength-fill"></div></div>
          <span id="chat-pwd-strength-label" class="chat-pwd-strength-label"></span>
        </div>
        <div id="chat-login-error" class="chat-error" style="display:none"></div>
        <button type="submit" class="chat-submit-btn chat-submit-btn-activation" id="chat-activation-btn">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right:4px"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
          Ativar Minha Conta
        </button>
        <button type="button" class="chat-back-link" id="chat-back-cpf-btn">
          ${_iconBack()} Trocar CPF
        </button>
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
    ${_chatFile ? `<div class="chat-attach-bar"><div class="chat-attach-chip"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/></svg><span>${_escapeHTML(_chatFile.name)}</span><button type="button" id="chat-attach-remove" aria-label="Remover arquivo">×</button></div></div>` : ''}
    <form id="chat-input-form" class="chat-input-bar">
      <input type="file" id="chat-file-input" style="display:none" accept="image/*,.pdf,.doc,.docx,.xls,.xlsx,.txt" />
      <button type="button" class="chat-attach-btn" id="chat-attach-btn" aria-label="Anexar arquivo" title="Anexar arquivo">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/>
        </svg>
      </button>
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
        <div class="chat-field">
          <label>Anexos (opcional · máx. 3 · 10 MB cada)</label>
          <input type="file" id="ticket-file-input" style="display:none" multiple accept="image/*,.pdf,.doc,.docx,.xls,.xlsx,.txt" />
          <div class="chat-attach-zone">
            <button type="button" id="ticket-attach-btn" class="chat-attach-zone-btn">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/></svg>
              Adicionar arquivo
            </button>
            <div id="ticket-attach-list" class="chat-attach-list">${_ticketFilesHTML()}</div>
          </div>
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
    const anexosHTML = (i.anexos || []).length > 0
      ? `<div class="chat-tl-attachments">${(i.anexos).map(a =>
          `<a href="${API_URL}/api/chamado/anexo/${encodeURIComponent(t.id)}/${encodeURIComponent(a.saved)}"
              target="_blank" rel="noopener noreferrer" class="chat-tl-attach-link">
             <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/></svg>
             ${_escapeHTML(a.original)}
           </a>`).join('')}
         </div>`
      : '';
    return `
      <div class="chat-timeline-item ${isCollab ? 'chat-tl-collab' : isSystem ? 'chat-tl-system' : 'chat-tl-rh'}">
        <div class="chat-tl-meta">${_escapeHTML(i.autor)} · ${_fmtDate(i.data)}</div>
        <div class="chat-tl-text">${_escapeHTML(i.texto)}</div>
        ${anexosHTML}
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
        <input type="file" id="reply-file-input" style="display:none" accept="image/*,.pdf,.doc,.docx,.xls,.xlsx,.txt" />
        ${_replyFile ? `<div class="chat-attach-bar" style="margin:0"><div class="chat-attach-chip"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/></svg><span>${_escapeHTML(_replyFile.name)}</span><button type="button" id="reply-attach-remove" aria-label="Remover arquivo">×</button></div></div>` : ''}
        <div class="chat-reply-actions">
          <button type="button" id="reply-attach-btn" class="chat-attach-btn" aria-label="Anexar arquivo" title="Anexar arquivo">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/></svg>
          </button>
          <button id="chat-reply-btn" class="chat-submit-btn" style="flex:1;margin-top:0">Enviar resposta</button>
        </div>
        <div id="chat-reply-error" class="chat-error" style="display:none"></div>
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

// ─── File attachment helpers ───
function _ticketFilesHTML() {
  return _ticketFiles.map((f, i) => `
    <div class="chat-attach-chip">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/></svg>
      <span>${_escapeHTML(f.name)}</span>
      <button type="button" class="ticket-file-remove" data-idx="${i}" aria-label="Remover arquivo">×</button>
    </div>`).join('');
}

function _refreshTicketAttachList() {
  const el = panel.querySelector('#ticket-attach-list');
  if (el) el.innerHTML = _ticketFilesHTML();
  // Re-bind remove buttons
  panel.querySelectorAll('.ticket-file-remove').forEach(btn => {
    btn.addEventListener('click', () => {
      _ticketFiles.splice(parseInt(btn.dataset.idx), 1);
      _refreshTicketAttachList();
    });
  });
  // Hide add button when limit reached
  const addBtn = panel.querySelector('#ticket-attach-btn');
  if (addBtn) addBtn.style.display = _ticketFiles.length >= 3 ? 'none' : '';
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
    const form     = panel.querySelector('#chat-cpf-form');
    const cpfInput = panel.querySelector('#chat-cpf');
    if (form)     form.addEventListener('submit', _handleCpfStep);
    if (cpfInput) cpfInput.addEventListener('input', _formatCPF);
  }

  if (_state === 'login_senha') {
    const form    = panel.querySelector('#chat-pwd-form');
    const backBtn = panel.querySelector('#chat-back-cpf-btn');
    if (form)    form.addEventListener('submit', _handleSenhaStep);
    if (backBtn) backBtn.addEventListener('click', () => {
      _pendingCPF = ''; _pendingNome = ''; _state = 'login'; _renderPanel();
    });
  }

  if (_state === 'ativacao') {
    const form    = panel.querySelector('#chat-activation-form');
    const backBtn = panel.querySelector('#chat-back-cpf-btn');
    const pwdIn   = panel.querySelector('#chat-new-pwd');
    if (form)    form.addEventListener('submit', _handleAtivacaoStep);
    if (backBtn) backBtn.addEventListener('click', () => {
      _pendingCPF = ''; _pendingNome = ''; _state = 'login'; _renderPanel();
    });
    if (pwdIn) pwdIn.addEventListener('input', _updatePwdStrength);
  }

  if (_state === 'chat') {
    panel.querySelector('#chat-input-form')?.addEventListener('submit', _handleSend);
    panel.querySelector('#chat-clear-btn')?.addEventListener('click', _handleClear);
    panel.querySelector('#chat-logout-btn')?.addEventListener('click', _handleLogout);
    panel.querySelector('#chat-open-ticket-btn')?.addEventListener('click', _handleOpenTicket);
    panel.querySelector('#chat-tickets-btn')?.addEventListener('click', _handleOpenTickets);
    // File attach
    panel.querySelector('#chat-attach-btn')?.addEventListener('click', () => panel.querySelector('#chat-file-input')?.click());
    panel.querySelector('#chat-file-input')?.addEventListener('change', e => {
      const f = e.target.files?.[0];
      if (f && f.size <= 10 * 1024 * 1024) { _chatFile = f; _renderPanel(); }
      else if (f) alert('Arquivo muito grande. O limite é 10 MB.');
    });
    panel.querySelector('#chat-attach-remove')?.addEventListener('click', () => { _chatFile = null; _renderPanel(); });
  }

  if (_state === 'ticket') {
    panel.querySelector('#chat-ticket-form')?.addEventListener('submit', _handleTicketSubmit);
    panel.querySelector('#chat-back-btn')?.addEventListener('click', () => { _ticketFiles = []; _state = 'chat'; _renderPanel(); });
    // File attach
    panel.querySelector('#ticket-attach-btn')?.addEventListener('click', () => panel.querySelector('#ticket-file-input')?.click());
    panel.querySelector('#ticket-file-input')?.addEventListener('change', e => {
      Array.from(e.target.files || []).forEach(f => {
        if (_ticketFiles.length >= 3) return;
        if (f.size > 10 * 1024 * 1024) { alert(`"${f.name}" é muito grande. Limite de 10 MB.`); return; }
        _ticketFiles.push(f);
      });
      _refreshTicketAttachList();
      e.target.value = '';
    });
    _refreshTicketAttachList();
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
    // File attach in reply
    panel.querySelector('#reply-attach-btn')?.addEventListener('click', () => panel.querySelector('#reply-file-input')?.click());
    panel.querySelector('#reply-file-input')?.addEventListener('change', e => {
      const f = e.target.files?.[0];
      if (f && f.size <= 10 * 1024 * 1024) { _replyFile = f; _renderPanel(); }
      else if (f) alert('Arquivo muito grande. O limite é 10 MB.');
    });
    panel.querySelector('#reply-attach-remove')?.addEventListener('click', () => { _replyFile = null; _renderPanel(); });
  }
}

// ─── Panel toggle ───
function _togglePanel() {
  _open ? _closePanel() : _openPanel();
}

function _openPanel() {
  _open = true;
  _render();
  requestAnimationFrame(() => {
    if      (_state === 'login')       panel.querySelector('#chat-cpf')?.focus();
    else if (_state === 'login_senha') panel.querySelector('#chat-pwd')?.focus();
    else if (_state === 'ativacao')    panel.querySelector('#chat-new-pwd')?.focus();
    else if (_state === 'chat')        panel.querySelector('#chat-input')?.focus();
  });
}

function _closePanel() {
  _open = false;
  _renderBubble();
  panel.classList.remove('open');
  panel.setAttribute('aria-hidden', 'true');
}

// ─── Login — Passo 1: verificar CPF ───
async function _handleCpfStep(e) {
  e.preventDefault();
  const cpfRaw = panel.querySelector('#chat-cpf').value.replace(/\D/g, '');
  const errEl  = panel.querySelector('#chat-login-error');
  const btn    = panel.querySelector('#chat-cpf-btn');

  if (cpfRaw.length !== 11) { _showError(errEl, 'Informe um CPF válido com 11 dígitos.'); return; }

  btn.disabled = true;
  btn.textContent = 'Verificando…';
  _hideError(errEl);

  try {
    const res  = await fetch(`${API_URL}/api/verificar-cpf`, {
      method: 'POST', credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ cpf: cpfRaw }),
    });
    const data = await res.json();

    if (!data.success) {
      _showError(errEl, data.message || 'CPF não encontrado.');
      btn.disabled = false;
      btn.textContent = 'Continuar';
      return;
    }

    _pendingCPF  = cpfRaw;
    _pendingNome = data.nome || '';

    if (data.status === 'existente') {
      _state = 'login_senha';
    } else if (data.status === 'primeiro_acesso') {
      _state = 'ativacao';
    }
    _render();
  } catch {
    _showError(errEl, 'Não foi possível conectar ao servidor.');
    btn.disabled = false;
    btn.textContent = 'Continuar';
  }
}

// ─── Login — Passo 2a: senha para usuário existente ───
async function _handleSenhaStep(e) {
  e.preventDefault();
  const pwd   = panel.querySelector('#chat-pwd').value;
  const errEl = panel.querySelector('#chat-login-error');
  const btn   = panel.querySelector('#chat-pwd-btn');

  if (!pwd) { _showError(errEl, 'Informe sua senha.'); return; }

  btn.disabled = true;
  btn.textContent = 'Entrando…';
  _hideError(errEl);

  try {
    const res  = await fetch(`${API_URL}/api/login`, {
      method: 'POST', credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ cpf: _pendingCPF, password: pwd }),
    });
    const data = await res.json();

    if (data.success) {
      sessionStorage.setItem(SESSION_KEY, '1');
      const nome = _pendingNome || data.nome || '';
      _messages = [{ role: 'bot', text: `Olá${nome ? ', ' + nome.split(' ')[0] : ''}! Sou o assistente de RH da MC1. Como posso te ajudar hoje?` }];
      _state = 'chat';
      _render();
    } else {
      _showError(errEl, data.message || 'Senha incorreta. Tente novamente.');
      btn.disabled = false;
      btn.textContent = 'Entrar';
    }
  } catch {
    _showError(errEl, 'Não foi possível conectar ao servidor.');
    btn.disabled = false;
    btn.textContent = 'Entrar';
  }
}

// ─── Login — Passo 2b: ativar conta (primeiro acesso) ───
async function _handleAtivacaoStep(e) {
  e.preventDefault();
  const pwd     = panel.querySelector('#chat-new-pwd').value;
  const confirm = panel.querySelector('#chat-confirm-pwd').value;
  const errEl   = panel.querySelector('#chat-login-error');
  const btn     = panel.querySelector('#chat-activation-btn');

  if (pwd.length < 6)   { _showError(errEl, 'A senha deve ter no mínimo 6 caracteres.'); return; }
  if (pwd !== confirm)   { _showError(errEl, 'As senhas não coincidem. Tente novamente.'); return; }

  btn.disabled = true;
  btn.textContent = 'Ativando…';
  _hideError(errEl);

  try {
    const res  = await fetch(`${API_URL}/api/ativar-acesso`, {
      method: 'POST', credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ cpf: _pendingCPF, password: pwd, confirm }),
    });
    const data = await res.json();

    if (data.success) {
      sessionStorage.setItem(SESSION_KEY, '1');
      const nome = data.nome || _pendingNome || '';
      _messages = [{
        role: 'bot',
        text: `🎉 Conta ativada com sucesso${nome ? ', ' + nome.split(' ')[0] : ''}! Sou o assistente de RH da MC1. Pode me perguntar sobre férias, salário, benefícios e muito mais. Como posso te ajudar?`
      }];
      _state = 'chat';
      _render();
    } else {
      _showError(errEl, data.message || 'Não foi possível ativar a conta.');
      btn.disabled = false;
      btn.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right:4px"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>Ativar Minha Conta`;
    }
  } catch {
    _showError(errEl, 'Não foi possível conectar ao servidor.');
    btn.disabled = false;
    btn.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right:4px"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>Ativar Minha Conta`;
  }
}

// ─── Password strength indicator ───
function _updatePwdStrength() {
  const pwdIn    = panel.querySelector('#chat-new-pwd');
  const wrapper  = panel.querySelector('#chat-pwd-strength');
  const fill     = panel.querySelector('#chat-pwd-strength-fill');
  const label    = panel.querySelector('#chat-pwd-strength-label');
  if (!pwdIn || !wrapper || !fill || !label) return;

  const pwd = pwdIn.value;
  if (!pwd) { wrapper.style.display = 'none'; return; }
  wrapper.style.display = 'flex';

  let score = 0;
  if (pwd.length >= 6)  score++;
  if (pwd.length >= 10) score++;
  if (/[A-Z]/.test(pwd))  score++;
  if (/[0-9]/.test(pwd))  score++;
  if (/[^A-Za-z0-9]/.test(pwd)) score++;

  const levels = [
    { pct: '20%', color: '#dc2626', text: 'Muito fraca' },
    { pct: '40%', color: '#f97316', text: 'Fraca'       },
    { pct: '60%', color: '#eab308', text: 'Razoável'    },
    { pct: '80%', color: '#22c55e', text: 'Boa'         },
    { pct: '100%',color: '#16a34a', text: 'Forte'       },
  ];
  const lvl = levels[Math.min(score - 1, 4)] || levels[0];
  fill.style.width          = lvl.pct;
  fill.style.background     = lvl.color;
  label.textContent         = lvl.text;
  label.style.color         = lvl.color;
}

// ─── Chat send ───
async function _handleSend(e) {
  e.preventDefault();
  const input = panel.querySelector('#chat-input');
  const text  = input.value.trim();
  if (!text || _typing) return;

  const fileForSend = _chatFile;
  input.value = '';
  _chatFile   = null;
  const displayText = fileForSend ? `${text}${text ? ' ' : ''}[📎 ${fileForSend.name}]` : text;
  _messages.push({ role: 'user', text: displayText });
  _typing = true;
  _suggestTicket = false;
  _renderPanel();

  try {
    let fetchOptions;
    if (fileForSend) {
      const fd = new FormData();
      fd.append('message', text);
      fd.append('file', fileForSend);
      fetchOptions = { method: 'POST', credentials: 'include', body: fd };
    } else {
      fetchOptions = { method: 'POST', credentials: 'include',
                       headers: { 'Content-Type': 'application/json' },
                       body: JSON.stringify({ message: text }) };
    }
    const res = await fetch(`${API_URL}/api/chat`, fetchOptions);

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
  _messages = []; _suggestTicket = false; _typing = false; _chatFile = null;
  _renderPanel();
}

// ─── Logout ───
function _handleLogout() {
  sessionStorage.removeItem(SESSION_KEY);
  _messages = []; _suggestTicket = false; _typing = false;
  _myTickets = []; _chatFile = null; _ticketFiles = []; _replyFile = null;
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
    let fetchOpts;
    if (_ticketFiles.length > 0) {
      const fd = new FormData();
      fd.append('categoria', cat); fd.append('descricao', desc); fd.append('email', email);
      _ticketFiles.forEach(f => fd.append('files', f));
      fetchOpts = { method: 'POST', credentials: 'include', body: fd };
    } else {
      fetchOpts = { method: 'POST', credentials: 'include',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ categoria: cat, descricao: desc, email }) };
    }
    const res  = await fetch(`${API_URL}/api/chamado/abrir`, fetchOpts);
    const data = await res.json();

    if (data.success) { _ticketFiles = []; _state = 'success'; _renderPanel(); }
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

  const fileForReply = _replyFile;
  _replyFile = null;
  btn.disabled = true; btn.textContent = 'Enviando…'; _hideError(errEl);

  try {
    let fetchOpts;
    if (fileForReply) {
      const fd = new FormData();
      fd.append('id', _currentTicketId); fd.append('texto', texto); fd.append('files', fileForReply);
      fetchOpts = { method: 'POST', credentials: 'include', body: fd };
    } else {
      fetchOpts = { method: 'POST', credentials: 'include',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ id: _currentTicketId, texto }) };
    }
    const res  = await fetch(`${API_URL}/api/chamado/responder`, fetchOpts);
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
