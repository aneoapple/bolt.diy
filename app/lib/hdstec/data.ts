import type { HdTicketStatus, HdTicketPriority } from './types';
import type { HdPeripheral, HdTicket, HdUser, HdCategorySummary } from './types';

export const hdTicketCategories = ['Rede', 'Hardware', 'Software', 'Impressora', 'Acesso', 'Outros'] as const;

export const hdTicketPriorities: HdTicketPriority[] = ['Baixa', 'Média', 'Alta', 'Crítica'];

export const hdTicketSlaHoras: Record<HdTicketPriority, number> = {
  Baixa: 72,
  Média: 48,
  Alta: 24,
  Crítica: 8,
};

export const hdUsers: HdUser[] = [
  {
    id: 'USR-001',
    nome: 'Ana Ribeiro',
    email: 'ana.ribeiro@hdstec.com.br',
    senha: 'ana123',
    perfil: 'Admin',
    setor: 'TI',
    unidade: 'Matriz',
    status: 'Ativo',
  },
  {
    id: 'USR-002',
    nome: 'Bruno Campos',
    email: 'bruno.campos@hdstec.com.br',
    senha: 'bruno123',
    perfil: 'Técnico',
    setor: 'Suporte',
    unidade: 'Campinas',
    status: 'Ativo',
  },
  {
    id: 'USR-003',
    nome: 'Carla Souza',
    email: 'carla.souza@hdstec.com.br',
    senha: 'carla123',
    perfil: 'Usuário',
    setor: 'Financeiro',
    unidade: 'São Paulo',
    status: 'Ativo',
  },
  {
    id: 'USR-004',
    nome: 'Diego Martins',
    email: 'diego.martins@hdstec.com.br',
    senha: 'diego123',
    perfil: 'Técnico',
    setor: 'Suporte',
    unidade: 'Rio de Janeiro',
    status: 'Ativo',
  },
];

export const hdTickets: HdTicket[] = [
  {
    id: 'CH-1045',
    titulo: 'E-mail corporativo não sincroniza',
    status: 'Em andamento',
    prioridade: 'Média',
    tecnico: 'Bruno Campos',
    solicitante: 'Carla Souza',
    categoria: 'Software',
    abertura: '2025-12-01',
  },
  {
    id: 'CH-1044',
    titulo: 'Falha intermitente no link da filial RJ',
    status: 'Aberto',
    prioridade: 'Alta',
    tecnico: null,
    solicitante: 'Equipe Financeira RJ',
    categoria: 'Rede',
    abertura: '2025-12-02',
  },
  {
    id: 'CH-1043',
    titulo: 'Atualização do ERP travando',
    status: 'Em andamento',
    prioridade: 'Crítica',
    tecnico: 'Ana Ribeiro',
    solicitante: 'Comercial',
    categoria: 'Software',
    abertura: '2025-11-29',
  },
  {
    id: 'CH-1042',
    titulo: 'Impressora sem autenticação segura',
    status: 'Resolvido',
    prioridade: 'Média',
    tecnico: 'Bruno Campos',
    solicitante: 'Compras',
    categoria: 'Impressora',
    abertura: '2025-11-25',
  },
  {
    id: 'CH-1041',
    titulo: 'Notebook sem acesso ao Wi-Fi corporativo',
    status: 'Vencido',
    prioridade: 'Alta',
    tecnico: 'Diego Martins',
    solicitante: 'Vendas',
    categoria: 'Rede',
    abertura: '2025-11-20',
  },
  {
    id: 'CH-1040',
    titulo: 'Provisionar acesso VPN para novo analista',
    status: 'Resolvido',
    prioridade: 'Baixa',
    tecnico: 'Ana Ribeiro',
    solicitante: 'RH',
    categoria: 'Acesso',
    abertura: '2025-11-15',
  },
];

export const hdPeripherals: HdPeripheral[] = [
  {
    id: 'PER-501',
    tipo: 'Notebook',
    marca: 'Dell',
    modelo: 'Latitude 5440',
    patrimonio: 'HD-7852',
    situacao: 'Em uso',
    local: 'São Paulo',
    responsavel: 'Carla Souza',
  },
  {
    id: 'PER-502',
    tipo: 'Monitor',
    marca: 'LG',
    modelo: 'UltraWide 29',
    patrimonio: 'HD-7921',
    situacao: 'Reserva',
    local: 'Campinas',
    responsavel: 'Estoque TI',
  },
  {
    id: 'PER-503',
    tipo: 'Roteador',
    marca: 'Cisco',
    modelo: 'RV340',
    patrimonio: 'HD-7812',
    situacao: 'Manutenção',
    local: 'Rio de Janeiro',
    responsavel: 'Bruno Campos',
  },
  {
    id: 'PER-504',
    tipo: 'Impressora',
    marca: 'HP',
    modelo: 'LaserJet Pro',
    patrimonio: 'HD-7990',
    situacao: 'Em uso',
    local: 'Campinas',
    responsavel: 'Equipe Compras',
  },
];

export const reportByStatus: HdCategorySummary[] = [
  { categoria: 'Aberto', quantidade: hdTickets.filter((ticket) => ticket.status === 'Aberto').length },
  { categoria: 'Em andamento', quantidade: hdTickets.filter((ticket) => ticket.status === 'Em andamento').length },
  { categoria: 'Resolvido', quantidade: hdTickets.filter((ticket) => ticket.status === 'Resolvido').length },
  { categoria: 'Vencido', quantidade: hdTickets.filter((ticket) => ticket.status === 'Vencido').length },
];

export const reportByCategory: HdCategorySummary[] = hdTicketCategories.map((categoria) => ({
  categoria,
  quantidade: hdTickets.filter((ticket) => ticket.categoria === categoria).length,
}));

export function getDashboardStats() {
  const total = hdTickets.length;
  const andamento = reportByStatus.find((item) => item.categoria === 'Em andamento')?.quantidade ?? 0;
  const resolvidos = reportByStatus.find((item) => item.categoria === 'Resolvido')?.quantidade ?? 0;
  const vencidos = reportByStatus.find((item) => item.categoria === 'Vencido')?.quantidade ?? 0;

  return { total, andamento, resolvidos, vencidos };
}

export function filterTickets(status: HdTicketStatus | 'Todos', prioridade: HdTicketPriority | 'Todas') {
  return hdTickets.filter((ticket) => {
    const statusOk = status === 'Todos' || ticket.status === status;
    const prioridadeOk = prioridade === 'Todas' || ticket.prioridade === prioridade;
    return statusOk && prioridadeOk;
  });
}
