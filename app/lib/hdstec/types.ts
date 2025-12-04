export type HdTicketStatus = 'Aberto' | 'Em andamento' | 'Resolvido' | 'Vencido';
export type HdTicketPriority = 'Baixa' | 'Média' | 'Alta' | 'Crítica';

export interface HdTicket {
  id: string;
  titulo: string;
  status: HdTicketStatus;
  prioridade: HdTicketPriority;
  tecnico: string | null;
  solicitante: string;
  categoria: string;
  abertura: string;
}

export interface HdPeripheral {
  id: string;
  tipo: string;
  marca: string;
  modelo: string;
  patrimonio: string;
  situacao: string;
  local: string;
  responsavel: string;
}

export interface HdUser {
  id: string;
  nome: string;
  email: string;
  senha: string;
  perfil: 'Admin' | 'Técnico' | 'Usuário';
  setor: string;
  unidade: string;
  status: 'Ativo' | 'Inativo';
}

export interface HdCategorySummary {
  categoria: string;
  quantidade: number;
}
