// Pequenos utilitários de tela compartilhados pelas calculadoras (rodam no navegador).
import { brl } from './calc';

export type Row = [label: string, value: number | string, cls?: '' | 'neg' | 'total' | 'sub'];

export function table(rows: Row[]): string {
  return `<table class="result-table"><tbody>${rows
    .map(([l, v, c]) => `<tr class="${c ?? ''}"><td>${l}</td><td>${typeof v === 'number' ? (c === 'neg' ? '− ' : '') + brl(v) : v}</td></tr>`)
    .join('')}</tbody></table>`;
}

export function hero(label: string, value: number, sub = ''): string {
  return `<div class="result-hero"><p>${label}</p><strong>${brl(value)}</strong>${sub ? `<p>${sub}</p>` : ''}</div>`;
}

/** Lê número digitado em formato brasileiro ("3.500,50") ou internacional ("3500.50"). */
export function num(el: HTMLInputElement | null): number {
  if (!el) return 0;
  let s = el.value.trim().replace(/[R$\s]/g, '');
  if (s.includes(',')) s = s.replace(/\./g, '').replace(',', '.');
  const n = parseFloat(s);
  return Number.isFinite(n) ? n : 0;
}

/** Liga um formulário: calcula ao enviar e ao mudar campos depois do primeiro cálculo; guarda os valores na URL. */
export function bind(form: HTMLFormElement, out: HTMLElement, run: () => string) {
  let ativo = false;
  const go = () => {
    try {
      out.innerHTML = run();
    } catch (e) {
      out.innerHTML = `<p class="calc-error">${(e as Error).message}</p>`;
    }
    out.hidden = false;
    const params = new URLSearchParams();
    for (const el of Array.from(form.elements) as HTMLInputElement[]) {
      if (!el.name) continue;
      if (el.type === 'checkbox') {
        if (el.checked) params.set(el.name, '1');
      } else if (el.value !== '') params.set(el.name, el.value);
    }
    history.replaceState(null, '', `?${params}`);
  };
  form.addEventListener('submit', (ev) => {
    ev.preventDefault();
    ativo = true;
    go();
    if (window.innerWidth < 700) out.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
  form.addEventListener('input', () => ativo && go());
  form.addEventListener('change', () => ativo && go());

  // Preenche a partir da URL (links compartilhados)
  const q = new URLSearchParams(location.search);
  if ([...q.keys()].length) {
    for (const el of Array.from(form.elements) as HTMLInputElement[]) {
      if (!el.name) continue;
      if (el.type === 'checkbox') el.checked = q.get(el.name) === '1';
      else if (q.has(el.name)) el.value = q.get(el.name)!;
    }
    ativo = true;
    go();
  }
}
