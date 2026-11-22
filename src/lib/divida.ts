// Matemática financeira da calculadora de juros da dívida (tabela Price, juros compostos mensais).
// Tudo roda no navegador: nenhum valor digitado sai do aparelho.

/** Parcela fixa de um empréstimo de `pv` em `n` meses à taxa mensal `i` (decimal). */
export function parcela(pv: number, i: number, n: number): number {
  if (n <= 0) return 0;
  if (i <= 0) return pv / n;
  return (pv * i) / (1 - Math.pow(1 + i, -n));
}

/** Valor presente (saldo devedor) de `n` parcelas de `pmt` à taxa mensal `i`. */
export function valorPresente(pmt: number, i: number, n: number): number {
  if (n <= 0) return 0;
  if (i <= 0) return pmt * n;
  return (pmt * (1 - Math.pow(1 + i, -n))) / i;
}

/** Taxa mensal implícita: a taxa que faz `n` parcelas de `pmt` valerem `pv` hoje. Retorna null se não houver juros. */
export function taxaImplicita(pv: number, pmt: number, n: number): number | null {
  if (pv <= 0 || pmt <= 0 || n <= 0) return null;
  if (pmt * n <= pv + 0.005) return 0;
  let lo = 0;
  let hi = 1;
  while (valorPresente(pmt, hi, n) > pv && hi < 1e4) hi *= 2;
  for (let k = 0; k < 200; k++) {
    const mid = (lo + hi) / 2;
    if (valorPresente(pmt, mid, n) > pv) lo = mid;
    else hi = mid;
  }
  return (lo + hi) / 2;
}

/** Número de parcelas de `pmt` para quitar `pv` à taxa `i` (Infinity se a parcela não cobre os juros). */
export function prazo(pv: number, i: number, pmt: number): number {
  if (pmt <= 0) return Infinity;
  if (i <= 0) return Math.ceil(pv / pmt);
  if (pmt <= pv * i) return Infinity;
  return Math.ceil(-Math.log(1 - (pv * i) / pmt) / Math.log(1 + i) - 1e-9);
}

/** Taxa anual equivalente a uma taxa mensal (ambas decimais). */
export const anual = (i: number) => Math.pow(1 + i, 12) - 1;

/**
 * Dívida rotativa paga com um valor fixo por mês. Simula mês a mês.
 * `limiteJuros` (opcional) limita o total de juros, como a regra do cartão (Lei 14.690/2023: juros e encargos
 * do rotativo e do parcelamento da fatura não podem passar de 100% da dívida original).
 */
export function quitarRotativo(saldo: number, i: number, pagamento: number, limiteJuros = Infinity) {
  let s = saldo;
  let juros = 0;
  let meses = 0;
  let pago = 0;
  if (pagamento <= 0) return { meses: Infinity, juros: Infinity, pago: Infinity, nunca: true };
  while (s > 0.005 && meses < 1200) {
    let j = s * i;
    if (juros + j > limiteJuros) j = Math.max(0, limiteJuros - juros);
    if (meses === 0 && pagamento <= j && !Number.isFinite(limiteJuros)) return { meses: Infinity, juros: Infinity, pago: Infinity, nunca: true, jurosMes: j };
    juros += j;
    s += j;
    const p = Math.min(pagamento, s);
    s -= p;
    pago += p;
    meses++;
  }
  return { meses, juros, pago, nunca: false };
}

export const pct = (i: number, casas = 2) =>
  `${(i * 100).toLocaleString('pt-BR', { minimumFractionDigits: casas, maximumFractionDigits: casas })}%`;

/** "3 anos e 2 meses", "11 meses". */
export function duracao(meses: number): string {
  if (!Number.isFinite(meses)) return 'nunca';
  const a = Math.floor(meses / 12);
  const m = meses % 12;
  const pa = a ? `${a} ano${a > 1 ? 's' : ''}` : '';
  const pm = m ? `${m} ${m > 1 ? 'meses' : 'mês'}` : '';
  return [pa, pm].filter(Boolean).join(' e ') || '0 mês';
}
