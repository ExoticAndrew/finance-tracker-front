import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth';
import { TemaService } from '../../core/services/tema';
import { UsuarioService, Usuario } from '../../core/services/usuario';
import { Sidebar } from '../dashboard/components/sidebar/sidebar';

@Component({
  selector: 'app-seguranca',
  imports: [CommonModule, FormsModule, Sidebar],
  templateUrl: './seguranca.html',
  styleUrl: './seguranca.scss'
})
export class Seguranca implements OnInit {
  private authService = inject(AuthService);
  private usuarioService = inject(UsuarioService);
  temaService = inject(TemaService);

  nomeUsuario = this.authService.getNome();

  perfil = signal<Usuario | null>(null);

  senhaAtual = signal('');
  novaSenha = signal('');
  confirmarSenha = signal('');
  salvando = signal(false);
  erro = signal('');
  sucesso = signal(false);

  ngOnInit(): void {
    this.usuarioService.getPerfil().subscribe({
      next: (usuario) => this.perfil.set(usuario)
    });
  }

  logout(): void {
    this.authService.logout();
  }

  alterarSenha(): void {
    this.erro.set('');
    this.sucesso.set(false);

    if (this.novaSenha().length < 8) {
      this.erro.set('A nova senha deve ter no mínimo 8 caracteres.');
      return;
    }

    const regraForca = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/;
    if (!regraForca.test(this.novaSenha())) {
      this.erro.set('A nova senha deve conter letras maiúsculas, minúsculas e números.');
      return;
    }

    if (this.novaSenha() !== this.confirmarSenha()) {
      this.erro.set('A confirmação não corresponde à nova senha.');
      return;
    }

    this.salvando.set(true);
    this.usuarioService.alterarSenha(this.senhaAtual(), this.novaSenha()).subscribe({
      next: () => {
        this.salvando.set(false);
        this.sucesso.set(true);
        this.senhaAtual.set('');
        this.novaSenha.set('');
        this.confirmarSenha.set('');
      },
      error: (err) => {
        this.salvando.set(false);
        if (err.status === 401 || err.status === 403) {
          this.erro.set('Senha atual incorreta.');
        } else {
          this.erro.set('Não foi possível alterar a senha. Tente novamente.');
        }
      }
    });
  }
}