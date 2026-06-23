import { Component, Input, OnChanges, ElementRef, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

@Component({
  selector: 'app-grafico-evolucao',
  imports: [CommonModule],
  templateUrl: './grafico-evolucao.html',
  styleUrl: './grafico-evolucao.scss'
})
export class GraficoEvolucao implements AfterViewInit, OnChanges, OnDestroy {
  @Input() totalReceitas = 0;
  @Input() totalDespesas = 0;

  @ViewChild('chartCanvas') chartCanvas!: ElementRef<HTMLCanvasElement>;

  private chart: Chart | null = null;
  private viewInit = false;

  anoAtual = new Date().getFullYear();
  private meses = ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'];

  get saldo(): number {
    return this.totalReceitas - this.totalDespesas;
  }

  ngAfterViewInit(): void {
    this.viewInit = true;
    this.carregarGrafico();
  }

  ngOnChanges(): void {
    if (this.viewInit) this.carregarGrafico();
  }

  ngOnDestroy(): void {
    this.chart?.destroy();
  }

  carregarGrafico(): void {
    if (!this.chartCanvas) return;

    if (this.chart) {
      this.chart.destroy();
      this.chart = null;
    }

    const mesAtual = new Date().getMonth();
    const receitas = Array(12).fill(0);
    const despesas = Array(12).fill(0);
    receitas[mesAtual] = this.totalReceitas;
    despesas[mesAtual] = this.totalDespesas;

    this.chart = new Chart(this.chartCanvas.nativeElement, {
      type: 'bar',
      data: {
        labels: this.meses,
        datasets: [
          {
            label: 'Receitas',
            data: receitas,
            backgroundColor: 'rgba(99,102,241,0.8)',
            borderRadius: 6,
            borderSkipped: false
          },
          {
            label: 'Despesas',
            data: despesas,
            backgroundColor: 'rgba(56,189,248,0.7)',
            borderRadius: 6,
            borderSkipped: false
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: '#1e2340',
            borderColor: '#252d4a',
            borderWidth: 1,
            titleColor: '#6b7ea8',
            bodyColor: '#f1f5f9',
            callbacks: { label: c => ' R$ ' + (c.parsed.y ?? 0).toLocaleString('pt-BR') }
          }
        },
        scales: {
          x: { grid: { color: '#1a1f38' }, ticks: { color: '#4b5e7a', font: { size: 10 } } },
          y: { grid: { color: '#1a1f38' }, ticks: { color: '#4b5e7a', font: { size: 10 }, callback: v => 'R$' + Number(v).toLocaleString('pt-BR') } }
        }
      }
    });
  }
}