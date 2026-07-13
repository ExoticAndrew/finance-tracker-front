import { Component, OnInit, inject, signal } from '@angular/core';
import { forkJoin } from 'rxjs';
import { AuthService } from '../../core/services/auth';
import { TemaService } from '../../core/services/tema';
import { TransacaoService, ResumoMensal, CategoriaResumo } from '../../core/services/transacao';
import { Sidebar } from '../dashboard/components/sidebar/sidebar';
import { GraficoAnual } from './components/grafico-anual/grafico-anual';
import { AnaliseMensal } from './components/analise-mensal/analise-mensal';
import { DestaqueMeses } from './components/destaque-meses/destaque-meses';
import { InsightsAnuais } from './components/insights-anuais/insights-anuais';
import { ProjecaoAnual } from './components/projecao-anual/projecao-anual';
import { RankingCategorias } from './components/ranking-categorias/ranking-categorias';

@Component({
  selector: 'app-relatorios',
  imports: [Sidebar, GraficoAnual, AnaliseMensal, DestaqueMeses, InsightsAnuais, ProjecaoAnual, RankingCategorias],
  templateUrl: './relatorios.html',
  styleUrl: './relatorios.scss'
})
export class Relatorios implements OnInit {
  private authService = inject(AuthService);
  private transacaoService = inject(TransacaoService);
  temaService = inject(TemaService);

  nomeUsuario = this.authService.getNome();

  anoSelecionado = signal(new Date().getFullYear());
  anosDisponiveis = this.gerarAnos();
  resumoMensal = signal<ResumoMensal[]>([]);
  rankingCategorias = signal<CategoriaResumo[]>([]);
  carregando = signal(true);

  ngOnInit(): void {
    this.carregarResumo();
  }

  onAnoChange(ano: number): void {
    this.anoSelecionado.set(ano);
    this.carregarResumo();
  }

  logout(): void {
    this.authService.logout();
  }

  private gerarAnos(): number[] {
    const atual = new Date().getFullYear();
    return [atual, atual - 1, atual - 2];
  }

  private carregarResumo(): void {
    this.carregando.set(true);
    forkJoin({
      resumo: this.transacaoService.getResumoMensal(this.anoSelecionado()),
      ranking: this.transacaoService.getRankingCategorias(this.anoSelecionado())
    }).subscribe({
      next: (res) => {
        this.resumoMensal.set(res.resumo);
        this.rankingCategorias.set(res.ranking);
        this.carregando.set(false);
      },
      error: () => this.carregando.set(false)
    });
  }
}