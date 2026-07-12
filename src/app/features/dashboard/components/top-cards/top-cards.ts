import { Component, Input, OnChanges, ElementRef, ViewChildren, QueryList, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart, registerables } from 'chart.js';
import { TransacaoService } from '../../../../core/services/transacao';
Chart.register(...registerables);

@Component({
  selector: 'app-top-cards',
  imports: [CommonModule],
  templateUrl: './top-cards.html',
  styleUrl: './top-cards.scss'
})
export class TopCards implements OnChanges {
  @Input() totalReceitas = 0;
  @Input() totalDespesas = 0;

  @ViewChildren('sparkline') sparklineRefs!: QueryList<ElementRef<HTMLCanvasElement>>;

  private charts: Chart[] = [];
  private transacaoService = inject(TransacaoService);

  totalReceitasMes = 0;
  totalDespesasMes = 0;
  variacaoReceita: number | null = 0;
  variacaoDespesa: number | null = 0;
  corReceita: 'up' | 'down' | 'neutro' = 'neutro';
  corDespesa: 'up' | 'down' | 'neutro' = 'neutro';

  ngOnChanges(): void {
    this.transacaoService.getComparativoMensal().subscribe(dados => {
      setTimeout(() => {
        this.totalReceitasMes = dados.receitaAtual;
        this.totalDespesasMes = dados.despesaAtual;

        this.variacaoReceita = this.calcularVariacao(dados.receitaAtual, dados.receitaAnterior);
        this.variacaoDespesa = this.calcularVariacao(dados.despesaAtual, dados.despesaAnterior);

        this.corReceita = this.calcularCor(this.variacaoReceita);
        this.corDespesa = this.calcularCor(this.variacaoDespesa);
      }, 0);
    });
    setTimeout(() => this.renderSparklines(), 50);
  }

  private calcularCor(variacao: number | null): 'up' | 'down' | 'neutro' {
    if (variacao === null) return 'neutro';
    return variacao >= 0 ? 'up' : 'down';
  }

  private calcularVariacao(atual: number, anterior: number): number | null {
    if (anterior === 0) return null;
    return ((atual - anterior) / anterior) * 100;
  }

  private renderSparklines(): void {
    this.charts.forEach(c => c.destroy());
    this.charts = [];
    const canvases = this.sparklineRefs?.toArray();
    if (!canvases?.length) return;
    const configs = [
      { data: [30, 45, 35, 60, 55, 70, 65, 80, 75, 90, 85, this.totalReceitas > 0 ? 100 : 0], color: '#10b981' },
      { data: [20, 35, 25, 40, 38, 50, 45, 55, 48, 60, 55, this.totalDespesas > 0 ? 70 : 0], color: '#ef4444' }
    ];
    canvases.forEach((ref, i) => {
      const chart = new Chart(ref.nativeElement, {
        type: 'line',
        data: {
          labels: Array(12).fill(''),
          datasets: [{
            data: configs[i].data,
            borderColor: configs[i].color,
            borderWidth: 1.5,
            pointRadius: 0,
            tension: 0.4,
            fill: true,
            backgroundColor: configs[i].color + '18'
          }]
        },
        options: {
          responsive: false,
          animation: false,
          plugins: { legend: { display: false }, tooltip: { enabled: false } },
          scales: { x: { display: false }, y: { display: false } }
        }
      });
      this.charts.push(chart);
    });
  }
}