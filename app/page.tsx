import Link from 'next/link';

export default function Home() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Bem-vindo ao OneFlow</h1>
      <p className="text-gray-700">Sistema de automação de lançamentos contábeis com dashboards e regras inteligentes.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Link href="/importar-planilha" className="block bg-blue-100 p-4 rounded-xl shadow hover:bg-blue-200">
          📥 Importar Planilha
        </Link>
        <Link href="/dashboard-simples" className="block bg-green-100 p-4 rounded-xl shadow hover:bg-green-200">
          📊 Dashboard Simples
        </Link>
        <Link href="/dashboard-colorido" className="block bg-purple-100 p-4 rounded-xl shadow hover:bg-purple-200">
          🎨 Dashboard Colorido
        </Link>
        <Link href="/revisar-importacoes" className="block bg-yellow-100 p-4 rounded-xl shadow hover:bg-yellow-200">
          🔍 Conferência de Lançamentos
        </Link>
        <Link href="/aprovar-lancamentos" className="block bg-red-100 p-4 rounded-xl shadow hover:bg-red-200">
          ✅ Aprovar Lançamentos
        </Link>
        <Link href="/cadastro-empresa" className="block bg-gray-100 p-4 rounded-xl shadow hover:bg-gray-200">
          🏢 Cadastro de Empresa
        </Link>
        <Link href="/cadastro-grupos-economicos" className="block bg-orange-100 p-4 rounded-xl shadow hover:bg-orange-200">
          👥 Grupos Econômicos
        </Link>
        <Link href="/cadastro-regras-texto" className="block bg-pink-100 p-4 rounded-xl shadow hover:bg-pink-200">
          🧠 Regras por Texto
        </Link>
        <Link href="/regras/cadastro" className="block bg-indigo-100 p-4 rounded-xl shadow hover:bg-indigo-200">
          🧩 Regras Compostas
        </Link>
        <Link href="/regras/listar" className="block bg-teal-100 p-4 rounded-xl shadow hover:bg-teal-200">
          📋 Listar Regras
        </Link>
        <Link href="/configuracao-layout-planilha" className="block bg-lime-100 p-4 rounded-xl shadow hover:bg-lime-200">
          📐 Configurar Layout Planilha
        </Link>
      </div>
    </div>
  );
}
