export function FiltrosDashboard({
  filial,
  setFilial,
  centroCusto,
  setCentroCusto,
  competencia,
  setCompetencia,
  exportarPDF,
  exportarExcel
}) {
  return (
    <div className="flex flex-wrap gap-4 items-center mb-4">
      <select value={filial} onChange={e => setFilial(e.target.value)} className="p-2 border rounded">
        <option value="Todas">Todas as Filiais</option>
        <option value="SP">Filial SP</option>
        <option value="MG">Filial MG</option>
      </select>
      <select value={centroCusto} onChange={e => setCentroCusto(e.target.value)} className="p-2 border rounded">
        <option value="Todos">Todos os Centros</option>
        <option value="Administrativo">Administrativo</option>
        <option value="Operacional">Operacional</option>
      </select>
      <select value={competencia} onChange={e => setCompetencia(e.target.value)} className="p-2 border rounded">
        <option value="Todas">Todas as Competências</option>
        <option value="2024-01">2024-01</option>
        <option value="2024-02">2024-02</option>
      </select>
      <button onClick={exportarPDF} className="bg-blue-600 text-white px-4 py-2 rounded">Exportar PDF</button>
      <button onClick={exportarExcel} className="bg-green-600 text-white px-4 py-2 rounded">Exportar Excel</button>
    </div>
  );
}
