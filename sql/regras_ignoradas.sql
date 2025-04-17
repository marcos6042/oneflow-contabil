-- Estrutura da tabela regras_ignoradas (regras principais)

CREATE TABLE IF NOT EXISTS regras_ignoradas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  empresa_id UUID REFERENCES empresas(id),
  grupo_condicao TEXT DEFAULT 'AND',
  tipo_regra TEXT CHECK (tipo_regra IN ('ignorar', 'aceitar')) DEFAULT 'ignorar',
  ativa BOOLEAN DEFAULT TRUE,
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Índices úteis
CREATE INDEX IF NOT EXISTS idx_regras_empresa ON regras_ignoradas(empresa_id);

