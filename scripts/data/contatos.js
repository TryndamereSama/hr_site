// MC1 HUB — HR Team Contacts Data
export const contatos = [
  {
    id: 'viviane-oliveira',
    name: 'Viviane Sousa de Oliveira',
    role: 'Gerente de RH',
    department: 'Recursos Humanos',
    email: 'viviane.oliveira@mc1global.com',
    initials: 'VO',
    colorIndex: 0,
    areas: ['Gestão', 'Estratégia', 'Pessoas'],
  },
  {
    id: 'vinicius-faria',
    name: 'Vinicius Faria do Nascimento',
    role: 'Analista de Planejamento SR',
    department: 'Recursos Humanos',
    email: 'vinicus.faria@mc1global.com',
    initials: 'VF',
    colorIndex: 1,
    areas: ['Planejamento', 'Processos', 'Análise'],
  },
  {
    id: 'pedro-zaqueu',
    name: 'Pedro Vitor de Oliveira Zaqueu',
    role: 'Analista JR de RH',
    department: 'Recursos Humanos',
    email: 'pedro.zaqueu@mc1global.com',
    initials: 'PZ',
    colorIndex: 2,
    areas: ['Benefícios', 'Folha', 'Suporte'],
  },
  {
    id: 'vanessa-nunes',
    name: 'Vanessa Nascimento Rolim Nunes',
    role: 'Assistente de RH',
    department: 'Recursos Humanos',
    email: 'vanessa.nunes@mc1global.com',
    initials: 'VN',
    colorIndex: 3,
    areas: ['Atendimento', 'Documentação', 'Suporte'],
  },
  {
    id: 'barbara-simarelli',
    name: 'Barbara Garcia Simarelli',
    role: 'Estagiária de RH',
    department: 'Recursos Humanos',
    email: 'barbara.simarelli@mc1global.com',
    initials: 'BS',
    colorIndex: 4,
    areas: ['Suporte', 'Treinamentos', 'Onboarding'],
  },
];

// Gradient colors for avatars — each person gets a unique tonal pair
export const avatarGradients = [
  'linear-gradient(135deg, #004b71, #006494)',   // 0 - blue
  'linear-gradient(135deg, #283593, #3949ab)',   // 1 - indigo
  'linear-gradient(135deg, #00695c, #00897b)',   // 2 - teal-green
  'linear-gradient(135deg, #880e4f, #c2185b)',   // 3 - pink
  'linear-gradient(135deg, #4a148c, #6a1b9a)',   // 4 - purple
  'linear-gradient(135deg, #e65100, #f57c00)',   // 5 - orange
];

export const getContato = (id) => contatos.find(c => c.id === id);
