'use client'

export function AprovarLancamentos() {
  const dados = [
    { descricao: 'Pix Aluguel', valor: 2800, contaDeb: 'Aluguel', contaCred: 'Banco', filial: 'Filial SP' },
    { descricao: 'Combustível', valor: 300, contaDeb: 'Combustível', contaCred: 'Conta Garantida', filial: 'Filial MG' }
  ];
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Aprovação de Lançamentos</h1>
      <table className="w-full border">
        <thead className="bg-gray-100">
          <tr><th>Descrição</th><th>Valor</th><th>Débito</th><th>Crédito</th><th>Filial</th><th>Aprovar</th></tr>
        </thead>
        <tbody>
          {dados.map((l, i) => (
            <tr key={i} className="text-sm text-center">
              <td className="border px-2 py-1">{l.descricao}</td>
              <td className="border px-2 py-1">R$ {l.valor.toFixed(2)}</td>
              <td className="border px-2 py-1">{l.contaDeb}</td>
              <td className="border px-2 py-1">{l.contaCred}</td>
              <td className="border px-2 py-1">{l.filial}</td>
              <td className="border px-2 py-1"><button className="bg-green-500 text-white px-2 py-1 rounded">✔</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
