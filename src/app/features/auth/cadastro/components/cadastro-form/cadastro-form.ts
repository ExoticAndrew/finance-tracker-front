import { Component, Output, EventEmitter, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../../../../core/services/auth';
import { environment } from '../../../../../../environments/environment';

@Component({
  selector: 'app-cadastro-form',
  imports: [FormsModule, CommonModule],
  templateUrl: './cadastro-form.html',
  styleUrl: './cadastro-form.scss',
})
export class CadastroForm {
  @Output() abrirTermos = new EventEmitter<void>();
  @Output() abrirPrivacidade = new EventEmitter<void>();

  nome = '';
  email = '';
  senha = '';
  confirmarSenha = '';
  mostrarSenha = false;
  mostrarConfirmarSenha = false;
  carregando = signal(false);
  erroSenha = false;
  erro = signal('');

  googleAuthUrl = `${environment.apiUrl}/oauth2/authorization/google`;

  private router = inject(Router);
  private authService = inject(AuthService);

  async cadastrar() {
    if (!this.nome || !this.email || !this.senha) {
      this.erro.set('Preencha todos os campos.');
      return;
    }

    if (this.senha !== this.confirmarSenha) {
      this.erroSenha = true;
      this.erro.set('As senhas não coincidem.');
      return;
    }

    this.erroSenha = false;
    this.erro.set('');
    this.carregando.set(true);

    try {
      await this.authService.cadastrar(this.nome, this.email, this.senha);
      this.router.navigate(['/dashboard']);
    } catch (err: any) {
      this.erro.set(err?.error?.mensagem ?? 'Não foi possível criar a conta. Tente novamente.');
    } finally {
      this.carregando.set(false);
    }
  }

  irParaLogin() { this.router.navigate(['/login']); }
}