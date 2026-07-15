import { Component, Output, EventEmitter, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransacaoService } from '../../../../core/services/transacao';
import { parseArquivoExcel, LinhaImportada } from '../../utils/importar-planilha';

@Component({
  selector: 'app-importar-planilha-modal',
  imports: [CommonModule],
  templateUrl: './importar-planilha-modal.html',
  styleUrl: './importar-planilha-modal.scss'
})
export class ImportarPlanilhaModal {
  @Output() fechar = new EventEmitter<void>();
  @Output() importado = new EventEmitter<void>();

  private transacaoService = inject(TransacaoService);

  linhas = signal<LinhaImportada[]>([]);
  erroArquivo = signal<string | null>(null);
  processando = signal(false);
  enviando = signal(false);
  erroEnvio = signal('');

  linhasValidas(): LinhaImportada[] {
    return this.linhas().filter(l => l.erros.length === 0);
  }

  linhasComErro(): LinhaImportada[] {
    return this.linhas().filter(l => l.erros.length > 0);
  }

  async onArquivoSelecionado(event: Event): Promise<void> {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;

    this.processando.set(true);
    this.erroArquivo.set(null);
    this.erroEnvio.set('');
    this.linhas.set([]);

    const resultado = await parseArquivoExcel(file);
    if (resultado.erroArquivo) {
      this.erroArquivo.set(resultado.erroArquivo);
    } else {
      this.linhas.set(resultado.linhas);
    }

    this.processando.set(false);
    input.value = '';
  }

  confirmarImportacao(): void {
    const validas = this.linhasValidas();
    if (validas.length === 0) return;

    this.enviando.set(true);
    this.erroEnvio.set('');

    const payload = validas.map(l => ({
      descricao: l.descricao,
      valor: l.valor,
      tipo: l.tipo,
      categoria: l.categoria,
      data: l.data,
      observacoes: l.observacoes || null
    }));

    this.transacaoService.criarEmLote(payload).subscribe({
      next: () => {
        this.enviando.set(false);
        this.importado.emit();
      },
      error: (err) => {
        this.enviando.set(false);
        this.erroEnvio.set(
          err.error?.mensagem || 'Não foi possível importar. Verifique os dados e tente novamente.'
        );
      }
    });
  }

  fecharModal(): void {
    this.fechar.emit();
  }
}