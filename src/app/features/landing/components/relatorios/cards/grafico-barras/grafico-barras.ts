import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Chart, ChartConfiguration, registerables } from 'chart.js';
import { AnimarAoEntrar } from '../../../../../../shared/directives/animar-ao-entrar';

Chart.register(...registerables);

@Component({
  selector: 'app-grafico-barras',
  imports: [AnimarAoEntrar],
  templateUrl: './grafico-barras.html',
  styleUrl: './grafico-barras.scss',
})
export class GraficoBarras implements OnInit {
  @ViewChild('barrasCanvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;

  ngOnInit() { this.criarGrafico(); }

  criarGrafico() {
    const config: ChartConfiguration = {
      type: 'bar',
      data: {
        labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
        datasets: [
          {
            label: 'Receitas',
            data: [3500, 4300, 3800, 4100, 3900, 4500],
            backgroundColor: 'rgba(61, 184, 122, 0.7)',
            borderColor: '#3db87a',
            borderWidth: 1,
            borderRadius: 6,
          },
          {
            label: 'Despesas',
            data: [1200, 1800, 1500, 1300, 1600, 1400],
            backgroundColor: 'rgba(240, 66, 66, 0.7)',
            borderColor: '#f04242',
            borderWidth: 1,
            borderRadius: 6,
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { labels: { color: 'rgba(255,255,255,0.7)', font: { family: 'Inter', size: 12 } } },
          tooltip: { callbacks: { label: (ctx) => `R$ ${(ctx.parsed.y ?? 0).toLocaleString('pt-BR')}` } }
        },
        scales: {
          x: { ticks: { color: 'rgba(255,255,255,0.5)' }, grid: { color: 'rgba(255,255,255,0.05)' } },
          y: { ticks: { color: 'rgba(255,255,255,0.5)', callback: (val) => `R$ ${Number(val).toLocaleString('pt-BR')}` }, grid: { color: 'rgba(255,255,255,0.05)' } }
        }
      }
    };
    new Chart(this.canvasRef.nativeElement, config);
  }
}