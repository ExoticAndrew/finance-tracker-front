import { resolverCategoria } from '../../../core/utils/categoria-metadata';
import { sanitizarValorPlanilha } from '../../../core/utils/sanitizar-formula';

export const MAX_TAMANHO_ARQUIVO_MB = 2;
export const MAX_LINHAS_IMPORTACAO = 500;

export interface LinhaImportada {
  numeroLinha: number;
  descricao: string;
  valor: number | null;
  tipo: 'RECEITA' | 'DESPESA' | null;
  categoria: string | null;
  data: string | null;
  observacoes: string;
  erros: string[];
}

export interface ResultadoParse {
  linhas: LinhaImportada[];
  erroArquivo: string | null;
}

export async function parseArquivoExcel(file: File): Promise<ResultadoParse> {
  if (!file.name.toLowerCase().endsWith('.xlsx')) {
    return { linhas: [], erroArquivo: 'Apenas arquivos .xlsx são aceitos.' };
  }

  const tamanhoMB = file.size / (1024 * 1024);
  if (tamanhoMB > MAX_TAMANHO_ARQUIVO_MB) {
    return { linhas: [], erroArquivo: `Arquivo muito grande (máximo ${MAX_TAMANHO_ARQUIVO_MB}MB).` };
  }

  let linhasBrutas: any[];
  try {
    const XLSX = await import('xlsx');
    const buffer = await file.arrayBuffer();
    const workbook = XLSX.read(buffer, { type: 'array', cellDates: true });
    const primeiraAba = workbook.SheetNames[0];
    const planilha = workbook.Sheets[primeiraAba];
    linhasBrutas = XLSX.utils.sheet_to_json(planilha, { defval: '' });
  } catch {
    return { linhas: [], erroArquivo: 'Não foi possível ler o arquivo. Confirme se é um .xlsx válido.' };
  }

  if (linhasBrutas.length === 0) {
    return { linhas: [], erroArquivo: 'A planilha está vazia.' };
  }

  if (linhasBrutas.length > MAX_LINHAS_IMPORTACAO) {
    return {
      linhas: [],
      erroArquivo: `Máximo de ${MAX_LINHAS_IMPORTACAO} linhas por importação (encontradas ${linhasBrutas.length}).`
    };
  }

  const linhas: LinhaImportada[] = [];

  linhasBrutas.forEach((linhaBruta, index) => {
    const numeroLinha = index + 2;

    const descricaoRaw = String(linhaBruta['Descrição'] ?? linhaBruta['Descricao'] ?? '').trim();
    const valorRaw = linhaBruta['Valor'];
    const tipoRaw = String(linhaBruta['Tipo'] ?? '').trim();
    const categoriaRaw = String(linhaBruta['Categoria'] ?? '').trim();
    const dataRaw = linhaBruta['Data'];
    const observacoesRaw = String(linhaBruta['Observações'] ?? linhaBruta['Observacoes'] ?? '').trim();

    const linhaVazia = !descricaoRaw && !valorRaw && !tipoRaw && !categoriaRaw && !dataRaw;
    if (linhaVazia) return;

    const erros: string[] = [];

    if (descricaoRaw.length < 3 || descricaoRaw.length > 100) {
      erros.push('descrição deve ter entre 3 e 100 caracteres');
    }

    let valor: number | null = null;
    const valorNormalizado = typeof valorRaw === 'string' ? valorRaw.replace(',', '.') : valorRaw;
    const valorConvertido = Number(valorNormalizado);
    if (!valorRaw || isNaN(valorConvertido) || valorConvertido <= 0) {
      erros.push('valor deve ser um número maior que zero');
    } else {
      valor = valorConvertido;
    }

    let tipo: 'RECEITA' | 'DESPESA' | null = null;
    const tipoNormalizado = tipoRaw.toUpperCase();
    if (tipoNormalizado === 'RECEITA' || tipoNormalizado === 'DESPESA') {
      tipo = tipoNormalizado;
    } else {
      erros.push('tipo deve ser "Receita" ou "Despesa"');
    }

    const categoria = resolverCategoria(categoriaRaw);
    if (!categoria) {
      erros.push(`categoria "${categoriaRaw}" não reconhecida`);
    }

    let data: string | null = null;
    if (dataRaw instanceof Date && !isNaN(dataRaw.getTime())) {
      data = dataRaw.toISOString().slice(0, 10);
    } else if (typeof dataRaw === 'string' && /^\d{2}\/\d{2}\/\d{4}$/.test(dataRaw)) {
      const [dia, mes, ano] = dataRaw.split('/');
      data = `${ano}-${mes}-${dia}`;
    } else {
      erros.push('data inválida (use dd/mm/aaaa)');
    }

    if (data) {
      const hoje = new Date();
      hoje.setHours(0, 0, 0, 0);
      const dataObj = new Date(data + 'T00:00:00');
      if (dataObj > hoje) {
        erros.push('data não pode ser futura');
      }
    }

    if (observacoesRaw.length > 500) {
      erros.push('observações não podem ter mais de 500 caracteres');
    }

    linhas.push({
      numeroLinha,
      descricao: sanitizarValorPlanilha(descricaoRaw),
      valor,
      tipo,
      categoria,
      data,
      observacoes: sanitizarValorPlanilha(observacoesRaw),
      erros
    });
  });

  return { linhas, erroArquivo: null };
}