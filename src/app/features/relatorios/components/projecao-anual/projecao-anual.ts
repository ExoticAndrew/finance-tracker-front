import { Component, OnChanges, SimpleChanges, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResumoMensal } from '../../../../core/services/transacao';

@Component({
  selector: 'app-projecao-anual',
  imports: [CommonModule],
  templateUrl: './projecao-anual.html',
  styleUrl: './projecao-anual.scss'
})
export class ProjecaoAnual implements OnChanges {
  @Input() resumo: ResumoMensal[] = [];
  @Input() ano = new Date().getFullYear();

  mostrar = false;
  receitaProjetada = 0;
  despesaProjetada = 0;
  saldoProjetado = 0;
  mesesRestantes = 0;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['resumo'] || changes['ano']) {
      this.calcularProjecao();
    }
  }

  private calcularProjecao(): void {
    const anoAtual = new Date().getFullYear();
    const comDados = this.resumo.filter(item => item.totalReceitas > 0 || item.totalDespesas > 0);
    const mesesComDados = comDados.length;
    this.mesesRestantes = 12 - mesesComDados;

    this.mostrar = this.ano === anoAtual && mesesComDados > 0 && this.mesesRestantes > 0;
    if (!this.mostrar) return;

    const totalReceitas = comDados.reduce((soma, item) => soma + item.totalReceitas, 0);
    const totalDespesas = comDados.reduce((soma, item) => soma + item.totalDespesas, 0);
    const receitaMedia = totalReceitas / mesesComDados;
    const despesaMedia = totalDespesas / mesesComDados;

    this.receitaProjetada = totalReceitas + receitaMedia * this.mesesRestantes;
    this.despesaProjetada = totalDespesas + despesaMedia * this.mesesRestantes;
    this.saldoProjetado = this.receitaProjetada - this.despesaProjetada;
  }
}