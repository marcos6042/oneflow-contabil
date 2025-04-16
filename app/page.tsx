'use client'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-indigo-900 text-white p-10 text-center">
      <h1 className="text-4xl font-bold mb-3">OneFlow Lançamentos Contábeis</h1>
      <p className="text-lg opacity-90 mb-10">Simplifique sua contabilidade com inteligência e automação</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {[
          { titulo: 'Cadastros', desc: 'Empresas, planos de contas, grupos econômicos' },
          { titulo: 'Importações', desc: 'Extratos, planilhas e configuração de layouts' },
          { titulo: 'Regras', desc: 'Criação de regras com base em texto ou favorecido' },
          { titulo: 'Lançamentos', desc: 'Aprovação, edição e exportação dos lançamentos' },
          { titulo: 'Relatórios', desc: 'Análise de movimentações e status de regras' },
          { titulo: 'Dashboards', desc: 'KPIs e gráficos interativos com filtros por empresa' }
        ].map((card, i) => (
          <div key={i} className="bg-white text-indigo-900 p-6 rounded-xl shadow hover:shadow-xl transition-all duration-300 cursor-pointer">
            <h3 className="text-xl font-semibold mb-2">{card.titulo}</h3>
            <p className="text-sm text-gray-700">{card.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
