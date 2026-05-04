import { Component, Output, EventEmitter, inject } from '@angular/core';
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
  carregando = false;

  private router = inject(Router);
  private authService = inject(AuthService);

  async entrar() {
    this.carregando = true;
    const sucesso = await this.authService.login(this.email, this.senha);
    this.carregando = false;
    if (sucesso) this.router.navigate(['/dashboard']);
  }

  irParaCadastro() { this.router.navigate(['/cadastro']); }
}