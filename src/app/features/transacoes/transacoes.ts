import { Component, inject, OnInit, OnDestroy, signal } from '@angular/core';
import { TransacaoService, Transacao } from '../../core/services/transacao';
import { AuthService } from '../../core/services/auth';
import { EventosService } from '../../core/services/eventos';
import { Sidebar } from '../dashboard/components/sidebar/sidebar';
import { ListaTransacoes } from './components/lista-transacoes/lista-transacoes';
import { ModalTransacao } from './components/modal-transacao/modal-transacao';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-transacoes',
  imports: [Sidebar, ListaTransacoes, ModalTransacao],
  templateUrl: './transacoes.html',
  styleUrl: './transacoes.scss'
})
export class Transacoes implements OnInit, OnDestroy {
  private transacaoService = inject(TransacaoService);
  private eventosService = inject(EventosService);
  private sub!: Subscription;
  private authService = inject(AuthService);
nomeUsuario = this.authService.getNome();

  transacoes = signal<Transacao[]>([]);
  totalElements = signal<number>(0);
  totalPages = signal<number>(0);
  paginaAtual = signal<number>(0);
  carregando = signal<boolean>(true);
  modalAberto = signal<boolean>(false);
  transacaoEditando = signal<Transacao | null>(null);

  ngOnInit(): void {
    this.carregar();
    this.sub = this.eventosService.transacaoAtualizada$.subscribe(() => {
      this.carregar(this.paginaAtual());
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  carregar(pagina = 0): void {
    this.carregando.set(true);
    this.transacaoService.listar(pagina, 10).subscribe({
      next: (p) => {
        this.transacoes.set(p.content);
        this.totalElements.set(p.totalElements);
        this.totalPages.set(p.totalPages);
        this.paginaAtual.set(p.number);
        this.carregando.set(false);
      },
      error: () => this.carregando.set(false)
    });
  }

  abrirModalNovo(): void {
    this.transacaoEditando.set(null);
    this.modalAberto.set(true);
  }

  abrirModalEditar(transacao: Transacao): void {
    this.transacaoEditando.set(transacao);
    this.modalAberto.set(true);
  }

  fecharModal(): void {
    this.modalAberto.set(false);
    this.transacaoEditando.set(null);
  }

  onSalvo(): void {
    this.fecharModal();
  }

  onDeletado(): void {
    this.carregar(this.paginaAtual());
  }

  logout(): void {
    this.authService.logout();
  }
}