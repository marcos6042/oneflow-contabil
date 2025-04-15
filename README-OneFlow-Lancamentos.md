
# OneFlow Lançamentos Contábeis

Sistema moderno, inteligente e automatizado para **geração de lançamentos contábeis** a partir de extratos financeiros, planilhas ou APIs bancárias, com foco em eficiência, conformidade e integração com múltiplas empresas e grupos econômicos.

## 🚀 Funcionalidades Principais

- Importação de planilhas e extratos com mapeamento configurável
- Regras de lançamento com base em trechos de texto, favorecido, descrição, etc.
- Interface moderna para revisar, aprovar e ajustar lançamentos
- Dashboard interativo com KPIs, gráficos e filtros dinâmicos
- Exportação de dados para PDF e Excel
- Integração com plano de contas, múltiplas empresas e SCPs

## 🧠 Estrutura do Sistema

### 1. Configuração e Cadastro
- Cadastro de empresas, grupos econômicos e SCPs
- Importação e manutenção do plano de contas por empresa
- Tela de configuração do layout da planilha (colunas A até AZ)

### 2. Importação Detalhada
- Visualização linha a linha das informações da planilha
- Seleção manual ou automática de débito e crédito
- Histórico customizável a partir de múltiplas colunas
- Confirmação individual do lançamento

### 3. Motor de Regras
- Regras configuráveis por palavra-chave, fornecedor ou tipo de transação
- Aplicação automática com sugestão de débito/crédito e histórico
- Interface para criação, listagem e exclusão de regras
- Aprendizado contínuo para reaplicação automática

### 4. Dashboards
- Gráficos interativos (barra, linha, pizza)
- Filtros por empresa, competência, centro de custo e conta
- KPIs de receita, despesa, lucro, total de lançamentos
- Exportação para PDF (jsPDF) e Excel (SheetJS)

## 🧱 Tecnologias Utilizadas

- **Frontend:** Next.js + Tailwind + Chart.js
- **Backend:** Supabase (PostgreSQL)
- **Exportação:** jsPDF, html2canvas, SheetJS (xlsx)
- **Armazenamento:** Supabase bucket ou AWS S3
- **OCR / PDF (futuramente):** Tesseract.js, pdf-lib
- **APIs:** Open Finance (Pluggy, Belvo, Banco Central - OAuth2)

## 📦 Estrutura de Pastas (src/app)

```
├── cadastro-empresa/
├── cadastro-grupos-economicos/
├── importar-planilha/
├── importar-planilha-detalhado/
├── configuracao-layout-planilha/
├── cadastro-regras-texto/
├── aprovar-lancamentos/
├── dashboard/
├── dashboard-colorido/
```

## 🛠️ Como Rodar Localmente

```bash
git clone https://github.com/seu-usuario/oneflow-contabil.git
cd oneflow-contabil
npm install
cp .env.local.example .env.local  # Configure com seus dados Supabase
npm run dev
```

## 🌐 Deploy no Vercel

1. Suba o repositório para o GitHub
2. Acesse [https://vercel.com](https://vercel.com) e importe o projeto
3. Defina as variáveis `NEXT_PUBLIC_SUPABASE_URL` e `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Clique em Deploy

---

## 📄 Licença

Distribuído sob licença comercial. Para uso privado e licenciamento, entre em contato com a equipe do projeto.

---

## 💼 Contato Comercial

- 📧 comercial@oneflow.com.br
- 🌐 https://oneflow.com.br
