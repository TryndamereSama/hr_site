// MC1 HUB — Contato Interno Page Renderer

import { contatos, avatarGradients } from '../data/contatos.js';
import { showToast } from '../../components/toast.js';

export function renderContato(container) {
  container.innerHTML = `
    <section class="section-sm" style="background: var(--color-surface-container-low);">
      <div class="container">
        <nav class="breadcrumb" aria-label="Caminho">
          <a href="#/">Home</a>
          <svg width="14" height="14"><use href="#icon-chevron-right"/></svg>
          <span>Contato</span>
        </nav>
        <div class="page-header" style="padding-top:var(--space-6)">
          <span class="label-md" style="color:var(--color-primary)">Fale Conosco</span>
          <h1>Contato Interno</h1>
          <p>Escolha o canal ideal ou envie uma mensagem diretamente para a equipe de RH.</p>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="contact-layout">

          <!-- Contact Form -->
          <div class="contact-form-col" data-reveal>
            <div style="background:var(--color-surface-lowest); border-radius:var(--radius-xl); padding:var(--space-8); box-shadow:var(--shadow-md)">
              <h2 class="headline-md" style="margin-bottom:var(--space-2)">Enviar Mensagem</h2>
              <p class="body-md text-muted" style="margin-bottom:var(--space-8)">Nossa equipe responde em até 1 dia útil.</p>

              <form id="contact-form" novalidate>
                <div style="display:flex; flex-direction:column; gap:var(--space-5)">
                  <div class="form-group">
                    <label class="form-label" for="contact-assunto">Assunto *</label>
                    <select class="form-select" id="contact-assunto" name="assunto" required>
                      <option value="">Selecione o assunto...</option>
                      <option value="beneficios">Dúvida sobre Benefícios</option>
                      <option value="pagamento">Folha de Pagamento</option>
                      <option value="documentacao">Documentação</option>
                      <option value="ponto">Ponto Eletrônico (Ahgora)</option>
                      <option value="ferias">Férias e Ausências</option>
                      <option value="treinamento">Treinamentos</option>
                      <option value="outro">Outro</option>
                    </select>
                  </div>
                  <div class="form-group">
                    <label class="form-label" for="contact-nome">Nome *</label>
                    <input type="text" class="form-input" id="contact-nome" name="nome" value="Vitor Faria" required autocomplete="name" />
                  </div>
                  <div class="form-group">
                    <label class="form-label" for="contact-email">E-mail *</label>
                    <input type="email" class="form-input" id="contact-email" name="email" value="vitor.faria@mc1global.com" required autocomplete="email" />
                  </div>
                  <div class="form-group">
                    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:var(--space-2)">
                      <label class="form-label" for="contact-mensagem" style="margin-bottom:0">Mensagem *</label>
                      <span class="char-counter" id="char-count">0 / 500</span>
                    </div>
                    <textarea class="form-textarea" id="contact-mensagem" name="mensagem" maxlength="500" placeholder="Descreva sua dúvida ou solicitação..." required></textarea>
                  </div>
                  <div style="display:flex; gap:var(--space-3); align-items:center">
                    <button type="submit" class="btn btn-primary btn-lg" id="submit-btn" style="flex:1">
                      <svg width="18" height="18"><use href="#icon-mail"/></svg>
                      <span id="submit-label">Enviar Mensagem</span>
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>

          <!-- Team Quick Cards -->
          <div class="contact-team-col" data-reveal data-reveal-delay="150">
            <h2 class="headline-md" style="margin-bottom:var(--space-6)">Equipe de RH</h2>
            <div style="display:flex; flex-direction:column; gap:var(--space-4)" id="contact-team-list"></div>

            <!-- Direct contact info -->
            <div style="margin-top:var(--space-8); display:flex; flex-direction:column; gap:var(--space-4)">
              <div style="display:flex; align-items:center; gap:var(--space-4); padding:var(--space-4); background:var(--color-surface-container-low); border-radius:var(--radius-xl)">
                <div class="icon-wrap icon-wrap-md icon-teal">
                  <svg width="20" height="20"><use href="#icon-mail"/></svg>
                </div>
                <div>
                  <p class="label-md text-muted">E-mail geral</p>
                  <a href="mailto:rh@mc1global.com" style="font-weight:600; color:var(--color-primary); font-size:var(--text-sm)">rh@mc1global.com</a>
                </div>
              </div>
              <div style="display:flex; align-items:center; gap:var(--space-4); padding:var(--space-4); background:var(--color-surface-container-low); border-radius:var(--radius-xl)">
                <div class="icon-wrap icon-wrap-md icon-teal">
                  <svg width="20" height="20"><use href="#icon-phone"/></svg>
                </div>
                <div>
                  <p class="label-md text-muted">Telefone</p>
                  <a href="tel:+551134567890" style="font-weight:600; color:var(--color-on-surface); font-size:var(--text-sm)">(11) 3456-7890</a>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  `;

  // ─── Team list ───
  const teamList = container.querySelector('#contact-team-list');
  contatos.slice(0, 4).forEach(c => {
    const item = document.createElement('div');
    item.style.cssText = 'display:flex; align-items:center; gap:var(--space-3); padding:var(--space-4); background:var(--color-surface-lowest); border-radius:var(--radius-xl); box-shadow:var(--shadow-xs)';
    item.innerHTML = `
      <div class="avatar avatar-md" style="background: ${avatarGradients[c.colorIndex]}; color:white; flex-shrink:0">${c.initials}</div>
      <div style="flex:1; min-width:0">
        <p style="font-weight:600; font-size:var(--text-sm); white-space:nowrap; overflow:hidden; text-overflow:ellipsis">${c.name}</p>
        <p class="label-lg text-muted" style="white-space:nowrap; overflow:hidden; text-overflow:ellipsis">${c.role}</p>
      </div>
      <a href="mailto:${c.email}" class="btn btn-surface btn-sm" aria-label="E-mail para ${c.name}">
        <svg width="14" height="14"><use href="#icon-mail"/></svg>
      </a>
    `;
    teamList.appendChild(item);
  });

  // ─── Char counter ───
  const textarea = container.querySelector('#contact-mensagem');
  const charCount = container.querySelector('#char-count');
  textarea?.addEventListener('input', () => {
    charCount.textContent = `${textarea.value.length} / 500`;
  });

  // ─── Form submit ───
  const form = container.querySelector('#contact-form');
  const submitBtn = container.querySelector('#submit-btn');
  const submitLabel = container.querySelector('#submit-label');

  form?.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Basic validation
    const nome = container.querySelector('#contact-nome').value.trim();
    const email = container.querySelector('#contact-email').value.trim();
    const assunto = container.querySelector('#contact-assunto').value;
    const mensagem = container.querySelector('#contact-mensagem').value.trim();

    if (!nome || !email || !assunto || !mensagem) {
      showToast({ message: 'Por favor, preencha todos os campos obrigatórios.', type: 'error' });
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showToast({ message: 'Informe um e-mail válido.', type: 'error' });
      return;
    }

    // Simulate loading
    submitBtn.disabled = true;
    submitLabel.textContent = 'Enviando...';

    await new Promise(resolve => setTimeout(resolve, 1200));

    submitBtn.disabled = false;
    submitLabel.textContent = 'Enviar Mensagem';

    showToast({
      title: 'Mensagem enviada!',
      message: 'O RH responderá em até 1 dia útil.',
      type: 'success',
      duration: 5000,
    });

    form.reset();
    if (charCount) charCount.textContent = '0 / 500';
    // Re-fill pre-filled fields
    container.querySelector('#contact-nome').value = 'Vitor Faria';
    container.querySelector('#contact-email').value = 'vitor.faria@mc1global.com';
  });
}
