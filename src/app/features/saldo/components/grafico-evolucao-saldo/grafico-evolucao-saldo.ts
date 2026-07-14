import { Component, OnChanges, OnDestroy, AfterViewInit, SimpleChanges, ViewChild, ElementRef, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart, registerables } from 'chart.js';
import { PontoGrafico } from '../../saldo';

Chart.register(...registerables);

@Component({
  selector: 'app-grafico-evolucao-saldo',
  imports: [CommonModule],
  templateUrl: './grafico-evolucao-saldo.html',
  styleUrl: './grafico-evolucao-saldo.scss'
})
export class GraficoEvolucaoSaldo implements AfterViewInit, OnChanges, OnDestroy {
  @Input() pontos: PontoGrafico[] = [];

  @ViewChild('chartCanvas') chartCanvas!: ElementRef<HTMLCanvasElement>;

  private chart: Chart | null = null;
  private viewInit = false;

  ngAfterViewInit(): void {
    this.viewInit = true;
    this.montarGrafico();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['pontos'] && this.viewInit) {
      this.montarGrafico();
    }
  }

  ngOnDestroy(): void {
    this.chart?.destroy();
  }

  private montarGrafico(): void {
    if (!this.chartCanvas) return;

    if (this.chart) {
      this.chart.destroy();
      this.chart = null;
    }

    this.chart = new Chart(this.chartCanvas.nativeElement, {
      type: 'line',
      data: {
        labels: this.pontos.map(p => p.label),
        datasets: [
          {
            label: 'Saldo',
            data: this.pontos.map(p => p.saldo),
            borderColor: '#6366f1',
            backgroundColor: 'rgba(99,102,241,0.12)',
            borderWidth: 2,
            pointRadius: 2,
            pointBackgroundColor: '#6366f1',
            tension: 0.3,
            fill: true
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
            callbacks: {
              label: c => ` Saldo: R$ ${(c.parsed.y ?? 0).toLocaleString('pt-BR')}`
            }
          }
        },
        scales: {
          x: {
            grid: { color: '#1a1f38' },
            ticks: { color: '#4b5e7a', font: { size: 10 }, maxTicksLimit: 12 }
          },
          y: {
            grid: { color: '#1a1f38' },
            ticks: { color: '#4b5e7a', font: { size: 11 }, callback: v => 'R$' + Number(v).toLocaleString('pt-BR') }
          }
        }
      }
    });
  }
}