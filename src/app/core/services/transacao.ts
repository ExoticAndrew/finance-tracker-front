import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface Transacao {
  id: number;
  descricao: string;
  valor: number;
  tipo: 'RECEITA' | 'DESPESA';
  categoria: string;
  data: string;
  observacoes?: string;
}

export interface PaginaTransacoes {
  content: Transacao[];
  totalElements: number;
  totalPages: number;
  number: number;
}

export interface ComparativoMensal {
  receitaAtual: number;
  receitaAnterior: number;
  despesaAtual: number;
  despesaAnterior: number;
}

export interface ResumoMensal {
  mes: number;
  totalReceitas: number;
  totalDespesas: number;
}

export interface CategoriaResumo {
  categoria: string;
  total: number;
}

export interface Extrato {
  saldoDeArrasto: number;
  transacoes: Transacao[];
}

@Injectable({ providedIn: 'root' })
export class TransacaoService {
  private readonly API_URL = `${environment.apiUrl}/api/transacoes`;
  private http = inject(HttpClient);

  listar(pagina = 0, tamanho = 5): Observable<PaginaTransacoes> {
    const params = new HttpParams()
      .set('page', pagina)
      .set('size', tamanho)
      .set('sort', 'data,desc');
    return this.http.get<PaginaTransacoes>(this.API_URL, { params });
  }

  getSaldo(): Observable<number> {
    return this.http.get<number>(`${this.API_URL}/saldo`);
  }

  getTotalPorTipo(tipo: 'RECEITA' | 'DESPESA'): Observable<number> {
    return this.http.get<number>(`${this.API_URL}/total/tipo/${tipo}`);
  }

  criar(dados: any): Observable<Transacao> {
    return this.http.post<Transacao>(this.API_URL, dados);
  }

  criarEmLote(transacoes: any[]): Observable<Transacao[]> {
    return this.http.post<Transacao[]>(`${this.API_URL}/lote`, { transacoes });
  }

  atualizar(id: number, dados: any): Observable<Transacao> {
    return this.http.put<Transacao>(`${this.API_URL}/${id}`, dados);
  }

  deletar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`);
  }

  getResumoMensal(ano: number): Observable<ResumoMensal[]> {
    return this.http.get<ResumoMensal[]>(`${this.API_URL}/resumo/mensal?ano=${ano}`);
  }

  getRankingCategorias(ano: number): Observable<CategoriaResumo[]> {
    return this.http.get<CategoriaResumo[]>(`${this.API_URL}/resumo/categorias?ano=${ano}`);
  }

  getExtrato(ano: number): Observable<Extrato> {
    return this.http.get<Extrato>(`${this.API_URL}/extrato?ano=${ano}`);
  }

  getComparativoMensal(): Observable<ComparativoMensal> {
    return this.http.get<ComparativoMensal>(`${this.API_URL}/comparativo-mensal`);
  }
}