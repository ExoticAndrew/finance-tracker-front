const CARACTERES_PERIGOSOS = ['=', '+', '-', '@', '\t', '\r'];

/**
 * Neutraliza valores que, se abertos no Excel/Sheets como CSV, poderiam
 * ser interpretados como fórmula (CSV Injection / Formula Injection).
 * Prefixa com um apóstrofo qualquer valor que comece com um caractere de fórmula.
 */
export function sanitizarValorPlanilha(valor: string): string {
  if (!valor) return valor;
  const primeiroChar = valor.charAt(0);
  if (CARACTERES_PERIGOSOS.includes(primeiroChar)) {
    return `'${valor}`;
  }
  return valor;
}