import React from 'react';

type Props = {
  filial: string;
  setFilial: (value: string) => void;
  centroCusto: string;
  setCentroCusto: (value: string) => void;
  competencia: string;
  setCompetencia: (value: string) => void;
  exportarPDF: () => void;
  exportarExcel: () => void;
};

export const FiltrosDashboard: React.FC<Props> = ({
  filial,
  setFilial,
  centroCusto,
  setCentroCusto,
  competencia,
  setCompetencia,
  exportarPDF,
  exportarExcel,
}) => {
  return (
    <div className="flex flex-wrap gap-4 items-center mb-6">
      <div>
        <label className="block text-sm font-medium">Filial</label>
        <select
          className="border p-2 rounded w-40"
          value={filial}
          onChange={(e) => setFilial(e.target.value)}
        >
          <option>Todas</option>
          <option>Filial SP</option>
          <option>Filial MG</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium">Centro de Custo</label>
        <select
          className="border p-2 rounded w-40"
          value={centroCusto}
          onChange={(e) => setCentroCusto(e.target.value)}
        >
          <option>Todos</option>
          <option>Financeiro</option>
          <option>Administrativo</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium">Competência</label>
        <select
          className="border p-2 rounded w-40"
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

      <button
        onClick={exportarPDF}
        className="bg-blue-600 text-white px-4 py-2 rounded mt-5"
      >
        Exportar PDF
      </button>

      <button
        onClick={exportarExcel}
        className="bg-green-600 text-white px-4 py-2 rounded mt-5"
      >
        Exportar Excel
      </button>
    </div>
  );
};
