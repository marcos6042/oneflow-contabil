'use client'

import { useRef, useState, useEffect } from 'react';
import { Bar, Pie, Line } from 'react-chartjs-2';
import Link from 'next/link';
import html2canvas from 'html2canvas';
import { supabase } from '@/supabase/client';
import jsPDF from 'jspdf';
import * as XLSX from 'xlsx';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  LineElement,
  PointElement,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  LineElement,
  PointElement,
  Tooltip,
  Legend
);

import { FiltrosDashboard } from '@/components/FiltrosDashboard';

export function DashboardColorido() {
  const [centroCusto, setCentroCusto] = useState('Todos');
  const [filial, setFilial] = useState('Todas');
  const [competencia, setCompetencia] = useState('Todas');
  const ref = useRef(null);
  const [dados, setDados] = useState([]);
  const [competencia, setCompetencia] = useState('Todas');
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    async function carregarDados() {
      let query = supabase.from('lancamentos').select('*');
      if (filial !== 'Todas') query = query.eq('filial', filial);
      if (centroCusto !== 'Todos') query = query.eq('centro_custo', centroCusto);
      if (competencia !== 'Todas') query = query.like('data', `%${competencia}%`);

      const { data, error } = await query;
      if (error) setErro(error.message);
      if (data) setDados(data);
      setLoading(false);
    }

    carregarDados();
  }, [filial, centroCusto, competencia]);

  const exportarPDF = async () => {
    const canvas = await html2canvas(ref.current);
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'pt', 'a4');
    const width = pdf.internal.pageSize.getWidth();
    const height = canvas.height * width / canvas.width;
    pdf.addImage(imgData, 'PNG', 0, 0, width, height);
    pdf.save('dashboard.pdf');
  };

  const exportarExcel = () => {
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(dados);
    XLSX.utils.book_append_sheet(wb, ws, 'Lançamentos');
    XLSX.writeFile(wb, 'dashboard.xlsx');
  };

  const totalReceitas = dados.filter(d => d.tipo === 'receita').reduce((s, l) => s + Number(l.valor), 0);
  const totalDespesas = dados.filter(d => d.tipo === 'despesa').reduce((s, l) => s + Number(l.valor), 0);
  const porCentro = dados.reduce((acc, cur) => {
    if (!acc[cur.centro_custo]) acc[cur.centro_custo] = 0;
    acc[cur.centro_custo] += Number(cur.valor);
    return acc;
  }, {});

  const meses = ['01','02','03','04','05','06','07','08','09','10','11','12'];
  const receitasPorMes = meses.map(m => dados.filter(d => d.tipo === 'receita' && d.data?.slice(5,7) === m).reduce((s, l) => s + Number(l.valor), 0));

  return (
    <div className="p-6 bg-slate-50 min-h-screen" ref={ref}>
      <h1 className="text-3xl font-bold mb-4">Dashboard Interativo</h1>
      <nav className="flex flex-wrap gap-4 text-sm text-blue-700 mb-6">
        <Link href="/">🏠 Início</Link>
        <Link href="/dashboard-simples">Dashboard Simples</Link>
      </nav>

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

      {erro && <p className="text-red-500 mb-4">Erro: {erro}</p>}
      {loading ? (
        <p className="text-gray-600">Carregando dados...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-2">Resumo Geral</h3>
            <Bar data={{
              labels: ['Receitas', 'Despesas', 'Lucro'],
              datasets: [{
                label: `Totais (${filial})`,
                data: [totalReceitas, totalDespesas, totalReceitas - totalDespesas],
                backgroundColor: ['#10b981', '#ef4444', '#3b82f6']
              }]
            }} />
          </div>

          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-2">Distribuição por Centro de Custo</h3>
            <Pie data={{
              labels: Object.keys(porCentro),
              datasets: [{
                label: 'Centro de Custo',
                data: Object.values(porCentro),
                backgroundColor: ['#6366f1', '#f59e0b', '#ef4444', '#10b981', '#3b82f6', '#9333ea']
              }]
            }} />
          </div>

          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-2">Evolução da Receita</h3>
            <Line data={{
              labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
              datasets: [{
                label: 'Receitas Mensais',
                data: receitasPorMes,
                borderColor: '#2563eb',
                tension: 0.3,
                fill: false
              }]
            }} />
          </div>

          <div className="bg-white p-4 rounded-lg shadow col-span-1 xl:col-span-3">
            <h3 className="text-lg font-semibold mb-2">Despesas por Centro de Custo</h3>
            <Pie data={{
              labels: Object.keys(porCentro).filter(k => dados.find(d => d.centro_custo === k && d.tipo === 'despesa')),
              datasets: [{
                label: 'Despesas por Centro',
                data: Object.keys(porCentro)
                  .filter(k => dados.find(d => d.centro_custo === k && d.tipo === 'despesa'))
                  .map(k => dados
                    .filter(d => d.centro_custo === k && d.tipo === 'despesa')
                    .reduce((s, d) => s + Number(d.valor), 0)),
                backgroundColor: ['#f87171', '#fbbf24', '#34d399', '#60a5fa', '#a78bfa']
              }]
            }} />
          </div>
        </div>

        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-2">Lançamentos Detalhados</h3>
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
        </div>
      </div>
    )}
  </div>
);
    </div>
  );
}
