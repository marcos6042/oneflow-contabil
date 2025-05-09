import { useState } from 'react';
import Papa from 'papaparse';
import * as XLSX from 'xlsx';

export default function ImportarPlanilha() {
  const [registros, setRegistros] = useState([]);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const fileName = file.name.toLowerCase();

    if (fileName.endsWith('.csv')) {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => setRegistros(results.data),
      });
    } else if (fileName.endsWith('.xlsx')) {
      const reader = new FileReader();
      reader.onload = (evt) => {
        const workbook = XLSX.read(evt.target.result, { type: 'binary' });
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        setRegistros(XLSX.utils.sheet_to_json(sheet));
      };
      reader.readAsBinaryString(file);
    } else {
      alert('Formato não suportado. Use CSV ou XLSX.');
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Importar Planilha Financeira</h1>
      <input type="file" onChange={handleFileUpload} accept=".csv,.xlsx" />
      <table className="w-full text-sm border mt-4">
        <thead>
          <tr>
            {registros[0] &&
              Object.keys(registros[0]).map((key) => (
                <th key={key} className="border px-2 py-1">{key}</th>
              ))}
          </tr>
        </thead>
        <tbody>
          {registros.map((row, i) => (
            <tr key={i}>
              {Object.values(row).map((val, idx) => (
                <td key={idx} className="border px-2 py-1">{val}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
