import { Component, Output, EventEmitter, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../../../../core/services/auth';

@Component({
  selector: 'app-login-form',
  imports: [FormsModule, CommonModule],
  templateUrl: './login-form.html',
  styleUrl: './login-form.scss',
})
export class LoginForm {
  @Output() abrirTermos = new EventEmitter<void>();
  @Output() abrirPrivacidade = new EventEmitter<void>();

  email = '';
  senha = '';
  mostrarSenha = false;
  carregando = signal(false);
  erro = signal('');

  private router = inject(Router);
  private authService = inject(AuthService);

  async entrar() {
    if (!this.email || !this.senha) {
      this.erro.set('Preencha o email e a senha.');
      return;
    }

    this.erro.set('');
    this.carregando.set(true);

    const sucesso = await this.authService.login(this.email, this.senha);

    this.carregando.set(false);

    if (sucesso) {
      this.router.navigate(['/dashboard']);
    } else {
      this.erro.set('Email ou senha inválidos. Tente novamente.');
    }
  }

  irParaCadastro() { this.router.navigate(['/cadastro']); }
}