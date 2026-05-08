// MC1 HUB — Home Page Renderer

import { getLocalizedNoticiasRecentes } from '../data/noticias.js';
import { beneficios } from '../data/beneficios.js';
import { createCard } from '../../components/card.js';
import { t } from '../i18n.js';

// Imagens de fundo curadas para o banner hero — separadas das imagens das notícias
// Escolhidas para funcionar bem como background com overlay escuro + texto branco
const HERO_BG = {
  // Slide 1 — boas-vindas (sempre fixo)
  slide1: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1600&q=80',

  // Slide 2 — varia por categoria da notícia em destaque
  celebracao: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=1600&q=80',  // bokeh colorido
  comunicado: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1600&q=80',  // workspace escuro moderno
  sindicato:  'https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1600&q=80',  // reunião profissional
  pagamento:  'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1600&q=80',  // documentos/finanças
  saude:      'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1600&q=80',  // saúde/médico
  'bem-estar':'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=1600&q=80',  // bem-estar/academia
  rh:         'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1600&q=80',  // equipe/colaboração
  default:    'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1600&q=80',  // escritório moderno
};

// Posições espalhadas pelo hero-visual para as 7 bolhas de notícias
const BUBBLE_POSITIONS = [
  { top: '4%',  right: '6%',  animDir: 'normal',  delay: '0s'    },
  { top: '8%',  left:  '4%',  animDir: 'reverse', delay: '1.2s'  },
  { top: '30%', right: '2%',  animDir: 'normal',  delay: '0.6s'  },
  { top: '36%', left:  '6%',  animDir: 'reverse', delay: '1.8s'  },
  { top: '60%', right: '8%',  animDir: 'normal',  delay: '2.4s'  },
  { top: '62%', left:  '2%',  animDir: 'reverse', delay: '0.9s'  },
  { top: '83%', left:  '28%', animDir: 'normal',  delay: '1.5s'  },
];

function _truncate(str, max = 38) {
  return str.length > max ? str.slice(0, max - 1).trimEnd() + '…' : str;
}

export async function renderHome(container) {
  const allBubbleNews = await getLocalizedNoticiasRecentes(7);
  const news = allBubbleNews.slice(0, 3);
  const latestNews = allBubbleNews[0];

  container.innerHTML = `
    <!-- ═══ HERO CAROUSEL ═══ -->
    <section class="hero-section" aria-label="Destaques">

      <!-- Slide 1: Boas-vindas -->
      <div class="hero-slide active" data-slide="0">
        <div class="hero-bg" aria-hidden="true">
          <img src="${HERO_BG.slide1}" alt="" class="hero-bg-img" loading="eager" />
          <div class="hero-bg-overlay"></div>
        </div>
        <div class="hero-content container">
          <div class="hero-text" data-reveal>
            <span class="chip chip-teal" style="margin-bottom: var(--space-5)">${t('home.chip')}</span>
            <h1 class="display-lg hero-headline">
              ${t('home.hero.title1')}<br><em class="hero-accent">${t('home.hero.title2')}</em>
            </h1>
            <p class="hero-sub">
              ${t('home.hero.sub')}
            </p>
            <div class="hero-actions" data-reveal data-reveal-delay="200">
              <a href="#/noticias" class="btn btn-primary btn-lg">
                ${t('home.hero.cta_news')}
                <svg width="18" height="18"><use href="#icon-arrow-right"/></svg>
              </a>
              <a href="#/rh" class="btn btn-ghost btn-lg">${t('home.hero.cta_benefits')}</a>
            </div>
          </div>
          <div class="hero-visual" data-reveal="right" data-reveal-delay="150" aria-hidden="true">
            ${allBubbleNews.slice(0, 7).map((n, i) => {
              const pos = BUBBLE_POSITIONS[i];
              const posStyle = Object.entries(pos)
                .filter(([k]) => !['animDir','delay'].includes(k))
                .map(([k,v]) => `${k}:${v}`)
                .join(';');
              return `
                <a href="#/noticia/${n.id}" class="hero-card-float hero-news-bubble"
                   style="${posStyle};animation-direction:${pos.animDir};animation-delay:${pos.delay}"
                   title="${n.title}">
                  <div style="display:flex;align-items:center;gap:7px;margin-bottom:5px">
                    <div style="width:6px;height:6px;border-radius:50%;background:${n.gradient.includes('#') ? n.gradient.match(/#[0-9a-fA-F]{6}/)?.[0] ?? '#5ba8d4' : '#5ba8d4'};flex-shrink:0"></div>
                    <span style="font-size:10px;font-weight:600;color:rgba(255,255,255,0.55);letter-spacing:.05em;text-transform:uppercase">${n.tagLabel}</span>
                  </div>
                  <div style="font-size:12px;font-weight:600;color:white;line-height:1.35">${_truncate(n.title)}</div>
                </a>`;
            }).join('')}
            <div class="hero-orb hero-orb-1" aria-hidden="true"></div>
            <div class="hero-orb hero-orb-2" aria-hidden="true"></div>
          </div>
        </div>
      </div>

      <!-- Slide 2: Última Notícia -->
      <div class="hero-slide" data-slide="1">
        <div class="hero-bg" aria-hidden="true">
          <img src="${HERO_BG[latestNews.tag] || HERO_BG.default}" alt="" class="hero-bg-img" loading="eager" />
          <div class="hero-bg-overlay hero-bg-overlay-news"></div>
        </div>
        <div class="hero-news-content container">
          <div class="hero-news-inner">
            <span class="chip chip-teal" style="margin-bottom:var(--space-4)">${t('home.hero.slide_news')}</span>
            <p class="label-md" style="color:rgba(255,255,255,0.55); margin-bottom:var(--space-3)">${latestNews.dateLabel} · ${latestNews.tagLabel}</p>
            <h2 class="display-lg hero-headline" style="max-width:20ch">${latestNews.title}</h2>
            <p class="hero-sub">${latestNews.excerpt}</p>
            <div class="hero-actions">
              <a href="#/noticia/${latestNews.id}" class="btn btn-primary btn-lg" style="text-decoration:none">
                ${t('home.hero.read_now')} <svg width="18" height="18"><use href="#icon-arrow-right"/></svg>
              </a>
              <a href="#/noticias" class="btn btn-ghost btn-lg" style="text-decoration:none">${t('home.hero.see_all')}</a>
            </div>
          </div>
        </div>
      </div>

      <!-- Navigation Dots -->
      <div class="hero-dots" role="tablist" aria-label="Navegação do banner">
        <button class="hero-dot active" data-slide="0" aria-label="${t('home.hero.slide1_label')}"></button>
        <button class="hero-dot" data-slide="1" aria-label="${t('home.hero.slide2_label')}"></button>
      </div>

    </section>

    <!-- ═══ QUICK ACCESS ═══ -->
    <section class="section-sm" style="background: var(--color-surface-container-low);" aria-label="Acesso rápido">
      <div class="container">
        <p class="label-md" style="color:var(--color-primary); margin-bottom:var(--space-5)">${t('home.quick.label')}</p>
        <div id="quick-links-grid" class="scroll-row quick-links-row"></div>
      </div>
    </section>

    <!-- ═══ SOBRE A MC1 ═══ -->
    <section aria-label="Sobre a MC1" style="border-top: 1px solid var(--color-outline-subtle);">
      <div class="sobre-page" style="padding-bottom: 0;">

        <!-- ① Hero -->
        <div class="sobre-hero" data-reveal>
          <p class="s-eyebrow">MC1 · Win the Market</p>
          <h2 class="sobre-hero-title">
            Software que transforma execução de vendas em <strong>resultado real</strong>
          </h2>
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

        <!-- ③ Problema -->
        <div class="sobre-section" data-reveal>
          <p class="s-eyebrow">O problema que resolvemos</p>
          <h3 class="sobre-section-title">Execução no ponto de venda é onde receita é ganha ou perdida</h3>
          <p class="sobre-section-body">
            Equipes de campo com processos manuais perdem tempo, cometem erros e não entregam dados confiáveis. A MC1 substitui esse ciclo com plataforma móvel orientada por IA — de pedido e entrega até reconhecimento de imagem e gestão de trade.
          </p>
        </div>

        <!-- ④ Resultados por cliente -->
        <div class="sobre-section" data-reveal>
          <p class="s-eyebrow">Resultados em clientes reais</p>
          <h3 class="sobre-section-title">Números que fecham o argumento</h3>
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
          <h3 class="sobre-section-title">Uma plataforma, múltiplos vetores de resultado</h3>
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
                <div class="sobre-product-name">Pre Sales &amp; Van Sales</div>
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
          <h3 class="sobre-section-title">Onde a MC1 opera</h3>
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
          <h3 class="sobre-section-title">O DNA que orienta as decisões</h3>
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

        <!-- ⑧ Link to full page -->
        <div class="sobre-section" style="border-bottom: none; text-align: center; padding-top: 2rem; padding-bottom: 3rem;">
          <a href="#/operacional/sobre" class="btn btn-primary">
            Ver página completa
            <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M7 17L17 7M17 7H7M17 7v10"/></svg>
          </a>
        </div>

      </div>
    </section>

    <!-- ═══ FEATURED NEWS ═══ -->
    <section class="section" aria-labelledby="news-heading">
      <div class="container">
        <div class="flex-between section-heading">
          <div>
            <span class="label-md" style="color:var(--color-primary)">${t('home.news.label')}</span>
            <h2 class="headline-lg" id="news-heading">${t('home.news.title')}</h2>
          </div>
          <a href="#/noticias" class="btn btn-ghost hover-arrow">
            ${t('home.news.see_all')} <svg width="16" height="16"><use href="#icon-arrow-right"/></svg>
          </a>
        </div>
        <div id="home-news-grid" class="grid grid-3"></div>
      </div>
    </section>

    <!-- ═══ BENEFITS HIGHLIGHT ═══ -->
    <section class="section-sm" style="background: var(--color-surface-container-low);" aria-labelledby="benefits-heading">
      <div class="container">
        <div class="flex-between mb-8">
          <div>
            <span class="label-md" style="color:var(--color-primary)">${t('home.benefits.label')}</span>
            <h2 class="headline-lg" id="benefits-heading">${t('home.benefits.title')}</h2>
          </div>
          <a href="#/rh" class="btn btn-ghost hover-arrow">
            ${t('home.benefits.see_all')} <svg width="16" height="16"><use href="#icon-arrow-right"/></svg>
          </a>
        </div>
        <div id="home-benefits-row" class="scroll-row"></div>
      </div>
    </section>

    <!-- ═══ CALENDAR CALLOUT ═══ -->
    <section class="section">
      <div class="container">
        <div class="calendar-callout" data-reveal>
          <div class="calendar-callout-content">
            <div class="icon-wrap icon-wrap-xl icon-teal" style="margin-bottom: var(--space-5)">
              <svg width="32" height="32"><use href="#icon-calendar"/></svg>
            </div>
            <span class="label-md" style="color:var(--color-primary); margin-bottom:var(--space-3); display:block">${t('home.calendar.label')}</span>
            <h2 class="headline-lg" style="margin-bottom:var(--space-4)">${t('home.calendar.title')}</h2>
            <p class="body-lg text-muted" style="max-width:44ch; margin-bottom:var(--space-6)">
              ${t('home.calendar.desc')}
            </p>
            <a href="#/politicas" class="btn btn-primary">
              ${t('home.calendar.cta')}
              <svg width="16" height="16"><use href="#icon-arrow-right"/></svg>
            </a>
          </div>
          <div class="calendar-callout-visual" aria-hidden="true">
            <div class="calendar-mini">
              <div class="cal-header">
                <span>${t('home.calendar.month')}</span>
              </div>
              <div class="cal-grid">
                ${t('home.calendar.days').split(',').map(d => `<span class="cal-day-head">${d}</span>`).join('')}
                ${Array.from({length:35}, (_,i) => {
                  const day = i - 5;
                  if (day < 1 || day > 31) return `<span class="cal-day cal-day-empty"></span>`;
                  const isToday = day === 26;
                  const isHoliday = [15].includes(day);
                  return `<span class="cal-day ${isToday ? 'cal-day-today' : ''} ${isHoliday ? 'cal-day-holiday' : ''}">${day}</span>`;
                }).join('')}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;

  // ─── Quick Links ───
  const quickLinks = [
    { title: t('home.quick.news'),     icon: 'icon-newspaper', href: '#/noticias',     gradient: 'linear-gradient(135deg,#004b71,#006494)' },
    { title: t('home.quick.rh'),       icon: 'icon-users',     href: '#/rh',           gradient: 'linear-gradient(135deg,#283593,#3949ab)' },
    { title: t('home.quick.docs'),     icon: 'icon-document',  href: '#/politicas',    gradient: 'linear-gradient(135deg,#d97706,#f59e0b)' },
    // training hidden temporarily

    { title: t('home.quick.links'),    icon: 'icon-link',      href: '#/links',        gradient: 'linear-gradient(135deg,#00695c,#00897b)' },
    { title: t('home.quick.contact'),  icon: 'icon-mail',      href: '#/contato',      gradient: 'linear-gradient(135deg,#4a148c,#6a1b9a)' },
  ];

  const quickGrid = container.querySelector('#quick-links-grid');
  quickLinks.forEach((ql, i) => {
    const card = createCard({ type: 'quick-link', ...ql, revealDelay: i * 80 });
    quickGrid.appendChild(card);
  });

  // ─── News cards ───
  const newsGrid = container.querySelector('#home-news-grid');
  news.forEach((n, i) => {
    const card = createCard({
      type: 'news',
      title: n.title,
      excerpt: n.excerpt,
      tagLabel: n.tagLabel,
      dateLabel: n.dateLabel,
      gradient: n.gradient,
      image: n.image,
      href: `#/noticia/${n.id}`,
      revealDelay: i * 100,
    });
    newsGrid.appendChild(card);
  });

  // ─── Hero Carousel ───
  (function () {
    const slides = container.querySelectorAll('.hero-slide');
    const dots   = container.querySelectorAll('.hero-dot');
    let current  = 0;
    let timer;

    function goTo(n) {
      slides[current].classList.remove('active');
      dots[current].classList.remove('active');
      current = (n + slides.length) % slides.length;
      slides[current].classList.add('active');
      dots[current].classList.add('active');
    }

    function start() { timer = setInterval(() => goTo(current + 1), 6000); }

    dots.forEach(dot => dot.addEventListener('click', () => {
      clearInterval(timer);
      goTo(parseInt(dot.dataset.slide));
      start();
    }));

    start();
  })();

  // ─── Benefits scroll row ───
  const benefitsRow = container.querySelector('#home-benefits-row');
  beneficios.forEach((b, i) => {
    const miniCard = document.createElement('div');
    miniCard.className = 'benefit-mini-card';
    miniCard.setAttribute('data-reveal', '');
    miniCard.setAttribute('data-reveal-delay', String(i * 60));
    miniCard.style.cursor = 'pointer';
    miniCard.innerHTML = `
      <div class="icon-wrap icon-wrap-md" style="background: ${b.gradient}; color:white; margin-bottom: var(--space-3)">
        <svg width="22" height="22"><use href="#${b.icon}"/></svg>
      </div>
      <span style="font-size:var(--text-sm); font-weight:var(--weight-medium); color:var(--color-on-surface); text-align:center; line-height:1.3">${b.name}</span>
    `;
    miniCard.addEventListener('click', () => { window.location.hash = '#/rh'; });
    benefitsRow.appendChild(miniCard);
  });
}
