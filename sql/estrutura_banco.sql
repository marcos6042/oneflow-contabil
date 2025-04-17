-- Estrutura do banco de dados para OneFlow

create table if not exists grupos_economicos (
  id uuid primary key default gen_random_uuid(),
  nome text not null
);

create table if not exists empresas (
  id uuid primary key default gen_random_uuid(),
  nome text not null,
  cnpj text not null,
  grupo_id uuid references grupos_economicos(id)
);

create table if not exists regras_ignoradas (
  id uuid primary key default gen_random_uuid(),
  empresa_id uuid references empresas(id),
  tipo_regra text check (tipo_regra in ('ignorar', 'aceitar')),
  grupo_condicao text default 'AND',
  ativa boolean default true,
  criado_em timestamptz default now()
);

create table if not exists regras_combinadas (
  id uuid primary key default gen_random_uuid(),
  regra_id uuid references regras_ignoradas(id) on delete cascade,
  campo text not null,
  condicao text not null,
  valor text not null
);

create table if not exists lancamentos_importados (
  id uuid primary key default gen_random_uuid(),
  empresa_id uuid references empresas(id),
  data date,
  descricao text,
  tipo text check (tipo in ('receita', 'despesa')),
  valor numeric(14,2),
  centro_custo text,
  filial text,
  banco text,
  conta_debito text,
  conta_credito text,
  status text default 'pendente',
  origem_arquivo text,
  criado_em timestamptz default now()
);

create table if not exists lancamentos (
  id uuid primary key default gen_random_uuid(),
  empresa_id uuid references empresas(id),
  data date,
  descricao text,
  tipo text check (tipo in ('receita', 'despesa')),
  valor numeric(14,2),
  centro_custo text,
  filial text,
  banco text,
  conta_debito text,
  conta_credito text,
  status text default 'confirmado',
  criado_em timestamptz default now()
);

