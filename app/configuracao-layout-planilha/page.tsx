'use client';
import type { LancamentoImportado } from '@/types/supabase';
import { useState } from 'react';

export default function Page() {
  const [colunas, setColunas] = useState([
    { campo: 'data', letra: '' },
    { campo: 'descricao', letra: '' },
    { campo: 'tipo', letra: '' },
    { campo: 'valor', letra: '' },
    { campo: 'centro_custo', letra: '' },
    { campo: 'filial', letra: '' },
    { campo: 'banco', letra: '' },
    { campo: 'conta_debito', letra: '' },
    { campo: 'conta_credito', letra: '' },
    { campo: 'observacao', letra: '' }
  ]);

  const atualizarColuna = (index: number, letra: string) => {
    const atualizadas = [...colunas];
    atualizadas[index].letra = letra.toUpperCase();
    setColunas(atualizadas);
  };

  const salvarLayout = () => {
    alert('Layout salvo (simulado). Integre com Supabase se desejar persistir.');
  };

  return (
    <div className="p-6 max-w-3xl">
      <h1 className="text-2xl font-bold mb-4">Configuração de Layout da Planilha</h1>
      <table className="w-full border text-sm mb-4">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-2 py-1">Campo</th>
            <th className="border px-2 py-1">Coluna (letra)</th>
          </tr>
        </thead>
        <tbody>
          {colunas.map((c, i) => (
            <tr key={i}>
              <td className="border px-2 py-1">{c.campo}</td>
              <td className="border px-2 py-1">
                <input
                  value={c.letra}
                  onChange={e => atualizarColuna(i, e.target.value)}
                  className="border p-1 rounded w-full"
                  placeholder="Ex: A, B, C..."
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={salvarLayout} className="bg-blue-600 text-white px-4 py-2 rounded">
        Salvar Layout
      </button>
    </div>
  );
}
