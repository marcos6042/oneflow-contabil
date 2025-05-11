type FiltrosProps = {
  filial: string;
  setFilial: (value: string) => void;
  centroCusto: string;
  setCentroCusto: (value: string) => void;
  competencia: string;
  setCompetencia: (value: string) => void;
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
}: FiltrosProps) {
  return (
    <div className="flex flex-wrap gap-4 items-center mb-4">
      <label>Filial:</label>
      <select className="p-2 border rounded" value={filial} onChange={e => setFilial(e.target.value)}>
        <option>Todas</option>
        <option>Filial SP</option>
        <option>Filial MG</option>
      </select>
      <label>Centro de Custo:</label>
      <select className="p-2 border rounded" value={centroCusto} onChange={e => setCentroCusto(e.target.value)}>
        <option>Todos</option>
        <option>Administrativo</option>
        <option>Operacional</option>
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
  );
}
