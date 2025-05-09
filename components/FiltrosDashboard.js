export function FiltrosDashboard({ filial, setFilial, centroCusto, setCentroCusto, competencia, setCompetencia, exportarPDF, exportarExcel }) {
  return (
    <div className="flex flex-wrap gap-2">
      <input value={filial} onChange={(e) => setFilial(e.target.value)} placeholder="Filial" className="border p-2 rounded" />
      <input value={centroCusto} onChange={(e) => setCentroCusto(e.target.value)} placeholder="Centro de Custo" className="border p-2 rounded" />
      <input value={competencia} onChange={(e) => setCompetencia(e.target.value)} placeholder="Competência" className="border p-2 rounded" />
      <button onClick={exportarPDF} className="bg-blue-500 text-white px-3 py-1 rounded">Exportar PDF</button>
      <button onClick={exportarExcel} className="bg-green-500 text-white px-3 py-1 rounded">Exportar Excel</button>
    </div>
  );
}
