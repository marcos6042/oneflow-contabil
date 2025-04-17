'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/supabase/client';

export default function ListagemRegrasCombinadas() {
  const [regras, setRegras] = useState<any[]>([]);

  useEffect(() => {
    async function carregar() {
      const { data: regras, error } = await supabase.from('regras_ignoradas').select('*').order('criado_em');
      if (!error && regras) setRegras(regras);
    }
    carregar();
  }, []);

  const excluirRegra = async (id: string) => {
    if (confirm('Deseja realmente excluir esta regra?')) {
      await supabase.from('regras_ignoradas').delete().eq('id', id);
      setRegras(prev => prev.filter(r => r.id !== id));
    }
  };

  const atualizarCampo = async (id: string, campo: string, valor: any) => {
    await supabase.from('regras_ignoradas').update({ [campo]: valor }).eq('id', id);
    setRegras(prev => prev.map(r => r.id === id ? { ...r, [campo]: valor } : r));
  };

  return (
    <div className="p-6 max-w-5xl">
      <h1 className="text-2xl font-bold mb-4">Regras de Ignorar ou Aceitar</h1>

      <table className="w-full border text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-2 py-1">Empresa</th>
            <th className="border px-2 py-1">Tipo</th>
            <th className="border px-2 py-1">Combinação</th>
            <th className="border px-2 py-1">Status</th>
            <th className="border px-2 py-1">Criado em</th>
            <th className="border px-2 py-1">Ação</th>
          </tr>
        </thead>
        <tbody>
          {regras.map((r, i) => (
            <tr key={i} className="text-center">
              <td className="border px-2 py-1">{r.empresa_id || '-'}</td>
              <td className="border px-2 py-1">
                <select value={r.tipo_regra} onChange={e => atualizarCampo(r.id, 'tipo_regra', e.target.value)} className="border p-1 rounded">
                  <option value="ignorar">ignorar</option>
                  <option value="aceitar">aceitar</option>
                </select>
              </td>
              <td className="border px-2 py-1">
                <select value={r.grupo_condicao} onChange={e => atualizarCampo(r.id, 'grupo_condicao', e.target.value)} className="border p-1 rounded">
                  <option value="AND">AND</option>
                  <option value="OR">OR</option>
                </select>
              </td>
              <td className="border px-2 py-1">
                <button
                  className={`px-2 py-1 rounded ${r.ativa ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-700'}`}
                  onClick={() => atualizarCampo(r.id, 'ativa', !r.ativa)}
                >{r.ativa ? 'Ativa' : 'Inativa'}</button>
              </td>
              <td className="border px-2 py-1">{new Date(r.criado_em).toLocaleString()}</td>
              <td className="border px-2 py-1">
                <button onClick={() => excluirRegra(r.id)} className="bg-red-600 text-white px-3 py-1 rounded">Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
