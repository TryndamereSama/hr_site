// MC1 HUB — Internationalisation (PT · ES · EN) + Country (BR · MX)

const STORAGE_KEY   = 'mc1-lang';
const COUNTRY_KEY   = 'mc1-country';
const VALID_COUNTRIES = ['BR', 'MX', 'US'];

const translations = {
  // ─────────────────────────────────────────────────────
  //  PORTUGUÊS
  // ─────────────────────────────────────────────────────
  pt: {
    // Navbar
    'nav.home': 'Home',
    'nav.news': 'Notícias',
    'nav.departments': 'Departamentos',
    'nav.rh': 'RH',
    'nav.rh.sub': 'Benefícios & Comunicados',
    'nav.finance': 'Financeiro',
    'nav.finance.sub': 'Em breve',
    'nav.governance': 'Governança',
    'nav.governance.sub': 'Em breve',
    'nav.docs': 'Documentos',
    'nav.training': 'Treinamentos',
    'nav.links': 'Links',
    'nav.contact': 'Contato',
    'nav.menu': 'Menu',
    'nav.search_placeholder': 'Buscar no MC1 Hub...',

    // Footer
    'footer.tagline': 'Um espaço criado para simplificar, conectar e evoluir a forma como vivemos o dia a dia na MC1 Global.',
    'footer.navigation': 'Navegação',
    'footer.departments': 'Departamentos',
    'footer.contact_rh': 'Contato RH',
    'footer.email_general': 'E-mail geral',
    'footer.hr_team': 'Equipe de RH',
    'footer.rights': '© 2026 MC1 Global. Todos os direitos reservados.',
    'footer.privacy': 'Privacidade',
    'footer.terms': 'Termos de Uso',
    'footer.accessibility': 'Acessibilidade',

    // Common
    'common.home': 'Home',
    'common.back_home': 'Voltar ao início',
    'common.coming_soon': 'Em breve',
    'common.page_building': 'Página em construção',
    'common.department': 'Departamento',
    'common.see_all': 'Ver todos',
    'common.see_all_f': 'Ver todas',
    'common.filter_all': 'Todos',
    'common.download': 'Ver documentos no Drive',
    'common.download_soon': 'Download disponível em breve.',

    // Search overlay
    'search.placeholder': 'Buscar benefícios, notícias, documentos...',
    'search.hint': 'Digite para buscar no MC1 Hub',
    'search.categories': 'NOTÍCIAS, BENEFÍCIOS, DOCUMENTOS, LINKS...',

    // Home
    'home.chip': '✦ MC1 Global · 2026',
    'home.hero.title1': 'Seu espaço',
    'home.hero.title2': 'no MC1 Hub.',
    'home.hero.sub': 'Um espaço criado para simplificar, conectar e evoluir a forma como vivemos o dia a dia na empresa.',
    'home.hero.cta_news': 'Ver Novidades',
    'home.hero.cta_benefits': 'Meus Benefícios',
    'home.hero.greeting': 'Bom dia!',
    'home.hero.dayoff': 'Você tem 1 day off disponível 🎂',
    'home.hero.sindpd': 'SINDPD 2026',
    'home.hero.sindpd_text': 'Reajuste de 4% aprovado',
    'home.hero.slide_news': '📰 Última Notícia',
    'home.hero.read_now': 'Leia agora',
    'home.hero.see_all': 'Ver todas',
    'home.hero.slide1_label': 'Slide boas-vindas',
    'home.hero.slide2_label': 'Slide última notícia',
    'home.quick.label': 'Acesso Rápido',
    'home.quick.news': 'Notícias',
    'home.quick.rh': 'RH',
    'home.quick.docs': 'Documentos',
    'home.quick.training': 'Treinamentos',
    'home.quick.links': 'Links Úteis',
    'home.quick.contact': 'Contato',
    'home.news.label': 'Comunicados',
    'home.news.title': 'Últimas Notícias',
    'home.news.see_all': 'Ver todas',
    'home.benefits.label': 'Seus Benefícios',
    'home.benefits.title': 'Bem-estar em primeiro lugar',
    'home.benefits.see_all': 'Ver todos',
    'home.calendar.label': 'Recurso',
    'home.calendar.title': 'Calendário Corporativo 2026',
    'home.calendar.desc': 'Feriados nacionais, pontos facultativos e datas importantes do ano já estão disponíveis para consulta e download.',
    'home.calendar.cta': 'Acessar Calendário',
    'home.calendar.month': 'Março 2026',
    'home.calendar.days': 'D,S,T,Q,Q,S,S',

    // News list
    'news.breadcrumb': 'Notícias',
    'news.label': 'Comunicados',
    'news.title': 'Notícias Internas',
    'news.subtitle': 'Fique por dentro de tudo que acontece na MC1 Global.',
    'news.filter_all': 'Todos',
    'news.empty': 'Nenhuma notícia encontrada',
    'news.read_now': 'Leia agora',
    'news.see_all': 'Ver todas',

    // News article
    'news.back': '← Voltar às Notícias',
    'news.other': 'Outras Notícias',
    'news.not_found': 'Notícia não encontrada.',
    'news.not_found_back': '← Voltar às notícias',
    'news.reading_time': 'de leitura',

    // RH
    'rh.breadcrumb': 'RH',
    'rh.label': 'Recursos Humanos',
    'rh.title': 'RH & Benefícios',
    'rh.subtitle': 'Conheça seus benefícios, acompanhe os comunicados e fale com a equipe de RH.',
    'rh.tab.benefits': 'Benefícios',
    'rh.tab.news': 'Comunicados',
    'rh.tab.contacts': 'Contatos RH',
    'rh.news.desc': 'Convenções sindicais, pagamentos, programas internos e comunicados — tudo em um só lugar.',
    'rh.modal.provided_by': 'Fornecido por',
    'rh.modal.how_to_access': 'Como Acessar',

    // Documents
    'docs.breadcrumb': 'Documentos',
    'docs.label': 'Biblioteca',
    'docs.title': 'Políticas & Documentos',
    'docs.subtitle': 'Manuais, normas e documentos importantes da MC1 Global.',
    'docs.search_placeholder': 'Buscar documentos...',
    'docs.documents': 'documento(s)',
    'docs.empty': 'Nenhum documento encontrado',
    'docs.updated': 'Atualizado:',

    // Training
    'training.breadcrumb': 'Treinamentos',
    'training.label': 'Desenvolvimento Contínuo',
    'training.title': 'Treinamentos',
    'training.subtitle': 'Aprenda, evolua e cresça junto com a MC1 Global.',
    'training.in_progress': 'Em Andamento',
    'training.continue': 'Continuar',
    'training.empty': 'Nenhum treinamento encontrado',

    // Links
    'links.breadcrumb': 'Links Úteis',
    'links.label': 'Ferramentas',
    'links.title': 'Links Úteis',
    'links.subtitle': 'Acesso rápido a todas as ferramentas e sistemas corporativos.',
    'links.empty': 'Nenhum link encontrado',

    // Contact
    'contact.breadcrumb': 'Contato',
    'contact.label': 'Fale Conosco',
    'contact.title': 'Contato RH',
    'contact.subtitle': 'Entre em contato diretamente com a equipe de Recursos Humanos.',
    'contact.channels': 'Canais de Atendimento',
    'contact.email_label': 'E-mail geral',
    'contact.team': 'Equipe de RH',

    // Finance
    'finance.breadcrumb': 'Financeiro',
    'finance.title': 'Financeiro',
    'finance.subtitle': 'Informações, comunicados e recursos do departamento Financeiro.',
    'finance.coming_soon_desc': 'O conteúdo do departamento Financeiro está sendo preparado e estará disponível em breve.',
    'finance.compras': 'Políticas de Compras',
    'finance.compras.sub': 'Diretrizes, processos e aprovações para aquisições.',
    'finance.compras.breadcrumb': 'Políticas de Compras',
    'finance.compras.coming_soon_desc': 'As políticas de compras estão sendo preparadas e estarão disponíveis em breve.',
    'finance.viagens': 'Políticas de Viagens',
    'finance.viagens.sub': 'Regras, limites e reembolsos para viagens corporativas.',
    'finance.viagens.breadcrumb': 'Políticas de Viagens',
    'finance.viagens.coming_soon_desc': 'As políticas de viagens estão sendo preparadas e estarão disponíveis em breve.',

    // Governance
    'governance.breadcrumb': 'Governança',
    'governance.title': 'Governança',
    'governance.subtitle': 'Políticas, compliance e recursos do departamento de Governança.',
    'governance.coming_soon_desc': 'O conteúdo do departamento de Governança está sendo preparado e estará disponível em breve.',

    // Country
    'country.label': 'País',
    'country.BR': 'Brasil',
    'country.MX': 'México',
    'country.US': 'Global / EN',
    'country.no_benefits': 'Nenhum benefício disponível para o país selecionado.',
    'country.no_news': 'Nenhuma notícia disponível para o país selecionado.',

    // Operacional
    'nav.operacional': 'Operacional',
    'nav.operacional.sobre': 'Sobre a MC1',
    'nav.operacional.sobre.sub': 'Conheça a MC1 Global',
    'nav.operacional.sobre.coming_soon_desc': 'As informações sobre a MC1 Global estão sendo preparadas e estarão disponíveis em breve.',
    'nav.operacional.clientes': 'Clientes MC1',
    'nav.operacional.clientes.sub': 'Nossos clientes e parcerias',
    'nav.operacional.clientes.coming_soon_desc': 'As informações sobre os clientes MC1 estão sendo preparadas e estarão disponíveis em breve.',
    'nav.operacional.avisos': 'Avisos Operacionais',
    'nav.operacional.avisos.sub': 'Comunicados e atualizações',
    'nav.operacional.avisos.coming_soon_desc': 'Os avisos operacionais estão sendo preparados e estarão disponíveis em breve.',

    // Marketing
    'nav.marketing': 'Marketing',
    'nav.marketing.sub': 'Em breve',
    'nav.marketing.coming_soon_desc': 'O conteúdo do departamento de Marketing está sendo preparado e estará disponível em breve.',
  },

  // ─────────────────────────────────────────────────────
  //  ESPAÑOL
  // ─────────────────────────────────────────────────────
  es: {
    // Navbar
    'nav.home': 'Inicio',
    'nav.news': 'Noticias',
    'nav.departments': 'Departamentos',
    'nav.rh': 'RH',
    'nav.rh.sub': 'Beneficios & Comunicados',
    'nav.finance': 'Financiero',
    'nav.finance.sub': 'Próximamente',
    'nav.governance': 'Gobernanza',
    'nav.governance.sub': 'Próximamente',
    'nav.docs': 'Documentos',
    'nav.training': 'Capacitaciones',
    'nav.links': 'Links',
    'nav.contact': 'Contacto',
    'nav.menu': 'Menú',
    'nav.search_placeholder': 'Buscar en MC1 Hub...',

    // Footer
    'footer.tagline': 'Un espacio creado para simplificar, conectar y evolucionar la forma en que vivimos el día a día en MC1 Global.',
    'footer.navigation': 'Navegación',
    'footer.departments': 'Departamentos',
    'footer.contact_rh': 'Contacto RH',
    'footer.email_general': 'Correo general',
    'footer.hr_team': 'Equipo de RH',
    'footer.rights': '© 2026 MC1 Global. Todos los derechos reservados.',
    'footer.privacy': 'Privacidad',
    'footer.terms': 'Términos de Uso',
    'footer.accessibility': 'Accesibilidad',

    // Common
    'common.home': 'Inicio',
    'common.back_home': 'Volver al inicio',
    'common.coming_soon': 'Próximamente',
    'common.page_building': 'Página en construcción',
    'common.department': 'Departamento',
    'common.see_all': 'Ver todos',
    'common.see_all_f': 'Ver todas',
    'common.filter_all': 'Todos',
    'common.download': 'Ver documentos en Drive',
    'common.download_soon': 'Descarga disponible próximamente.',

    // Search overlay
    'search.placeholder': 'Buscar beneficios, noticias, documentos...',
    'search.hint': 'Escribe para buscar en MC1 Hub',
    'search.categories': 'NOTICIAS, BENEFICIOS, DOCUMENTOS, LINKS...',

    // Home
    'home.chip': '✦ MC1 Global · 2026',
    'home.hero.title1': 'Tu espacio',
    'home.hero.title2': 'en MC1 Hub.',
    'home.hero.sub': 'Un espacio creado para simplificar, conectar y evolucionar la forma en que vivimos el día a día en la empresa.',
    'home.hero.cta_news': 'Ver Novedades',
    'home.hero.cta_benefits': 'Mis Beneficios',
    'home.hero.greeting': '¡Buenos días!',
    'home.hero.dayoff': 'Tienes 1 día libre disponible 🎂',
    'home.hero.sindpd': 'SINDPD 2026',
    'home.hero.sindpd_text': 'Reajuste del 4% aprobado',
    'home.hero.slide_news': '📰 Última Noticia',
    'home.hero.read_now': 'Leer ahora',
    'home.hero.see_all': 'Ver todas',
    'home.hero.slide1_label': 'Slide bienvenida',
    'home.hero.slide2_label': 'Slide última noticia',
    'home.quick.label': 'Acceso Rápido',
    'home.quick.news': 'Noticias',
    'home.quick.rh': 'RH',
    'home.quick.docs': 'Documentos',
    'home.quick.training': 'Capacitaciones',
    'home.quick.links': 'Links Útiles',
    'home.quick.contact': 'Contacto',
    'home.news.label': 'Comunicados',
    'home.news.title': 'Últimas Noticias',
    'home.news.see_all': 'Ver todas',
    'home.benefits.label': 'Tus Beneficios',
    'home.benefits.title': 'El bienestar primero',
    'home.benefits.see_all': 'Ver todos',
    'home.calendar.label': 'Recurso',
    'home.calendar.title': 'Calendario Corporativo 2026',
    'home.calendar.desc': 'Días festivos nacionales, puentes y fechas importantes del año ya están disponibles para consulta y descarga.',
    'home.calendar.cta': 'Acceder al Calendario',
    'home.calendar.month': 'Marzo 2026',
    'home.calendar.days': 'D,L,M,X,J,V,S',

    // News list
    'news.breadcrumb': 'Noticias',
    'news.label': 'Comunicados',
    'news.title': 'Noticias Internas',
    'news.subtitle': 'Entérate de todo lo que sucede en MC1 Global.',
    'news.filter_all': 'Todos',
    'news.empty': 'No se encontraron noticias',
    'news.read_now': 'Leer ahora',
    'news.see_all': 'Ver todas',

    // News article
    'news.back': '← Volver a Noticias',
    'news.other': 'Otras Noticias',
    'news.not_found': 'Noticia no encontrada.',
    'news.not_found_back': '← Volver a noticias',
    'news.reading_time': 'de lectura',

    // RH
    'rh.breadcrumb': 'RH',
    'rh.label': 'Recursos Humanos',
    'rh.title': 'RH & Beneficios',
    'rh.subtitle': 'Conoce tus beneficios, sigue los comunicados y habla con el equipo de RH.',
    'rh.tab.benefits': 'Beneficios',
    'rh.tab.news': 'Comunicados',
    'rh.tab.contacts': 'Contactos RH',
    'rh.news.desc': 'Convenios sindicales, pagos, programas internos y comunicados — todo en un solo lugar.',
    'rh.modal.provided_by': 'Proporcionado por',
    'rh.modal.how_to_access': 'Cómo Acceder',

    // Documents
    'docs.breadcrumb': 'Documentos',
    'docs.label': 'Biblioteca',
    'docs.title': 'Políticas & Documentos',
    'docs.subtitle': 'Manuales, normas y documentos importantes de MC1 Global.',
    'docs.search_placeholder': 'Buscar documentos...',
    'docs.documents': 'documento(s)',
    'docs.empty': 'No se encontraron documentos',
    'docs.updated': 'Actualizado:',

    // Training
    'training.breadcrumb': 'Capacitaciones',
    'training.label': 'Desarrollo Continuo',
    'training.title': 'Capacitaciones',
    'training.subtitle': 'Aprende, evoluciona y crece junto con MC1 Global.',
    'training.in_progress': 'En Progreso',
    'training.continue': 'Continuar',
    'training.empty': 'No se encontraron capacitaciones',

    // Links
    'links.breadcrumb': 'Links Útiles',
    'links.label': 'Herramientas',
    'links.title': 'Links Útiles',
    'links.subtitle': 'Acceso rápido a todas las herramientas y sistemas corporativos.',
    'links.empty': 'No se encontraron links',

    // Contact
    'contact.breadcrumb': 'Contacto',
    'contact.label': 'Hable con Nosotros',
    'contact.title': 'Contacto RH',
    'contact.subtitle': 'Contáctese directamente con el equipo de Recursos Humanos.',
    'contact.channels': 'Canales de Atención',
    'contact.email_label': 'Correo general',
    'contact.team': 'Equipo de RH',

    // Finance
    'finance.breadcrumb': 'Financiero',
    'finance.title': 'Financiero',
    'finance.subtitle': 'Información, comunicados y recursos del departamento Financiero.',
    'finance.coming_soon_desc': 'El contenido del departamento Financiero está siendo preparado y estará disponible próximamente.',
    'finance.compras': 'Políticas de Compras',
    'finance.compras.sub': 'Directrices, procesos y aprobaciones para adquisiciones.',
    'finance.compras.breadcrumb': 'Políticas de Compras',
    'finance.compras.coming_soon_desc': 'Las políticas de compras están siendo preparadas y estarán disponibles próximamente.',
    'finance.viagens': 'Políticas de Viajes',
    'finance.viagens.sub': 'Reglas, límites y reembolsos para viajes corporativos.',
    'finance.viagens.breadcrumb': 'Políticas de Viajes',
    'finance.viagens.coming_soon_desc': 'Las políticas de viajes están siendo preparadas y estarán disponibles próximamente.',

    // Governance
    'governance.breadcrumb': 'Gobernanza',
    'governance.title': 'Gobernanza',
    'governance.subtitle': 'Políticas, cumplimiento y recursos del departamento de Gobernanza.',
    'governance.coming_soon_desc': 'El contenido del departamento de Gobernanza está siendo preparado y estará disponible próximamente.',

    // Country
    'country.label': 'País',
    'country.BR': 'Brasil',
    'country.MX': 'México',
    'country.US': 'Global / EN',
    'country.no_benefits': 'No hay beneficios disponibles para el país seleccionado.',
    'country.no_news': 'No hay noticias disponibles para el país seleccionado.',

    // Operacional
    'nav.operacional': 'Operacional',
    'nav.operacional.sobre': 'Sobre la MC1',
    'nav.operacional.sobre.sub': 'Conozca la MC1 Global',
    'nav.operacional.sobre.coming_soon_desc': 'La información sobre MC1 Global está siendo preparada y estará disponible próximamente.',
    'nav.operacional.clientes': 'Clientes MC1',
    'nav.operacional.clientes.sub': 'Nuestros clientes y alianzas',
    'nav.operacional.clientes.coming_soon_desc': 'La información sobre los clientes MC1 está siendo preparada y estará disponible próximamente.',
    'nav.operacional.avisos': 'Avisos Operacionales',
    'nav.operacional.avisos.sub': 'Comunicados y actualizaciones',
    'nav.operacional.avisos.coming_soon_desc': 'Los avisos operacionales están siendo preparados y estarán disponibles próximamente.',

    // Marketing
    'nav.marketing': 'Marketing',
    'nav.marketing.sub': 'Próximamente',
    'nav.marketing.coming_soon_desc': 'El contenido del departamento de Marketing está siendo preparado y estará disponible próximamente.',
  },

  // ─────────────────────────────────────────────────────
  //  ENGLISH
  // ─────────────────────────────────────────────────────
  en: {
    // Navbar
    'nav.home': 'Home',
    'nav.news': 'News',
    'nav.departments': 'Departments',
    'nav.rh': 'HR',
    'nav.rh.sub': 'Benefits & Communications',
    'nav.finance': 'Finance',
    'nav.finance.sub': 'Coming soon',
    'nav.governance': 'Governance',
    'nav.governance.sub': 'Coming soon',
    'nav.docs': 'Documents',
    'nav.training': 'Training',
    'nav.links': 'Links',
    'nav.contact': 'Contact',
    'nav.menu': 'Menu',
    'nav.search_placeholder': 'Search MC1 Hub...',

    // Footer
    'footer.tagline': 'A space created to simplify, connect and evolve the way we experience day-to-day life at MC1 Global.',
    'footer.navigation': 'Navigation',
    'footer.departments': 'Departments',
    'footer.contact_rh': 'HR Contact',
    'footer.email_general': 'General email',
    'footer.hr_team': 'HR Team',
    'footer.rights': '© 2026 MC1 Global. All rights reserved.',
    'footer.privacy': 'Privacy',
    'footer.terms': 'Terms of Use',
    'footer.accessibility': 'Accessibility',

    // Common
    'common.home': 'Home',
    'common.back_home': 'Back to home',
    'common.coming_soon': 'Coming soon',
    'common.page_building': 'Page under construction',
    'common.department': 'Department',
    'common.see_all': 'See all',
    'common.see_all_f': 'See all',
    'common.filter_all': 'All',
    'common.download': 'View documents on Drive',
    'common.download_soon': 'Download coming soon.',

    // Search overlay
    'search.placeholder': 'Search benefits, news, documents...',
    'search.hint': 'Type to search MC1 Hub',
    'search.categories': 'NEWS, BENEFITS, DOCUMENTS, LINKS...',

    // Home
    'home.chip': '✦ MC1 Global · 2026',
    'home.hero.title1': 'Your space',
    'home.hero.title2': 'at MC1 Hub.',
    'home.hero.sub': 'A space created to simplify, connect and evolve the way we experience day-to-day life at the company.',
    'home.hero.cta_news': 'See Updates',
    'home.hero.cta_benefits': 'My Benefits',
    'home.hero.greeting': 'Good morning!',
    'home.hero.dayoff': 'You have 1 day off available 🎂',
    'home.hero.sindpd': 'SINDPD 2026',
    'home.hero.sindpd_text': '4% raise approved',
    'home.hero.slide_news': '📰 Latest News',
    'home.hero.read_now': 'Read now',
    'home.hero.see_all': 'See all',
    'home.hero.slide1_label': 'Welcome slide',
    'home.hero.slide2_label': 'Latest news slide',
    'home.quick.label': 'Quick Access',
    'home.quick.news': 'News',
    'home.quick.rh': 'HR',
    'home.quick.docs': 'Documents',
    'home.quick.training': 'Training',
    'home.quick.links': 'Useful Links',
    'home.quick.contact': 'Contact',
    'home.news.label': 'Communications',
    'home.news.title': 'Latest News',
    'home.news.see_all': 'See all',
    'home.benefits.label': 'Your Benefits',
    'home.benefits.title': 'Wellbeing first',
    'home.benefits.see_all': 'See all',
    'home.calendar.label': 'Resource',
    'home.calendar.title': 'Corporate Calendar 2026',
    'home.calendar.desc': 'National holidays, optional bridge days and important dates of the year are already available for consultation and download.',
    'home.calendar.cta': 'Access Calendar',
    'home.calendar.month': 'March 2026',
    'home.calendar.days': 'S,M,T,W,T,F,S',

    // News list
    'news.breadcrumb': 'News',
    'news.label': 'Communications',
    'news.title': 'Internal News',
    'news.subtitle': 'Stay up to date with everything happening at MC1 Global.',
    'news.filter_all': 'All',
    'news.empty': 'No news found',
    'news.read_now': 'Read now',
    'news.see_all': 'See all',

    // News article
    'news.back': '← Back to News',
    'news.other': 'Other News',
    'news.not_found': 'News not found.',
    'news.not_found_back': '← Back to news',
    'news.reading_time': 'read',

    // RH
    'rh.breadcrumb': 'HR',
    'rh.label': 'Human Resources',
    'rh.title': 'HR & Benefits',
    'rh.subtitle': 'Explore your benefits, follow communications and connect with the HR team.',
    'rh.tab.benefits': 'Benefits',
    'rh.tab.news': 'Communications',
    'rh.tab.contacts': 'HR Contacts',
    'rh.news.desc': 'Union agreements, payments, internal programs and communications — all in one place.',
    'rh.modal.provided_by': 'Provided by',
    'rh.modal.how_to_access': 'How to Access',

    // Documents
    'docs.breadcrumb': 'Documents',
    'docs.label': 'Library',
    'docs.title': 'Policies & Documents',
    'docs.subtitle': 'Manuals, standards and important documents from MC1 Global.',
    'docs.search_placeholder': 'Search documents...',
    'docs.documents': 'document(s)',
    'docs.empty': 'No documents found',
    'docs.updated': 'Updated:',

    // Training
    'training.breadcrumb': 'Training',
    'training.label': 'Continuous Development',
    'training.title': 'Training',
    'training.subtitle': 'Learn, grow and evolve with MC1 Global.',
    'training.in_progress': 'In Progress',
    'training.continue': 'Continue',
    'training.empty': 'No training found',

    // Links
    'links.breadcrumb': 'Useful Links',
    'links.label': 'Tools',
    'links.title': 'Useful Links',
    'links.subtitle': 'Quick access to all corporate tools and systems.',
    'links.empty': 'No links found',

    // Contact
    'contact.breadcrumb': 'Contact',
    'contact.label': 'Get in Touch',
    'contact.title': 'HR Contact',
    'contact.subtitle': 'Contact the Human Resources team directly.',
    'contact.channels': 'Contact Channels',
    'contact.email_label': 'General email',
    'contact.team': 'HR Team',

    // Finance
    'finance.breadcrumb': 'Finance',
    'finance.title': 'Finance',
    'finance.subtitle': 'Information, communications and resources from the Finance department.',
    'finance.coming_soon_desc': 'The Finance department content is being prepared and will be available soon.',
    'finance.compras': 'Purchasing Policies',
    'finance.compras.sub': 'Guidelines, processes and approvals for acquisitions.',
    'finance.compras.breadcrumb': 'Purchasing Policies',
    'finance.compras.coming_soon_desc': 'The purchasing policies are being prepared and will be available soon.',
    'finance.viagens': 'Travel Policies',
    'finance.viagens.sub': 'Rules, limits and reimbursements for corporate travel.',
    'finance.viagens.breadcrumb': 'Travel Policies',
    'finance.viagens.coming_soon_desc': 'The travel policies are being prepared and will be available soon.',

    // Governance
    'governance.breadcrumb': 'Governance',
    'governance.title': 'Governance',
    'governance.subtitle': 'Policies, compliance and resources from the Governance department.',
    'governance.coming_soon_desc': 'The Governance department content is being prepared and will be available soon.',

    // Country
    'country.label': 'Country',
    'country.BR': 'Brazil',
    'country.MX': 'Mexico',
    'country.US': 'Global / EN',
    'country.no_benefits': 'No benefits available for the selected country.',
    'country.no_news': 'No news available for the selected country.',

    // Operacional
    'nav.operacional': 'Operational',
    'nav.operacional.sobre': 'About MC1',
    'nav.operacional.sobre.sub': 'Get to know MC1 Global',
    'nav.operacional.sobre.coming_soon_desc': 'Information about MC1 Global is being prepared and will be available soon.',
    'nav.operacional.clientes': 'MC1 Clients',
    'nav.operacional.clientes.sub': 'Our clients and partnerships',
    'nav.operacional.clientes.coming_soon_desc': 'Information about MC1 clients is being prepared and will be available soon.',
    'nav.operacional.avisos': 'Operational Notices',
    'nav.operacional.avisos.sub': 'Communications and updates',
    'nav.operacional.avisos.coming_soon_desc': 'Operational notices are being prepared and will be available soon.',

    // Marketing
    'nav.marketing': 'Marketing',
    'nav.marketing.sub': 'Coming soon',
    'nav.marketing.coming_soon_desc': 'The Marketing department content is being prepared and will be available soon.',
  },
};

// ─── API ───────────────────────────────────────────────

export function getLang() {
  return localStorage.getItem(STORAGE_KEY) || 'pt';
}

export function setLang(lang) {
  if (!['pt', 'es', 'en'].includes(lang)) return;
  localStorage.setItem(STORAGE_KEY, lang);
  window.dispatchEvent(new CustomEvent('langchange', { detail: { lang } }));
}

export function getCountry() {
  const stored = localStorage.getItem(COUNTRY_KEY);
  if (VALID_COUNTRIES.includes(stored)) return stored;
  // Auto-assign by active language when no country stored
  const lang = getLang();
  if (lang === 'en') return 'US';
  if (lang === 'es') return 'MX';
  return 'BR';
}

export function setCountry(country) {
  if (!VALID_COUNTRIES.includes(country)) return;
  localStorage.setItem(COUNTRY_KEY, country);
  window.dispatchEvent(new CustomEvent('countrychange', { detail: { country } }));
}

/** Translate a key for the current language (falls back to PT, then the key itself) */
export function t(key) {
  const lang = getLang();
  return translations[lang]?.[key] ?? translations['pt']?.[key] ?? key;
}

/** Update all [data-i18n] elements in the document */
export function applyTranslations() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    el.textContent = t(el.getAttribute('data-i18n'));
  });
  // Update search placeholders
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    el.placeholder = t(el.getAttribute('data-i18n-placeholder'));
  });
  // Sync locale-btn active state (determined by current language)
  document.querySelectorAll('.locale-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.localeLang === getLang());
  });
}
