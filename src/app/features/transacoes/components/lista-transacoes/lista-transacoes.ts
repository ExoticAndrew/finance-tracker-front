import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import type { Transacao } from '../../../../core/services/transacao';
import { TransacaoService } from '../../../../core/services/transacao';

@Component({
  selector: 'app-lista-transacoes',
  imports: [CommonModule],
  templateUrl: './lista-transacoes.html',
  styleUrl: './lista-transacoes.scss'
})
export class ListaTransacoes {
  @Input() transacoes: Transacao[] = [];
  @Input() totalPages = 0;
  @Input() paginaAtual = 0;
  @Input() carregando = false;

  @Output() editar = new EventEmitter<Transacao>();
  @Output() deletar = new EventEmitter<void>();
  @Output() mudarPagina = new EventEmitter<number>();

  private transacaoService = inject(TransacaoService);

  onEditar(t: Transacao): void {
    this.editar.emit(t);
  }

  onDeletar(id: number): void {
    if (!confirm('Deseja deletar esta transação?')) return;
    this.transacaoService.deletar(id).subscribe({
      next: () => this.deletar.emit()
    });
  }

  iconeCategoria(categoria: string): string {
    const mapa: Record<string, string> = {
      ALIMENTACAO: 'ti-shopping-cart', TRANSPORTE: 'ti-car',
      MORADIA: 'ti-home', SAUDE: 'ti-heart', EDUCACAO: 'ti-school',
      LAZER: 'ti-device-tv', SALARIO: 'ti-briefcase',
      INVESTIMENTO: 'ti-trending-up', OUTRAS: 'ti-dots-circle-horizontal'
    };
    return mapa[categoria] ?? 'ti-circle';
  }

  corCategoria(categoria: string): string {
    const mapa: Record<string, string> = {
      ALIMENTACAO: '#f59e0b', TRANSPORTE: '#38bdf8', MORADIA: '#8b5cf6',
      SAUDE: '#10b981', EDUCACAO: '#6366f1', LAZER: '#ef4444',
      SALARIO: '#6366f1', INVESTIMENTO: '#10b981', OUTRAS: '#94a3b8'
    };
    return mapa[categoria] ?? '#94a3b8';
  }

  paginas(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i);
  }
}