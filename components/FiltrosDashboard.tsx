'use client';

interface Props {
  filial: string;
  setFilial: (val: string) => void;
  centroCusto: string;
  setCentroCusto: (val: string) => void;
  competencia: string;
  setCompetencia: (val: string) => void;
  exportarPDF: () => void;
  exportarExcel: () => void;
}

export function FiltrosDashboard({
  filial, setFilial,
  centroCusto, setCentroCusto,
  competencia, setCompetencia,
  exportarPDF, exportarExcel
}: Props) {
  return (
    <div className="mb-6 flex flex-wrap gap-4 items-center">
      <label className="font-medium">Filial:</label>
      <select className="p-2 border rounded" value={filial} onChange={e => setFilial(e.target.value)}>
        <option>Todas</option>
        <option>Filial SP</option>
        <option>Filial MG</option>
      </select>

      <label className="font-medium">Centro de Custo:</label>
      <select className="p-2 border rounded" value={centroCusto} onChange={e => setCentroCusto(e.target.value)}>
        <option>Todos</option>
      </select>

      <label className="font-medium">Competência:</label>
      <select className="p-2 border rounded" value={competencia} onChange={e => setCompetencia(e.target.value)}>
        <option>Todas</option>
        <option>2024-01</option>
        <option>2024-02</option>
        <option>2024-03</option>
        <option>2024-04</option>
        <option>2024-05</option>
      </select>

      <button onClick={exportarPDF} className="bg-blue-600 text-white px-4 py-2 rounded">Exportar PDF</button>
      <button onClick={exportarExcel} className="bg-green-600 text-white px-4 py-2 rounded">Exportar Excel</button>
    </div>
  );
}
