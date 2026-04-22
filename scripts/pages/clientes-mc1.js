// MC1 HUB — Clientes MC1

import { t } from '../i18n.js';

const CLIENTES = [
  {
    name: 'PepsiCo',
    countries: '17 países da América Latina',
    products: ['Sales', 'Van Sales', 'Trade'],
    since: 2018,
    users: 30500,
    gradient: 'linear-gradient(135deg,#1565c0,#0288d1)',
    logo: 'pepsico.com',
    desc: [
      'A PepsiCo é uma das maiores empresas globais de alimentos e bebidas, com um portfólio reconhecido mundialmente e forte presença na América Latina. Atuando em diversas categorias, a companhia se destaca pela escala operacional, capilaridade de distribuição e constante inovação em produtos e estratégias comerciais.',
      'Desde 2018, a PepsiCo utiliza nossa solução de vendas em 17 países da América Latina, consolidando uma das implementações mais robustas do nosso portfólio. Mais de 33 mil vendedores operam diariamente com a plataforma, apoiando a execução no ponto de venda, aumento de produtividade e padronização dos processos comerciais em larga escala.'
    ]
  },
  {
    name: 'Mondelez',
    countries: 'Brasil, México, Argentina, Grécia, Peru e Equador',
    products: ['Sales', 'Van Sales', 'Trade', 'IRE'],
    since: 2021,
    users: 10500,
    gradient: 'linear-gradient(135deg,#6a1b9a,#ab47bc)',
    logo: 'mondelezinternational.com',
    desc: [
      'A Mondelez International é uma das maiores empresas globais do setor de alimentos, com um portfólio de marcas amplamente reconhecidas e forte presença em diversos mercados. Com foco em snacks e produtos de consumo rápido, a companhia se destaca pela excelência na execução comercial e pela constante busca por inovação em suas operações.',
      'Desde 2021, a Mondelez utiliza nossa solução de Sales e Trade, com destaque para a execução em campo e iniciativas de IRE, elevando o nível de visibilidade e controle da operação. Um marco importante da parceria foi a implementação bem-sucedida na Grécia, superando desafios relevantes e nos credenciando para avançar em novos países e ampliar os resultados em diferentes regiões.'
    ]
  },
  {
    name: 'Bimbo',
    countries: 'Brasil, Argentina, Chile, Paraguai e Uruguai',
    products: ['Van Sales'],
    since: 2019,
    users: 13800,
    gradient: 'linear-gradient(135deg,#b71c1c,#ef5350)',
    logo: 'grupobimbo.com',
    desc: [
      'O Grupo Bimbo é uma das maiores empresas de panificação do mundo, com presença global e um portfólio amplo de marcas reconhecidas. Com forte atuação na América Latina, a companhia se destaca pela capilaridade de sua operação, eficiência logística e foco na excelência na execução no ponto de venda.',
      'Desde 2019, a Bimbo vem expandindo sua parceria com a MC1, alcançando resultados consistentes no Brasil e na América Latina, o que tem aberto oportunidades para avançarmos também em outras regiões. A utilização das soluções de Sales e Van Sales, aliadas a processos robustos de backoffice, tem sido o principal motor de desempenho.'
    ]
  },
  {
    name: 'Heineken',
    countries: 'Brasil, México e Peru',
    products: ['Sales'],
    since: 2020,
    users: 4100,
    gradient: 'linear-gradient(135deg,#1b5e20,#43a047)',
    logo: 'heineken.com',
    desc: [
      'A Heineken, por meio de suas operações no Brasil e no México, representa uma das mais relevantes parcerias do nosso portfólio. Presente entre os maiores mercados globais da companhia, essas operações se destacam pela escala, complexidade e alto nível de exigência na execução comercial, reforçando a importância estratégica da marca em nossa base de clientes.',
      'Os resultados alcançados nessas regiões têm sido fundamentais para a expansão da parceria, abrindo portas para novas iniciativas em outros países. Recentemente, iniciamos a implementação das soluções de Sales e IRE no Peru.'
    ]
  },
  {
    name: 'BRF',
    countries: 'Brasil, Chile, Emirados Árabes, Kuwait, Omã, Arábia Saudita e Qatar',
    products: ['Sales', 'IRE'],
    since: 2014,
    users: 4700,
    gradient: 'linear-gradient(135deg,#0d47a1,#1976d2)',
    logo: 'brf-global.com',
    desc: [
      'A BRF é uma das maiores companhias globais do setor de alimentos, com forte presença internacional e um portfólio de marcas amplamente reconhecidas, como Sadia e Perdigão. A empresa se destaca pela escala de suas operações, excelência na cadeia produtiva e relevância nos mercados em que atua.',
      'Há muitos anos como um dos nossos principais parceiros, a BRF utiliza nossa solução para suportar uma operação de vendas de grande magnitude, movimentando mais de 1 bilhão por mês. A plataforma está presente não apenas no Brasil, mas também em operações na Ásia, contribuindo para padronização, eficiência e controle em diferentes geografias. Uma parceria construída sobre confiança, resultados e evolução contínua.'
    ]
  },
  {
    name: 'Energisa',
    countries: 'Brasil',
    products: ['Field'],
    since: 2009,
    users: 4300,
    gradient: 'linear-gradient(135deg,#e65100,#ff8f00)',
    logo: 'energisa.com.br',
    desc: [
      'A Energisa é um dos maiores grupos privados do setor elétrico brasileiro, com atuação em distribuição de energia e serviços relacionados, atendendo milhões de clientes em diversas regiões do país. Reconhecida pela eficiência operacional e foco em inovação, a companhia desempenha um papel fundamental na infraestrutura energética nacional.',
      'A Energisa utiliza soluções desenvolvidas pela MC1 para suportar sua operação de execução de serviços em campo, abrangendo desde o despacho de ordens de serviço até a gestão de projetos elétricos. A plataforma apoia processos como leitura e impressão de faturas diretamente no campo, garantindo maior agilidade, controle operacional e qualidade no atendimento ao cliente final.'
    ]
  },
  {
    name: 'Santander',
    countries: 'Brasil',
    products: ['Field'],
    since: 2016,
    users: 3500,
    gradient: 'linear-gradient(135deg,#b71c1c,#c62828)',
    logo: 'santander.com.br',
    desc: [
      'O Banco Santander é uma das maiores instituições financeiras do mundo, com forte presença no Brasil e ampla rede de agências físicas. Reconhecido por sua solidez, inovação e foco na experiência do cliente, o banco mantém operações altamente estruturadas e exige elevados padrões de controle e governança em seus processos.',
      'Há mais de uma década, o Santander utiliza nossa solução de Field para o controle de ordens de serviço associadas à sua rede de agências, garantindo rastreabilidade e eficiência na gestão do atendimento presencial.'
    ]
  },
  {
    name: 'Ferrero',
    countries: 'Brasil, Argentina e Colômbia',
    products: ['Sales', 'Trade'],
    since: 2016,
    users: 1500,
    gradient: 'linear-gradient(135deg,#bf360c,#f4511e)',
    logo: 'ferrero.com',
    desc: [
      'A Ferrero é uma das maiores empresas globais do setor de alimentos, reconhecida por marcas icônicas e forte presença no mercado de chocolates e confeitaria. Com atuação em diversos países, a companhia se destaca pela qualidade de seus produtos, excelência na execução e forte estratégia de distribuição.',
      'A Ferrero utiliza nossa solução de Vendas e Trade para potencializar a execução no ponto de venda, com destaque para sua robusta operação baseada em distribuidores. Dezenas de operadores utilizam diariamente a plataforma para gestão de pedidos, acompanhamento de execução e visibilidade das ações comerciais, garantindo maior controle, eficiência e padronização em toda a cadeia de vendas indiretas.'
    ]
  },
  {
    name: 'White Martins',
    countries: 'Brasil',
    products: ['Van Sales'],
    since: 2021,
    users: 1240,
    gradient: 'linear-gradient(135deg,#263238,#455a64)',
    logo: 'whitemartins.com.br',
    desc: [
      'A White Martins é uma das principais empresas do Brasil no segmento de gases industriais e medicinais, atendendo setores estratégicos como saúde, indústria e energia. Com uma operação altamente capilar e logística sofisticada, a companhia desempenha um papel essencial no suporte a diversas cadeias produtivas em todo o território nacional.',
      'Desde 2021, a White Martins utiliza nossa solução para suportar uma operação de vendas altamente complexa, que inclui a emissão e impressão de notas fiscais diretamente no campo. Um dos grandes diferenciais do projeto é o modelo de vendas embarcado, no qual motoristas realizam transações comerciais diretamente de seus caminhões, garantindo agilidade, rastreabilidade e eficiência em uma operação distribuída por todo o Brasil.'
    ]
  },
  {
    name: 'Herdez',
    countries: 'México',
    products: ['Sales', 'Trade'],
    since: 2021,
    users: 750,
    gradient: 'linear-gradient(135deg,#1b5e20,#2e7d32)',
    logo: 'herdez.com.mx',
    desc: [
      'O Grupo Herdez é uma das principais empresas do setor alimentício no México, com forte presença em diversas categorias e marcas amplamente reconhecidas no mercado. No segmento de sorvetes, a operação ganhou ainda mais relevância após a aquisição pela Froneri, ampliando a capacidade de crescimento e competitividade da divisão.',
      'Atualmente, atuamos na divisão de sorvetes, apoiando a operação comercial com nossas soluções de vendas e trade. Trata-se de um cliente estratégico, com potencial de expansão para outras unidades de negócio à medida que avançamos na consolidação da parceria e demonstramos ganhos de eficiência e controle nos processos comerciais.'
    ]
  },
  {
    name: 'Minerva Foods',
    countries: 'Brasil, Chile, Uruguai, Colômbia e Equador',
    products: ['Sales'],
    since: 2019,
    users: 570,
    gradient: 'linear-gradient(135deg,#880e4f,#c2185b)',
    logo: 'minervafoods.com',
    desc: [
      'A Minerva Foods é uma das principais empresas globais do setor de proteína bovina, com forte atuação na América do Sul e presença crescente em mercados internacionais. Nos últimos anos, a companhia realizou aquisições estratégicas que ampliaram significativamente sua operação, consolidando sua posição como um dos grandes players do segmento.',
      'Cliente desde 2019, a Minerva Foods utiliza nossa solução para suportar sua operação comercial em múltiplos países, incluindo Brasil, Chile, Uruguai, Colômbia e Equador. A plataforma contribui para a padronização de processos e maior eficiência operacional em toda a cadeia de vendas.'
    ]
  },
  {
    name: 'BYDSA',
    countries: 'México',
    products: ['Van Sales'],
    since: 2025,
    users: 2900,
    gradient: 'linear-gradient(135deg,#0d47a1,#1565c0)',
    logo: null,
    desc: [
      'A BYDSA México é uma empresa relevante no segmento de botanas, com origem em Monterrey e forte presença regional no mercado mexicano. Com um portfólio diversificado e foco em expansão, a companhia vem ampliando sua atuação comercial e fortalecendo sua capilaridade no território.',
      'Atualmente, cerca de 3 mil vendedores utilizam nossa solução, apoiando a operação de vendas com maior controle, produtividade e visibilidade em campo. Trata-se de um cliente com grande potencial de crescimento, que já vem expandindo gradualmente o uso do nosso portfólio, reforçando a parceria estratégica e abrindo novas oportunidades de evolução conjunta.'
    ]
  },
  {
    name: 'Gerdau',
    countries: 'Brasil',
    products: ['Sales'],
    since: 2017,
    users: 800,
    gradient: 'linear-gradient(135deg,#e65100,#ff8f00)',
    logo: 'gerdau.com',
    desc: [
      'A Gerdau é uma das maiores empresas do setor siderúrgico nas Américas, com presença global e atuação relevante na produção de aços longos. Reconhecida por sua solidez, inovação e forte integração com cadeias industriais, a companhia possui operações complexas e altamente estruturadas, atendendo diversos segmentos da economia.',
      'Cliente da MC1 há muitos anos, a Gerdau utiliza nossa plataforma para suportar sua operação comercial, especialmente em cenários de alta complexidade de precificação, onde a tecnologia garante rigor, agilidade e rastreabilidade nos processos de vendas.'
    ]
  },
  {
    name: 'MSD',
    countries: 'Brasil',
    products: ['Sales'],
    since: 2016,
    users: 160,
    gradient: 'linear-gradient(135deg,#004b71,#0077b6)',
    logo: 'msd.com',
    desc: [
      'A MSD, também conhecida como Merck & Co., é uma das principais empresas globais do setor farmacêutico, reconhecida por sua atuação em inovação, pesquisa e desenvolvimento de soluções para saúde humana e animal. Com presença consolidada no Brasil, a companhia se destaca pelo alto nível de exigência regulatória e rigor nos processos comerciais e operacionais.',
      'Nossa parceria com a MSD no Brasil já ultrapassa 10 anos, refletindo um relacionamento sólido e baseado em confiança, no qual a plataforma da MC1 suporta com precisão as especificidades do setor farmacêutico.'
    ]
  },
  {
    name: 'Softys',
    countries: 'Brasil',
    products: ['Sales'],
    since: 2019,
    users: 345,
    gradient: 'linear-gradient(135deg,#006064,#00838f)',
    logo: 'softys.com',
    desc: [
      'A Softys, anteriormente conhecida como Melhoramentos, é uma das principais empresas do segmento de higiene e cuidados pessoais na América Latina, com um portfólio diversificado que atende milhões de consumidores. Com forte presença regional, a companhia se destaca pela qualidade de seus produtos e pela constante busca por inovação e eficiência em suas operações comerciais.',
      'Desde 2019, a Softys utiliza a solução de vendas da MC1 para suportar a gestão de seu amplo portfólio, promovendo maior controle, padronização e produtividade na força de vendas em campo.'
    ]
  },
  {
    name: 'AkzoNobel',
    countries: 'Brasil',
    products: ['Sales'],
    since: 2020,
    users: 300,
    gradient: 'linear-gradient(135deg,#b71c1c,#c62828)',
    logo: 'akzonobel.com',
    desc: [
      'A AkzoNobel é uma multinacional holandesa líder global no setor de tintas e revestimentos, com presença em mais de 150 países e marcas reconhecidas como Dulux e Coral. A empresa atua em diversos segmentos — construção, indústria e setor marítimo —, destacando-se pelo investimento contínuo em inovação e sustentabilidade.',
      'No Brasil, a AkzoNobel possui forte presença especialmente com a marca Coral, e utiliza a solução da MC1 para suportar sua operação comercial com maior controle, visibilidade e eficiência na execução no ponto de venda.'
    ]
  },
  {
    name: 'Moderna Alimentos',
    countries: 'Equador',
    products: ['Sales'],
    since: 2020,
    users: 120,
    gradient: 'linear-gradient(135deg,#f57f17,#fbc02d)',
    logo: null,
    desc: [
      'A Moderna Alimentos é uma empresa relevante no setor alimentício do Equador, com atuação destacada na produção e comercialização de produtos derivados de grãos, especialmente farinhas e massas. Reconhecida pela qualidade de seus produtos e forte presença no mercado local, a companhia desempenha um papel importante no abastecimento e na cadeia de consumo do país.',
      'A Moderna utiliza nossa solução para apoiar sua operação comercial, promovendo maior eficiência e controle nas atividades de vendas em campo, com a parceria evoluindo de forma consistente ao longo dos anos.'
    ]
  },
  {
    name: 'Bauducco',
    countries: 'Estados Unidos',
    products: ['Sales'],
    since: 2022,
    users: 25,
    gradient: 'linear-gradient(135deg,#4e342e,#6d4c41)',
    logo: 'bauducco.com.br',
    desc: [
      'A Bauducco é uma das marcas mais tradicionais do setor alimentício brasileiro, reconhecida por seu portfólio de produtos como panettones, biscoitos e outros itens de grande consumo. Com presença internacional crescente, a companhia vem expandindo sua atuação em mercados estratégicos, incluindo os Estados Unidos.',
      'No mercado norte-americano, a Bauducco utiliza um módulo específico da solução da MC1 voltado ao controle de exportação, garantindo rastreabilidade e organização nas operações comerciais internacionais.'
    ]
  },
  {
    name: 'BHL Group',
    countries: 'Barbados',
    products: ['Sales'],
    since: 2018,
    users: 100,
    gradient: 'linear-gradient(135deg,#01579b,#0277bd)',
    logo: null,
    desc: [
      'A BHL Group é uma empresa relevante no mercado de Barbados, com atuação na distribuição e comercialização de produtos, atendendo diferentes segmentos e contribuindo para o abastecimento local. Com uma operação estruturada e foco em eficiência, a companhia desempenha um papel importante em seu mercado de atuação.',
      'A BHL utiliza a solução da MC1 para suportar sua operação comercial, promovendo maior controle, organização e produtividade nas atividades de vendas em campo.'
    ]
  },
];

const FILTERS = ['Todos', 'Sales', 'Van Sales', 'Trade', 'IRE', 'Field'];

const logoUrl = d => d ? `https://www.google.com/s2/favicons?domain=${d}&sz=128` : null;

function fmtUsers(n) {
  if (n >= 1000) return (n / 1000).toFixed(n % 1000 === 0 ? 0 : 1).replace('.', ',') + 'k';
  return n.toString();
}

export function renderClientesMC1(container) {
  const totalUsers = CLIENTES.reduce((s, c) => s + c.users, 0);

  container.innerHTML = `
    <!-- Breadcrumb -->
    <section class="section-sm" style="background: var(--color-surface-container-low);">
      <div class="container">
        <nav class="breadcrumb" aria-label="Caminho de navegação">
          <a href="#/">${t('common.home')}</a>
          <svg width="14" height="14"><use href="#icon-chevron-right"/></svg>
          <a href="#/operacional">${t('nav.operacional')}</a>
          <svg width="14" height="14"><use href="#icon-chevron-right"/></svg>
          <span>${t('nav.operacional.clientes')}</span>
        </nav>
        <div class="page-header" style="padding-top:var(--space-6)">
          <span class="label-md" style="color:var(--color-primary)">Operacional · MC1 Global</span>
          <h1>Clientes MC1</h1>
          <p>Conheça as empresas que confiam na plataforma MC1 para transformar sua execução comercial.</p>
        </div>
      </div>
    </section>

    <!-- Stats bar -->
    <div class="clientes-stats" style="max-width:900px; margin:0 auto;">
      <div class="clientes-stat" data-reveal>
        <div class="clientes-stat-num">${CLIENTES.length}</div>
        <div class="clientes-stat-label">clientes ativos no portfólio</div>
      </div>
      <div class="clientes-stat" data-reveal>
        <div class="clientes-stat-num">80K+</div>
        <div class="clientes-stat-label">usuários ativos na plataforma</div>
      </div>
      <div class="clientes-stat" data-reveal>
        <div class="clientes-stat-num">15+</div>
        <div class="clientes-stat-label">anos de parceria com clientes Tier 1</div>
      </div>
    </div>

    <!-- Filters -->
    <div class="clientes-filters" role="group" aria-label="Filtrar por produto">
      ${FILTERS.map(f => `
        <button class="chip chip-filter ${f === 'Todos' ? 'active' : ''}" data-filter="${f}">${f}</button>
      `).join('')}
    </div>

    <!-- Grid -->
    <div class="clientes-grid" id="clientes-grid">
      ${CLIENTES.map((c, i) => `
        <article class="cliente-card" data-reveal data-reveal-delay="${(i % 2) * 100}"
                 data-products="${c.products.join(' ')}">
          <div class="cliente-card-header" style="background: ${c.gradient};">
            <div class="cliente-initial">
              ${logoUrl(c.logo) ? `<img src="${logoUrl(c.logo)}" alt="${c.name}" loading="lazy"
                style="width:32px;height:32px;object-fit:contain;border-radius:4px;"
                onload="this.parentElement.style.background='white';this.nextElementSibling.style.display='none'"
                onerror="this.style.display='none'">` : ''}
              <span>${c.name.charAt(0)}</span>
            </div>
            <div class="cliente-header-info">
              <h2 class="cliente-name">${c.name}</h2>
              <span class="cliente-since">cliente desde ${c.since}</span>
            </div>
            <div class="cliente-users">
              <span class="cliente-users-num">${fmtUsers(c.users)}</span>
              <span class="cliente-users-label">usuários</span>
            </div>
          </div>
          <div class="cliente-card-body">
            <div class="cliente-meta">
              <div class="cliente-countries">
                <svg width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" style="flex-shrink:0;opacity:.6"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
                ${c.countries}
              </div>
              <div class="cliente-products">
                ${c.products.map(p => `<span class="cliente-product-chip">${p}</span>`).join('')}
              </div>
            </div>
            <div class="cliente-description">
              ${c.desc.map(p => `<p>${p}</p>`).join('')}
            </div>
          </div>
        </article>
      `).join('')}
    </div>
  `;

  // ─── Filter logic ───
  const grid    = container.querySelector('#clientes-grid');
  const cards   = container.querySelectorAll('.cliente-card');
  const btns    = container.querySelectorAll('.chip-filter');

  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;

      btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      let visible = 0;
      cards.forEach(card => {
        const prods = card.dataset.products || '';
        const match = filter === 'Todos' || prods.includes(filter);
        card.hidden = !match;
        if (match) visible++;
      });

      // Empty state
      let empty = grid.querySelector('.clientes-empty');
      if (!visible) {
        if (!empty) {
          empty = document.createElement('p');
          empty.className = 'clientes-empty';
          empty.textContent = 'Nenhum cliente encontrado para este filtro.';
          grid.appendChild(empty);
        }
      } else if (empty) {
        empty.remove();
      }

      // Re-observe revealed elements
      if (window._revealObserver) {
        cards.forEach(card => {
          if (!card.hidden && !card.classList.contains('is-visible')) {
            window._revealObserver.observe(card);
          }
        });
      }
    });
  });
}
