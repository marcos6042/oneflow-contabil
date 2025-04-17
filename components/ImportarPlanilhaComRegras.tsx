'use client';

import { useState } from 'react';
import * as XLSX from 'xlsx';
import { processaImportacaoComRegras } from '@/utils/processa_importacao_com_regras';

export default function ImportarPlanilhaComRegras() {
  const [empresaId, setEmpresaId] = useState('');
  const [arquivo, setArquivo] = useState<File | null>(null);
  const [carregando, setCarregando] = useState(false);

  const importar = async () => {
    if (!arquivo || !empresaId) return alert('Informe o arquivo e empresa');
    setCarregando(true);

    const buffer = await arquivo.arrayBuffer();
    const workbook = XLSX.read(buffer, { type: 'buffer' });
    const planilha = workbook.Sheets[workbook.SheetNames[0]];
    const dados = XLSX.utils.sheet_to_json(planilha, { raw: false });

    const lista = dados.map((linha: any) => ({
      empresa_id: empresaId,
      data: linha.Data || linha['Data Lançamento'],
      descricao: linha.Descrição || linha.Histórico,
      tipo: linha.Tipo?.toLowerCase(),
      valor: parseFloat(linha.Valor),
      centro_custo: linha['Centro de Custo'] || '',
      filial: linha.Filial || '',
      banco: linha.Banco || '',
      origem_arquivo: arquivo.name
    }));

    await processaImportacaoComRegras(lista, empresaId);
    alert('Importação finalizada com sucesso!');
    setCarregando(false);
  };

  return (
    <div className="p-6 max-w-2xl space-y-4">
      <h1 className="text-2xl font-bold">Importar Planilha com Regras</h1>

      <input
        className="w-full border p-2 rounded"
        placeholder="Informe o ID da empresa"
        value={empresaId}
        onChange={(e) => setEmpresaId(e.target.value)}
      />

      <input
        type="file"
        accept=".xlsx,.xls,.csv"
        className="w-full border p-2 rounded"
        onChange={(e) => setArquivo(e.target.files?.[0] || null)}
      />

      <button
        onClick={importar}
        disabled={carregando}
        className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
      >
        {carregando ? 'Importando...' : 'Importar e Processar'}
      </button>
    </div>
  );
}
