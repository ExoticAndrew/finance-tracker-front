import { Component, OnChanges, SimpleChanges, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResumoMensal } from '../../../../core/services/transacao';

interface LinhaAnalise {
  mes: number;
  nomeMes: string;
  receita: number;
  despesa: number;
  saldo: number;
  variacaoReceita: number | null;
  variacaoDespesa: number | null;
  percentualDespesaReceita: number | null;
}

@Component({
  selector: 'app-analise-mensal',
  imports: [CommonModule],
  templateUrl: './analise-mensal.html',
  styleUrl: './analise-mensal.scss'
})
export class AnaliseMensal implements OnChanges {
  @Input() resumo: ResumoMensal[] = [];

  readonly Infinity = Infinity;

  private nomesMeses = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];

  linhas: LinhaAnalise[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['resumo']) {
      this.linhas = this.calcularLinhas();
    }
  }

  private calcularLinhas(): LinhaAnalise[] {
    const receitas = Array(12).fill(0);
    const despesas = Array(12).fill(0);

    this.resumo.forEach(item => {
      receitas[item.mes - 1] = item.totalReceitas;
      despesas[item.mes - 1] = item.totalDespesas;
    });

    const linhas: LinhaAnalise[] = [];

    for (let i = 0; i < 12; i++) {
      const receita = receitas[i];
      const despesa = despesas[i];

      if (receita === 0 && despesa === 0) continue;

      const receitaAnterior = i > 0 ? receitas[i - 1] : null;
      const despesaAnterior = i > 0 ? despesas[i - 1] : null;

      linhas.push({
        mes: i + 1,
        nomeMes: this.nomesMeses[i],
        receita,
        despesa,
        saldo: receita - despesa,
        variacaoReceita: this.calcularVariacao(receita, receitaAnterior),
        variacaoDespesa: this.calcularVariacao(despesa, despesaAnterior),
        percentualDespesaReceita: receita > 0 ? (despesa / receita) * 100 : null
      });
    }

    return linhas;
  }

  private calcularVariacao(atual: number, anterior: number | null): number | null {
    if (anterior === null) return null;
    if (anterior === 0) return atual > 0 ? Infinity : null;
    return ((atual - anterior) / anterior) * 100;
  }
}