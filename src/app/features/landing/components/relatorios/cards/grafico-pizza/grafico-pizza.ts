import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Chart, ChartConfiguration, registerables } from 'chart.js';
import { AnimarAoEntrar } from '../../../../../../shared/directives/animar-ao-entrar';

Chart.register(...registerables);

@Component({
  selector: 'app-grafico-pizza',
  imports: [AnimarAoEntrar],
  templateUrl: './grafico-pizza.html',
  styleUrl: './grafico-pizza.scss',
})
export class GraficoPizza implements OnInit {
  @ViewChild('pizzaCanvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;

  ngOnInit() { this.criarGrafico(); }

  criarGrafico() {
    const config: ChartConfiguration = {
      type: 'doughnut',
      data: {
        labels: ['Alimentação', 'Transporte', 'Entretenimento', 'Saúde', 'Assinatura'],
        datasets: [{
          data: [249, 46, 64.90, 99, 19.90],
          backgroundColor: ['rgba(61,184,122,0.8)', 'rgba(245,166,35,0.8)', 'rgba(94,156,245,0.8)', 'rgba(167,139,250,0.8)', 'rgba(240,66,66,0.8)'],
          borderColor: ['#3db87a', '#f5a623', '#5e9cf5', '#a78bfa', '#f04242'],
          borderWidth: 1,
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: 'right', labels: { color: 'rgba(255,255,255,0.7)', font: { family: 'Inter', size: 11 }, padding: 12 } },
          tooltip: { callbacks: { label: (ctx) => `R$ ${(ctx.parsed ?? 0).toLocaleString('pt-BR')}` } }
        }
      }
    };
    new Chart(this.canvasRef.nativeElement, config);
  }
}