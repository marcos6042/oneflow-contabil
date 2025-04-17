# OneFlow - Sistema de Lançamentos Contábeis com Regras

OneFlow é um sistema moderno, intuitivo e automatizado para controle de lançamentos contábeis. Permite importar planilhas ou extratos, aplicar regras personalizadas para classificação e gerar dashboards gerenciais com filtros por filial, competência e centro de custo.

## 🔧 Tecnologias utilizadas
- Next.js 13+ (App Router)
- Supabase (como backend e banco de dados)
- Tailwind CSS
- React Chart.js 2 + Chart.js
- XLSX para leitura e exportação de planilhas
- jsPDF + html2canvas para exportação em PDF

## 📦 Instalação

```bash
npm install
npm run dev
```

## ⚙️ Configuração do Supabase
1. Crie um projeto no [https://supabase.com](https://supabase.com)
2. Copie a `anon` key e URL para o arquivo `.env.local`
```bash
NEXT_PUBLIC_SUPABASE_URL=https://<seu-projeto>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=...chave...
```
3. Execute o script SQL disponível em `sql/estrutura_banco.sql`

## 📁 Estrutura de Diretórios
```
app/
  └── dashboard-simples/       → Dashboard com tabela
  └── dashboard-colorido/      → Dashboard com gráficos
  └── importar-planilha/       → Upload e processamento com regras
  └── revisar-importacoes/     → Conferência dos lançamentos pendentes
  └── regras/
      ├── cadastro/            → Cadastro de regras compostas
      └── listar/              → Listagem, edição e exclusão de regras

components/
  ├── FiltrosDashboard.tsx
  ├── ImportarPlanilhaComRegras.tsx
  ├── TelaLancamentosRegistro.tsx
  ├── DashboardSimples.tsx
  ├── DashboardColorido.tsx
  ├── CadastroRegrasCombinadas.tsx
  └── ListagemRegrasCombinadas.tsx

utils/
  └── processa_importacao_com_regras.ts
```

## ✅ Funcionalidades
- Importação de planilhas Excel ou CSV
- Aplicação de regras automáticas: ignorar ou aceitar
- Cadastro de regras compostas com múltiplos critérios (campo, condição, valor)
- Dashboards com filtros dinâmicos e exportação
- Conferência manual de lançamentos pendentes

## 📊 Dashboards
- Resumo financeiro com gráficos
- Evolução mensal das receitas
- Distribuição por centro de custo

## ✍️ Licença
Este projeto é de uso interno. Adaptável para diferentes grupos empresariais.
