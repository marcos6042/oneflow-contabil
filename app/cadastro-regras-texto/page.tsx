'use client'

export function CadastroRegrasTexto() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Cadastro de Regra por Texto</h1>
      <form className="space-y-3 max-w-xl">
        <input className="w-full border p-2" placeholder="Trecho (ex: Uber, Pix Aluguel)" />
        <input className="w-full border p-2" placeholder="Conta Débito" />
        <input className="w-full border p-2" placeholder="Conta Crédito" />
        <textarea className="w-full border p-2" placeholder="Histórico Padrão"></textarea>
        <button className="bg-blue-700 text-white px-4 py-2 rounded">Salvar Regra</button>
      </form>
    </div>
  )
}
