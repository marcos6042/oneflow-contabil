'use client'

import { useRef, useState } from 'react';
import { Bar, Pie, Line } from 'react-chartjs-2';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

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

export default function DashboardColorido() {
  const [empresa, setEmpresa] = useState('Rodoxisto Transportes');
  const refDashboard = useRef(null);

  const dadosBarra = {
    labels: ['Receitas', 'Despesas', 'Lucro'],
    datasets: [{
      label: 'Competência 01/2025',
      data: [120000, 78500, 41500],
      backgroundColor: ['#10b981', '#ef4444', '#3b82f6']
    }]
  };

  const dadosPizza = {
    labels: ['Administrativo', 'Operacional', 'Marketing', 'TI'],
    datasets: [{
      label: 'Centro de Custo',
      data: [28000, 32000, 11000, 7500],
      backgroundColor: ['#6366f1', '#f59e0b', '#ef4444', '#10b981']
    }]
  };

  const dadosLinha = {
    labels: ['Jan', 'Fev', 'Mar', 'Abr'],
    datasets: [{
      label: 'Evolução Receita',
      data: [120000, 132000, 118000, 140000],
      fill: false,
      borderColor: '#2563eb',
      tension: 0.3
    }]
  };

  const exportarPDF = async () => {
    const canvas = await html2canvas(refDashboard.current);
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'pt', 'a4');
    const width = pdf.internal.pageSize.getWidth();
    const height = canvas.height * width / canvas.width;
    pdf.addImage(imgData, 'PNG', 0, 0, width, height);
    pdf.save('dashboard.pdf');
  };

  const exportarExcel = () => {
    const wb = XLSX.utils.book_new();
    const dados = [
      ['Receitas', 'Despesas', 'Lucro'],
      [120000, 78500, 41500],
      [],
      ['Administrativo', 'Operacional', 'Marketing', 'TI'],
      [28000, 32000, 11000, 7500],
      [],
      ['Jan', 'Fev', 'Mar', 'Abr'],
      [120000, 132000, 118000, 140000]
    ];
    const ws = XLSX.utils.aoa_to_sheet(dados);
    XLSX.utils.book_append_sheet(wb, ws, 'Dashboard');
    XLSX.writeFile(wb, 'dashboard.xlsx');
  };

  return (
    <div className="p-6 bg-slate-50 min-h-screen" ref={refDashboard}>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard Financeiro</h1>

      <div className="mb-4">
        <label className="mr-2 font-medium text-gray-700">Empresa:</label>
        <select
          className="p-2 border rounded"
          value={empresa}
          onChange={(e) => setEmpresa(e.target.value)}
        >
          <option>Rodoxisto Transportes</option>
          <option>RDX Logística</option>
        </select>
      </div>

      <div className="mb-6 flex gap-4">
        <button onClick={exportarPDF} className="bg-blue-600 text-white px-4 py-2 rounded">Exportar PDF</button>
        <button onClick={exportarExcel} className="bg-green-600 text-white px-4 py-2 rounded">Exportar Excel</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
        <div className="bg-gradient-to-r from-blue-500 to-blue-700 text-white p-4 rounded-xl shadow">
          <p className="text-sm">Total Receitas</p>
          <h2 className="text-2xl font-bold">R$ 120.000,00</h2>
        </div>
        <div className="bg-gradient-to-r from-red-500 to-red-600 text-white p-4 rounded-xl shadow">
          <p className="text-sm">Total Despesas</p>
          <h2 className="text-2xl font-bold">R$ 78.500,00</h2>
        </div>
        <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-4 rounded-xl shadow">
          <p className="text-sm">Saldo Operacional</p>
          <h2 className="text-2xl font-bold">R$ 41.500,00</h2>
        </div>
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-4 rounded-xl shadow">
          <p className="text-sm">Lançamentos</p>
          <h2 className="text-2xl font-bold">327</h2>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Resumo por Tipo de Conta</h3>
          <Bar data={dadosBarra} />
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Distribuição por Centro de Custo</h3>
          <Pie data={dadosPizza} />
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Evolução da Receita</h3>
          <Line data={dadosLinha} />
        </div>
      </div>
    </div>
  );
}
