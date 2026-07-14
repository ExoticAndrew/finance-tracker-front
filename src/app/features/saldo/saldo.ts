import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { AuthService } from '../../core/services/auth';
import { TemaService } from '../../core/services/tema';
import { TransacaoService, Extrato } from '../../core/services/transacao';
import { Sidebar } from '../dashboard/components/sidebar/sidebar';
import { ResumoSaldo } from './components/resumo-saldo/resumo-saldo';
import { GraficoEvolucaoSaldo } from './components/grafico-evolucao-saldo/grafico-evolucao-saldo';
import { ExtratoLista } from './components/extrato-lista/extrato-lista';

export interface LinhaExtrato {
  id: number;
  descricao: string;
  categoria: string;
  tipo: 'RECEITA' | 'DESPESA';
  valor: number;
  data: string;
  saldoApos: number;
}

export interface ResumoSaldoInfo {
  saldoAtual: number;
  maiorSaldo: number;
  menorSaldo: number;
  variacaoPercentual: number | null;
}

export interface PontoGrafico {
  label: string;
  saldo: number;
}

@Component({
  selector: 'app-saldo',
  imports: [Sidebar, ResumoSaldo, GraficoEvolucaoSaldo, ExtratoLista],
  templateUrl: './saldo.html',
  styleUrl: './saldo.scss'
})
export class Saldo implements OnInit {
  private authService = inject(AuthService);
  private transacaoService = inject(TransacaoService);
  temaService = inject(TemaService);

  nomeUsuario = this.authService.getNome();

  anoSelecionado = signal(new Date().getFullYear());
  anosDisponiveis = this.gerarAnos();
  extrato = signal<Extrato | null>(null);
  carregando = signal(true);

  linhasAscendente = computed<LinhaExtrato[]>(() => {
    const extrato = this.extrato();
    if (!extrato) return [];

    let saldo = extrato.saldoDeArrasto;
    return extrato.transacoes.map(t => {
      saldo = t.tipo === 'RECEITA' ? saldo + t.valor : saldo - t.valor;
      return {
        id: t.id,
        descricao: t.descricao,
        categoria: t.categoria,
        tipo: t.tipo,
        valor: t.valor,
        data: t.data,
        saldoApos: saldo
      };
    });
  });

  linhasDescendente = computed<LinhaExtrato[]>(() =>
    [...this.linhasAscendente()].reverse()
  );

  resumo = computed<ResumoSaldoInfo | null>(() => {
    const extrato = this.extrato();
    const linhas = this.linhasAscendente();
    if (!extrato) return null;

    const pontos = [extrato.saldoDeArrasto, ...linhas.map(l => l.saldoApos)];
    const saldoAtual = pontos[pontos.length - 1];
    const maiorSaldo = Math.max(...pontos);
    const menorSaldo = Math.min(...pontos);
    const base = extrato.saldoDeArrasto;
    const variacaoPercentual = base !== 0 ? ((saldoAtual - base) / Math.abs(base)) * 100 : null;

    return { saldoAtual, maiorSaldo, menorSaldo, variacaoPercentual };
  });

  pontosGrafico = computed<PontoGrafico[]>(() => {
    const extrato = this.extrato();
    const linhas = this.linhasAscendente();
    if (!extrato) return [];

    const porDia = new Map<string, number>();
    linhas.forEach(l => porDia.set(l.data, l.saldoApos));

    const pontos: PontoGrafico[] = [
      { label: `31/12/${this.anoSelecionado() - 1}`, saldo: extrato.saldoDeArrasto }
    ];

    porDia.forEach((saldo, data) => {
      pontos.push({ label: this.formatarDataBR(data), saldo });
    });

    return pontos;
  });

  ngOnInit(): void {
    this.carregarExtrato();
  }

  onAnoChange(ano: number): void {
    this.anoSelecionado.set(ano);
    this.carregarExtrato();
  }

  logout(): void {
    this.authService.logout();
  }

  private gerarAnos(): number[] {
    const atual = new Date().getFullYear();
    return [atual, atual - 1, atual - 2];
  }

  private formatarDataBR(dataIso: string): string {
    const [ano, mes, dia] = dataIso.substring(0, 10).split('-');
    return `${dia}/${mes}`;
  }

  private carregarExtrato(): void {
    this.carregando.set(true);
    this.transacaoService.getExtrato(this.anoSelecionado()).subscribe({
      next: (extrato) => {
        this.extrato.set(extrato);
        this.carregando.set(false);
      },
      error: () => this.carregando.set(false)
    });
  }
}