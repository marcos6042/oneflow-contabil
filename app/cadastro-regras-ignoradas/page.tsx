'use client';

import { useEffect, useRef, useState } from 'react';
import { supabase } from '@/supabase/client';
import * as XLSX from 'xlsx';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export default function CadastroRegrasIgnoradas() {
  const [regras, setRegras] = useState<any[]>([]);
  const [empresas, setEmpresas] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState<string | null>(null);
  const [filtroEmpresa, setFiltroEmpresa] = useState('');
  const [filtroTipo, setFiltroTipo] = useState('');
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    carregarEmpresas();
  }, []);

  useEffect(() => {
    carregar();
  }, [filtroEmpresa, filtroTipo]);

  async function carregarEmpresas() {
    const { data } = await supabase.from('empresas').select('id, nome').order('nome');
    if (data) setEmpresas(data);
  }

  async function carregar() {
    let query = supabase
      .from('regras_ignoradas')
      .select('*, regras_combinadas(*)')
      .order('criado_em', { ascending: false });

    if (filtroEmpresa.trim() !== '') {
      query = query.eq('empresa_id', filtroEmpresa);
    }
    if (filtroTipo !== '') {
      query = query.eq('tipo_regra', filtroTipo);
    }

    const { data, error } = await query;
    if (error) setErro(error.message);
    if (data) setRegras(data);
    setLoading(false);
  }

  const limparFiltros = () => {
    setFiltroEmpresa('');
    setFiltroTipo('');
  };

  const excluirRegra = async (id: string) => {
    const confirmacao = confirm('Tem certeza que deseja excluir esta regra?');
    if (!confirmacao) return;

    const { error } = await supabase.from('regras_ignoradas').delete().eq('id', id);
    if (error) return alert('Erro ao excluir.');
    alert('Regra excluída com sucesso.');
    carregar();
  };

  const exportarExcel = () => {
    const linhas = regras.map((r) => ({
      empresa: empresas.find(e => e.id === r.empresa_id)?.nome || r.empresa_id,
      tipo: r.tipo_regra,
      grupo: r.grupo_condicao,
      status: r.ativa ? 'Ativa' : 'Inativa',
      criado_em: new Date(r.criado_em).toLocaleString(),
      criterios: (r.regras_combinadas || []).map((c: any) => `${c.campo} ${c.condicao.toLowerCase()} "${c.valor}"`).join(' | ')
    }));

    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(linhas);
    XLSX.utils.book_append_sheet(wb, ws, 'Regras');
    XLSX.writeFile(wb, 'regras-ignoradas.xlsx');
  };

  const exportarPDF = async () => {
    if (!ref.current) return;
    const canvas = await html2canvas(ref.current);
    const pdf = new jsPDF('p', 'pt', 'a4');
    const width = pdf.internal.pageSize.getWidth();
    const height = canvas.height * width / canvas.width;
    pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, width, height);
    pdf.save('regras-ignoradas.pdf');
  };

  return (
    <div className="p-6 max-w-5xl mx-auto" ref={ref}>
      <h1 className="text-2xl font-bold mb-4">Regras Cadastradas</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <select
          className="border p-2 rounded w-full"
          value={filtroEmpresa}
          onChange={(e) => setFiltroEmpresa(e.target.value)}
        >
          <option value="">Todas as Empresas</option>
          {empresas.map((e: any) => (
            <option key={e.id} value={e.id}>{e.nome}</option>
          ))}
        </select>

        <select
          className="border p-2 rounded w-full"
          value={filtroTipo}
          onChange={(e) => setFiltroTipo(e.target.value)}
        >
          <option value="">Todos os Tipos</option>
          <option value="ignorar">Ignorar</option>
          <option value="aceitar">Aceitar</option>
        </select>

        <button
          onClick={limparFiltros}
          className="bg-gray-200 text-sm px-4 py-2 rounded"
        >
          Limpar Filtros
        </button>

        <div className="flex gap-2">
          <button
            onClick={exportarExcel}
            className="bg-green-600 text-white text-sm px-3 py-2 rounded w-full"
          >
            Excel
          </button>
          <button
            onClick={exportarPDF}
            className="bg-blue-600 text-white text-sm px-3 py-2 rounded w-full"
          >
            PDF
          </button>
        </div>
      </div>

      {erro && <p className="text-red-600">Erro: {erro}</p>}
      {loading ? (
        <p>Carregando...</p>
      ) : (
        regras.length === 0 ? (
          <p className="text-gray-600">Nenhuma regra cadastrada.</p>
        ) : (
          <div className="space-y-6">
            {regras.map((r, i) => (
              <div key={i} className="border rounded p-4 shadow">
                <div className="flex justify-between items-center mb-2">
                  <div>
                    <p><strong>Empresa:</strong> {empresas.find(e => e.id === r.empresa_id)?.nome || r.empresa_id}</p>
                    <p><strong>Tipo:</strong> {r.tipo_regra}</p>
                    <p><strong>Grupo Condição:</strong> {r.grupo_condicao}</p>
                    <p><strong>Status:</strong> {r.ativa ? 'Ativa' : 'Inativa'}</p>
                  </div>
                  <div className="text-right space-y-2">
                    <span className="block text-sm text-gray-500">Criado em: {new Date(r.criado_em).toLocaleString()}</span>
                    <button
                      className="text-red-600 hover:underline text-sm"
                      onClick={() => excluirRegra(r.id)}
                    >
                      Excluir
                    </button>
                  </div>
                </div>

                {r.regras_combinadas?.length > 0 && (
                  <div className="mt-3">
                    <h3 className="font-semibold">Critérios:</h3>
                    <ul className="list-disc list-inside">
                      {r.regras_combinadas.map((c: any, j: number) => (
                        <li key={j}>{c.campo} {c.condicao.toLowerCase()} "{c.valor}"</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        )
      )}
    </div>
  );
}
