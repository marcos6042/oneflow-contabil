import { useEffect, useState } from 'react';
import { supabase } from '../supabase/client';

export default function Dashboard() {
  const [lancamentos, setLancamentos] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const { data, error } = await supabase.from('lancamentos').select('*');
      if (!error) setLancamentos(data);
    }
    fetchData();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Dashboard Lançamentos</h1>
      <table className="w-full border">
        <thead>
          <tr>
            <th className="border px-2 py-1">Data</th>
            <th className="border px-2 py-1">Histórico</th>
            <th className="border px-2 py-1">Valor</th>
          </tr>
        </thead>
        <tbody>
          {lancamentos.map((lancamento) => (
            <tr key={lancamento.id}>
              <td className="border px-2 py-1">{lancamento.data}</td>
              <td className="border px-2 py-1">{lancamento.historico}</td>
              <td className="border px-2 py-1">R$ {lancamento.valor}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
