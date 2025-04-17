# 📘 OneFlow - Lançamentos Contábeis Automatizados

Sistema moderno e automatizado de lançamentos contábeis com importação de planilhas, regras de classificação e dashboards visuais integrados.

---

## 📦 Funcionalidades Principais

- ✅ Cadastro de empresas e grupos econômicos
- 📥 Importação de planilhas/extratos financeiros
- 🧠 Aplicação automática de regras (ignorar ou aceitar)
- 📊 Dashboards interativos com filtros por filial, competência e centro de custo
- 🔄 Aprovação manual de lançamentos pendentes
- 📂 Exportação para Excel e PDF

---

## 🧱 Estrutura do Sistema

**Tabelas:**
- `empresas`
- `grupos_economicos`
- `lancamentos`
- `lancamentos_importados`
- `regras_ignoradas`
- `regras_combinadas`

**Componentes:**
- `DashboardSimples`, `DashboardColorido`
- `ImportarPlanilhaComRegras`
- `TelaLancamentosRegistro`, `AprovarLancamentos`
- `CadastroEmpresa`, `CadastroGruposEconomicos`
- `CadastroRegrasCombinadas`, `CadastroRegrasTexto`, `ListagemRegrasCombinadas`
- `ConfiguracaoLayoutPlanilha`

---

## 🛠️ Como executar

1. Clone o repositório e instale as dependências:
```bash
npm install
npm run dev
```

2. Configure o `.env.local` com a URL e a chave do Supabase:
```bash
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
```

3. Crie as tabelas executando o SQL disponível em `sql/estrutura_banco.sql` diretamente no Supabase.

---

## 🌐 Rotas e Telas

| Caminho                        | Tela                                      |
|-------------------------------|-------------------------------------------|
| `/dashboard-simples`         | Dashboard com totais e tabela             |
| `/dashboard-colorido`        | Dashboard com gráficos interativos        |
| `/importar-planilha`         | Upload e regras automáticas               |
| `/revisar-importacoes`       | Conferência manual dos lançamentos        |
| `/aprovar-lancamentos`       | Aprovação final dos lançamentos           |
| `/cadastro-empresa`          | Cadastro de empresa                       |
| `/cadastro-grupos-economicos`| Cadastro de grupos econômicos             |
| `/cadastro-regras-texto`     | Cadastro rápido de regras simples         |
| `/regras/cadastro`           | Cadastro de regras compostas              |
| `/regras/listar`             | Edição e exclusão de regras               |
| `/configuracao-layout-planilha` | Mapeamento de colunas da planilha     |

---

## ✨ Observações
- Utilize o Supabase com a função `gen_random_uuid()` habilitada
- Regras podem ser compostas e combinadas com lógica `AND` ou `OR`
- Layout da planilha pode ser adaptado com base nas letras das colunas (A-Z)

---

Feito com 💼 e 🚀 para times contábeis de alta performance
