'use client'

export function Dashboard() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard Simples</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-green-100 text-green-800 p-4 rounded-xl shadow">Receitas: R$ 120.000,00</div>
        <div className="bg-red-100 text-red-800 p-4 rounded-xl shadow">Despesas: R$ 78.500,00</div>
        <div className="bg-blue-100 text-blue-800 p-4 rounded-xl shadow">Lucro: R$ 41.500,00</div>
        <div className="bg-gray-100 text-gray-800 p-4 rounded-xl shadow">Lançamentos: 327</div>
      </div>
      <p>🔍 Gráficos e filtros disponíveis na versão completa do dashboard.</p>
    </div>
  )
}
