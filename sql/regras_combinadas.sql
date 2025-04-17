-- Estrutura da tabela regras_combinadas (complemento das regras principais)

CREATE TABLE IF NOT EXISTS regras_combinadas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  regra_id UUID REFERENCES regras_ignoradas(id) ON DELETE CASCADE,
  campo TEXT NOT NULL,
  condicao TEXT NOT NULL,
  valor TEXT NOT NULL,
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Índices úteis para performance
CREATE INDEX IF NOT EXISTS idx_regras_combinadas_regra ON regras_combinadas(regra_id);
CREATE INDEX IF NOT EXISTS idx_regras_combinadas_campo ON regras_combinadas(campo);

