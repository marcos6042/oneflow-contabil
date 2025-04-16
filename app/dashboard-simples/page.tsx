'use client';

import { useEffect, useRef, useState } from 'react';
import { FiltrosDashboard } from '@/components/FiltrosDashboard';
import { supabase } from '@/supabase/client';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import * as XLSX from 'xlsx';

export default function DashboardSimples() {
  const ref = useRef(null);
  const [dados, setDados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);

  const [filial, setFilial] = useState('Todas');
  const [competencia, setCompetencia] = useState('Todas');
  const [centroCusto, setCentroCusto] = useState('Todos');

  useEffect(() => {
    async function carregar() {
      let query = supabase.from('lancamentos').select('*');
      if (filial !== 'Todas') query = query.eq('filial', filial);
      if (competencia !== 'Todas') query = query.like('data', `%${competencia}%`);
      if (centroCusto !== 'Todos') query = query.eq('centro_custo', centroCusto);

      const { data, error } = await query;
      if (!error && data) setDados(data);
      if (error) setErro(error.message);
      setLoading(false);
    }
    carregar();
  }, [filial, competencia, centroCusto]);

  const exportarPDF = async () => {
    const canvas = await html2canvas(ref.current);
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'pt', 'a4');
    const width = pdf.internal.pageSize.getWidth();
    const height = canvas.height * width / canvas.width;
    pdf.addImage(imgData, 'PNG', 0, 0, width, height);
    pdf.save('dashboard-simples.pdf');
  };

  const exportarExcel = () => {
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(dados);
    XLSX.utils.book_append_sheet(wb, ws, 'Lançamentos');
    XLSX.writeFile(wb, 'dashboard-simples.xlsx');
  };

  const totalReceitas = dados.filter(d => d.tipo === 'receita').reduce((s, l) => s + Number(l.valor), 0);
  const totalDespesas = dados.filter(d => d.tipo === 'despesa').reduce((s, l) => s + Number(l.valor), 0);
  const totalLucro = totalReceitas - totalDespesas;

  return (
    <div className="p-6" ref={ref}>
      <h1 className="text-2xl font-bold mb-6">Dashboard Simples</h1>

      <FiltrosDashboard
        filial={filial}
        setFilial={setFilial}
        centroCusto={centroCusto}
        setCentroCusto={setCentroCusto}
        competencia={competencia}
        setCompetencia={setCompetencia}
        exportarPDF={exportarPDF}
        exportarExcel={exportarExcel}
      />

      {erro && <p className="text-red-600">Erro: {erro}</p>}
      {loading ? (
        <p className="text-gray-600">Carregando dados...</p>
      ) : (
        <>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-green-100 text-green-800 p-4 rounded-xl shadow">Receitas: R$ {totalReceitas.toLocaleString()}</div>
            <div className="bg-red-100 text-red-800 p-4 rounded-xl shadow">Despesas: R$ {totalDespesas.toLocaleString()}</div>
            <div className="bg-blue-100 text-blue-800 p-4 rounded-xl shadow">Lucro: R$ {totalLucro.toLocaleString()}</div>
            <div className="bg-gray-100 text-gray-800 p-4 rounded-xl shadow">Lançamentos: {dados.length}</div>
          </div>

          <h2 className="text-xl font-semibold mb-2">Lançamentos Detalhados</h2>
          <table className="w-full text-sm border">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-2 py-1">Data</th>
                <th className="border px-2 py-1">Descrição</th>
                <th className="border px-2 py-1">Tipo</th>
                <th className="border px-2 py-1">Valor</th>
                <th className="border px-2 py-1">Centro de Custo</th>
                <th className="border px-2 py-1">Filial</th>
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
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}
