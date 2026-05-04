import { Component } from '@angular/core';
import { GraficoBarras } from './cards/grafico-barras/grafico-barras';
import { GraficoPizza } from './cards/grafico-pizza/grafico-pizza';

import { GraficoLinha } from './cards/grafico-linha/grafico-linha';
import { ResumoFinanceiro } from "./cards/resumo-financeiro/resumo-financeiro";

@Component({
  selector: 'app-relatorios',
  imports: [GraficoBarras, GraficoPizza, GraficoLinha, ResumoFinanceiro],
  templateUrl: './relatorios.html',
  styleUrl: './relatorios.scss',
})
export class Relatorios {}