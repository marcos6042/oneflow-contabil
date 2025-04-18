'use client';
import type { Empresa, GrupoEconomico } from '@/types/supabase';
import { useState } from 'react';
import { supabase } from '@/supabase/client';

export default function CadastroEmpresa() {
  const [nome, setNome] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [grupoId, setGrupoId] = useState('');
  const [mensagem, setMensagem] = useState('');

  const salvar = async () => {
    if (!nome || !cnpj) {
      setMensagem('Preencha todos os campos obrigatórios.');
      return;
    }
    const { error } = await supabase.from('empresas').insert({ nome, cnpj, grupo_id: grupoId || null });
    if (error) {
      setMensagem('Erro ao salvar: ' + error.message);
    } else {
      setMensagem('Empresa cadastrada com sucesso.');
      setNome('');
      setCnpj('');
      setGrupoId('');
    }
  };

  return (
    <div className="p-6 max-w-xl">
      <h1 className="text-2xl font-bold mb-4">Cadastro de Empresa</h1>

      <div className="space-y-3">
        <input
          className="w-full border p-2 rounded"
          placeholder="Nome da empresa"
          value={nome}
          onChange={e => setNome(e.target.value)}
        />
        <input
          className="w-full border p-2 rounded"
          placeholder="CNPJ"
          value={cnpj}
          onChange={e => setCnpj(e.target.value)}
        />
        <input
          className="w-full border p-2 rounded"
          placeholder="ID do grupo econômico (opcional)"
          value={grupoId}
          onChange={e => setGrupoId(e.target.value)}
        />
        <button onClick={salvar} className="bg-blue-600 text-white px-4 py-2 rounded">Salvar</button>
        {mensagem && <p className="text-sm text-gray-700 mt-2">{mensagem}</p>}
      </div>
    </div>
  );
}
