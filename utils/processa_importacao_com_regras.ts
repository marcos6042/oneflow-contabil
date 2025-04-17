import { supabase } from '@/supabase/client';

export async function processaImportacaoComRegras(lancamentos: any[], empresaId: string) {
  const { data: regras, error } = await supabase
    .from('regras_ignoradas')
    .select('*, regras_combinadas(*)')
    .eq('empresa_id', empresaId)
    .eq('ativa', true);

  function aplicaRegras(l: any, regras: any[]): 'ignorar' | 'aceitar' | null {
    for (const regra of regras) {
      const condicoes = regra.regras_combinadas.map((c: any) => {
        const campo = (l[c.campo] || '').toString().toLowerCase();
        const valor = c.valor.toLowerCase();
        switch (c.condicao) {
          case 'CONTEM': return campo.includes(valor);
          case 'IGUAL': return campo === valor;
          case 'COMECA_COM': return campo.startsWith(valor);
          case 'TERMINA_COM': return campo.endsWith(valor);
          default: return false;
        }
      });
      const resultado = regra.grupo_condicao === 'AND' ? condicoes.every(Boolean) : condicoes.some(Boolean);
      if (resultado) return regra.tipo_regra;
    }
    return null;
  }

  const ignorados = [], confirmados = [], pendentes = [];

  for (const l of lancamentos) {
    const resultado = aplicaRegras(l, regras || []);
    if (resultado === 'ignorar') ignorados.push({ ...l, status: 'ignorado' });
    else if (resultado === 'aceitar') confirmados.push({ ...l, status: 'confirmado' });
    else pendentes.push({ ...l, status: 'pendente' });
  }

  if (ignorados.length) await supabase.from('lancamentos_importados').insert(ignorados);
  if (pendentes.length) await supabase.from('lancamentos_importados').insert(pendentes);
  if (confirmados.length) await supabase.from('lancamentos').insert(confirmados);

  console.log({ ignorados: ignorados.length, pendentes: pendentes.length, confirmados: confirmados.length });
}

