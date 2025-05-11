'use client';
import { useState } from 'react';
import * as XLSX from 'xlsx';
import Papa from 'papaparse';

export default function ImportarPlanilha() {
  const [dados, setDados] = useState<any[]>([]);
  const [campos, setCampos] = useState<string[]>([]);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const fileName = file.name.toLowerCase();
    if (fileName.endsWith('.csv')) {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (result) => {
          setDados(result.data as any[]);
          setCampos(Object.keys(result.data[0] || {}));
        }
      });
    } else if (fileName.endsWith('.xlsx')) {
      const reader = new FileReader();
      reader.onload = (evt) => {
        const bstr = evt.target?.result;
        const wb = XLSX.read(bstr, { type: 'binary' });
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        const jsonData = XLSX.utils.sheet_to_json(ws);
        setDados(jsonData as any[]);
        setCampos(Object.keys(jsonData[0] || {}));
      };
      reader.readAsBinaryString(file);
    } else {
      alert('Formato de arquivo não suportado. Use .csv ou .xlsx');
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-purple-700">Importar Planilha Financeira</h1>

      <input
        type="file"
        onChange={handleFile}
        accept=".csv,.xlsx"
        className="border p-2 rounded bg-white"
      />

      {dados.length > 0 && (
        <div className="overflow-x-auto">
          <table className="table-auto w-full text-sm border mt-6">
            <thead className="bg-gray-100">
              <tr>
                {campos.map((campo) => (
                  <th key={campo} className="border px-2 py-1 font-semibold">{campo}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {dados.map((linha, idx) => (
                <tr key={idx}>
                  {campos.map((campo) => (
                    <td key={campo} className="border px-2 py-1">
                      {linha[campo] || '-'}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
