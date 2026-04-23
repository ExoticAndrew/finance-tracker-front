import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card-historico',
  imports: [CommonModule],
  templateUrl: './card-historico.html',
  styleUrl: './card-historico.scss',
})
export class CardHistorico implements OnInit {

  constructor(private cdr: ChangeDetectorRef) {}

  categorias = ['Todos', 'Alimentação', 'Entretenimento', 'Receita', 'Transporte', 'Assinatura'];
  categoriaAtiva = 'Todos';
  indexCategoria = 0;

  todasTransacoesHistorico = [
    { descricao: 'Mercado', categoria: 'Alimentação', valor: 'R$ 150,00', emoji: '🥑', cor: '#3db87a' },
    { descricao: 'Netflix', categoria: 'Entretenimento', valor: 'R$ 45,00', emoji: '🎬', cor: '#5e9cf5' },
    { descricao: 'Salário', categoria: 'Receita', valor: 'R$ 3.500,00', emoji: '💰', cor: '#3db87a' },
    { descricao: 'Uber', categoria: 'Transporte', valor: 'R$ 23,00', emoji: '🚗', cor: '#f5a623' },
    { descricao: 'Café', categoria: 'Alimentação', valor: 'R$ 12,00', emoji: '☕', cor: '#f5a623' },
    { descricao: 'Spotify', categoria: 'Assinatura', valor: 'R$ 19,90', emoji: '🎵', cor: '#a78bfa' },
    { descricao: 'Restaurante', categoria: 'Alimentação', valor: 'R$ 87,00', emoji: '🍽️', cor: '#5e9cf5' },
  ];

  transacoesFiltradas = [...this.todasTransacoesHistorico];

  ngOnInit() {
    setInterval(() => this.trocarFiltro(), 2000);
  }

  trocarFiltro() {
    this.indexCategoria = (this.indexCategoria + 1) % this.categorias.length;
    this.categoriaAtiva = this.categorias[this.indexCategoria];

    if (this.categoriaAtiva === 'Todos') {
      this.transacoesFiltradas = [...this.todasTransacoesHistorico];
    } else {
      this.transacoesFiltradas = this.todasTransacoesHistorico.filter(
        t => t.categoria === this.categoriaAtiva
      );
    }
    this.cdr.detectChanges();
  }
}