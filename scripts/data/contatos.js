// MC1 HUB — HR Team Contacts Data
export const contatos = [
  {
    id: 'ana-silva',
    name: 'Ana Paula Silva',
    role: 'Gerente de RH',
    department: 'Recursos Humanos',
    email: 'ana.silva@mc1global.com',
    phone: '(11) 3456-7890 ramal 201',
    initials: 'AS',
    colorIndex: 0,
    bio: 'Responsável pela estratégia de pessoas, cultura organizacional e gestão de talentos.',
    areas: ['Cultura', 'Talentos', 'Estratégia'],
  },
  {
    id: 'marcos-oliveira',
    name: 'Marcos Oliveira',
    role: 'Analista de RH Sênior',
    department: 'Recursos Humanos',
    email: 'marcos.oliveira@mc1global.com',
    phone: '(11) 3456-7890 ramal 202',
    initials: 'MO',
    colorIndex: 1,
    bio: 'Especialista em folha de pagamento, benefícios e processos admissionais/demissionais.',
    areas: ['Folha de Pagamento', 'Benefícios', 'Admissão'],
  },
  {
    id: 'carla-mendes',
    name: 'Carla Mendes',
    role: 'Analista de Treinamento e Desenvolvimento',
    department: 'Recursos Humanos',
    email: 'carla.mendes@mc1global.com',
    phone: '(11) 3456-7890 ramal 203',
    initials: 'CM',
    colorIndex: 2,
    bio: 'Cuida do desenvolvimento dos colaboradores, programas de treinamento e gestão de performance.',
    areas: ['Treinamentos', 'T&D', 'Performance'],
  },
  {
    id: 'roberto-costa',
    name: 'Roberto Costa',
    role: 'Coordenador de DP',
    department: 'Departamento Pessoal',
    email: 'roberto.costa@mc1global.com',
    phone: '(11) 3456-7890 ramal 204',
    initials: 'RC',
    colorIndex: 3,
    bio: 'Responsável pelo Departamento Pessoal: contratos, ponto, férias e obrigações trabalhistas.',
    areas: ['Ponto', 'Férias', 'Contratos'],
  },
  {
    id: 'juliana-santos',
    name: 'Juliana Santos',
    role: 'Analista de Recrutamento e Seleção',
    department: 'Recursos Humanos',
    email: 'juliana.santos@mc1global.com',
    phone: '(11) 3456-7890 ramal 205',
    initials: 'JS',
    colorIndex: 4,
    bio: 'Cuida dos processos seletivos, programa de indicação e onboarding de novos colaboradores.',
    areas: ['Recrutamento', 'Seleção', 'Onboarding'],
  },
  {
    id: 'fernando-lima',
    name: 'Fernando Lima',
    role: 'Assistente de RH',
    department: 'Recursos Humanos',
    email: 'fernando.lima@mc1global.com',
    phone: '(11) 3456-7890 ramal 206',
    initials: 'FL',
    colorIndex: 5,
    bio: 'Suporte geral ao time de RH: documentação, atendimento aos colaboradores e controle de benefícios.',
    areas: ['Suporte', 'Documentação', 'Atendimento'],
  },
];

// Gradient colors for avatars — each person gets a unique tonal pair
export const avatarGradients = [
  'linear-gradient(135deg, #004b71, #006494)',   // 0 - teal
  'linear-gradient(135deg, #283593, #3949ab)',   // 1 - indigo
  'linear-gradient(135deg, #880e4f, #c2185b)',   // 2 - pink
  'linear-gradient(135deg, #00695c, #00897b)',   // 3 - teal-green
  'linear-gradient(135deg, #4a148c, #6a1b9a)',   // 4 - purple
  'linear-gradient(135deg, #e65100, #f57c00)',   // 5 - orange
];

export const getContato = (id) => contatos.find(c => c.id === id);
