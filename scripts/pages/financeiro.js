// MC1 HUB — Financeiro Page (Placeholder)

export function renderFinanceiro(container) {
  container.innerHTML = `
    <section class="section-sm" style="background: var(--color-surface-container-low);">
      <div class="container">
        <nav class="breadcrumb" aria-label="Caminho de navegação">
          <a href="#/">Home</a>
          <svg width="14" height="14"><use href="#icon-chevron-right"/></svg>
          <span>Financeiro</span>
        </nav>
        <div class="page-header" style="padding-top:var(--space-6)">
          <span class="label-md" style="color:var(--color-primary)">Departamento</span>
          <h1>Financeiro</h1>
          <p>Informações, comunicados e recursos do departamento Financeiro.</p>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div style="
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: var(--space-20) var(--space-8);
          background: var(--color-surface-lowest);
          border-radius: var(--radius-2xl);
          box-shadow: var(--shadow-sm);
          max-width: 560px;
          margin: 0 auto;
        " data-reveal>
          <div class="icon-wrap icon-wrap-xl" style="
            background: linear-gradient(135deg, #059669, #10b981);
            color: white;
            margin-bottom: var(--space-6);
          ">
            <svg width="36" height="36"><use href="#icon-document"/></svg>
          </div>
          <span class="chip chip-primary" style="margin-bottom: var(--space-4)">Em breve</span>
          <h2 class="headline-lg" style="margin-bottom: var(--space-4)">Página em construção</h2>
          <p class="body-lg text-muted" style="max-width: 38ch; margin-bottom: var(--space-8)">
            O conteúdo do departamento Financeiro está sendo preparado e estará disponível em breve.
          </p>
          <div style="display:flex; gap: var(--space-3); flex-wrap: wrap; justify-content: center;">
            <a href="#/" class="btn btn-primary">
              <svg width="16" height="16"><use href="#icon-home"/></svg>
              Voltar ao início
            </a>
          </div>
        </div>
      </div>
    </section>
  `;
}
