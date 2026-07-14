import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface Usuario {
  id: number;
  nome: string;
  email: string;
}

@Injectable({ providedIn: 'root' })
export class UsuarioService {
  private readonly API_URL = `${environment.apiUrl}/api/usuarios`;
  private http = inject(HttpClient);

  getPerfil(): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.API_URL}/me`);
  }

  atualizarNome(nome: string): Observable<Usuario> {
    return this.http.put<Usuario>(`${this.API_URL}/me`, { nome });
  }
}