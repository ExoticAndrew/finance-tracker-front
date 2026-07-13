import { Component, OnChanges, SimpleChanges, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResumoMensal } from '../../../../core/services/transacao';

interface CardInsight {
  icone: string;
  rotulo: string;
  valor: string;
  tom: 'positivo' | 'negativo' | 'neutro';
}

@Component({
  selector: 'app-insights-anuais',
  imports: [CommonModule],
  templateUrl: './insights-anuais.html',
  styleUrl: './insights-anuais.scss'
})
export class InsightsAnuais implements OnChanges {
  @Input() resumo: ResumoMensal[] = [];
  @Input() ano = new Date().getFullYear();

  private nomesMeses = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
  private readonly LIMIAR_RELEVANCIA = 30;

  cards: CardInsight[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['resumo'] || changes['ano']) {
      this.cards = this.gerarCards();
    }
  }

  private gerarCards(): CardInsight[] {
    const comDados = this.resumo.filter(item => item.totalReceitas > 0 || item.totalDespesas > 0);
    if (comDados.length === 0) return [];

    const totalReceitas = comDados.reduce((soma, item) => soma + item.totalReceitas, 0);
    const totalDespesas = comDados.reduce((soma, item) => soma + item.totalDespesas, 0);
    const receitaMedia = totalReceitas / comDados.length;
    const despesaMedia = totalDespesas / comDados.length;
    const indiceGastos = totalReceitas > 0 ? (totalDespesas / totalReceitas) * 100 : null;

    const cards: CardInsight[] = [
      {
        icone: 'ti-cash',
        rotulo: 'Receita média',
        valor: `R$ ${receitaMedia.toLocaleString('pt-BR', { maximumFractionDigits: 0 })}/mês`,
        tom: 'neutro'
      },
      {
        icone: 'ti-credit-card',
        rotulo: 'Despesa média',
        valor: `R$ ${despesaMedia.toLocaleString('pt-BR', { maximumFractionDigits: 0 })}/mês`,
        tom: 'neutro'
      }
    ];

    if (indiceGastos !== null) {
      cards.push({
        icone: 'ti-gauge',
        rotulo: 'Índice de gastos',
        valor: `${indiceGastos.toFixed(0)}% da renda destinada a despesas`,
        tom: indiceGastos <= 50 ? 'positivo' : 'negativo'
      });
    }

    const cardDinamico = this.gerarInsightRelevante(comDados);
    if (cardDinamico) cards.push(cardDinamico);

    return cards;
  }

  private gerarInsightRelevante(comDados: ResumoMensal[]): CardInsight | null {
    const ordenado = [...comDados].sort((a, b) => a.mes - b.mes);

    let maiorQuedaReceita: { mes: number; percentual: number } | null = null;
    let maiorAltaDespesa: { mes: number; percentual: number } | null = null;

    for (let i = 1; i < ordenado.length; i++) {
      const atual = ordenado[i];
      const anterior = ordenado[i - 1];

      if (anterior.totalReceitas > 0) {
        const variacaoReceita = ((atual.totalReceitas - anterior.totalReceitas) / anterior.totalReceitas) * 100;
        if (variacaoReceita < 0 && (maiorQuedaReceita === null || variacaoReceita < maiorQuedaReceita.percentual)) {
          maiorQuedaReceita = { mes: atual.mes, percentual: variacaoReceita };
        }
      }

      if (anterior.totalDespesas > 0) {
        const variacaoDespesa = ((atual.totalDespesas - anterior.totalDespesas) / anterior.totalDespesas) * 100;
        if (variacaoDespesa > 0 && (maiorAltaDespesa === null || variacaoDespesa > maiorAltaDespesa.percentual)) {
          maiorAltaDespesa = { mes: atual.mes, percentual: variacaoDespesa };
        }
      }
    }

    const magnitudeQueda = maiorQuedaReceita ? Math.abs(maiorQuedaReceita.percentual) : 0;
    const magnitudeAlta = maiorAltaDespesa ? Math.abs(maiorAltaDespesa.percentual) : 0;

    if (magnitudeAlta >= magnitudeQueda && magnitudeAlta >= this.LIMIAR_RELEVANCIA && maiorAltaDespesa) {
      return {
        icone: 'ti-alert-triangle',
        rotulo: 'Maior aumento de despesas',
        valor: `${this.nomesMeses[maiorAltaDespesa.mes - 1]} subiu ${maiorAltaDespesa.percentual.toFixed(0)}% vs. o mês anterior`,
        tom: 'negativo'
      };
    }

    if (magnitudeQueda >= this.LIMIAR_RELEVANCIA && maiorQuedaReceita) {
      return {
        icone: 'ti-trending-down',
        rotulo: 'Maior queda de receita',
        valor: `${this.nomesMeses[maiorQuedaReceita.mes - 1]} caiu ${Math.abs(maiorQuedaReceita.percentual).toFixed(0)}% vs. o mês anterior`,
        tom: 'negativo'
      };
    }

    if (ordenado.length >= 2) {
      const primeiro = ordenado[0];
      const ultimo = ordenado[ordenado.length - 1];
      const saldoPrimeiro = primeiro.totalReceitas - primeiro.totalDespesas;
      const saldoUltimo = ultimo.totalReceitas - ultimo.totalDespesas;

      if (saldoPrimeiro !== 0) {
        const crescimento = ((saldoUltimo - saldoPrimeiro) / Math.abs(saldoPrimeiro)) * 100;
        return {
          icone: crescimento >= 0 ? 'ti-trending-up' : 'ti-trending-down',
          rotulo: 'Evolução do saldo',
          valor: `${crescimento >= 0 ? 'Cresceu' : 'Caiu'} ${Math.abs(crescimento).toFixed(0)}% de ${this.nomesMeses[primeiro.mes - 1]} a ${this.nomesMeses[ultimo.mes - 1]}`,
          tom: crescimento >= 0 ? 'positivo' : 'negativo'
        };
      }
    }

    const comReceita = comDados.filter(item => item.totalReceitas > 0);
    if (comReceita.length > 0) {
      const controlados = comReceita.filter(item => (item.totalDespesas / item.totalReceitas) < 0.3).length;
      return {
        icone: 'ti-target',
        rotulo: 'Controle financeiro',
        valor: `${controlados} de ${comReceita.length} meses com despesas abaixo de 30% da renda`,
        tom: controlados / comReceita.length >= 0.5 ? 'positivo' : 'neutro'
      };
    }

    return null;
  }
}