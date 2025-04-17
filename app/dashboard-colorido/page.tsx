'use client';

import { useEffect, useRef, useState } from 'react';
import { Bar, Pie, Line } from 'react-chartjs-2';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import * as XLSX from 'xlsx';
import { supabase } from '@/supabase/client';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, LineElement, PointElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, LineElement, PointElement, Tooltip, Legend);

export default function DashboardColorido() {
  const [filial, setFilial] = useState('Todas');
  const [centroCusto, setCentroCusto] = useState('Todos');
  const [competencia, setCompetencia] = useState('Todas');
  const [dados, setDados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);
  const ref = useRef(null);

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
    const pdf = new jsPDF('p', 'pt', 'a4');
    const width = pdf.internal.pageSize.getWidth();
    const height = canvas.height * width / canvas.width;
    pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, width, height);
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
    <div className="p-6 bg-white min-h-screen space-y-6" ref={ref}>
      <h1 className="text-3xl font-bold">Dashboard Financeiro</h1>

      <div className="flex flex-wrap gap-4 items-center">
        <label>Filial:</label>
        <select className="p-2 border rounded" value={filial} onChange={e => setFilial(e.target.value)}>
          <option>Todas</option>
          <option>Filial SP</option>
          <option>Filial MG</option>
        </select>
        <label>Centro de Custo:</label>
        <select className="p-2 border rounded" value={centroCusto} onChange={e => setCentroCusto(e.target.value)}>
          <option>Todos</option>
          {Array.from(new Set(dados.map(d => d.centro_custo).filter(Boolean))).map((c, i) => (
            <option key={i}>{c}</option>
          ))}
        </select>
        <label>Competência:</label>
        <select className="p-2 border rounded" value={competencia} onChange={e => setCompetencia(e.target.value)}>
          <option>Todas</option>
          <option>2024-01</option>
          <option>2024-02</option>
          <option>2024-03</option>
          <option>2024-04</option>
        </select>
        <button onClick={exportarPDF} className="bg-blue-600 text-white px-4 py-2 rounded">Exportar PDF</button>
        <button onClick={exportarExcel} className="bg-green-600 text-white px-4 py-2 rounded">Exportar Excel</button>
      </div>

      {loading ? <p>Carregando dados...</p> : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          <div className="bg-gray-100 p-4 rounded shadow">
            <h2 className="font-semibold mb-2">Resumo</h2>
            <Bar data={{
              labels: ['Receitas', 'Despesas', 'Lucro'],
              datasets: [{
                label: `Totais (${filial})`,
                data: [totalReceitas, totalDespesas, totalReceitas - totalDespesas],
                backgroundColor: ['#10b981', '#ef4444', '#3b82f6']
              }]
            }} />
          </div>

          <div className="bg-gray-100 p-4 rounded shadow">
            <h2 className="font-semibold mb-2">Distribuição por Centro de Custo</h2>
            <Pie data={{
              labels: Object.keys(porCentro),
              datasets: [{
                label: 'Centro de Custo',
                data: Object.values(porCentro),
                backgroundColor: ['#6366f1', '#f59e0b', '#ef4444', '#10b981']
              }]
            }} />
          </div>

          <div className="bg-gray-100 p-4 rounded shadow">
            <h2 className="font-semibold mb-2">Evolução da Receita</h2>
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
        </div>
      )}
    </div>
  );
}
