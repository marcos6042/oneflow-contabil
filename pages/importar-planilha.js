'use client';
import { useState } from 'react';
import * as XLSX from 'xlsx';
import Papa from 'papaparse';

export default function ImportarPlanilha() {
  const [registros, setRegistros] = useState([]);
  const [colunas, setColunas] = useState([]);

  const handleArquivo = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.name.endsWith('.csv')) {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (result) => {
          setColunas(Object.keys(result.data[0] || {}));
          setRegistros(result.data);
        }
      });
    } else if (file.name.endsWith('.xlsx')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const workbook = XLSX.read(e.target.result, { type: 'binary' });
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const data = XLSX.utils.sheet_to_json(sheet);
        setColunas(Object.keys(data[0] || {}));
        setRegistros(data);
      };
      reader.readAsBinaryString(file);
    } else {
      alert('Formato inválido. Use CSV ou XLSX.');
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-purple-700">Importar Planilha Financeira</h1>
      <input type="file" accept=".csv,.xlsx" onChange={handleArquivo} className="mb-4" />
      <div className="overflow-x-auto">
        <table className="w-full border text-sm">
          <thead className="bg-gray-100">
            <tr>
              {colunas.map((col) => (
                <th key={col} className="border px-2 py-1">{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {registros.map((reg, idx) => (
              <tr key={idx}>
                {colunas.map((col) => (
                  <td key={col} className="border px-2 py-1">{reg[col]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
