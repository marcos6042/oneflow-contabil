'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/supabase/client';

export default function TelaLancamentosRegistro() {
  const [dados, setDados] = useState<any[]>([]);

  useEffect(() => {
    async function carregar() {
      const { data, error } = await supabase
        .from('lancamentos_importados')
        .select('*')
        .eq('status', 'pendente')
        .order('data');
      if (!error && data) setDados(data);
    }
    carregar();
  }, []);

  const confirmarLancamento = async (lancamento: any) => {
    await supabase.from('lancamentos').insert({
      empresa_id: lancamento.empresa_id,
      tipo: lancamento.tipo,
      valor: lancamento.valor,
      centro_custo: lancamento.centro_custo,
      filial: lancamento.filial,
      data: lancamento.data,
      descricao: lancamento.descricao,
      conta_debito: lancamento.conta_debito,
      conta_credito: lancamento.conta_credito,
      status: 'confirmado'
    });
    await supabase.from('lancamentos_importados').delete().eq('id', lancamento.id);
    setDados(prev => prev.filter(d => d.id !== lancamento.id));
  };

  const ignorarLancamento = async (lancamento: any) => {
    await supabase.from('lancamentos_importados').update({ status: 'ignorado' }).eq('id', lancamento.id);
    setDados(prev => prev.filter(d => d.id !== lancamento.id));
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Conferência de Lançamentos Importados</h1>
      <table className="w-full text-sm border">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-2 py-1">Data</th>
            <th className="border px-2 py-1">Descrição</th>
            <th className="border px-2 py-1">Tipo</th>
            <th className="border px-2 py-1">Valor</th>
            <th className="border px-2 py-1">Centro de Custo</th>
            <th className="border px-2 py-1">Filial</th>
            <th className="border px-2 py-1">Ação</th>
          </tr>
        </thead>
        <tbody>
          {dados.map((l, i) => (
            <tr key={i} className="text-center">
              <td className="border px-2 py-1">{l.data}</td>
              <td className="border px-2 py-1">{l.descricao}</td>
              <td className="border px-2 py-1">{l.tipo}</td>
              <td className="border px-2 py-1">R$ {Number(l.valor).toFixed(2)}</td>
              <td className="border px-2 py-1">{l.centro_custo}</td>
              <td className="border px-2 py-1">{l.filial}</td>
              <td className="border px-2 py-1">
                <div className="flex gap-2 justify-center">
                  <button
                    onClick={() => confirmarLancamento(l)}
                    className="bg-green-600 text-white px-2 py-1 rounded"
                  >Confirmar</button>
                  <button
                    onClick={() => ignorarLancamento(l)}
                    className="bg-red-600 text-white px-2 py-1 rounded"
                  >Ignorar</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
