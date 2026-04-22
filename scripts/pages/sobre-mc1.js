// MC1 HUB — Sobre a MC1

import { t } from '../i18n.js';

export function renderSobreMC1(container) {
  container.innerHTML = `
    <!-- Page-scoped styles -->
    <style>
      .sobre-page {
        font-family: var(--font-sans, 'Inter', system-ui, sans-serif);
        color: var(--color-on-surface);
        max-width: 900px;
        margin: 0 auto;
        padding-bottom: 4rem;
      }
      .sobre-page .s-eyebrow {
        font-size: 11px;
        letter-spacing: 0.15em;
        text-transform: uppercase;
        color: var(--color-on-surface-muted);
        margin-bottom: 1.25rem;
      }

      /* ─── Hero ─── */
      .sobre-hero {
        padding: 3.5rem 2rem 3rem;
        border-bottom: 1px solid var(--color-outline-subtle);
      }
      .sobre-hero-title {
        font-size: clamp(1.9rem, 4.5vw, 3rem);
        font-weight: 700;
        letter-spacing: -0.02em;
        line-height: 1.15;
        max-width: 680px;
        margin-bottom: 1.25rem;
        color: var(--color-on-surface);
      }
      .sobre-hero-title strong { color: #004b71; font-weight: 800; }
      .sobre-hero-sub {
        font-size: 1rem;
        color: var(--color-on-surface-muted);
        max-width: 540px;
        line-height: 1.75;
      }
      .sobre-tags {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        margin-top: 1.75rem;
      }
      .sobre-tag {
        font-size: 11px;
        letter-spacing: 0.06em;
        text-transform: uppercase;
        padding: 5px 12px;
        border: 1px solid var(--color-outline-variant);
        border-radius: 100px;
        color: var(--color-on-surface-muted);
      }

      /* ─── Metrics bar ─── */
      .sobre-metrics {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 1px;
        background: var(--color-outline-subtle);
        border-bottom: 1px solid var(--color-outline-subtle);
      }
      .sobre-metric {
        background: var(--color-surface-lowest);
        padding: 2rem 1.75rem;
      }
      .sobre-metric-num {
        font-size: 2.8rem;
        font-weight: 800;
        letter-spacing: -0.03em;
        color: #004b71;
        line-height: 1;
      }
      .sobre-metric-label {
        font-size: 13px;
        color: var(--color-on-surface-muted);
        margin-top: 0.4rem;
        line-height: 1.5;
      }

      /* ─── Sections ─── */
      .sobre-section {
        padding: 3rem 2rem;
        border-bottom: 1px solid var(--color-outline-subtle);
      }
      .sobre-section-title {
        font-size: 1.6rem;
        font-weight: 700;
        letter-spacing: -0.02em;
        margin-bottom: 1rem;
        color: var(--color-on-surface);
      }
      .sobre-section-body {
        font-size: 0.95rem;
        color: var(--color-on-surface-muted);
        line-height: 1.8;
        max-width: 600px;
      }

      /* ─── Results ─── */
      .sobre-results {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 1px;
        background: var(--color-outline-subtle);
        margin-top: 2rem;
        border-radius: var(--radius-lg);
        overflow: hidden;
      }
      .sobre-result-card {
        background: var(--color-surface-container-low);
        padding: 1.5rem 1.25rem;
      }
      .sobre-result-brand {
        font-size: 11px;
        font-weight: 600;
        letter-spacing: 0.1em;
        text-transform: uppercase;
        color: var(--color-on-surface-muted);
        margin-bottom: 0.75rem;
      }
      .sobre-result-stat {
        font-size: 2.2rem;
        font-weight: 800;
        letter-spacing: -0.03em;
        color: #004b71;
        line-height: 1;
      }
      .sobre-result-stat-sm {
        font-size: 1.6rem;
        font-weight: 800;
        letter-spacing: -0.03em;
        color: #004b71;
        line-height: 1;
        margin-top: 12px;
      }
      .sobre-result-desc {
        font-size: 12px;
        color: var(--color-on-surface-muted);
        margin-top: 0.35rem;
        line-height: 1.5;
      }

      /* ─── Products ─── */
      .sobre-products {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 12px;
        margin-top: 1.75rem;
      }
      .sobre-product-card {
        background: var(--color-surface-lowest);
        border: 1px solid var(--color-outline-subtle);
        border-radius: var(--radius-lg);
        padding: 1.25rem;
        display: flex;
        align-items: flex-start;
        gap: 10px;
      }
      .sobre-product-dot {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: #004b71;
        flex-shrink: 0;
        margin-top: 5px;
      }
      .sobre-product-name {
        font-weight: 600;
        font-size: 0.9rem;
        margin-bottom: 0.3rem;
        color: var(--color-on-surface);
      }
      .sobre-product-desc {
        font-size: 13px;
        color: var(--color-on-surface-muted);
        line-height: 1.55;
      }

      /* ─── Presence ─── */
      .sobre-offices {
        display: flex;
        flex-wrap: wrap;
        gap: 24px;
        margin-top: 1.75rem;
      }
      .sobre-office {
        border-left: 2px solid #004b71;
        padding-left: 14px;
      }
      .sobre-office-city {
        font-weight: 600;
        font-size: 0.9rem;
        color: var(--color-on-surface);
      }
      .sobre-office-addr {
        font-size: 12px;
        color: var(--color-on-surface-muted);
        margin-top: 3px;
        line-height: 1.45;
      }

      /* ─── Values ─── */
      .sobre-values {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 8px;
        margin-top: 1.5rem;
      }
      .sobre-value-item {
        display: flex;
        align-items: flex-start;
        gap: 12px;
        padding: 1rem;
        border: 1px solid var(--color-outline-subtle);
        border-radius: var(--radius-md);
        background: var(--color-surface-lowest);
      }
      .sobre-value-index {
        font-size: 1rem;
        font-weight: 700;
        color: #004b71;
        min-width: 22px;
        flex-shrink: 0;
      }
      .sobre-value-text {
        font-size: 0.875rem;
        line-height: 1.55;
        color: var(--color-on-surface-muted);
      }

      /* ─── CTA ─── */
      .sobre-cta {
        background: #001e2d;
        padding: 4rem 2rem;
        text-align: center;
        margin: 0;
      }
      .sobre-cta-title {
        font-size: 1.9rem;
        font-weight: 700;
        letter-spacing: -0.02em;
        color: #ffffff;
        margin-bottom: 0.75rem;
        line-height: 1.2;
      }
      .sobre-cta-sub {
        font-size: 0.95rem;
        color: rgba(255,255,255,0.65);
        margin-bottom: 1.75rem;
        max-width: 480px;
        margin-left: auto;
        margin-right: auto;
      }
      .sobre-cta-btn {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        padding: 12px 28px;
        background: #004b71;
        color: #fff;
        border-radius: var(--radius-md);
        font-size: 0.9rem;
        font-weight: 600;
        text-decoration: none;
        transition: background 0.2s;
      }
      .sobre-cta-btn:hover { background: #006494; }

      /* ─── Mobile ─── */
      @media (max-width: 640px) {
        .sobre-metrics,
        .sobre-results { grid-template-columns: 1fr; }
        .sobre-products,
        .sobre-values { grid-template-columns: 1fr; }
        .sobre-hero { padding: 2.5rem 1.25rem 2rem; }
        .sobre-section { padding: 2.25rem 1.25rem; }
        .sobre-cta { padding: 3rem 1.25rem; }
        .sobre-metric { padding: 1.5rem 1.25rem; }
      }
    </style>

    <!-- Breadcrumb header -->
    <section class="section-sm" style="background: var(--color-surface-container-low);">
      <div class="container" style="max-width:900px">
        <nav class="breadcrumb" aria-label="Caminho de navegação">
          <a href="#/">${t('common.home')}</a>
          <svg width="14" height="14"><use href="#icon-chevron-right"/></svg>
          <a href="#/operacional">${t('nav.operacional')}</a>
          <svg width="14" height="14"><use href="#icon-chevron-right"/></svg>
          <span>${t('nav.operacional.sobre')}</span>
        </nav>
      </div>
    </section>

    <!-- Page body -->
    <div class="sobre-page">

      <!-- ① Hero -->
      <div class="sobre-hero" data-reveal>
        <p class="s-eyebrow">MC1 · Win the Market</p>
        <h1 class="sobre-hero-title">
          Software que transforma execução de vendas em <strong>resultado real</strong>
        </h1>
        <p class="sobre-hero-sub">
          Mais de 20 anos capacitando empresas de bens de consumo a vender mais, com mais eficiência e menor custo operacional. Presente em toda a América Latina e nas maiores empresas de consumo do mundo.
        </p>
        <div class="sobre-tags">
          <span class="sobre-tag">Image Recognition</span>
          <span class="sobre-tag">Trade Marketing</span>
          <span class="sobre-tag">Van Sales</span>
          <span class="sobre-tag">Pre Sales</span>
          <span class="sobre-tag">Delivery</span>
          <span class="sobre-tag">Field Sales</span>
        </div>
      </div>

      <!-- ② Métricas -->
      <div class="sobre-metrics">
        <div class="sobre-metric" data-reveal>
          <div class="sobre-metric-num">20+</div>
          <div class="sobre-metric-label">anos de mercado em soluções para CPG</div>
        </div>
        <div class="sobre-metric" data-reveal>
          <div class="sobre-metric-num">30+</div>
          <div class="sobre-metric-label">operações ativas em toda a América Latina</div>
        </div>
        <div class="sobre-metric" data-reveal>
          <div class="sobre-metric-num">100+</div>
          <div class="sobre-metric-label">Presente na operação das maiores empresas de consumo do mundo</div>
        </div>
      </div>

      <!-- ③ Posicionamento / Problema -->
      <div class="sobre-section" data-reveal>
        <p class="s-eyebrow">O problema que resolvemos</p>
        <h2 class="sobre-section-title">Execução no ponto de venda é onde receita é ganha ou perdida</h2>
        <p class="sobre-section-body">
          Equipes de campo com processos manuais perdem tempo, cometem erros e não entregam dados confiáveis. A MC1 substitui esse ciclo com plataforma móvel orientada por IA — de pedido e entrega até reconhecimento de imagem e gestão de trade.
        </p>
      </div>

      <!-- ④ Resultados por cliente -->
      <div class="sobre-section" data-reveal>
        <p class="s-eyebrow">Resultados em clientes reais</p>
        <h2 class="sobre-section-title">Números que fecham o argumento</h2>
        <div class="sobre-results">
          <div class="sobre-result-card">
            <div class="sobre-result-brand">PepsiCo</div>
            <div class="sobre-result-stat">−55%</div>
            <div class="sobre-result-desc">redução no tempo por visita — de 14 min para 6 min 40 s</div>
            <div class="sobre-result-stat-sm">+18%</div>
            <div class="sobre-result-desc">crescimento no número de representantes ativos</div>
          </div>
          <div class="sobre-result-card">
            <div class="sobre-result-brand">BRF</div>
            <div class="sobre-result-stat">+21%</div>
            <div class="sobre-result-desc">mais visitas por dia por representante de vendas</div>
            <div class="sobre-result-stat-sm">−20%</div>
            <div class="sobre-result-desc">redução no total de representantes necessários</div>
          </div>
          <div class="sobre-result-card">
            <div class="sobre-result-brand">Mondelez</div>
            <div class="sobre-result-stat">−53%</div>
            <div class="sobre-result-desc">redução no tempo de execução no varejo — de 90 para 42 minutos</div>
          </div>
        </div>
      </div>

      <!-- ⑤ Portfólio de produtos -->
      <div class="sobre-section" data-reveal>
        <p class="s-eyebrow">Portfólio de produtos</p>
        <h2 class="sobre-section-title">Uma plataforma, múltiplos vetores de resultado</h2>
        <div class="sobre-products">
          <div class="sobre-product-card">
            <div class="sobre-product-dot"></div>
            <div>
              <div class="sobre-product-name">Image Recognition (IRE)</div>
              <div class="sobre-product-desc">Leitura automática da gôndola em tempo real. Visibilidade total do planograma sem intervenção manual.</div>
            </div>
          </div>
          <div class="sobre-product-card">
            <div class="sobre-product-dot"></div>
            <div>
              <div class="sobre-product-name">Trade Marketing</div>
              <div class="sobre-product-desc">Gestão e monitoramento de ações de trade com rastreabilidade de ponta a ponta no ponto de venda.</div>
            </div>
          </div>
          <div class="sobre-product-card">
            <div class="sobre-product-dot"></div>
            <div>
              <div class="sobre-product-name">Pre Sales & Van Sales</div>
              <div class="sobre-product-desc">Digitalização do ciclo de pedidos — da tomada ao faturamento — com suporte a operações embarcadas.</div>
            </div>
          </div>
          <div class="sobre-product-card">
            <div class="sobre-product-dot"></div>
            <div>
              <div class="sobre-product-name">Field Sales Management</div>
              <div class="sobre-product-desc">Roteirização, gestão de equipe e dashboards em tempo real para supervisores e gestores comerciais.</div>
            </div>
          </div>
        </div>
      </div>

      <!-- ⑥ Presença global -->
      <div class="sobre-section" data-reveal>
        <p class="s-eyebrow">Presença global</p>
        <h2 class="sobre-section-title">Onde a MC1 opera</h2>
        <p class="sobre-section-body">Escritórios próprios nos principais mercados. Time local para suporte, implementação e expansão.</p>
        <div class="sobre-offices">
          <div class="sobre-office">
            <div class="sobre-office-city">🇧🇷 Brasil</div>
            <div class="sobre-office-addr">Av. Paulista, 302<br>São Paulo, SP</div>
          </div>
          <div class="sobre-office">
            <div class="sobre-office-city">🇺🇸 Estados Unidos</div>
            <div class="sobre-office-addr">25 SW 9th St, Suite 402<br>Miami, FL</div>
          </div>
          <div class="sobre-office">
            <div class="sobre-office-city">🇬🇧 Reino Unido</div>
            <div class="sobre-office-addr">1 Angel Ct, 13th Floor<br>London</div>
          </div>
          <div class="sobre-office">
            <div class="sobre-office-city">🇲🇽 México</div>
            <div class="sobre-office-addr">Lago Alberto 375<br>CDMX</div>
          </div>
          <div class="sobre-office">
            <div class="sobre-office-city">🇬🇷 Grécia</div>
            <div class="sobre-office-addr">Spaces Theanous<br>Athens</div>
          </div>
        </div>
      </div>

      <!-- ⑦ Valores / DNA -->
      <div class="sobre-section" data-reveal>
        <p class="s-eyebrow">Cultura e valores</p>
        <h2 class="sobre-section-title">O DNA que orienta as decisões</h2>
        <div class="sobre-values">
          <div class="sobre-value-item">
            <span class="sobre-value-index">01</span>
            <span class="sobre-value-text">Confiança para colaborar e conflitar — sem política, com resultado</span>
          </div>
          <div class="sobre-value-item">
            <span class="sobre-value-index">02</span>
            <span class="sobre-value-text">Integridade e respeito como base de todas as relações</span>
          </div>
          <div class="sobre-value-item">
            <span class="sobre-value-index">03</span>
            <span class="sobre-value-text">Obsessão pelo cliente — o cliente é nosso melhor consultor e ainda paga</span>
          </div>
          <div class="sobre-value-item">
            <span class="sobre-value-index">04</span>
            <span class="sobre-value-text">Excelência na execução — consistência acima de brilhantismo ocasional</span>
          </div>
          <div class="sobre-value-item">
            <span class="sobre-value-index">05</span>
            <span class="sobre-value-text">Desenvolvimento de pessoas como alavanca de crescimento da empresa</span>
          </div>
          <div class="sobre-value-item">
            <span class="sobre-value-index">06</span>
            <span class="sobre-value-text">Diversidade e inclusão presentes nas práticas, não só no discurso</span>
          </div>
        </div>
      </div>

      <!-- ⑧ CTA -->
      <div class="sobre-cta">
        <h2 class="sobre-cta-title">Pronto para transformar sua operação de campo?</h2>
        <p class="sobre-cta-sub">Converse com nossos especialistas e veja como a MC1 se aplica ao seu contexto.</p>
        <a href="#/contato" class="sobre-cta-btn">
          Falar com um especialista
          <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M7 17L17 7M17 7H7M17 7v10"/></svg>
        </a>
      </div>

    </div>
  `;
}
