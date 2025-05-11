'use client';
import { Bar, Pie } from 'react-chartjs-2';
import { useEffect, useState } from 'react';

export default function DashboardColorido() {
  const [dados, setDados] = useState([]);

  useEffect(() => {
    const simulado = [
      { tipo: 'receita', valor: 1000, centro: 'Comercial' },
      { tipo: 'despesa', valor: 400, centro: 'Financeiro' },
      { tipo: 'despesa', valor: 200, centro: 'RH' },
      { tipo: 'receita', valor: 700, centro: 'Comercial' }
    ];
    setDados(simulado);
  }, []);

  const receitas = dados.filter(d => d.tipo === 'receita').reduce((s, r) => s + r.valor, 0);
  const despesas = dados.filter(d => d.tipo === 'despesa').reduce((s, r) => s + r.valor, 0);

  const porCentro = dados.reduce((acc, cur) => {
    acc[cur.centro] = (acc[cur.centro] || 0) + cur.valor;
    return acc;
  }, {});

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-indigo-700 mb-4">Dashboard Colorido</h1>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-white shadow p-4 rounded">
          <h2 className="font-semibold mb-2">Resumo</h2>
          <Bar data={{
            labels: ['Receitas', 'Despesas'],
            datasets: [{
              label: 'Totais',
              data: [receitas, despesas],
              backgroundColor: ['#10b981', '#ef4444']
            }]
          }} />
        </div>

        <div className="bg-white shadow p-4 rounded">
          <h2 className="font-semibold mb-2">Por Centro de Custo</h2>
          <Pie data={{
            labels: Object.keys(porCentro),
            datasets: [{
              data: Object.values(porCentro),
              backgroundColor: ['#3b82f6', '#f59e0b', '#10b981', '#6366f1']
            }]
          }} />
        </div>
      </div>
    </div>
  );
}
