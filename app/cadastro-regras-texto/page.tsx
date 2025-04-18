'use client';
import type { RegraIgnorada } from '@/types/supabase';
import { useState } from 'react';
import { supabase } from '@/supabase/client';

export default function CadastroRegrasTexto() {
  const [empresaId, setEmpresaId] = useState('');
  const [campo, setCampo] = useState('descricao');
  const [condicao, setCondicao] = useState('CONTEM');
  const [valor, setValor] = useState('');
  const [tipoRegra, setTipoRegra] = useState('ignorar');
  const [mensagem, setMensagem] = useState('');

  const salvar = async () => {
    if (!empresaId || !valor || !campo || !condicao) {
      setMensagem('Preencha todos os campos.');
      return;
    }
    const { data: regra, error } = await supabase
      .from('regras_ignoradas')
      .insert({ empresa_id: empresaId, tipo_regra: tipoRegra, grupo_condicao: 'AND' })
      .select()
      .single();

    if (regra?.id) {
      await supabase.from('regras_combinadas').insert({ regra_id: regra.id, campo, condicao, valor });
      setMensagem('Regra salva com sucesso.');
      setValor('');
    } else {
      setMensagem('Erro ao salvar regra.');
    }
  };

  return (
    <div className="p-6 max-w-2xl">
      <h1 className="text-2xl font-bold mb-4">Cadastro de Regra por Texto</h1>

      <div className="space-y-3">
        <input
          className="w-full border p-2 rounded"
          placeholder="ID da Empresa"
          value={empresaId}
          onChange={e => setEmpresaId(e.target.value)}
        />
        <select className="w-full border p-2 rounded" value={campo} onChange={e => setCampo(e.target.value)}>
          <option value="descricao">Descrição</option>
          <option value="tipo">Tipo</option>
          <option value="valor">Valor</option>
          <option value="filial">Filial</option>
        </select>
        <select className="w-full border p-2 rounded" value={condicao} onChange={e => setCondicao(e.target.value)}>
          <option value="CONTEM">Contém</option>
          <option value="IGUAL">Igual</option>
          <option value="COMECA_COM">Começa com</option>
          <option value="TERMINA_COM">Termina com</option>
        </select>
        <input
          className="w-full border p-2 rounded"
          placeholder="Texto ou valor a ser detectado"
          value={valor}
          onChange={e => setValor(e.target.value)}
        />
        <select className="w-full border p-2 rounded" value={tipoRegra} onChange={e => setTipoRegra(e.target.value)}>
          <option value="ignorar">Ignorar</option>
          <option value="aceitar">Aceitar</option>
        </select>
        <button onClick={salvar} className="bg-blue-600 text-white px-4 py-2 rounded">Salvar Regra</button>
        {mensagem && <p className="text-sm mt-2 text-gray-700">{mensagem}</p>}
      </div>
    </div>
  );
}
