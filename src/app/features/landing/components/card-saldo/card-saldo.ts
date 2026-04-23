import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card-saldo',
  imports: [CommonModule],
  templateUrl: './card-saldo.html',
  styleUrl: './card-saldo.scss',
})
export class CardSaldo implements OnInit {

  constructor(private cdr: ChangeDetectorRef) {}

  saldo = 2847.50;
  transacaoAtual: any = null;
  mostrarTransacao = false;

  transacoesAnimadas = [
    { descricao: 'Salário', valor: 3500.00, tipo: 'receita', emoji: '💰' },
    { descricao: 'Netflix', valor: -45.00, tipo: 'despesa', emoji: '🎬' },
    { descricao: 'Freelance', valor: 800.00, tipo: 'receita', emoji: '💻' },
    { descricao: 'Mercado', valor: -150.00, tipo: 'despesa', emoji: '🛒' },
    { descricao: 'Uber', valor: -23.00, tipo: 'despesa', emoji: '🚗' },
  ];
  indexSaldo = 0;

  ngOnInit() {
    setInterval(() => this.animarSaldo(), 2500);
  }

  animarSaldo() {
    const t = this.transacoesAnimadas[this.indexSaldo % this.transacoesAnimadas.length];
    this.indexSaldo++;
    this.transacaoAtual = t;
    this.mostrarTransacao = true;
    this.cdr.detectChanges();

    const inicio = this.saldo;
    const fim = this.saldo + t.valor;
    const duracao = 800;
    const passos = 30;
    const incremento = (fim - inicio) / passos;
    let passo = 0;

    const intervalo = setInterval(() => {
      passo++;
      this.saldo = inicio + incremento * passo;
      this.cdr.detectChanges();
      if (passo >= passos) {
        this.saldo = fim;
        clearInterval(intervalo);
      }
    }, duracao / passos);

    setTimeout(() => {
      this.mostrarTransacao = false;
      this.cdr.detectChanges();
    }, 1500);
  }

  formatarSaldo(valor: number): string {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }
}