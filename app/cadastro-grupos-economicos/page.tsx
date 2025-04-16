'use client'

export function CadastroGrupos() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Cadastro de Grupo Econômico</h1>
      <form className="space-y-4 max-w-md">
        <input className="w-full border p-2" placeholder="Nome do Grupo" />
        <button className="bg-indigo-600 text-white px-4 py-2 rounded">Salvar</button>
      </form>
    </div>
  )
}
