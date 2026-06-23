import { Component, OnInit, OnDestroy, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransacaoService, Transacao } from '../../../../core/services/transacao';
import { EventosService } from '../../../../core/services/eventos';
import { Subscription } from 'rxjs';

interface CategoriaResumo {
  nome: string;
  cor: string;
  icone: string;
  percentual: number;
  total: number;
}

@Component({
  selector: 'app-medidor-atividade',
  imports: [CommonModule],
  templateUrl: './medidor-atividade.html',
  styleUrl: './medidor-atividade.scss'
})
export class MedidorAtividade implements OnInit, OnDestroy {
  private transacaoService = inject(TransacaoService);
  private eventosService = inject(EventosService);
  private sub!: Subscription;

  private _transacoes = signal<Transacao[]>([]);

  private readonly CORES: Record<string, string> = {
    ALIMENTACAO:  '#ec4899',
    TRANSPORTE:   '#f97316',
    MORADIA:      '#8b5cf6',
    SAUDE:        '#06b6d4',
    EDUCACAO:     '#6366f1',
    LAZER:        '#a855f7',
    SALARIO:      '#06b6d4',
    INVESTIMENTO: '#84cc16',
    OUTRAS:       '#3b82f6'
  };

  private readonly ICONES: Record<string, string> = {
    ALIMENTACAO:  'ti-tools-kitchen-2',
    TRANSPORTE:   'ti-car',
    MORADIA:      'ti-home',
    SAUDE:        'ti-heart',
    EDUCACAO:     'ti-school',
    LAZER:        'ti-device-gamepad-2',
    SALARIO:      'ti-briefcase',
    INVESTIMENTO: 'ti-trending-up',
    OUTRAS:       'ti-dots-circle-horizontal'
  };

  private despesas = computed(() =>
    this._transacoes().filter(t => t.tipo === 'DESPESA')
  );

  totalDespesas = computed(() =>
    this.despesas().reduce((acc, t) => acc + Number(t.valor), 0)
  );

  categorias = computed<CategoriaResumo[]>(() => {
    if (this.totalDespesas() === 0) return [];
    const agrupado: Record<string, number> = {};
    this.despesas().forEach(t => {
      agrupado[t.categoria] = (agrupado[t.categoria] ?? 0) + Number(t.valor);
    });
    return Object.entries(agrupado)
      .map(([nome, total]) => ({
        nome,
        cor: this.CORES[nome] ?? '#94a3b8',
        icone: this.ICONES[nome] ?? 'ti-circle',
        percentual: Math.round((total / this.totalDespesas()) * 100),
        total
      }))
      .sort((a, b) => b.percentual - a.percentual);
  });

  dominante = computed(() =>
    this.categorias().length ? this.categorias()[0] : null
  );

  arcos = computed(() => {
    const circunferencia = 2 * Math.PI * 45;
    let acumulado = 0;
    return this.categorias().map(cat => {
      const dash = (cat.percentual / 100) * circunferencia;
      const offset = circunferencia - acumulado * circunferencia / 100;
      acumulado += cat.percentual;
      return { ...cat, dash, offset, circunferencia };
    });
  });

  ngOnInit(): void {
    this.carregar();
    this.sub = this.eventosService.transacaoAtualizada$.subscribe(() => this.carregar());
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  carregar(): void {
    this.transacaoService.listar(0, 999).subscribe({
      next: p => this._transacoes.set(p.content),
      error: () => this._transacoes.set([])
    });
  }
}