import { Component, OnInit, inject, signal } from '@angular/core';
import { AuthService } from '../../core/services/auth';
import { TemaService } from '../../core/services/tema';
import { TransacaoService, ResumoMensal } from '../../core/services/transacao';
import { Sidebar } from '../dashboard/components/sidebar/sidebar';
import { GraficoAnual } from './components/grafico-anual/grafico-anual';
import { AnaliseMensal } from './components/analise-mensal/analise-mensal';
import { DestaqueMeses } from './components/destaque-meses/destaque-meses';

@Component({
  selector: 'app-relatorios',
  imports: [Sidebar, GraficoAnual, AnaliseMensal, DestaqueMeses],
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
    this.transacaoService.getResumoMensal(this.anoSelecionado()).subscribe({
      next: (resumo) => {
        this.resumoMensal.set(resumo);
        this.carregando.set(false);
      },
      error: () => this.carregando.set(false)
    });
  }
}