import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card-categorias',
  imports: [CommonModule],
  templateUrl: './card-categorias.html',
  styleUrl: './card-categorias.scss',
})
export class CardCategorias implements OnInit {

  constructor(private cdr: ChangeDetectorRef) {}

  periodos = ['Este mês', 'Mês passado'];
  periodoAtivo = 'Este mês';
  indexPeriodo = 0;

  categoriasDados: { [key: string]: { emoji: string, valor: number, max: number }[] } = {
    'Este mês': [
      { emoji: '🥑', valor: 249, max: 500 },
      { emoji: '🚗', valor: 46, max: 500 },
      { emoji: '🎬', valor: 64.90, max: 500 },
      { emoji: '💪', valor: 99, max: 500 },
    ],
    'Mês passado': [
      { emoji: '🥑', valor: 312, max: 500 },
      { emoji: '🚗', valor: 89, max: 500 },
      { emoji: '🎬', valor: 45, max: 500 },
      { emoji: '💪', valor: 99, max: 500 },
    ]
  };

  nomesCategorias = ['Alimentação', 'Transporte', 'Entretenimento', 'Saúde'];
  categoriasAtivas: { emoji: string, nome: string, valor: number, porcentagem: number }[] = [];

  ngOnInit() {
    this.atualizarCategorias();
    setInterval(() => this.trocarPeriodo(), 5000);
  }

  trocarPeriodo() {
    this.indexPeriodo = (this.indexPeriodo + 1) % this.periodos.length;
    this.periodoAtivo = this.periodos[this.indexPeriodo];
    this.atualizarCategorias();
  }

  atualizarCategorias() {
    const dados = this.categoriasDados[this.periodoAtivo];
    this.categoriasAtivas = dados.map((d, i) => ({
      emoji: d.emoji,
      nome: this.nomesCategorias[i],
      valor: d.valor,
      porcentagem: Math.round((d.valor / d.max) * 100)
    }));
    this.cdr.detectChanges();
  }
}