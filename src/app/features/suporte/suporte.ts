import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth';
import { TemaService } from '../../core/services/tema';
import { Sidebar } from '../dashboard/components/sidebar/sidebar';

interface FaqItem {
  pergunta: string;
  resposta: string;
}

@Component({
  selector: 'app-suporte',
  imports: [CommonModule, Sidebar],
  templateUrl: './suporte.html',
  styleUrl: './suporte.scss'
})
export class Suporte {
  private authService = inject(AuthService);
  temaService = inject(TemaService);

  nomeUsuario = this.authService.getNome();

  perguntaAberta = signal<number | null>(0);

  faqs: FaqItem[] = [
    {
      pergunta: 'Como o saldo é calculado?',
      resposta: 'Seu saldo é a soma de todas as receitas menos todas as despesas cadastradas, desde o início da sua conta.'
    },
    {
      pergunta: 'Como exportar minhas transações?',
      resposta: 'Na tela de Configurações, clique em "Exportar CSV" na seção Exportar dados. O arquivo baixado pode ser aberto no Excel, Google Planilhas ou qualquer programa de planilhas.'
    },
    {
      pergunta: 'Como alterar meu nome?',
      resposta: 'Na tela de Configurações, clique em "Editar" ao lado do seu nome, digite o novo nome e confirme em Salvar.'
    },
    {
      pergunta: 'Como funciona o login com Google?',
      resposta: 'Ao entrar com o Google, o FinTrack usa sua Conta Google para autenticação — você não precisa criar nem lembrar de uma senha própria do sistema.'
    },
    {
      pergunta: 'Qual a diferença entre Relatórios e Saldo?',
      resposta: 'Relatórios mostra análises e comparativos do ano (gráficos, ranking de categorias, projeções). Saldo mostra o extrato detalhado, transação por transação, com o saldo acumulado após cada uma.'
    }
  ];

  logout(): void {
    this.authService.logout();
  }

  toggleFaq(index: number): void {
    this.perguntaAberta.set(this.perguntaAberta() === index ? null : index);
  }
}