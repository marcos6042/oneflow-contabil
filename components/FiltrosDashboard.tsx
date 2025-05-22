'use client';
import React from 'react';

type Props = {
  filial: string;
  setFilial: (valor: string) => void;
  centroCusto: string;
  setCentroCusto: (valor: string) => void;
  competencia: string;
  setCompetencia: (valor: string) => void;
  exportarPDF: () => void;
  exportarExcel: () => void;
};

export function FiltrosDashboard({
  filial,
  setFilial,
  centroCusto,
  setCentroCusto,
  competencia,
  setCompetencia,
  exportarPDF,
  exportarExcel,
}: Props) {
  return (
    <div className="flex flex-wrap gap-4 items-center mb-6">
      <div>
        <label className="block text-sm font-medium">Filial</label>
        <select
          value={filial}
          onChange={(e) => setFilial(e.target.value)}
          className="border p-2 rounded"
        >
          <option>Todas</option>
          <option>Filial SP</option>
          <option>Filial MG</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium">Centro de Custo</label>
        <select
          value={centroCusto}
          onChange={(e) => setCentroCusto(e.target.value)}
          className="border p-2 rounded"
        >
          <option>Todos</option>
          <option>Administrativo</option>
          <option>Operacional</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium">Competência</label>
        <select
          value={competencia}
          onChange={(e) => setCompetencia(e.target.value)}
          className="border p-2 rounded"
        >
          <option>Todas</option>
          <option>2024-01</option>
          <option>2024-02</option>
          <option>2024-03</option>
          <option>2024-04</option>
        </select>
      </div>

      <button
        className="bg-blue-600 text-white px-4 py-2 rounded"
        onClick={exportarPDF}
      >
        Exportar PDF
      </button>

      <button
        className="bg-green-600 text-white px-4 py-2 rounded"
        onClick={exportarExcel}
      >
        Exportar Excel
      </button>
    </div>
  );
}
