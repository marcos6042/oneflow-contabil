'use client';
import type { LancamentoImportado, Empresa } from '@/types/supabase';
import { useState } from 'react';
import * as XLSX from 'xlsx';

export default function ImportarPlanilhaDetalhado() {
  const [linhas, setLinhas] = useState<any[]>([]);
  const [arquivo, setArquivo] = useState<File | null>(null);
  const [layout, setLayout] = useState({
    data: 'A', descricao: 'B', tipo: 'C', valor: 'D', centro_custo: 'E', filial: 'F', banco: 'G'
  });

  const handleImportar = async () => {
    if (!arquivo) return alert('Selecione o arquivo');
    const buffer = await arquivo.arrayBuffer();
    const wb = XLSX.read(buffer, { type: 'buffer' });
    const planilha = wb.Sheets[wb.SheetNames[0]];
    const json: any[] = XLSX.utils.sheet_to_json(planilha, { header: 1 });
    const convertLetraParaIndice = (letra: string) => letra.toUpperCase().charCodeAt(0) - 65;
    const dados = json.map((row, i) => ({
      linha: i + 1,
      data: row[convertLetraParaIndice(layout.data)] || '',
      descricao: row[convertLetraParaIndice(layout.descricao)] || '',
      tipo: row[convertLetraParaIndice(layout.tipo)] || '',
      valor: row[convertLetraParaIndice(layout.valor)] || '',
      centro_custo: row[convertLetraParaIndice(layout.centro_custo)] || '',
      filial: row[convertLetraParaIndice(layout.filial)] || '',
      banco: row[convertLetraParaIndice(layout.banco)] || ''
    })).filter(r => r.data);
    setLinhas(dados);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Importar Planilha Detalhado</h1>
      <input type="file" className="border p-2 rounded mb-4" onChange={e => setArquivo(e.target.files?.[0] || null)} />
      <button onClick={handleImportar} className="bg-blue-600 text-white px-4 py-2 rounded">Carregar Dados</button>

      {linhas.length > 0 && (
        <table className="w-full text-sm border mt-6">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-2 py-1">Linha</th>
              <th className="border px-2 py-1">Data</th>
              <th className="border px-2 py-1">Descrição</th>
              <th className="border px-2 py-1">Tipo</th>
              <th className="border px-2 py-1">Valor</th>
              <th className="border px-2 py-1">Centro Custo</th>
              <th className="border px-2 py-1">Filial</th>
              <th className="border px-2 py-1">Banco</th>
            </tr>
          </thead>
          <tbody>
            {linhas.map((l, i) => (
              <tr key={i} className="text-center">
                <td className="border px-2 py-1">{l.linha}</td>
                <td className="border px-2 py-1">{l.data}</td>
                <td className="border px-2 py-1">{l.descricao}</td>
                <td className="border px-2 py-1">{l.tipo}</td>
                <td className="border px-2 py-1">{l.valor}</td>
                <td className="border px-2 py-1">{l.centro_custo}</td>
                <td className="border px-2 py-1">{l.filial}</td>
                <td className="border px-2 py-1">{l.banco}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
