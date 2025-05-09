export function FiltrosDashboard({ filial, setFilial, centroCusto, setCentroCusto, competencia, setCompetencia, exportarPDF, exportarExcel }) {
  return (
    <div className="flex flex-wrap gap-2 mb-4">
      <input
        type="text"
        placeholder="Filial"
        value={filial}
        onChange={(e) => setFilial(e.target.value)}
        className="border p-2 rounded"
      />
      <input
        type="text"
        placeholder="Centro Custo"
        value={centroCusto}
        onChange={(e) => setCentroCusto(e.target.value)}
        className="border p-2 rounded"
      />
      <input
        type="text"
        placeholder="Competência"
        value={competencia}
        onChange={(e) => setCompetencia(e.target.value)}
        className="border p-2 rounded"
      />
      <button onClick={exportarPDF} className="bg-blue-600 text-white px-4 py-2 rounded">Exportar PDF</button>
      <button onClick={exportarExcel} className="bg-green-600 text-white px-4 py-2 rounded">Exportar Excel</button>
    </div>
  );
}
