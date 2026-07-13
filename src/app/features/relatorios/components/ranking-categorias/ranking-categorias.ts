import { Component, OnChanges, SimpleChanges, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriaResumo } from '../../../../core/services/transacao';
import { iconeCategoria, corCategoria, labelCategoria } from '../../../../core/utils/categoria-metadata';

interface ItemRanking {
  categoria: string;
  label: string;
  icone: string;
  cor: string;
  total: number;
  percentual: number;
}

@Component({
  selector: 'app-ranking-categorias',
  imports: [CommonModule],
  templateUrl: './ranking-categorias.html',
  styleUrl: './ranking-categorias.scss'
})
export class RankingCategorias implements OnChanges {
  @Input() ranking: CategoriaResumo[] = [];

  itens: ItemRanking[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['ranking']) {
      this.montarItens();
    }
  }

  private montarItens(): void {
    const totalGeral = this.ranking.reduce((soma, item) => soma + item.total, 0);

    this.itens = this.ranking.map(item => ({
      categoria: item.categoria,
      label: labelCategoria(item.categoria),
      icone: iconeCategoria(item.categoria),
      cor: corCategoria(item.categoria),
      total: item.total,
      percentual: totalGeral > 0 ? (item.total / totalGeral) * 100 : 0
    }));
  }
}