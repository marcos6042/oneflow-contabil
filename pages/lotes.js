import { useState } from 'react';

export default function Lotes() {
  const [lotes, setLotes] = useState([
    { id: 1, nome: 'Lote Março', data: '2025-03-31' },
    { id: 2, nome: 'Lote Abril', data: '2025-04-30' },
  ]);

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">Lotes Salvos</h1>
      <ul className="list-disc pl-5">
        {lotes.map(lote => (
          <li key={lote.id}>
            {lote.nome} - {lote.data}
          </li>
        ))}
      </ul>
    </div>
  );
}
