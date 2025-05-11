export function FiltrosDashboard({ filial, setFilial, centroCusto, setCentroCusto, competencia, setCompetencia, exportarPDF, exportarExcel }) {
  return (
    <div className="flex flex-wrap gap-4 items-center mb-6">
      <div>
        <label className="block text-sm font-medium">Filial</label>
        <select className="border p-2 rounded" value={filial} onChange={(e) => setFilial(e.target.value)}>
          <option value="Todas">Todas</option>
          <option value="SP">Filial SP</option>
          <option value="MG">Filial MG</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium">Centro de Custo</label>
        <select className="border p-2 rounded" value={centroCusto} onChange={(e) => setCentroCusto(e.target.value)}>
          <option value="Todos">Todos</option>
          <option value="ADM">Administrativo</option>
          <option value="OPR">Operacional</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium">Competência</label>
        <select className="border p-2 rounded" value={competencia} onChange={(e) => setCompetencia(e.target.value)}>
          <option value="Todas">Todas</option>
          <option value="2024-01">2024-01</option>
          <option value="2024-02">2024-02</option>
          <option value="2024-03">2024-03</option>
          <option value="2024-04">2024-04</option>
        </select>
      </div>

      <div className="flex gap-2 mt-4 md:mt-6">
        <button onClick={exportarPDF} className="bg-blue-600 text-white px-4 py-2 rounded">Exportar PDF</button>
        <button onClick={exportarExcel} className="bg-green-600 text-white px-4 py-2 rounded">Exportar Excel</button>
      </div>
    </div>
  );
}
