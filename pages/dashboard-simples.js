'use client';
import { useState, useEffect } from 'react';

export default function DashboardSimples() {
  const [dados, setDados] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function carregar() {
      // substitua por chamada ao Supabase
      const fake = [
        { data: '2024-01-01', tipo: 'receita', valor: 1500 },
        { data: '2024-01-10', tipo: 'despesa', valor: 900 },
      ];
      setDados(fake);
      setLoading(false);
    }
    carregar();
  }, []);

  const totalReceita = dados.filter(d => d.tipo === 'receita').reduce((s, r) => s + r.valor, 0);
  const totalDespesa = dados.filter(d => d.tipo === 'despesa').reduce((s, r) => s + r.valor, 0);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-green-700">Dashboard Simples</h1>
      {loading ? (
        <p>Carregando...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-green-100 p-4 rounded shadow">Receita: R$ {totalReceita.toFixed(2)}</div>
          <div className="bg-red-100 p-4 rounded shadow">Despesa: R$ {totalDespesa.toFixed(2)}</div>
          <div className="bg-blue-100 p-4 rounded shadow">Lucro: R$ {(totalReceita - totalDespesa).toFixed(2)}</div>
        </div>
      )}
    </div>
  );
}
