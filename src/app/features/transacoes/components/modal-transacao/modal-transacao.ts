import { Component, Input, Output, EventEmitter, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TransacaoService, Transacao } from '../../../../core/services/transacao';
import { EventosService } from '../../../../core/services/eventos';

@Component({
  selector: 'app-modal-transacao',
  imports: [CommonModule, FormsModule],
  templateUrl: './modal-transacao.html',
  styleUrl: './modal-transacao.scss'
})
export class ModalTransacao implements OnInit {
  @Input() transacao: Transacao | null = null;
  @Output() fechar = new EventEmitter<void>();
  @Output() salvo = new EventEmitter<void>();

  private transacaoService = inject(TransacaoService);
  private eventosService = inject(EventosService);

  carregando = signal(false);
  erro = signal('');

  descricao = '';
  valor: number | null = null;
  tipo: 'RECEITA' | 'DESPESA' = 'DESPESA';
  categoria = '';
  data = '';
  observacoes = '';

  categorias = [
    'ALIMENTACAO', 'TRANSPORTE', 'MORADIA', 'SAUDE',
    'EDUCACAO', 'LAZER', 'SALARIO', 'INVESTIMENTO', 'OUTRAS'
  ];

  get isEdicao(): boolean {
    return !!this.transacao;
  }

  ngOnInit(): void {
    if (this.transacao) {
      this.descricao   = this.transacao.descricao;
      this.valor       = this.transacao.valor;
      this.tipo        = this.transacao.tipo;
      this.categoria   = this.transacao.categoria;
      this.data        = this.transacao.data;
      this.observacoes = this.transacao.observacoes ?? '';
    } else {
      this.data = new Date().toISOString().split('T')[0];
    }
  }

  salvar(): void {
    if (!this.descricao || !this.valor || !this.categoria || !this.data) {
      this.erro.set('Preencha todos os campos obrigatórios.');
      return;
    }

    this.erro.set('');
    this.carregando.set(true);

    const payload = {
      descricao: this.descricao,
      valor: this.valor,
      tipo: this.tipo,
      categoria: this.categoria,
      data: this.data,
      observacoes: this.observacoes || null
    };

    const req$ = this.isEdicao
      ? this.transacaoService.atualizar(this.transacao!.id, payload)
      : this.transacaoService.criar(payload);

    req$.subscribe({
      next: () => {
        this.carregando.set(false);
        this.eventosService.notificarAtualizacao();
        this.salvo.emit();
      },
      error: () => {
        this.carregando.set(false);
        this.erro.set('Erro ao salvar. Tente novamente.');
      }
    });
  }

  fecharModal(): void {
    this.fechar.emit();
  }
}