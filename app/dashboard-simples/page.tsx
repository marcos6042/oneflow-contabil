'use client'

import { useEffect, useState } from 'react';
import { supabase } from '@/supabase/client';

export function DashboardSimples() {
  const [filial, setFilial] = useState('Todas');
  const [dados, setDados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);
  const [competencia, setCompetencia] = useState('Todas');
  const [centroCusto, setCentroCusto] = useState('Todos');

  useEffect(() => {
    async function carregar() {
      let query = supabase.from('lancamentos').select('*');
      if (centroCusto !== 'Todos') query = query.eq('centro_custo', centroCusto);
      if (filial !== 'Todas') query = query.eq('filial', filial);
      if (competencia !== 'Todas') query = query.like('data', `%${competencia}%`);
      if (centroCusto !== 'Todos') query = query.eq('centro_custo', centroCusto);
      const { data, error } = await query;
      if (!error && data) setDados(data);
      setLoading(false);
    }
    carregar();
  }, []);

  const totalReceitas = dados.filter(d => d.tipo === 'receita').reduce((s, l) => s + Number(l.valor), 0);
  const totalDespesas = dados.filter(d => d.tipo === 'despesa').reduce((s, l) => s + Number(l.valor), 0);
  const totalLucro = totalReceitas - totalDespesas;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard Simples</h1>
      <div className="mb-4">
        <label className="font-medium mr-2">Filtrar por Filial:</label>
        <select
          className="p-2 border rounded"
          value={filial}
          onChange={(e) => setFilial(e.target.value)}
        >
          <option>Todas</option>
          <option>Filial SP</option>
          <option>Filial MG</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="font-medium mr-2">Centro de Custo:</label>
        <select
          className="p-2 border rounded"
          value={centroCusto}
          onChange={(e) => setCentroCusto(e.target.value)}
        >
          <option>Todos</option>
          {Array.from(new Set(dados.map(d => d.centro_custo).filter(Boolean))).map((c, i) => (
            <option key={i}>{c}</option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label className="font-medium mr-2">Filtrar por Competência:</label>
        <select
          className="p-2 border rounded"
          value={competencia}
          onChange={(e) => setCompetencia(e.target.value)}
        >
          <option>Todas</option>
          <option>2024-01</option>
          <option>2024-02</option>
          <option>2024-03</option>
          <option>2024-04</option>
          <option>2024-05</option>
        </select>
      </div>

      {loading ? <p className="text-gray-600">Carregando dados...</p> : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-green-100 text-green-800 p-4 rounded-xl shadow">Receitas: R$ {totalReceitas.toLocaleString()}</div>
          <div className="bg-red-100 text-red-800 p-4 rounded-xl shadow">Despesas: R$ {totalDespesas.toLocaleString()}</div>
          <div className="bg-blue-100 text-blue-800 p-4 rounded-xl shadow">Lucro: R$ {totalLucro.toLocaleString()}</div>
          <div className="bg-gray-100 text-gray-800 p-4 rounded-xl shadow">Lançamentos: {dados.length}</div>
        </div>
      )}
    </div>
  );

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
}
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

export function DashboardColorido() {
  const [centroCusto, setCentroCusto] = useState('Todos');
  const [filial, setFilial] = useState('Todas');
  const ref = useRef(null);
  const [dados, setDados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    async function carregarDados() {
      let query = supabase.from('lancamentos').select('*');
      if (filial !== 'Todas') query = query.eq('filial', filial);

      const { data, error } = await query;
      if (error) setErro(error.message);
      if (data) setDados(data);
      setLoading(false);
    }

    carregarDados();
  }, [filial]);

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
    const ws = XLSX.utils.aoa_to_sheet([
      ['Receitas', 'Despesas', 'Lucro'],
      [120000, 78500, 41500],
      [],
      ['Administrativo', 'Operacional', 'Marketing', 'TI'],
      [28000, 32000, 11000, 7500],
      [],
      ['Jan', 'Fev', 'Mar', 'Abr'],
      [120000, 132000, 118000, 140000]
    ]);
    XLSX.utils.book_append_sheet(wb, ws, 'Dashboard');
    XLSX.writeFile(wb, 'dashboard.xlsx');
  };

  const totalReceitas = dados.filter(d => d.tipo === 'receita').reduce((s, l) => s + Number(l.valor), 0);
  const totalDespesas = dados.filter(d => d.tipo === 'despesa').reduce((s, l) => s + Number(l.valor), 0);
  const dadosBarra = {
    labels: ['Receitas', 'Despesas', 'Lucro'],
    datasets: [
      {
        label: `Resumo (${filial})`,
        data: [totalReceitas, totalDespesas, totalReceitas - totalDespesas],
        backgroundColor: ['#10b981', '#ef4444', '#3b82f6']
      }
    ]
  };

  const porCentro = dados.reduce((acc, cur) => {
    if (!acc[cur.centro_custo]) acc[cur.centro_custo] = 0;
    acc[cur.centro_custo] += Number(cur.valor);
    return acc;
  }, {});
  const dadosPizza = {
    labels: Object.keys(porCentro),
    datasets: [
      {
        label: 'Centro de Custo',
        data: Object.values(porCentro),
        backgroundColor: ['#6366f1', '#f59e0b', '#ef4444', '#10b981', '#3b82f6', '#9333ea']
      }
    ]
  };

  const meses = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
  const receitasPorMes = meses.map(m => {
    return dados.filter(d => d.tipo === 'receita' && d.data?.slice(5,7) === m)
                .reduce((s, l) => s + Number(l.valor), 0);
  });
  const dadosLinha = {
    labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
    datasets: [
      {
        label: 'Evolução Receita',
        data: receitasPorMes,
        fill: false,
        borderColor: '#2563eb',
        tension: 0.3
      }
    ]
  };

  return (
    <div className="p-6 bg-slate-50 min-h-screen" ref={ref}>
      <h1 className="text-3xl font-bold mb-4">Dashboard Interativo</h1>

      <nav className="flex flex-wrap gap-4 text-sm text-blue-700 mb-6">
        <Link href="/">🏠 Início</Link>
        <Link href="/cadastro-empresa">Cadastro Empresa</Link>
        <Link href="/cadastro-grupos-economicos">Grupos Econômicos</Link>
        <Link href="/configuracao-layout-planilha">Configurar Layout</Link>
        <Link href="/cadastro-regras-texto">Regras Texto</Link>
        <Link href="/aprovar-lancamentos">Aprovar Lançamentos</Link>
        <Link href="/dashboard-simples">Dashboard Simples</Link>
      </nav>

      <div className="mb-6 flex flex-wrap gap-4 items-center">
        <label className="font-medium">Filtrar por Filial:</label>
        <select
          className="p-2 border rounded"
          value={filial}
          onChange={(e) => setFilial(e.target.value)}
        >
          <option>Todas</option>
          <option>Filial SP</option>
          <option>Filial MG</option>
        </select>
        <label className=\"font-medium\">Centro de Custo:</label>
        <select
          className=\"p-2 border rounded\"
          value={centroCusto}
          onChange={(e) => setCentroCusto(e.target.value)}
        >
          <option>Todos</option>
          {Array.from(new Set(dados.map(d => d.centro_custo).filter(Boolean))).map((c, i) => (
            <option key={i}>{c}</option>
          ))}
        </select>
        <button onClick={exportarPDF} className="bg-blue-600 text-white px-4 py-2 rounded">Exportar PDF</button>
        <button onClick={exportarExcel} className="bg-green-600 text-white px-4 py-2 rounded">Exportar Excel</button>
      </div>

      {erro && <p className="text-red-500 mb-4">Erro: {erro}</p>}
      {loading ? (
        <p className="text-gray-600">Carregando dados...</p>
      ) : (
      $1
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Despesas por Centro de Custo</h3>
          <Pie data={{
            labels: Object.keys(porCentro).filter(k => dados.find(d => d.centro_custo === k && d.tipo === 'despesa')),
            datasets: [
              {
                label: 'Despesas por Centro de Custo',
                data: Object.keys(porCentro)
                  .filter(k => dados.find(d => d.centro_custo === k && d.tipo === 'despesa'))
                  .map(k => dados
                    .filter(d => d.centro_custo === k && d.tipo === 'despesa')
                    .reduce((s, d) => s + Number(d.valor), 0)),
                backgroundColor: ['#f87171', '#fbbf24', '#34d399', '#60a5fa', '#a78bfa']
              }
            ]
          }} />
        </div>
      
    </div>
  );
}
