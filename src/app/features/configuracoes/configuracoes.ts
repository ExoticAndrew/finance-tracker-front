import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { AuthService } from '../../core/services/auth';
import { TemaService } from '../../core/services/tema';
import { TransacaoService } from '../../core/services/transacao';
import { UsuarioService, Usuario } from '../../core/services/usuario';
import { Sidebar } from '../dashboard/components/sidebar/sidebar';
import { sanitizarValorPlanilha } from '../../core/utils/sanitizar-formula';

@Component({
  selector: 'app-configuracoes',
  imports: [CommonModule, FormsModule, Sidebar],
  templateUrl: './configuracoes.html',
  styleUrl: './configuracoes.scss'
})
export class Configuracoes implements OnInit {
  private authService = inject(AuthService);
  private usuarioService = inject(UsuarioService);
  private transacaoService = inject(TransacaoService);
  temaService = inject(TemaService);

  nomeUsuario = this.authService.getNome();

  perfil = signal<Usuario | null>(null);
  nomeEditado = signal('');
  editando = signal(false);
  salvando = signal(false);
  erroNome = signal('');
  sucessoNome = signal(false);

  exportando = signal(false);

  totalTransacoes = signal(0);
  totalReceitas = signal(0);
  totalDespesas = signal(0);

  ngOnInit(): void {
    this.usuarioService.getPerfil().subscribe({
      next: (usuario) => {
        this.perfil.set(usuario);
        this.nomeEditado.set(usuario.nome);
      }
    });

    this.carregarEstatisticas();
  }

  iniciarEdicao(): void {
    this.editando.set(true);
    this.sucessoNome.set(false);
    this.erroNome.set('');
  }

  cancelarEdicao(): void {
    this.editando.set(false);
    this.nomeEditado.set(this.perfil()?.nome ?? '');
    this.erroNome.set('');
  }

  salvarNome(): void {
    const nome = this.nomeEditado().trim();
    if (nome.length < 2) {
      this.erroNome.set('Nome deve ter pelo menos 2 caracteres.');
      return;
    }

    this.salvando.set(true);
    this.usuarioService.atualizarNome(nome).subscribe({
      next: (usuario) => {
        this.perfil.set(usuario);
        this.nomeUsuario = usuario.nome;
        this.authService.atualizarNomeCache(usuario.nome);
        this.editando.set(false);
        this.salvando.set(false);
        this.sucessoNome.set(true);
        this.erroNome.set('');
      },
      error: () => {
        this.erroNome.set('Não foi possível salvar. Tente novamente.');
        this.salvando.set(false);
      }
    });
  }

  logout(): void {
    this.authService.logout();
  }

  exportarCSV(): void {
    this.exportando.set(true);
    this.transacaoService.listar(0, 10000).subscribe({
      next: (pagina) => {
        const cabecalho = ['Descrição', 'Valor', 'Tipo', 'Categoria', 'Data'].join(',');
        const linhas = pagina.content.map(t =>
          [
            sanitizarValorPlanilha(t.descricao),
            t.valor,
            t.tipo,
            t.categoria,
            t.data
          ]
            .map(v => `"${String(v).replace(/"/g, '""')}"`)
            .join(',')
        );
        const csv = [cabecalho, ...linhas].join('\n');
        const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `fintrack-transacoes-${new Date().toISOString().slice(0, 10)}.csv`;
        a.click();
        URL.revokeObjectURL(url);
        this.exportando.set(false);
      },
      error: () => this.exportando.set(false)
    });
  }

  private carregarEstatisticas(): void {
    forkJoin({
      pagina: this.transacaoService.listar(0, 1),
      receitas: this.transacaoService.getTotalPorTipo('RECEITA'),
      despesas: this.transacaoService.getTotalPorTipo('DESPESA')
    }).subscribe({
      next: (res) => {
        this.totalTransacoes.set(res.pagina.totalElements);
        this.totalReceitas.set(Number(res.receitas));
        this.totalDespesas.set(Number(res.despesas));
      }
    });
  }
}