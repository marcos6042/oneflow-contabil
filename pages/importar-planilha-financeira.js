import { useState } from 'react';
import Papa from 'papaparse';
import * as XLSX from 'xlsx';

export default function ImportarPlanilhaFinanceira() {
  const [dados, setDados] = useState([]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const nome = file.name.toLowerCase();

    if (nome.endsWith('.csv')) {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => setDados(results.data)
      });
    } else if (nome.endsWith('.xlsx')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const workbook = XLSX.read(event.target.result, { type: 'binary' });
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const json = XLSX.utils.sheet_to_json(sheet);
        setDados(json);
      };
      reader.readAsBinaryString(file);
    } else {
      alert('Formato não suportado. Use CSV ou XLSX.');
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-4">
      <h1 className="text-2xl font-bold text-purple-700">Importar Planilha Financeira</h1>
      <input type="file" accept=".csv,.xlsx" onChange={handleFileChange} className="p-2 border rounded bg-white" />
      <table className="w-full text-sm border mt-4">
        <thead className="bg-gray-100">
          <tr>{dados[0] && Object.keys(dados[0]).map((key) => <th key={key} className="border px-2 py-1">{key}</th>)}</tr>
        </thead>
        <tbody>
          {dados.map((linha, i) => (
            <tr key={i}>
              {Object.values(linha).map((valor, j) => (
                <td key={j} className="border px-2 py-1">{valor || '-'}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
