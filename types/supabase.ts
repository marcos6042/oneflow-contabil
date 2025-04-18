// Tipos derivados das tabelas do Supabase com base nas estruturas fornecidas

export type Empresa = {
  id: string;
  nome: string;
  cnpj: string;
  grupo_id: string | null;
  created_at: string | null; // timestamp
};

export type GrupoEconomico = {
  id: string;
  nome: string;
  created_at: string | null; // timestamp
};

export type Lancamento = {
  id: string;
  empresa_id: string | null;
  tipo: 'receita' | 'despesa';
  valor: number;
  centro_custo: string | null;
  filial: string | null;
  data: string; // date (ISO)
  descricao: string | null;
  conta_debito: string | null;
  conta_credito: string | null;
  status: string | null; // 'confirmado' por padrão
  created_at: string | null; // timestamp
};

export type LancamentoImportado = {
  id: string;
  empresa_id: string | null;
  data: string | null;
  descricao: string | null;
  tipo: 'receita' | 'despesa' | 'transferencia';
  valor: number | null;
  centro_custo: string | null;
  filial: string | null;
  banco: string | null;
  origem_arquivo: string | null;
  conta_debito: string | null;
  conta_credito: string | null;
  status: string | null; // 'pendente' por padrão
  criado_em: string | null; // timestamp
};

export type RegraIgnorada = {
  id: string;
  empresa_id: string | null;
  grupo_condicao: 'AND' | 'OR' | null;
  tipo_regra: 'ignorar' | 'aceitar' | null;
  ativa: boolean | null;
  criado_em: string | null; // timestamp
};

export type RegraCombinada = {
  id: string;
  regra_id: string | null;
  campo: string;
  condicao: string;
  valor: string;
  criado_em: string | null; // timestamp
};
