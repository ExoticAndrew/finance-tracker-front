import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Chart, ChartConfiguration, registerables } from 'chart.js';
import { AnimarAoEntrar } from '../../../../../../shared/directives/animar-ao-entrar';

Chart.register(...registerables);

@Component({
  selector: 'app-grafico-linha',
  imports: [AnimarAoEntrar],
  templateUrl: './grafico-linha.html',
  styleUrl: './grafico-linha.scss',
})
export class GraficoLinha implements OnInit {
  @ViewChild('linhaCanvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;

  ngOnInit() { this.criarGrafico(); }

  criarGrafico() {
    const config: ChartConfiguration = {
      type: 'line',
      data: {
        labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
        datasets: [{
          label: 'Saldo',
          data: [1200, 2100, 2800, 3200, 2900, 3779],
          borderColor: '#3b82f6',
          backgroundColor: 'rgba(59,130,246,0.1)',
          borderWidth: 2,
          pointBackgroundColor: '#3b82f6',
          pointRadius: 4,
          pointHoverRadius: 6,
          fill: true,
          tension: 0.4,
        }]
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