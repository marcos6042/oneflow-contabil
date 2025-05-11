import { useState } from 'react';
import * as XLSX from 'xlsx';

export default function ImportarPlanilha() {
  const [registros, setRegistros] = useState([]);
  const [colunas, setColunas] = useState([]);

  function handleArquivo(e) {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (evt) => {
      const data = evt.target.result;
      const workbook = XLSX.read(data, { type: 'binary' });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const json = XLSX.utils.sheet_to_json(sheet);
      setRegistros(json);
      setColunas(Object.keys(json[0] || {}));
    };

    reader.readAsBinaryString(file);
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold text-purple-700 mb-4">Importar Planilha Financeira</h1>
      <input type="file" accept=".xlsx,.csv" onChange={handleArquivo} className="border p-2 mb-4 rounded bg-white" />

      {registros.length > 0 && (
        <table className="w-full text-sm border bg-white rounded shadow mt-4">
          <thead className="bg-gray-100">
            <tr>
              {colunas.map((c, i) => (
                <th key={i} className="border px-2 py-1">{c}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {registros.map((row, i) => (
              <tr key={i}>
                {colunas.map((c, j) => (
                  <td key={j} className="border px-2 py-1">{row[c]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
