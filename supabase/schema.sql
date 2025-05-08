
---

### ✅ Terceiro arquivo — `schema.sql` (Supabase)

```sql
-- Criação das tabelas no Supabase

create table empresas (
    id serial primary key,
    razao_social text not null,
    cnpj varchar(14) not null,
    uf varchar(2),
    unidade varchar(10),
    cod_sistema varchar(20)
);

create table plano_contas (
    id serial primary key,
    empresa_id integer references empresas(id),
    codigo varchar(20),
    descricao text
);

create table lancamentos_importados (
    id serial primary key,
    empresa_id integer references empresas(id),
    idfinanceiro varchar(50),
    idtransacao varchar(50),
    data date,
    banco varchar(100),
    fornecedor_cliente varchar(100),
    emitente varchar(100),
    descricao text,
    valor numeric,
    transferencia varchar(100),
    escritorio varchar(100),
    plano_contas varchar(100),
    entrada_saida varchar(50),
    observacao text
);

create table regras_ignoradas (
    id serial primary key,
    empresa_id integer references empresas(id),
    campo varchar(50),
    condicao varchar(50),
    valor varchar(255)
);

create table regras_combinadas (
    id serial primary key,
    regra_id integer references regras_ignoradas(id),
    campo varchar(50),
    condicao varchar(50),
    valor varchar(255)
);
