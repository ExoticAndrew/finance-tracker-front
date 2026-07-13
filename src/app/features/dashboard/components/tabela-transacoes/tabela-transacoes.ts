import { Component, Input, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Transacao } from '../../../../core/services/transacao';

@Component({
  selector: 'app-tabela-transacoes',
  imports: [CommonModule, FormsModule],
  templateUrl: './tabela-transacoes.html',
  styleUrl: './tabela-transacoes.scss'
})
export class TabelaTransacoes {
  @Input() set transacoes(value: Transacao[]) {
    this._transacoes.set(value);
  }

  private _transacoes = signal<Transacao[]>([]);
  filtroNome = signal('');
  filtroData = signal('');
  menuAbertoId = signal<number | null>(null);

  transacoesFiltradas = computed(() =>
    this._transacoes().filter(t => {
      const nomeOk = t.descricao.toLowerCase().includes(this.filtroNome().toLowerCase());
      const dataOk = this.dataCorresponde(t.data, this.filtroData());
      return nomeOk && dataOk;
    })
  );

  onFiltroNome(valor: string): void { this.filtroNome.set(valor); }
  onFiltroData(valor: string): void { this.filtroData.set(valor); }

  toggleMenu(id: number): void {
    this.menuAbertoId.set(this.menuAbertoId() === id ? null : id);
  }

  private formatarDataBR(dataIso: string): string {
    const [ano, mes, dia] = dataIso.substring(0, 10).split('-');
    return `${dia}/${mes}/${ano}`;
  }

  private dataCorresponde(dataTransacao: string, filtro: string): boolean {
    if (!filtro) return true;

    const dataBR = this.formatarDataBR(dataTransacao);
    const [dia, mes, ano] = dataBR.split('/');

    if (/^\d{2}\/\d{2}\/\d{4}$/.test(filtro)) {
      return dataBR === filtro;
    }
    if (/^\d{2}\/\d{4}$/.test(filtro)) {
      const [mesFiltro, anoFiltro] = filtro.split('/');
      return mes === mesFiltro && ano === anoFiltro;
    }
    if (/^\d{4}$/.test(filtro)) {
      return ano === filtro;
    }
    return dataBR.includes(filtro);
  }

  getHorario(data: string): string {
    const d = new Date(data);
    if (isNaN(d.getTime())) return '';
    return d.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  }

  iconeCategoria(categoria: string): string {
    const mapa: Record<string, string> = {
      ALIMENTACAO: 'ti-tools-kitchen-2', TRANSPORTE: 'ti-car',
      MORADIA: 'ti-home', SAUDE: 'ti-heart', EDUCACAO: 'ti-school',
      LAZER: 'ti-device-gamepad-2', SALARIO: 'ti-briefcase',
      INVESTIMENTO: 'ti-trending-up', OUTRAS: 'ti-dots-circle-horizontal'
    };
    return mapa[categoria] ?? 'ti-circle';
  }

  corCategoria(categoria: string): string {
    const mapa: Record<string, string> = {
      ALIMENTACAO: '#ec4899', TRANSPORTE: '#f97316', MORADIA: '#8b5cf6',
      SAUDE: '#06b6d4', EDUCACAO: '#6366f1', LAZER: '#a855f7',
      SALARIO: '#06b6d4', INVESTIMENTO: '#84cc16', OUTRAS: '#3b82f6'
    };
    return mapa[categoria] ?? '#94a3b8';
  }

  iconeStatus(tipo: string): string {
    return tipo === 'RECEITA' ? 'ti-arrow-up-right' : 'ti-arrow-down-right';
  }
}