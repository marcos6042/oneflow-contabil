'use client';

import { useState } from 'react';
import { supabase } from '@/supabase/client';

export type Criterio = {
  campo: string;
  condicao: string;
  valor: string;
};

export default function CadastroRegrasCombinadas() {
  const [empresaId, setEmpresaId] = useState('');
  const [tipoRegra, setTipoRegra] = useState('ignorar');
  const [grupoCondicao, setGrupoCondicao] = useState('AND');
  const [criterios, setCriterios] = useState<Criterio[]>([
    { campo: '', condicao: 'CONTEM', valor: '' }
  ]);

  const adicionarCriterio = () => {
    setCriterios([...criterios, { campo: '', condicao: 'CONTEM', valor: '' }]);
  };

  const atualizarCriterio = (index: number, chave: keyof Criterio, valor: string) => {
    const atualizados = [...criterios];
    atualizados[index][chave] = valor;
    setCriterios(atualizados);
  };

  const salvarRegra = async () => {
    const { data: regraPrincipal, error } = await supabase
      .from('regras_ignoradas')
      .insert({ empresa_id: empresaId, tipo_regra: tipoRegra, grupo_condicao: grupoCondicao })
      .select()
      .single();

    if (regraPrincipal?.id) {
      const filhos = criterios.map(c => ({ ...c, regra_id: regraPrincipal.id }));
      await supabase.from('regras_combinadas').insert(filhos);
      alert('Regra cadastrada com sucesso!');
      setEmpresaId('');
      setCriterios([{ campo: '', condicao: 'CONTEM', valor: '' }]);
    } else {
      alert('Erro ao salvar regra.');
    }
  };

  return (
    <div className="p-6 max-w-3xl">
      <h1 className="text-2xl font-bold mb-4">Cadastro de Regra de Ignorar/Aceitar</h1>

      <div className="space-y-2 mb-6">
        <input
          className="w-full border p-2 rounded"
          placeholder="Empresa ID"
          value={empresaId}
          onChange={(e) => setEmpresaId(e.target.value)}
        />
        <select className="p-2 border rounded" value={tipoRegra} onChange={(e) => setTipoRegra(e.target.value)}>
          <option value="ignorar">Ignorar</option>
          <option value="aceitar">Aceitar</option>
        </select>
        <select className="p-2 border rounded" value={grupoCondicao} onChange={(e) => setGrupoCondicao(e.target.value)}>
          <option value="AND">TODOS os critérios</option>
          <option value="OR">QUALQUER critério</option>
        </select>
      </div>

      <h2 className="text-lg font-semibold mb-2">Critérios</h2>
      {criterios.map((c, i) => (
        <div key={i} className="flex gap-2 mb-2">
          <select className="border p-2" value={c.campo} onChange={e => atualizarCriterio(i, 'campo', e.target.value)}>
            <option value="">Campo</option>
            <option value="descricao">Descrição</option>
            <option value="valor">Valor</option>
            <option value="tipo">Tipo</option>
            <option value="filial">Filial</option>
            <option value="banco">Banco</option>
          </select>
          <select className="border p-2" value={c.condicao} onChange={e => atualizarCriterio(i, 'condicao', e.target.value)}>
            <option value="CONTEM">Contém</option>
            <option value="IGUAL">Igual</option>
            <option value="COMECA_COM">Começa com</option>
            <option value="TERMINA_COM">Termina com</option>
          </select>
          <input
            className="border p-2 w-full"
            placeholder="Valor do campo"
            value={c.valor}
            onChange={e => atualizarCriterio(i, 'valor', e.target.value)}
          />
        </div>
      ))}

      <button className="bg-gray-200 px-4 py-2 rounded mb-4" onClick={adicionarCriterio}>+ Adicionar Critério</button>
      <button className="bg-blue-600 text-white px-6 py-2 rounded" onClick={salvarRegra}>Salvar Regra</button>
    </div>
  );
}
