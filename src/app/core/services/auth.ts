import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment';


interface LoginResponse {
  token: string;
  nome: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {

  private readonly API_URL = `${environment.apiUrl}/api/auth`;

  private readonly TOKEN_KEY = 'fintrack_token';
  private readonly NOME_KEY = 'fintrack_nome';

  private http = inject(HttpClient);
  private router = inject(Router);

  async login(email: string, senha: string): Promise<boolean> {
    try {
      const res = await firstValueFrom(
        this.http.post<LoginResponse>(`${this.API_URL}/login`, { email, senha })
      );
      localStorage.setItem(this.TOKEN_KEY, res.token);
      localStorage.setItem(this.NOME_KEY, res.nome);
      return true;
    } catch {
      return false;
    }
  }

 async cadastrar(nome: string, email: string, senha: string): Promise<void> {
    const res = await firstValueFrom(
      this.http.post<LoginResponse>(`${this.API_URL}/cadastro`, { nome, email, senha })
    );
    localStorage.setItem(this.TOKEN_KEY, res.token);
    localStorage.setItem(this.NOME_KEY, res.nome);
  }
  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.NOME_KEY);
    this.router.navigate(['/']);
  }

  estaLogado(): boolean {
    return !!localStorage.getItem(this.TOKEN_KEY);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  getNome(): string {
    return localStorage.getItem(this.NOME_KEY) ?? 'Usuário';
  }
  salvarSessao(token: string, nome: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
    localStorage.setItem(this.NOME_KEY, nome);
  }
  atualizarNomeCache(nome: string): void {
    localStorage.setItem(this.NOME_KEY, nome);
  }
}