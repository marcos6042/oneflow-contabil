'use client'

export function ConfigurarLayout() {
  const colunas = Array.from({ length: 52 }, (_, i) => String.fromCharCode(65 + i % 26) + (i >= 26 ? 'Z' : ''));
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Configuração de Layout da Planilha</h1>
      <form className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {["Data", "Banco", "Cliente", "Valor", "Emitente", "Descrição", "Plano de Contas"].map((campo, i) => (
          <div key={i}>
            <label className="block font-medium mb-1">{campo}</label>
            <select className="w-full border p-2 rounded">
              <option value="">Selecione a Coluna</option>
              {colunas.map((col) => <option key={col}>{col}</option>)}
            </select>
          </div>
        ))}
        <button className="col-span-full mt-4 bg-green-600 text-white px-4 py-2 rounded">Salvar Configuração</button>
      </form>
    </div>
  )
}
