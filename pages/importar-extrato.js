import { useState } from 'react';
import Papa from 'papaparse';

export default function ImportarExtrato() {
  const [dados, setDados] = useState([]);

  function handleArquivo(e) {
    const file = e.target.files[0];
    if (!file) return;

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        setDados(results.data);
      }
    });
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Importar Extrato Bancário</h1>
      <input type="file" accept=".csv" onChange={handleArquivo} className="mb-4 border p-2 rounded" />

      {dados.length > 0 && (
        <table className="w-full text-sm border">
          <thead className="bg-gray-100">
            <tr>
              {Object.keys(dados[0]).map((key) => (
                <th key={key} className="border px-2 py-1">{key}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {dados.map((linha, idx) => (
              <tr key={idx}>
                {Object.values(linha).map((valor, i) => (
                  <td key={i} className="border px-2 py-1">{valor}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
