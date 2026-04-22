// MC1 HUB — Sobre a MC1

import { t } from '../i18n.js';

export function renderSobreMC1(container) {
  container.innerHTML = `
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
          <div class="sobre-metric-label" style="font-size:0.95rem; font-weight:600; color:#004b71; line-height:1.5; margin-top:0">Presente na operação das maiores empresas de consumo do mundo</div>
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


    </div>
  `;
}
