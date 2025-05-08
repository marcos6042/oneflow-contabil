import { useState } from 'react';
import Papa from 'papaparse';
import * as XLSX from 'xlsx';

export default function ImportarPlanilha() {
  const [dados, setDados] = useState([]);

  function handleFileUpload(e) {
    const file = e.target.files[0];
    if (!file) return;

    const fileName = file.name.toLowerCase();
    if (fileName.endsWith('.csv')) {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => setDados(results.data),
      });
    } else if (fileName.endsWith('.xlsx')) {
      const reader = new FileReader();
      reader.onload = (evt) => {
        const data = evt.target.result;
        const workbook = XLSX.read(data, { type: 'binary' });
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        setDados(XLSX.utils.sheet_to_json(sheet));
      };
      reader.readAsBinaryString(file);
    } else {
      alert('Formato não suportado. Use CSV ou XLSX.');
    }
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Importar Planilha</h1>
      <input type="file" accept=".csv,.xlsx" onChange={handleFileUpload} />
      <table className="table-auto w-full mt-4">
        <thead>
          <tr>
            {dados[0] &&
              Object.keys(dados[0]).map((key) => (
                <th key={key} className="border px-2 py-1">{key}</th>
              ))}
          </tr>
        </thead>
        <tbody>
          {dados.map((row, i) => (
            <tr key={i}>
              {Object.values(row).map((value, j) => (
                <td key={j} className="border px-2 py-1">{value}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
