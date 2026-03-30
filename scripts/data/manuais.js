// MC1 HUB — HR Manuals & Documents Data
export const manuais = [
  {
    id: 'manual-pagamento',
    name: 'Manual de Pagamento',
    category: 'Pagamento',
    description: 'Tudo sobre folha de pagamento, holerite, descontos, adiantamentos e políticas de remuneração da MC1 Global.',
    details: `
      <p>O Manual de Pagamento da MC1 Global descreve todos os processos relacionados à remuneração dos colaboradores, incluindo:</p>
      <ul>
        <li>Estrutura do holerite e como interpretar cada campo</li>
        <li>Datas de pagamento: todo dia 5 do mês</li>
        <li>Adiantamento salarial: disponível mediante solicitação ao RH até o dia 20</li>
        <li>13º salário: 1ª parcela em novembro, 2ª em dezembro</li>
        <li>Horas extras: calculadas conforme convenção coletiva vigente</li>
        <li>Benefícios e descontos: VT, plano de saúde, INSS, IR</li>
      </ul>
    `,
    lastUpdated: '2026-01-15',
    lastUpdatedLabel: 'Janeiro 2026',
    version: '3.2',
    fileType: 'PDF',
    fileSize: '2,4 MB',
    icon: 'icon-document',
    gradient: 'linear-gradient(135deg, #004b71, #006494)',
    tags: ['pagamento', 'salário', 'folha', 'holerite'],
  },
  {
    id: 'manual-modelo-trabalho',
    name: 'Manual do Modelo de Trabalho',
    category: 'Trabalho',
    description: 'Políticas de trabalho presencial, remoto e híbrido, horários, jornada e flexibilidade na MC1 Global.',
    details: `
      <p>O Manual do Modelo de Trabalho estabelece as diretrizes para os diferentes regimes de trabalho adotados pela MC1 Global em 2026.</p>
      <ul>
        <li><strong>Modelo Híbrido:</strong> Mínimo de 2 dias presenciais por semana (terças e quintas por padrão)</li>
        <li><strong>Home Office:</strong> Até 3 dias por semana, conforme acordado com o gestor</li>
        <li><strong>Flexibilidade de horário:</strong> Janela das 8h às 10h para entrada e saída proporcional</li>
        <li><strong>Core hours:</strong> Das 10h às 16h todos devem estar disponíveis</li>
        <li><strong>Equipamentos:</strong> Notebook corporativo fornecido para todos</li>
        <li><strong>Auxílio home office:</strong> R$ 150/mês para custos de internet e energia</li>
      </ul>
    `,
    lastUpdated: '2026-02-01',
    lastUpdatedLabel: 'Fevereiro 2026',
    version: '2.1',
    fileType: 'PDF',
    fileSize: '1,8 MB',
    icon: 'icon-home',
    gradient: 'linear-gradient(135deg, #1a3460, #2550a0)',
    tags: ['home office', 'presencial', 'híbrido', 'jornada', 'horário'],
  },
  {
    id: 'manual-sindicato',
    name: 'Manual do Sindicato (SINDPD)',
    category: 'Sindicato',
    description: 'Direitos, deveres e benefícios assegurados pela convenção coletiva do SINDPD para colaboradores da MC1 Global.',
    details: `
      <p>Este manual apresenta os principais direitos e benefícios garantidos pela Convenção Coletiva do SINDPD para 2026, que rege as relações trabalhistas dos profissionais de tecnologia da informação.</p>
      <ul>
        <li>Reajuste salarial: 5,5% a partir de janeiro de 2026</li>
        <li>Jornada máxima: 44 horas semanais</li>
        <li>Hora extra: 50% acima do valor hora normal</li>
        <li>Adicional noturno: 20% para trabalho entre 22h e 5h</li>
        <li>PLR: Participação nos Lucros e Resultados conforme negociação anual</li>
        <li>Estabilidade pré-aposentadoria: 24 meses antes da aposentadoria</li>
      </ul>
    `,
    lastUpdated: '2026-03-01',
    lastUpdatedLabel: 'Março 2026',
    version: '1.0',
    fileType: 'PDF',
    fileSize: '3,1 MB',
    icon: 'icon-shield',
    gradient: 'linear-gradient(135deg, #283593, #3949ab)',
    tags: ['sindicato', 'convenção', 'SINDPD', 'direitos'],
  },
  {
    id: 'manual-ahgora',
    name: 'Manual Ahgora — Ponto Eletrônico',
    category: 'Ponto',
    description: 'Como registrar, ajustar e gerenciar seu ponto eletrônico no sistema Ahgora. Guia passo a passo para colaboradores.',
    details: `
      <p>O Ahgora é o sistema de controle de ponto eletrônico utilizado pela MC1 Global. Este manual explica como utilizar todas as funcionalidades disponíveis.</p>
      <ul>
        <li><strong>Registro de ponto:</strong> Pelo app (iOS/Android) ou pelo portal web</li>
        <li><strong>Geolocalização:</strong> Obrigatória para registro fora do escritório</li>
        <li><strong>Esquecimento de ponto:</strong> Abrir justificativa até 48h após o dia</li>
        <li><strong>Banco de horas:</strong> Consultar saldo pelo app a qualquer momento</li>
        <li><strong>Day Off Aniversário:</strong> Registrar como "Ausência Justificada — Aniversário"</li>
        <li><strong>Férias:</strong> Aprovadas pelo gestor e lançadas automaticamente</li>
      </ul>
    `,
    lastUpdated: '2026-01-10',
    lastUpdatedLabel: 'Janeiro 2026',
    version: '4.5',
    fileType: 'PDF',
    fileSize: '2,0 MB',
    icon: 'icon-calendar',
    gradient: 'linear-gradient(135deg, #004b71, #0277bd)',
    tags: ['ponto', 'ahgora', 'jornada', 'banco de horas'],
  },
  {
    id: 'calendario-2026',
    name: 'Calendário Corporativo 2026',
    category: 'Calendário',
    description: 'Calendário oficial da MC1 Global com feriados nacionais, pontos facultativos e datas importantes do ano de 2026.',
    details: `
      <p>O Calendário Corporativo 2026 é o documento de referência para planejamento de equipes, férias e projetos ao longo do ano.</p>
      <ul>
        <li>10 feriados nacionais</li>
        <li>Carnaval: 2 e 3 de março (ponto facultativo)</li>
        <li>Recesso fim de ano: 26/12/2026 a 02/01/2027</li>
        <li>Datas de pagamento de 13º salário</li>
        <li>Períodos de avaliação de desempenho</li>
        <li>Calendário impresso disponível na recepção</li>
      </ul>
    `,
    lastUpdated: '2025-12-20',
    lastUpdatedLabel: 'Dezembro 2025',
    version: '2026',
    fileType: 'PDF',
    fileSize: '1,2 MB',
    icon: 'icon-calendar',
    gradient: 'linear-gradient(135deg, #d97706, #f59e0b)',
    tags: ['calendário', 'feriados', '2026', 'recesso'],
  },
];

export const getManual = (id) => manuais.find(m => m.id === id);
export const getManuaisByCategory = (cat) => cat === 'Todos' ? manuais : manuais.filter(m => m.category === cat);
export const manuaisCategories = ['Todos', ...new Set(manuais.map(m => m.category))];
