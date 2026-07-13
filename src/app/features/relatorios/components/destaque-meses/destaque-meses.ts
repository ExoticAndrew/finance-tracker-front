import { Component, OnChanges, SimpleChanges, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResumoMensal } from '../../../../core/services/transacao';

interface DestaqueMes {
  nomeMes: string;
  saldo: number;
  saldoFormatado: string;
  saldoPositivo: boolean;
  receita: number;
  despesa: number;
}

@Component({
  selector: 'app-destaque-meses',
  imports: [CommonModule],
  templateUrl: './destaque-meses.html',
  styleUrl: './destaque-meses.scss'
})
export class DestaqueMeses implements OnChanges {
  @Input() resumo: ResumoMensal[] = [];

  private nomesMeses = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];

  melhorMes: DestaqueMes | null = null;
  piorMes: DestaqueMes | null = null;
  mesUnico = false;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['resumo']) {
      this.calcularDestaques();
    }
  }

  private calcularDestaques(): void {
    const comDados = this.resumo.filter(item => item.totalReceitas > 0 || item.totalDespesas > 0);

    if (comDados.length === 0) {
      this.melhorMes = null;
      this.piorMes = null;
      return;
    }

    const mapeado: DestaqueMes[] = comDados.map(item => this.mapearMes(item));

    this.melhorMes = mapeado.reduce((max, atual) => (atual.saldo > max.saldo ? atual : max));
    this.piorMes = mapeado.reduce((min, atual) => (atual.saldo < min.saldo ? atual : min));
    this.mesUnico = comDados.length === 1;
  }

  private mapearMes(item: ResumoMensal): DestaqueMes {
    const saldo = item.totalReceitas - item.totalDespesas;
    return {
      nomeMes: this.nomesMeses[item.mes - 1],
      saldo,
      saldoFormatado: this.formatarSaldo(saldo),
      saldoPositivo: saldo >= 0,
      receita: item.totalReceitas,
      despesa: item.totalDespesas
    };
  }

  private formatarSaldo(saldo: number): string {
    const sinal = saldo >= 0 ? '+' : '-';
    return `${sinal}R$ ${Math.abs(saldo).toLocaleString('pt-BR')}`;
  }
}