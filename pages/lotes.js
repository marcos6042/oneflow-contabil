import { useState } from 'react';

export default function Lotes() {
  const [lotes] = useState([
    { id: 1, nome: 'Lote Março', data: '2025-03-31' },
    { id: 2, nome: 'Lote Abril', data: '2025-04-30' },
  ]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Lotes Salvos</h1>
      <ul>
        {lotes.map((lote) => (
          <li key={lote.id} className="mb-2 p-2 bg-white rounded shadow">
            {lote.nome} - {lote.data}
          </li>
        ))}
      </ul>
    </div>
  );
}
