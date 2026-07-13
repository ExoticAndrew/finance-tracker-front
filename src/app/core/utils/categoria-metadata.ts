const ICONES: Record<string, string> = {
  ALIMENTACAO: 'ti-shopping-cart',
  TRANSPORTE: 'ti-car',
  MORADIA: 'ti-home',
  SAUDE: 'ti-heart',
  EDUCACAO: 'ti-school',
  LAZER: 'ti-device-tv',
  SALARIO: 'ti-briefcase',
  INVESTIMENTO: 'ti-trending-up',
  OUTRAS: 'ti-dots-circle-horizontal'
};

const CORES: Record<string, string> = {
  ALIMENTACAO: '#f59e0b',
  TRANSPORTE: '#38bdf8',
  MORADIA: '#8b5cf6',
  SAUDE: '#10b981',
  EDUCACAO: '#6366f1',
  LAZER: '#ef4444',
  SALARIO: '#6366f1',
  INVESTIMENTO: '#10b981',
  OUTRAS: '#94a3b8'
};

const LABELS: Record<string, string> = {
  ALIMENTACAO: 'Alimentação',
  TRANSPORTE: 'Transporte',
  MORADIA: 'Moradia',
  SAUDE: 'Saúde',
  EDUCACAO: 'Educação',
  LAZER: 'Lazer',
  SALARIO: 'Salário',
  INVESTIMENTO: 'Investimento',
  OUTRAS: 'Outras'
};

export function iconeCategoria(categoria: string): string {
  return ICONES[categoria] ?? 'ti-circle';
}

export function corCategoria(categoria: string): string {
  return CORES[categoria] ?? '#94a3b8';
}

export function labelCategoria(categoria: string): string {
  return LABELS[categoria] ?? categoria;
}