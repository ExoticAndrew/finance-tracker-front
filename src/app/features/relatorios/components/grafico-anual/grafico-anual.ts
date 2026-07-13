import { Component, OnChanges, OnDestroy, AfterViewInit, SimpleChanges, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart, registerables } from 'chart.js';
import { ResumoMensal } from '../../../../core/services/transacao';

Chart.register(...registerables);

@Component({
  selector: 'app-grafico-anual',
  imports: [CommonModule],
  templateUrl: './grafico-anual.html',
  styleUrl: './grafico-anual.scss'
})
export class GraficoAnual implements AfterViewInit, OnChanges, OnDestroy {
  @Input() resumo: ResumoMensal[] = [];
  @Input() anoSelecionado = new Date().getFullYear();
  @Input() anosDisponiveis: number[] = [];
  @Output() anoChange = new EventEmitter<number>();

  @ViewChild('chartCanvas') chartCanvas!: ElementRef<HTMLCanvasElement>;

  private chart: Chart | null = null;
  private viewInit = false;
  private meses = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];

  ngAfterViewInit(): void {
    this.viewInit = true;
    this.montarGrafico();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['resumo'] && this.viewInit) {
      this.montarGrafico();
    }
  }

  ngOnDestroy(): void {
    this.chart?.destroy();
  }

  onAnoChange(ano: number): void {
    this.anoChange.emit(ano);
  }

  private montarGrafico(): void {
    if (!this.chartCanvas) return;

    const receitas = Array(12).fill(0);
    const despesas = Array(12).fill(0);

    this.resumo.forEach(item => {
      const idx = item.mes - 1;
      receitas[idx] = item.totalReceitas;
      despesas[idx] = item.totalDespesas;
    });

    if (this.chart) {
      this.chart.destroy();
      this.chart = null;
    }

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
          legend: {
            display: true,
            position: 'top',
            align: 'end',
            labels: { color: '#94a3b8', usePointStyle: true, boxWidth: 8, font: { size: 11 } }
          },
          tooltip: {
            backgroundColor: '#1e2340',
            borderColor: '#252d4a',
            borderWidth: 1,
            titleColor: '#6b7ea8',
            bodyColor: '#f1f5f9',
            callbacks: {
              label: c => ` ${c.dataset.label}: R$ ${(c.parsed.y ?? 0).toLocaleString('pt-BR')}`
            }
          }
        },
        scales: {
          x: { grid: { color: '#1a1f38' }, ticks: { color: '#4b5e7a', font: { size: 11 } } },
          y: {
            grid: { color: '#1a1f38' },
            ticks: { color: '#4b5e7a', font: { size: 11 }, callback: v => 'R$' + Number(v).toLocaleString('pt-BR') }
          }
        }
      }
    });
  }
}