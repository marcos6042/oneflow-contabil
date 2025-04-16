'use client'

export default function CadastroEmpresa() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Cadastro de Empresa</h1>
      <form className="space-y-4 max-w-xl">
        <input className="w-full border p-2" placeholder="Razão Social" />
        <input className="w-full border p-2" placeholder="CNPJ" />
        <input className="w-full border p-2" placeholder="Nome Fantasia" />
        <input className="w-full border p-2" placeholder="Email de Contato" />
        <button className="bg-blue-600 text-white px-4 py-2 rounded">Salvar</button>
      </form>
    </div>
  )
} 
