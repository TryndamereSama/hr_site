// MC1 HUB — News Articles Data
import { getLang, getCountry } from '../i18n.js';
import { noticiasTranslations } from './noticias-i18n.js';

export const noticias = [
  // ─── 2026-05-20 ───
  {
    id: 'totalpass-novo-beneficio-2026',
    title: 'Seu Novo Benefício de Bem-Estar Está Chegando! 🏋️',
    excerpt: 'Prepare-se para explorar as infinitas possibilidades de cuidado físico e mental com a TotalPass. Academias, saúde mental, serviços online e muito mais. #VamosTotalizar',
    body: `
      <img src="assets/images/totalpass-novo-beneficio.png" alt="TotalPass — Seu Novo Benefício de Bem-Estar" style="width:100%; border-radius:12px; margin-bottom:1.5rem;" />

      <p>Prepare-se para explorar as infinitas possibilidades de <strong>cuidado físico e mental</strong> com a TotalPass. 💚</p>

      <h3>O que você terá acesso:</h3>

      <div style="display:flex;flex-direction:column;gap:0.75rem;margin:1rem 0 1.5rem;">
        <div style="display:flex;gap:1rem;align-items:center;padding:0.75rem 1rem;background:var(--color-surface-container-low);border-radius:var(--radius-lg)">
          <span style="font-size:1.25rem;flex-shrink:0">📍</span>
          <p style="margin:0"><strong>As melhores academias e estúdios do Brasil</strong></p>
        </div>
        <div style="display:flex;gap:1rem;align-items:center;padding:0.75rem 1rem;background:var(--color-surface-container-low);border-radius:var(--radius-lg)">
          <span style="font-size:1.25rem;flex-shrink:0">⭐</span>
          <p style="margin:0"><strong>Parceiros exclusivos para cuidar da sua saúde mental</strong></p>
        </div>
        <div style="display:flex;gap:1rem;align-items:center;padding:0.75rem 1rem;background:var(--color-surface-container-low);border-radius:var(--radius-lg)">
          <span style="font-size:1.25rem;flex-shrink:0">▶️</span>
          <p style="margin:0"><strong>Serviços on-line para se manter ativo onde estiver</strong></p>
        </div>
        <div style="display:flex;gap:1rem;align-items:center;padding:0.75rem 1rem;background:var(--color-surface-container-low);border-radius:var(--radius-lg)">
          <span style="font-size:1.25rem;flex-shrink:0">💰</span>
          <p style="margin:0"><strong>Uma mensalidade, sem taxa de adesão ou cancelamento</strong></p>
        </div>
      </div>

      <p style="text-align:center;font-weight:700;font-size:1.05rem;">Todos ansiosos? Porque por aqui, nós estamos. 😄</p>
      <p style="text-align:center;font-size:1.15rem;font-weight:800;color:#16a34a;letter-spacing:0.02em">#VAMOSTOTALIZAR</p>

      <p style="margin-top:1.5rem;padding:1rem 1.25rem;background:var(--color-surface-container-low);border-left:3px solid var(--color-primary);border-radius:0 var(--radius-md) var(--radius-md) 0;">
        Dúvidas? Entre em contato com o RH pelo e-mail <strong>rh@mc1global.com</strong>.
      </p>
    `,
    category: 'Benefício',
    tag: 'beneficio',
    tagLabel: 'Benefício',
    date: '2026-05-20',
    dateLabel: '20 de maio de 2026',
    author: 'Gente & Futuro',
    readTime: '2 min',
    image: 'assets/images/totalpass-novo-beneficio.png',
    gradient: 'linear-gradient(135deg, #0d4b2e, #16a34a)',
    featured: false,
    countries: ['BR'],
  },
  {
    id: 'wellhub-descontinuacao-maio-2026',
    title: 'Atenção: Wellhub será descontinuado no Brasil 📢',
    excerpt: 'O parceiro Wellhub ficará ativo na MC1 Brasil até 31/05/2026. Saiba como gerenciar seu plano e evitar cobranças indevidas.',
    body: `
      <p>Olá, MC1er 👋</p>

      <p>Não esqueça! O parceiro <strong>Wellhub</strong> será descontinuado na <strong>MC1 Brasil</strong> e ficará ativo até <strong>31/05/2026</strong>. A MC1 México continuará com o mesmo parceiro.</p>

      <p>Se você possui um plano ativo, lembre-se de acompanhar e gerenciar o faturamento no seu cartão de crédito para evitar cobranças após esse período. Em caso de dúvidas, utilize o suporte no app do Wellhub.</p>

      <p style="margin-top:1.5rem;color:var(--color-on-surface-variant);font-style:italic">Gente &amp; Futuro</p>

      <p style="margin-top:1.5rem;padding:1rem 1.25rem;background:var(--color-surface-container-low);border-left:3px solid var(--color-primary);border-radius:0 var(--radius-md) var(--radius-md) 0;">
        Dúvidas? Entre em contato com o RH pelo e-mail <strong>rh@mc1global.com</strong>.
      </p>
    `,
    category: 'Benefício',
    tag: 'beneficio',
    tagLabel: 'Benefício',
    date: '2026-05-20',
    dateLabel: '20 de maio de 2026',
    author: 'Gente & Futuro',
    readTime: '1 min',
    image: null,
    gradient: 'linear-gradient(135deg, #4a148c, #6a1b9a)',
    featured: false,
    countries: ['BR'],
  },
  // ─── 2026-04-15 ───
  {
    id: 'zenklub-ative-beneficio',
    title: 'Ative seu Benefício Zenklub! 🧠',
    excerpt: 'Com a MC1 você tem acesso ao Zenklub — plataforma de saúde mental com sessões gratuitas de psicólogo e nutricionista todo mês. Saiba como ativar!',
    body: `
      <img src="assets/images/zenklub-como-comecar.jpg" alt="Como começar a usar seu benefício Zenklub" style="width:100%; border-radius:12px; margin-bottom:1.5rem;" />

      <h3>Como começar a usar seu benefício?</h3>
      <ol style="padding-left: 1.5rem; margin: 1rem 0; display: flex; flex-direction: column; gap: 0.75rem;">
        <li>Selecione <strong>"Ativar Benefício"</strong> no aplicativo</li>
        <li>Responda perguntas simples para se cadastrar</li>
        <li>Conheça todas as possibilidades que o Zenklub pode lhe oferecer</li>
        <li>Defina qual será o seu objetivo</li>
        <li><strong>Prontinho!</strong> 🎉</li>
      </ol>

      <p style="margin: 1.5rem 0; padding: 1rem 1.25rem; background: var(--color-surface-container-low); border-left: 3px solid #7c3aed; border-radius: 0 var(--radius-md) var(--radius-md) 0;">
        Baixe o aplicativo do <strong>Zenklub</strong> e faça o passo a passo da ativação agora!
      </p>

      <img src="assets/images/zenklub-voce-sabia.jpg" alt="O que você tem acesso com a MC1 no Zenklub" style="width:100%; border-radius:12px; margin: 1.5rem 0;" />

      <h3>Com a MC1, você tem acesso a:</h3>

      <div style="display: flex; flex-direction: column; gap: 1rem; margin: 1rem 0;">
        <div style="display: flex; gap: 1rem; align-items: flex-start;">
          <span style="font-size: 1.5rem; font-weight: 800; color: #7c3aed; min-width: 2rem;">01</span>
          <div>
            <p style="margin: 0;"><strong>2 sessões gratuitas por mês</strong> (50 minutos cada)</p>
            <p style="margin: 0.25rem 0 0; color: var(--color-on-surface-muted);">2 sessões com psicólogo(a), ou 1 sessão com psicólogo(a) + 1 com nutricionista</p>
          </div>
        </div>
        <div style="display: flex; gap: 1rem; align-items: flex-start;">
          <span style="font-size: 1.5rem; font-weight: 800; color: #7c3aed; min-width: 2rem;">02</span>
          <div>
            <p style="margin: 0;">Acesso a <strong>conteúdos de bem-estar</strong>, trilhas personalizadas, testes e exercícios guiados</p>
          </div>
        </div>
        <div style="display: flex; gap: 1rem; align-items: flex-start;">
          <span style="font-size: 1.5rem; font-weight: 800; color: #7c3aed; min-width: 2rem;">03</span>
          <div>
            <p style="margin: 0;"><strong>Acompanhamento com especialistas</strong> para temas como ansiedade, estresse, foco, autoestima, alimentação e muito mais</p>
          </div>
        </div>
      </div>

      <h3>Sobre a Zenklub</h3>
      <p>Você tem o benefício do Zenklub para ser seu <strong>EPI de saúde mental</strong> em casos como: estresse excessivo, ansiedade, sintomas de depressão ou só para se conhecer mais e viver melhor.</p>

      <p style="margin-top: 1.5rem; padding: 1rem 1.25rem; background: var(--color-surface-container-low); border-left: 3px solid var(--color-primary); border-radius: 0 var(--radius-md) var(--radius-md) 0;">
        Dúvidas? Entre em contato com o RH pelo e-mail <strong>rh@mc1global.com</strong>.
      </p>
    `,
    category: 'Benefício',
    tag: 'beneficio',
    tagLabel: 'Benefício',
    date: '2026-04-15',
    dateLabel: '15 de abril de 2026',
    author: 'Equipe RH',
    readTime: '2 min',
    image: 'assets/images/zenklub-voce-sabia.jpg',
    gradient: 'linear-gradient(135deg, #6d28d9 0%, #a855f7 100%)',
    featured: false,
    countries: ['BR'],
  },
  // ─── 2026-04-02 ───
  {
    id: 'aniversariantes-abril-2026',
    title: 'Parabéns aos Aniversariantes de Abril! 🎂',
    excerpt: 'Abril chegou cheio de comemorações! Confira os colegas que fazem aniversário este mês e celebre com eles.',
    body: `
      <img src="assets/images/Birhtday 04.2026.png" alt="Aniversariantes de Abril 2026" style="width:100%; border-radius:12px; margin-bottom:1.5rem;" />
      <p>A MC1 Global celebra junto com todos os colaboradores que completam mais um ano de vida em abril de 2026. Este é um momento especial para reconhecer cada pessoa que faz parte da nossa equipe!</p>
      <h3>Aniversariantes do Mês</h3>
      <ul style="padding-left: 1.5rem; margin: 1rem 0; display: flex; flex-direction: column; gap: 0.5rem;">
        <li>🇧🇷 <strong>04</strong> — Everton Rodrigues · Infra</li>
        <li>🇧🇷 <strong>04</strong> — Wislan Lopes Moraes · Infra</li>
        <li>🇧🇷 <strong>05</strong> — Vanessa Nunes · Gente &amp; Futuro</li>
        <li>🇧🇷 <strong>06</strong> — Gabriel Mitsuo Haibara · PSG</li>
        <li>🇧🇷 <strong>08</strong> — Fabio Cabral de Almeida · GST</li>
        <li>🇲🇽 <strong>16</strong> — David Perez Ruiz · PSG</li>
        <li>🇧🇷 <strong>17</strong> — Isabelle Lirio · Finanças</li>
        <li>🇲🇽 <strong>23</strong> — Angeles Martínez · PSG</li>
        <li>🇧🇷 <strong>23</strong> — Renato Miranda Picchi · Finanças</li>
        <li>🇲🇽 <strong>24</strong> — Luis Rodrigo Perez · Suporte Pepsico</li>
        <li>🇲🇽 <strong>24</strong> — Pedro Sandoval · PSG</li>
        <li>🇲🇽 <strong>26</strong> — Josue David Garcia · PSG</li>
        <li>🇧🇷 <strong>29</strong> — Ademir Mazzo Junior · Produto Trade e Sales</li>
        <li>🇧🇷 <strong>29</strong> — Gustavo de Souza · Infra</li>
        <li>🇧🇷 <strong>30</strong> — Julio Fabio de Oliveira · Lead</li>
      </ul>
      <h3>Day Off de Aniversário 🎁</h3>
      <p>Todo aniversariante ganha um dia livre para comemorar da forma que quiser — basta alinhar a data com sua liderança. Não quer folgar exatamente no dia? Sem problema! Você pode escolher outra data dentro do mesmo ano.</p>
      <p>E tem mais: no mês do seu aniversário você também recebe um <strong>crédito de R$ 50,00 no cartão Flash</strong> para aproveitar do seu jeito!</p>
      <p>Que 2026 seja repleto de conquistas, saúde e realizações para todos! 🎉</p>
    `,
    category: 'Celebração',
    tag: 'celebracao',
    tagLabel: 'Celebração',
    date: '2026-04-02',
    dateLabel: '2 de abril de 2026',
    author: 'Equipe RH',
    readTime: '2 min',
    image: 'assets/images/Birhtday 04.2026.png',
    gradient: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)',
    featured: true,
    countries: ['ALL'],
  },
  // ─── 2026-03-20 ───
  {
    id: 'canal-speak-up-safely-2026',
    title: 'Canal Speak Up Safely MC1 — Agora Disponível',
    excerpt: 'O canal de relatos confidenciais Speak Up Safely já está disponível para todos os colaboradores. Saiba como acessar e quando utilizar.',
    body: `
      <img src="assets/images/17- Canal Speak Up Safely MC1.png" alt="Canal Speak Up Safely MC1" style="width:100%; border-radius:12px; margin-bottom:1.5rem;" />
      <p>O canal de relatos confidenciais <strong>Speak Up Safely</strong> da MC1 Global está oficialmente disponível a partir de hoje.</p>
      <h3>Como Acessar</h3>
      <p>Para registrar um relato, envie um e-mail para: <strong>relato.mc1@neivadelima.com.br</strong></p>
      <h3>Confidencialidade</h3>
      <p>Todos os relatos são tratados com total confidencialidade. O canal é gerenciado de forma independente, garantindo a segurança e o anonimato de quem reporta.</p>
      <h3>Quando Utilizar</h3>
      <p>Utilize o canal para reportar situações que envolvam condutas inadequadas, violações de políticas, ou quaisquer preocupações éticas que você não se sinta confortável em tratar pelos canais tradicionais.</p>
      <p style="margin-top: 1.5rem; padding: 1rem 1.25rem; background: var(--color-surface-container-low); border-left: 3px solid var(--color-primary); border-radius: 0 var(--radius-md) var(--radius-md) 0;">
        Dúvidas? Entre em contato com o RH pelo e-mail <strong>rh@mc1global.com</strong>.
      </p>
    `,
    category: 'Comunicado',
    tag: 'comunicado',
    tagLabel: 'Comunicado',
    date: '2026-03-20',
    dateLabel: '20 de março de 2026',
    author: 'Equipe RH',
    readTime: '2 min',
    image: 'assets/images/17- Canal Speak Up Safely MC1.png',
    gradient: 'linear-gradient(135deg, #004b71 0%, #006494 100%)',
    featured: false,
    countries: ['ALL'],
  },
  // ─── 2026-03-19 ───
  {
    id: 'speak-up-safely-2026',
    title: 'Speak Up Safely MC1 — Novo Canal de Relatos Confidenciais',
    excerpt: 'A MC1 Global está lançando o Speak Up Safely, um canal confidencial para relatos. A apresentação oficial acontece amanhã, 20/03, às 11h (BRT).',
    body: `
      <img src="assets/images/16- Speak Up Safely MC1.png" alt="Speak Up Safely MC1" style="width:100%; border-radius:12px; margin-bottom:1.5rem;" />
      <p>A MC1 Global está lançando o <strong>Speak Up Safely</strong>, um canal confidencial de relatos para todos os colaboradores.</p>
      <h3>Apresentação Oficial</h3>
      <p>Amanhã, <strong>20 de março de 2026</strong>, realizaremos a apresentação oficial do canal. O evento será:</p>
      <ul style="padding-left: 1.5rem; margin: 1rem 0; display: flex; flex-direction: column; gap: 0.5rem;">
        <li><strong>Data:</strong> 20/03/2026</li>
        <li><strong>Horário:</strong> 11h00 (BRT)</li>
        <li><strong>Formato:</strong> Online</li>
      </ul>
      <h3>O que é o Speak Up Safely?</h3>
      <p>O Speak Up Safely é um canal seguro e confidencial criado para que todos os colaboradores possam reportar preocupações, condutas inadequadas ou violações de políticas sem receio de retaliação.</p>
      <p>Aguarde mais informações sobre o acesso ao canal após a apresentação oficial.</p>
    `,
    category: 'Comunicado',
    tag: 'comunicado',
    tagLabel: 'Comunicado',
    date: '2026-03-19',
    dateLabel: '19 de março de 2026',
    author: 'Equipe RH',
    readTime: '2 min',
    image: 'assets/images/16- Speak Up Safely MC1.png',
    gradient: 'linear-gradient(135deg, #004b71 0%, #006494 100%)',
    featured: false,
    countries: ['ALL'],
  },
  // ─── 2026-03-16 ───
  {
    id: 'palestra-saude-mulher-2026',
    title: 'Palestra Saúde da Mulher — Save the Date! 💜',
    excerpt: 'Save the Date! No dia 18 de março, às 15h, acontece a palestra online sobre Saúde da Mulher com a enfermeira Tatyane de Andrade. Não perca!',
    body: `
      <img src="assets/images/15- Palestra Saúde da Mulher.png" alt="Palestra Saúde da Mulher" style="width:100%; border-radius:12px; margin-bottom:1.5rem;" />
      <p>A MC1 Global convida todos os colaboradores para uma palestra especial sobre <strong>Saúde da Mulher</strong>.</p>
      <h3>Detalhes do Evento</h3>
      <ul style="padding-left: 1.5rem; margin: 1rem 0; display: flex; flex-direction: column; gap: 0.5rem;">
        <li><strong>Data:</strong> 18 de março de 2026</li>
        <li><strong>Horário:</strong> 15h00 (BRT)</li>
        <li><strong>Formato:</strong> Online</li>
      </ul>
      <h3>Sobre a Palestrante</h3>
      <p><strong>Tatyane de Andrade</strong> — Enfermeira com <strong>12 anos de experiência</strong>, com pós-graduação em Urgência e Emergência, Ginecologia e Obstetrícia pelo Instituto Einstein. Uma profissional altamente qualificada para abordar os temas mais importantes relacionados à saúde feminina.</p>
      <p>Salve a data na sua agenda e participe desta iniciativa de bem-estar promovida pela MC1! 💜</p>
    `,
    category: 'Bem-estar',
    tag: 'bemestar',
    tagLabel: 'Bem-estar',
    date: '2026-03-16',
    dateLabel: '16 de março de 2026',
    author: 'Equipe RH',
    readTime: '2 min',
    image: 'assets/images/15- Palestra Saúde da Mulher.png',
    gradient: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)',
    featured: false,
    countries: ['ALL'],
  },
  // ─── 2026-03-15 ───
  {
    id: 'convencao-sindpd-2026',
    title: 'Convenção SINDPD 2026 — Tudo que você precisa saber',
    excerpt: 'A Convenção Coletiva do SINDPD-SP para 2026 foi divulgada. Reajuste de 4%, novo piso salarial de R$ 2.500, licença paternidade ampliada e mais. Confira tudo.',
    body: `
      <p>O Sindpd-SP (Sindicato dos Trabalhadores em Tecnologia da Informação de São Paulo) divulgou os principais pontos da Convenção Coletiva de Trabalho para o ano de 2026. Confira abaixo tudo que você precisa saber.</p>

      <h3>Reajuste Salarial 2026</h3>
      <p>Os salários com data-base em 12/2025 serão reajustados em <strong>4% (quatro por cento)</strong>, retroativo a 01/01/2026.</p>
      <p>A MC1, por liberalidade, já havia antecipado <strong>3% (três por cento)</strong> na folha de pagamento de janeiro/2026. Dessa forma, a diferença de <strong>1% (um por cento)</strong> será aplicada na folha de fevereiro/2026.</p>
      <p>Ressaltamos que os colaboradores admitidos ao longo de 2025 terão o reajuste aplicado de forma proporcional ao tempo de trabalho.</p>

      <h3>Novo Piso Salarial 2026</h3>
      <p>O novo piso salarial normativo passa a ser <strong>R$ 2.500,00</strong>.</p>

      <h3>Reajuste Auxílio Creche</h3>
      <ul style="padding-left: 1.5rem; margin: 1rem 0; display: flex; flex-direction: column; gap: 0.5rem;">
        <li>Crianças até 24 meses: <strong>R$ 720,00</strong></li>
        <li>Crianças até 6 anos (5 anos e 11 meses): <strong>R$ 630,00</strong></li>
      </ul>

      <h3>Auxílio para Filhos com Deficiência</h3>
      <p>Novo valor: <strong>R$ 900,00 (novecentos reais)</strong>.</p>

      <h3>Licença Paternidade</h3>
      <p>A licença paternidade passa a ser de <strong>10 (dez) dias úteis</strong> em 2026. Em 2027, passa a ser de <strong>12 (doze) dias úteis</strong>.</p>

      <h3>Reajustes em 2027</h3>
      <p>Já está definido que o reajuste salarial para 2027 será com base no <strong>INPC acumulado de 2026, acrescido de mais 1% (um por cento)</strong>. Todas as cláusulas da convenção que mencionam valores serão reajustadas por este índice.</p>

      <p style="margin-top: 1.5rem; padding: 1rem 1.25rem; background: var(--color-surface-container-low); border-left: 3px solid var(--color-primary); border-radius: 0 var(--radius-md) var(--radius-md) 0;">
        Dúvidas? Entre em contato com o RH pelo e-mail <strong>rh@mc1global.com</strong> ou acesse a página de <a href="#/contato" style="color: var(--color-primary); font-weight: 600;">Contato</a>.
      </p>
    `,
    category: 'Sindicato',
    tag: 'sindpd',
    tagLabel: 'Sindicato',
    date: '2026-03-15',
    dateLabel: '15 de março de 2026',
    author: 'Equipe RH',
    readTime: '4 min',
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1400&q=80',
    gradient: 'linear-gradient(135deg, #004b71 0%, #006494 100%)',
    featured: true,
    countries: ['BR'],
  },
  // ─── 2026-03-13 ───
  {
    id: 'boas-vindas-gilberto-marquez',
    title: 'Boas-vindas, Gilberto Márquez Ramírez! 👋',
    excerpt: 'A MC1 Global dá as boas-vindas ao novo Diretor Comercial para México e América Central, Gilberto Márquez Ramírez, com 26 anos de experiência no setor.',
    body: `
      <img src="assets/images/14- Boas-Vindas Gilberto Márquez.png" alt="Boas-vindas Gilberto Márquez Ramírez" style="width:100%; border-radius:12px; margin-bottom:1.5rem;" />
      <p>A MC1 Global tem o prazer de anunciar a chegada de <strong>Gilberto Márquez Ramírez</strong>, que assume o cargo de <strong>Diretor Comercial para México e América Central</strong>.</p>
      <h3>Trajetória Profissional</h3>
      <p>Gilberto traz consigo <strong>26 anos de experiência</strong> no setor de tecnologia e negócios, com passagens por empresas de grande relevância no mercado latino-americano:</p>
      <ul style="padding-left: 1.5rem; margin: 1rem 0; display: flex; flex-direction: column; gap: 0.5rem;">
        <li><strong>Globant México</strong></li>
        <li><strong>IDS Comercial</strong></li>
        <li><strong>Teamcore Solutions</strong></li>
      </ul>
      <h3>Áreas de Atuação</h3>
      <p>Sua expertise abrange os segmentos de <strong>CPG, Consumo, Serviços e Consultoria</strong>, trazendo uma visão estratégica e ampla experiência em desenvolvimento de negócios na região.</p>
      <p>Sejam muito bem-vindo, Gilberto! Estamos muito felizes em tê-lo na equipe MC1. 🎉</p>
    `,
    category: 'Comunicado',
    tag: 'comunicado',
    tagLabel: 'Comunicado',
    date: '2026-03-13',
    dateLabel: '13 de março de 2026',
    author: 'Equipe RH',
    readTime: '2 min',
    image: 'assets/images/14- Boas-Vindas Gilberto Márquez.png',
    gradient: 'linear-gradient(135deg, #004b71 0%, #006494 100%)',
    featured: false,
    countries: ['ALL'],
  },
  {
    id: 'novo-informe-rendimentos-2025',
    title: 'ATENÇÃO — Novo Informe de Rendimentos 2025',
    excerpt: 'Um novo Informe de Rendimentos 2025 foi disponibilizado no Apdata. A retransmissão foi necessária por exigência do eSocial. Os valores totais não foram alterados.',
    body: `
      <img src="assets/images/13- ATENÇÃO NOVO Informe de Rendimentos 2025 (image1).png" alt="Novo Informe de Rendimentos 2025 - Parte 1" style="width:100%; border-radius:12px; margin-bottom:1rem;" />
      <img src="assets/images/13- ATENÇÃO NOVO Informe de Rendimentos 2025 (image2).png" alt="Novo Informe de Rendimentos 2025 - Parte 2" style="width:100%; border-radius:12px; margin-bottom:1.5rem;" />
      <p>Informamos que um <strong>novo Informe de Rendimentos 2025</strong> foi disponibilizado no portal Apdata. Esta retransmissão foi necessária em decorrência de uma exigência do <strong>eSocial</strong>, que requereu a retransmissão da DIRF.</p>
      <h3>O que mudou?</h3>
      <p>Os <strong>valores totais não foram alterados</strong>. A única mudança foi uma redistribuição no <strong>campo 07</strong> do informe, conforme orientação do eSocial.</p>
      <h3>Por que é importante?</h3>
      <p>Com o início do período de declaração do Imposto de Renda, é fundamental que você utilize o <strong>novo informe</strong> para sua declaração:</p>
      <ul style="padding-left: 1.5rem; margin: 1rem 0; display: flex; flex-direction: column; gap: 0.5rem;">
        <li><strong>Início do prazo IR:</strong> 16 de março de 2026</li>
        <li><strong>Fim do prazo IR:</strong> 29 de maio de 2026</li>
      </ul>
      <h3>Como acessar o novo Informe</h3>
      <p>Acesse pelo mesmo portal Apdata:</p>
      <ul style="padding-left: 1.5rem; margin: 1rem 0; display: flex; flex-direction: column; gap: 0.5rem;">
        <li><strong>Portal:</strong> <a href="https://cliente.apdata.com.br/mc1/" target="_blank" rel="noopener noreferrer" style="color: var(--color-primary); font-weight: 600;">https://cliente.apdata.com.br/mc1/</a></li>
        <li><strong>Usuário:</strong> Seu CPF</li>
        <li><strong>Senha:</strong> Mesma do holerite</li>
        <li><strong>Caminho:</strong> Dados Contratuais → Informe de Rendimentos → Ano: 2025</li>
      </ul>
      <p style="margin-top: 1.5rem; padding: 1rem 1.25rem; background: var(--color-surface-container-low); border-left: 3px solid var(--color-primary); border-radius: 0 var(--radius-md) var(--radius-md) 0;">
        Dúvidas? Entre em contato com o RH pelo e-mail <strong>rh@mc1global.com</strong>.
      </p>
    `,
    category: 'RH',
    tag: 'pagamento',
    tagLabel: 'Pagamento',
    date: '2026-03-13',
    dateLabel: '13 de março de 2026',
    author: 'Equipe RH',
    readTime: '3 min',
    image: 'assets/images/13- ATENÇÃO NOVO Informe de Rendimentos 2025 (image1).png',
    gradient: 'linear-gradient(135deg, #1d6b8a 0%, #004b71 100%)',
    featured: false,
    countries: ['BR'],
  },
  // ─── 2026-03-10 ───
  {
    id: 'adiantamento-salarial-2026',
    title: 'Adiantamento Reajuste Salarial — Antecipação de 3% em Janeiro',
    excerpt: 'As negociações da Convenção SINDPD/SEPROSP ainda não foram concluídas. A MC1, por liberalidade, antecipou 3% de reajuste na folha de janeiro/2026.',
    body: `
      <p>O departamento de Recursos Humanos informa que as negociações da <strong>Convenção Coletiva SINDPD/SEPROSP</strong> ainda não foram concluídas até o fechamento da folha de janeiro de 2026.</p>
      <h3>Adiantamento por Liberalidade da MC1</h3>
      <p>A MC1, por <strong>liberalidade</strong> e comprometimento com seus colaboradores, antecipou <strong>3% (três por cento)</strong> de reajuste salarial já na folha de pagamento de <strong>janeiro/2026</strong>.</p>
      <h3>Acerto da Diferença</h3>
      <p>Quando o índice definitivo da Convenção Coletiva for conhecido e homologado, a <strong>diferença será ajustada de forma retroativa</strong> a 01/01/2026, garantindo que todos os colaboradores recebam o valor correto.</p>
      <h3>Quem tem direito</h3>
      <p>Os colaboradores admitidos ao longo de <strong>2025</strong> terão o reajuste aplicado de forma <strong>proporcional ao tempo de trabalho</strong> no período.</p>
      <p style="margin-top: 1.5rem; padding: 1rem 1.25rem; background: var(--color-surface-container-low); border-left: 3px solid var(--color-primary); border-radius: 0 var(--radius-md) var(--radius-md) 0;">
        Dúvidas? Entre em contato com o RH pelo e-mail <strong>rh@mc1global.com</strong>.
      </p>
    `,
    category: 'RH',
    tag: 'pagamento',
    tagLabel: 'Pagamento',
    date: '2026-03-10',
    dateLabel: '10 de março de 2026',
    author: 'Equipe RH',
    readTime: '3 min',
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1400&q=80',
    gradient: 'linear-gradient(135deg, #1d6b8a 0%, #004b71 100%)',
    featured: true,
    countries: ['BR'],
  },
  // ─── 2026-03-06 ───
  {
    id: 'dia-da-mulher-2026',
    title: 'Feliz Dia da Mulher! 💜',
    excerpt: 'Nossa homenagem a você, mulher, que é exemplo de amor, determinação e bravura! A MC1 Global celebra o Dia Internacional da Mulher.',
    body: `
      <img src="assets/images/11- Feliz dia da Mulher.png" alt="Feliz Dia da Mulher" style="width:100%; border-radius:12px; margin-bottom:1.5rem;" />
      <p>Nossa homenagem a você, mulher, que é exemplo de <strong>amor, determinação e bravura!</strong></p>
      <p>A MC1 Global celebra o <strong>Dia Internacional da Mulher</strong> reconhecendo e valorizando cada mulher que faz parte da nossa equipe. Vocês são fundamentais para o nosso crescimento e para a construção de um ambiente de trabalho mais diverso, inclusivo e humano.</p>
      <p>Que este dia sirva de celebração, reflexão e renovação do compromisso com a igualdade, o respeito e as oportunidades para todas!</p>
      <p>Feliz Dia da Mulher! 💜</p>
    `,
    category: 'Celebração',
    tag: 'celebracao',
    tagLabel: 'Celebração',
    date: '2026-03-06',
    dateLabel: '6 de março de 2026',
    author: 'Equipe RH',
    readTime: '1 min',
    image: 'assets/images/11- Feliz dia da Mulher.png',
    gradient: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)',
    featured: false,
    countries: ['ALL'],
  },
  // ─── 2026-03-05 ───
  {
    id: 'aniversariantes-marco-2026',
    title: 'Parabéns aos Aniversariantes de Março! 🎂',
    excerpt: 'Março chegou cheio de comemorações! Confira os colegas que fazem aniversário este mês e celebre com eles.',
    body: `
      <img src="assets/images/Birhtday 03.2026.png" alt="Aniversariantes de Março 2026" style="width:100%; border-radius:12px; margin-bottom:1.5rem;" />
      <p>A MC1 Global celebra junto com todos os colaboradores que completam mais um ano de vida em março de 2026. Este é um momento especial para reconhecer cada pessoa que faz parte da nossa equipe!</p>
      <h3>Day Off de Aniversário 🎁</h3>
      <p>Todo aniversariante ganha um dia livre para comemorar da forma que quiser — basta alinhar a data com sua liderança. Não quer folgar exatamente no dia? Sem problema! Você pode escolher outra data dentro do mesmo ano.</p>
      <p>E tem mais: no mês do seu aniversário você também recebe um <strong>crédito de R$ 50,00 no cartão Flash</strong> para aproveitar do seu jeito!</p>
      <p>Que 2026 seja repleto de conquistas, saúde e realizações para todos! 🎉</p>
    `,
    category: 'Celebração',
    tag: 'celebracao',
    tagLabel: 'Celebração',
    date: '2026-03-05',
    dateLabel: '5 de março de 2026',
    author: 'Equipe RH',
    readTime: '2 min',
    image: 'assets/images/Birhtday 03.2026.png',
    gradient: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)',
    featured: false,
    countries: ['ALL'],
  },
  {
    id: 'programa-indicacao-2026',
    title: 'Programa Indicação Amiga MC1 — Indique e Ganhe R$ 1.000',
    excerpt: 'Conhece alguém que combina com a MC1? Sua indicação pode valer R$ 1.000,00! Veja como participar do Programa Indicação Amiga MC1.',
    body: `
      <img src="assets/images/12- Programa Indicação Amiga MC1 v2.png" alt="Programa Indicação Amiga MC1" style="width:100%; border-radius:12px; margin-bottom:1.5rem;" />
      <p>O <strong>Programa Indicação Amiga MC1</strong> está de volta! Conhece alguém que combina com a MC1? Sua indicação pode valer <strong>R$ 1.000,00</strong>!</p>
      <h3>Como participar</h3>
      <ul style="padding-left: 1.5rem; margin: 1rem 0; display: flex; flex-direction: column; gap: 0.5rem;">
        <li>Identifique as vagas abertas no portal interno</li>
        <li>Indique um candidato preenchendo o formulário de indicação</li>
        <li>Acompanhe o processo seletivo do seu indicado</li>
        <li>Receba o bônus após o período de experiência (90 dias)</li>
      </ul>
      <h3>Valor do Bônus</h3>
      <p>O bônus para indicações aprovadas é de <strong>R$ 1.000,00 (mil reais)</strong>, pago após a conclusão do período de experiência do colaborador indicado.</p>
      <p>Confira as vagas disponíveis no portal e comece a indicar seus talentos!</p>
      <p style="margin-top: 1.5rem; padding: 1rem 1.25rem; background: var(--color-surface-container-low); border-left: 3px solid var(--color-primary); border-radius: 0 var(--radius-md) var(--radius-md) 0;">
        Dúvidas? Entre em contato com o RH pelo e-mail <strong>rh@mc1global.com</strong>.
      </p>
    `,
    category: 'Programas',
    tag: 'programas',
    tagLabel: 'Programas',
    date: '2026-03-05',
    dateLabel: '5 de março de 2026',
    author: 'Equipe RH',
    readTime: '3 min',
    image: 'assets/images/12- Programa Indicação Amiga MC1 v2.png',
    gradient: 'linear-gradient(135deg, #059669 0%, #10b981 100%)',
    featured: false,
    countries: ['ALL'],
  },
  // ─── 2026-02-27 ───
  {
    id: 'informe-rendimentos-2025',
    title: 'Informe de Rendimentos 2025 — Disponível no Apdata',
    excerpt: 'O Informe de Rendimentos 2025 já está disponível para consulta e download no portal Apdata. Veja o passo a passo para acessar o documento.',
    body: `
      <img src="assets/images/10 - Informe de Rendimentos 2025 (image1).png" alt="Informe de Rendimentos 2025 - Parte 1" style="width:100%; border-radius:12px; margin-bottom:1rem;" />
      <img src="assets/images/10 - Informe de Rendimentos 2025 (image2).png" alt="Informe de Rendimentos 2025 - Parte 2" style="width:100%; border-radius:12px; margin-bottom:1.5rem;" />
      <p>O <strong>Informe de Rendimentos 2025</strong> já está disponível para todos os colaboradores no portal Apdata. Utilize este documento para sua declaração do Imposto de Renda.</p>
      <h3>Como acessar</h3>
      <ul style="padding-left: 1.5rem; margin: 1rem 0; display: flex; flex-direction: column; gap: 0.5rem;">
        <li><strong>Portal:</strong> <a href="https://cliente.apdata.com.br/mc1/" target="_blank" rel="noopener noreferrer" style="color: var(--color-primary); font-weight: 600;">https://cliente.apdata.com.br/mc1/</a></li>
        <li><strong>Usuário:</strong> Seu CPF</li>
        <li><strong>Senha:</strong> Mesma utilizada para acessar o holerite</li>
        <li><strong>Caminho no menu:</strong> Dados Contratuais → Informe de Rendimentos</li>
        <li><strong>Ano:</strong> 2025</li>
      </ul>
      <p style="margin-top: 1.5rem; padding: 1rem 1.25rem; background: var(--color-surface-container-low); border-left: 3px solid var(--color-primary); border-radius: 0 var(--radius-md) var(--radius-md) 0;">
        Problemas para acessar? Entre em contato com o RH pelo e-mail <strong>rh@mc1global.com</strong>.
      </p>
    `,
    category: 'RH',
    tag: 'pagamento',
    tagLabel: 'Pagamento',
    date: '2026-02-27',
    dateLabel: '27 de fevereiro de 2026',
    author: 'Equipe RH',
    readTime: '2 min',
    image: 'assets/images/10 - Informe de Rendimentos 2025 (image1).png',
    gradient: 'linear-gradient(135deg, #1d6b8a 0%, #004b71 100%)',
    featured: false,
    countries: ['BR'],
  },
  // ─── 2026-02-25 ───
  {
    id: 'plr-2025',
    title: 'PLR 2025 — Pagamento por Liberalidade da MC1',
    excerpt: 'As metas da PLR 2025 não foram atingidas. Mesmo assim, a MC1 pagará R$ 500,00 por liberalidade a todos os colaboradores CLT. Pagamento em 27/02/2026.',
    body: `
      <p>O departamento de Recursos Humanos informa os colaboradores sobre a <strong>PLR (Participação nos Lucros e Resultados) 2025</strong>.</p>
      <h3>Resultado das Metas</h3>
      <p>Informamos que as metas estabelecidas para a PLR 2025 <strong>não foram atingidas</strong>.</p>
      <h3>Pagamento por Liberalidade</h3>
      <p>Ainda assim, a MC1 Global, por <strong>liberalidade e comprometimento com seus colaboradores</strong>, realizará o pagamento de <strong>R$ 500,00 (quinhentos reais)</strong> a todos os colaboradores com contrato CLT ativo.</p>
      <h3>Data de Pagamento</h3>
      <p>O pagamento será realizado em <strong>27 de fevereiro de 2026</strong>.</p>
      <h3>Proporcionalidade</h3>
      <p>Colaboradores admitidos ao longo de 2025 receberão o valor de forma <strong>proporcional ao período trabalhado</strong> no ano.</p>
      <h3>Associados ao Sindicato</h3>
      <p>Colaboradores não associados ao SINDPD terão um <strong>desconto de 6%</strong> sobre o valor, conforme previsto na Convenção Coletiva.</p>
      <p style="margin-top: 1.5rem; padding: 1rem 1.25rem; background: var(--color-surface-container-low); border-left: 3px solid var(--color-primary); border-radius: 0 var(--radius-md) var(--radius-md) 0;">
        Dúvidas? Entre em contato com o RH pelo e-mail <strong>rh@mc1global.com</strong>.
      </p>
    `,
    category: 'RH',
    tag: 'pagamento',
    tagLabel: 'Pagamento',
    date: '2026-02-25',
    dateLabel: '25 de fevereiro de 2026',
    author: 'Equipe RH',
    readTime: '3 min',
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1400&q=80',
    gradient: 'linear-gradient(135deg, #1d6b8a 0%, #004b71 100%)',
    featured: false,
    countries: ['BR'],
  },
  // ─── 2026-02-13 ───
  {
    id: 'feriado-carnaval-2026',
    title: 'Feriado de Carnaval 2026 — Comunicado Oficial',
    excerpt: 'Terça-feira, 17/02, é feriado de Carnaval. Na Quarta-feira de Cinzas (18/02), as atividades têm início às 12h (BRT). Não há pontes oficiais.',
    body: `
      <p>O departamento de Recursos Humanos informa os colaboradores sobre as orientações para o período de <strong>Carnaval 2026</strong>.</p>
      <h3>Feriado de Carnaval</h3>
      <p>A <strong>terça-feira, 17 de fevereiro de 2026</strong>, é feriado de Carnaval, sendo considerado dia não útil para todos os colaboradores.</p>
      <h3>Quarta-feira de Cinzas</h3>
      <p>Na <strong>Quarta-feira de Cinzas, 18 de fevereiro de 2026</strong>, as atividades terão início às <strong>12h00 (horário de Brasília)</strong>.</p>
      <h3>Pontes Facultativas</h3>
      <p>Informamos que <strong>não há pontes oficiais</strong> determinadas pela empresa para este período. As áreas que desejarem fazer compensação de horas devem alinhar previamente com seus gestores, respeitando o banco de horas.</p>
      <p style="margin-top: 1.5rem; padding: 1rem 1.25rem; background: var(--color-surface-container-low); border-left: 3px solid var(--color-primary); border-radius: 0 var(--radius-md) var(--radius-md) 0;">
        Dúvidas? Entre em contato com o RH pelo e-mail <strong>rh@mc1global.com</strong>.
      </p>
    `,
    category: 'Calendário',
    tag: 'calendario',
    tagLabel: 'Calendário',
    date: '2026-02-13',
    dateLabel: '13 de fevereiro de 2026',
    author: 'Equipe RH',
    readTime: '2 min',
    image: 'https://images.unsplash.com/photo-1506784365847-bbad939e9335?auto=format&fit=crop&w=1400&q=80',
    gradient: 'linear-gradient(135deg, #d97706 0%, #f59e0b 100%)',
    featured: false,
    countries: ['BR'],
  },
  // ─── 2026-02-05 ───
  {
    id: 'aniversariantes-fevereiro-2026',
    title: 'Parabéns aos Aniversariantes de Fevereiro! 🎂',
    excerpt: 'Fevereiro chegou cheio de comemorações! Confira os colegas que fazem aniversário este mês e celebre com eles.',
    body: `
      <img src="assets/images/Birhtday 02.2026.png" alt="Aniversariantes de Fevereiro 2026" style="width:100%; border-radius:12px; margin-bottom:1.5rem;" />
      <p>A MC1 Global celebra junto com todos os colaboradores que completam mais um ano de vida em fevereiro de 2026. Este é um momento especial para reconhecer cada pessoa que faz parte da nossa equipe!</p>
      <h3>Day Off de Aniversário 🎁</h3>
      <p>Todo aniversariante ganha um dia livre para comemorar da forma que quiser — basta alinhar a data com sua liderança. Não quer folgar exatamente no dia? Sem problema! Você pode escolher outra data dentro do mesmo ano.</p>
      <p>E tem mais: no mês do seu aniversário você também recebe um <strong>crédito de R$ 50,00 no cartão Flash</strong> para aproveitar do seu jeito!</p>
      <p>Que 2026 seja repleto de conquistas, saúde e realizações para todos! 🎉</p>
    `,
    category: 'Celebração',
    tag: 'celebracao',
    tagLabel: 'Celebração',
    date: '2026-02-05',
    dateLabel: '5 de fevereiro de 2026',
    author: 'Equipe RH',
    readTime: '2 min',
    image: 'assets/images/Birhtday 02.2026.png',
    gradient: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)',
    featured: false,
    countries: ['ALL'],
  },
  // ─── 2026-01-29 ───
  {
    id: 'calendario-2026',
    title: 'Calendário de Feriados 2026 — Brasil, México, EUA e Grécia',
    excerpt: 'O calendário oficial de feriados 2026 da MC1 Global já está disponível, contemplando as operações no Brasil (SP), México, EUA e Grécia. Confira as datas.',
    body: `
      <p>O calendário corporativo de feriados 2026 da MC1 Global já está disponível para consulta. Este documento contempla as operações em todos os países onde a empresa atua.</p>
      <h3>Países contemplados</h3>
      <ul style="padding-left: 1.5rem; margin: 1rem 0; display: flex; flex-direction: column; gap: 0.5rem;">
        <li>🇧🇷 <strong>Brasil (São Paulo)</strong></li>
        <li>🇲🇽 <strong>México</strong></li>
        <li>🇺🇸 <strong>Estados Unidos</strong></li>
        <li>🇬🇷 <strong>Grécia</strong></li>
      </ul>
      <h3>Principais feriados nacionais — Brasil</h3>
      <ul style="padding-left: 1.5rem; margin: 1rem 0; display: flex; flex-direction: column; gap: 0.5rem;">
        <li><strong>01/01</strong> — Confraternização Universal (Feriado Nacional)</li>
        <li><strong>17/02</strong> — Carnaval (Feriado)</li>
        <li><strong>03/04</strong> — Sexta-Feira Santa (Feriado Nacional)</li>
        <li><strong>21/04</strong> — Tiradentes (Feriado Nacional)</li>
        <li><strong>01/05</strong> — Dia do Trabalho (Feriado Nacional)</li>
        <li><strong>07/09</strong> — Independência do Brasil (Feriado Nacional)</li>
        <li><strong>12/10</strong> — Nossa Senhora Aparecida (Feriado Nacional)</li>
        <li><strong>02/11</strong> — Finados (Feriado Nacional)</li>
        <li><strong>15/11</strong> — Proclamação da República (Feriado Nacional)</li>
        <li><strong>25/12</strong> — Natal (Feriado Nacional)</li>
      </ul>
      <h3>Pontes e Autonomia das Áreas</h3>
      <p>Não há pontes oficiais determinadas pela empresa. Cada área tem autonomia para definir a compensação de horas, desde que alinhado com o gestor e registrado no banco de horas.</p>
      <h3>Recesso de fim de ano</h3>
      <p>O recesso de fim de ano será de 26 de dezembro de 2026 a 2 de janeiro de 2027. Os colaboradores que precisarem trabalhar nesse período devem alinhar previamente com seus gestores.</p>
      <p style="margin-top: 1.5rem; padding: 1rem 1.25rem; background: var(--color-surface-container-low); border-left: 3px solid var(--color-primary); border-radius: 0 var(--radius-md) var(--radius-md) 0;">
        Acesse o calendário completo na página de <a href="#/politicas" style="color: var(--color-primary); font-weight: 600;">Documentos</a>.
      </p>
    `,
    category: 'Calendário',
    tag: 'calendario',
    tagLabel: 'Calendário',
    date: '2026-01-29',
    dateLabel: '29 de janeiro de 2026',
    author: 'Equipe RH',
    readTime: '4 min',
    image: 'https://images.unsplash.com/photo-1506784365847-bbad939e9335?auto=format&fit=crop&w=1400&q=80',
    gradient: 'linear-gradient(135deg, #d97706 0%, #f59e0b 100%)',
    featured: false,
    countries: ['BR'],
  },
  // ─── 2026-01-08 ───
  {
    id: 'aniversariantes-janeiro-2026',
    title: 'Parabéns aos Aniversariantes de Janeiro! 🎂',
    excerpt: 'Janeiro chegou cheio de comemorações! Confira os colegas que fazem aniversário este mês e celebre com eles.',
    body: `
      <img src="assets/images/Birhtday 01.2026.png" alt="Aniversariantes de Janeiro 2026" style="width:100%; border-radius:12px; margin-bottom:1.5rem;" />
      <p>A MC1 Global celebra junto com todos os colaboradores que completam mais um ano de vida em janeiro de 2026. Este é um momento especial para reconhecer cada pessoa que faz parte da nossa equipe!</p>
      <h3>Day Off de Aniversário 🎁</h3>
      <p>Todo aniversariante ganha um dia livre para comemorar da forma que quiser — basta alinhar a data com sua liderança. Não quer folgar exatamente no dia? Sem problema! Você pode escolher outra data dentro do mesmo ano.</p>
      <p>E tem mais: no mês do seu aniversário você também recebe um <strong>crédito de R$ 50,00 no cartão Flash</strong> para aproveitar do seu jeito!</p>
      <p>Que 2026 seja repleto de conquistas, saúde e realizações para todos! 🎉</p>
    `,
    category: 'Celebração',
    tag: 'celebracao',
    tagLabel: 'Celebração',
    date: '2026-01-08',
    dateLabel: '8 de janeiro de 2026',
    author: 'Equipe RH',
    readTime: '2 min',
    image: 'assets/images/Birhtday 01.2026.png',
    gradient: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)',
    featured: false,
    countries: ['ALL'],
  },
  // ─── 2026-01-02 ───
  {
    id: 'convencao-sindpd-2026-inicial',
    title: 'Convenção SINDPD 2026 — Comunicado Inicial e Período de Oposição',
    excerpt: 'Informamos o início do processo da Convenção Coletiva SINDPD 2026. O índice ainda não foi divulgado. O prazo para oposição à contribuição vai de 05/01 a 14/01/2026.',
    body: `
      <p>O departamento de Recursos Humanos informa os colaboradores sobre o início do processo da <strong>Convenção Coletiva de Trabalho SINDPD 2026</strong>.</p>
      <h3>Índice de Reajuste</h3>
      <p>O índice de reajuste salarial para 2026 <strong>ainda não foi divulgado</strong> pelo Sindicato. Assim que as negociações forem concluídas e o índice homologado, informaremos a todos os colaboradores.</p>
      <h3>Período de Oposição à Contribuição Sindical</h3>
      <p>Colaboradores que desejarem se <strong>opor ao desconto da contribuição sindical</strong> devem fazê-lo dentro do prazo estabelecido:</p>
      <ul style="padding-left: 1.5rem; margin: 1rem 0; display: flex; flex-direction: column; gap: 0.5rem;">
        <li><strong>Início:</strong> 05 de janeiro de 2026</li>
        <li><strong>Término:</strong> 14 de janeiro de 2026</li>
        <li><strong>Horário:</strong> 09h às 17h</li>
      </ul>
      <h3>Como formalizar a oposição</h3>
      <p>A carta de oposição deve ser <strong>entregue pessoalmente</strong> ao RH dentro do prazo indicado. Não serão aceitas oposições enviadas por e-mail ou outros meios.</p>
      <p style="margin-top: 1.5rem; padding: 1rem 1.25rem; background: var(--color-surface-container-low); border-left: 3px solid var(--color-primary); border-radius: 0 var(--radius-md) var(--radius-md) 0;">
        Dúvidas? Entre em contato com o RH pelo e-mail <strong>rh@mc1global.com</strong>.
      </p>
    `,
    category: 'Sindicato',
    tag: 'sindpd',
    tagLabel: 'Sindicato',
    date: '2026-01-02',
    dateLabel: '2 de janeiro de 2026',
    author: 'Equipe RH',
    readTime: '3 min',
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1400&q=80',
    gradient: 'linear-gradient(135deg, #004b71 0%, #006494 100%)',
    featured: false,
    countries: ['BR'],
  },
];

export const getNoticia = (id) => noticias.find(n => n.id === id);
export const getNoticiasFeatured = () => noticias.filter(n => n.featured).slice(0, 3);
export const getNoticiasRecentes = (limit = 3) => [...noticias].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, limit);

// ─── Firestore integration ────────────────────────────────────────────────────

let _fsCache     = null;  // null = not loaded yet
let _fsAvailable = false; // true once Firestore responds (even with 0 results)

/** Invalidate Firestore cache — call after admin create / update / delete */
export function invalidateNoticiasCache() { _fsCache = null; _fsAvailable = false; }

async function _loadFromFirestore() {
  if (_fsCache !== null) return _fsCache;
  try {
    const { db } = await import('../firebase.js');
    if (!db) { _fsCache = []; return []; }
    const { collection, query, where, getDocs } =
      await import('https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js');
    // No orderBy → no composite index required; sort client-side after merge
    const q = query(collection(db, 'comunicados'), where('published', '==', true));
    const snap = await getDocs(q);
    _fsCache = snap.docs
      .map(d => {
        const data = { ...d.data(), id: d.data().id || d.id };
        // Generate dateLabel if missing (e.g. "15 de abril de 2026")
        if (!data.dateLabel && data.date) {
          try {
            data.dateLabel = new Intl.DateTimeFormat('pt-BR', {
              day: 'numeric', month: 'long', year: 'numeric'
            }).format(new Date(data.date + 'T12:00:00'));
          } catch { data.dateLabel = data.date; }
        }
        return data;
      })
      .sort((a, b) => new Date(b.date) - new Date(a.date));
    _fsAvailable = true;
    return _fsCache;
  } catch (e) {
    console.warn('[Noticias] Firestore indisponível, usando dados estáticos:', e.message);
    _fsCache     = [];
    _fsAvailable = false;
    return [];
  }
}

function _mergeWithStatic(dynamic) {
  // Firestore is up → trust it exclusively (drafts stay hidden, deletes respected)
  if (_fsAvailable) return dynamic;
  // Firestore down → fallback to static for articles not already in dynamic
  const dynIds = new Set(dynamic.map(n => n.id));
  return [...dynamic, ...noticias.filter(n => !dynIds.has(n.id))];
}

// ─── Locale-aware helpers ───────────────────────────────

/** Checks if an article is visible for a given country code.
 *  Handles both new format (countries: ['BR','MX']) and legacy (country: 'br'). */
function _matchesCountry(n, country) {
  // New format: countries array
  if (Array.isArray(n.countries) && n.countries.length > 0) {
    return n.countries.includes('ALL') || n.countries.includes(country);
  }
  // Legacy Firestore format: country string ('all', 'br', 'mx', 'BR', 'MX'…)
  if (n.country) {
    const c = n.country.toLowerCase();
    return c === 'all' || c === country.toLowerCase();
  }
  return true; // no restriction
}

/** Returns all articles (Firestore + static fallback) in current language, filtered by country */
export async function getLocalizedNoticias() {
  const lang    = getLang();
  const country = getCountry();
  const dynamic = await _loadFromFirestore();
  const all     = _mergeWithStatic(dynamic);
  const base = lang === 'pt' ? all : (() => {
    const tr = noticiasTranslations[lang] || {};
    return all.map(n => {
      const override = tr[n.id];
      return override ? { ...n, ...override } : n;
    });
  })();
  return base.filter(n => _matchesCountry(n, country));
}

/** Returns a single article by id in the current language */
export async function getLocalizedNoticia(id) {
  const lang    = getLang();
  const dynamic = await _loadFromFirestore();
  const all     = _mergeWithStatic(dynamic);
  const base = lang === 'pt' ? all : (() => {
    const tr = noticiasTranslations[lang] || {};
    return all.map(n => {
      const override = tr[n.id];
      return override ? { ...n, ...override } : n;
    });
  })();
  return base.find(n => n.id === id);
}

/** Returns the N most recent articles in current language, filtered by country */
export async function getLocalizedNoticiasRecentes(limit = 3) {
  return (await getLocalizedNoticias())
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, limit);
}
