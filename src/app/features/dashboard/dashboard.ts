import { Component, inject, OnInit, OnDestroy, signal } from '@angular/core';
import { TransacaoService, Transacao, ComparativoMensal } from '../../core/services/transacao';
import { AuthService } from '../../core/services/auth';
import { EventosService } from '../../core/services/eventos';
import { TemaService } from '../../core/services/tema';
import { Sidebar } from './components/sidebar/sidebar';
import { TopCards } from './components/top-cards/top-cards';
import { GraficoEvolucao } from './components/grafico-evolucao/grafico-evolucao';
import { TabelaTransacoes } from './components/tabela-transacoes/tabela-transacoes';
import { CardSaldo } from './components/card-saldo/card-saldo';
import { MedidorAtividade } from './components/medidor-atividade/medidor-atividade';
import { Subscription, forkJoin } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  imports: [Sidebar, TopCards, GraficoEvolucao, TabelaTransacoes, CardSaldo, MedidorAtividade],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class Dashboard implements OnInit, OnDestroy {
  private transacaoService = inject(TransacaoService);
  private authService = inject(AuthService);
  private eventosService = inject(EventosService);
  
  
  temaService = inject(TemaService);
  private sub!: Subscription;

  nomeUsuario = this.authService.getNome();

  saldo = signal<number>(0);
  totalReceitas = signal<number>(0);
  totalDespesas = signal<number>(0);
  transacoes = signal<Transacao[]>([]);
  comparativo = signal<ComparativoMensal | null>(null);
  carregando = signal<boolean>(true);

  ngOnInit(): void {
    this.carregarDados();
    this.sub = this.eventosService.transacaoAtualizada$.subscribe(() => {
      this.carregarDados();
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  carregarDados(): void {
    this.carregando.set(true);

    forkJoin({
      saldo: this.transacaoService.getSaldo(),
      receitas: this.transacaoService.getTotalPorTipo('RECEITA'),
      despesas: this.transacaoService.getTotalPorTipo('DESPESA'),
      transacoes: this.transacaoService.listar(0, 5),
      comparativo: this.transacaoService.getComparativoMensal()
    }).subscribe({
      next: (res) => {
        this.saldo.set(Number(res.saldo));
        this.totalReceitas.set(Number(res.receitas));
        this.totalDespesas.set(Number(res.despesas));
        this.transacoes.set(res.transacoes.content);
        this.comparativo.set(res.comparativo);
        this.carregando.set(false);
      },
      error: () => this.carregando.set(false)
    });
  }

  logout(): void {
    this.authService.logout();
  }
}