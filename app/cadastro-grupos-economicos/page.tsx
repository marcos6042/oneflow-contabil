'use client';

import { useState } from 'react';
import { supabase } from '@/supabase/client';

export default function CadastroGruposEconomicos() {
  const [nome, setNome] = useState('');
  const [mensagem, setMensagem] = useState('');

  const salvar = async () => {
    if (!nome) {
      setMensagem('Informe o nome do grupo.');
      return;
    }
    const { error } = await supabase.from('grupos_economicos').insert({ nome });
    if (error) {
      setMensagem('Erro ao salvar: ' + error.message);
    } else {
      setMensagem('Grupo cadastrado com sucesso.');
      setNome('');
    }
  };

  return (
    <div className="p-6 max-w-xl">
      <h1 className="text-2xl font-bold mb-4">Cadastro de Grupo Econômico</h1>

      <div className="space-y-3">
        <input
          className="w-full border p-2 rounded"
          placeholder="Nome do grupo"
          value={nome}
          onChange={e => setNome(e.target.value)}
        />
        <button onClick={salvar} className="bg-blue-600 text-white px-4 py-2 rounded">Salvar</button>
        {mensagem && <p className="text-sm text-gray-700 mt-2">{mensagem}</p>}
      </div>
    </div>
  );
}
