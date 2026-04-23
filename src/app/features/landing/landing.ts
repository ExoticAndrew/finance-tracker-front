import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Navbar } from '../../shared/navbar/navbar';
import { LucideAngularModule, UserPlus, Wallet, BarChart3 } from 'lucide-angular';
import { CommonModule } from '@angular/common';
import { Hero } from './components/hero/hero';
import { ComoFunciona } from './components/como-funciona/como-funciona';
import { CardCategorias } from './components/card-categorias/card-categorias';
import { CardHistorico } from './components/card-historico/card-historico';
import { CardTransacoes } from './components/card-transacoes/card-transacoes';
import { CardSaldo } from './components/card-saldo/card-saldo';
import { Planos } from './components/planos/planos';
import { Contato } from './components/contato/contato';

@Component({
  selector: 'app-landing',
  imports: [
    Navbar,
    LucideAngularModule,
    CommonModule,
    Hero,
    ComoFunciona,
    CardCategorias,
    CardHistorico,
    CardTransacoes,
    CardSaldo,
    Planos,
    Contato
  ],
  templateUrl: './landing.html',
  styleUrl: './landing.scss',
})
export class Landing implements OnInit {
  readonly UserPlus = UserPlus;
  readonly Wallet = Wallet;
  readonly BarChart3 = BarChart3;

  constructor(private cdr: ChangeDetectorRef) {}

  transacoes = [
    { descricao: 'Mercado', categoria: 'Alimentação', valor: 'R$ 150,00', emoji: '🥑', cor: '#3db87a' },
    { descricao: 'Salário', categoria: 'Receita', valor: 'R$ 3.500,00', emoji: '💰', cor: '#3db87a' },
    { descricao: 'Netflix', categoria: 'Entretenimento', valor: 'R$ 45,00', emoji: '🎬', cor: '#5e9cf5' },
    { descricao: 'Uber', categoria: 'Transporte', valor: 'R$ 23,00', emoji: '🚗', cor: '#f5a623' },
    { descricao: 'Freelance', categoria: 'Receita', valor: 'R$ 800,00', emoji: '💻', cor: '#3db87a' },
    { descricao: 'Academia', categoria: 'Saúde', valor: 'R$ 99,00', emoji: '💪', cor: '#f5a623' },
    { descricao: 'Restaurante', categoria: 'Alimentação', valor: 'R$ 87,00', emoji: '🍽️', cor: '#5e9cf5' },
    { descricao: 'Spotify', categoria: 'Assinatura', valor: 'R$ 19,90', emoji: '🎵', cor: '#a78bfa' },
    { descricao: 'Seguro', categoria: 'Seguro', valor: 'R$ 73,00', emoji: '☂️', cor: '#a78bfa' },
    { descricao: 'Café', categoria: 'Alimentação', valor: 'R$ 12,00', emoji: '☕', cor: '#f5a623' },
  ];

  saldo = 2847.50;
  transacaoAtual: any = null;
  mostrarTransacao = false;

  transacoesAnimadas = [
    { descricao: 'Salário', valor: 3500.00, tipo: 'receita', emoji: '💰' },
    { descricao: 'Netflix', valor: -45.00, tipo: 'despesa', emoji: '🎬' },
    { descricao: 'Freelance', valor: 800.00, tipo: 'receita', emoji: '💻' },
    { descricao: 'Mercado', valor: -150.00, tipo: 'despesa', emoji: '🛒' },
    { descricao: 'Uber', valor: -23.00, tipo: 'despesa', emoji: '🚗' },
  ];
  indexSaldo = 0;

  categorias = ['Todos', 'Alimentação', 'Entretenimento', 'Receita', 'Transporte', 'Assinatura'];
  categoriaAtiva = 'Todos';
  indexCategoria = 0;

  todasTransacoesHistorico = [
    { descricao: 'Mercado', categoria: 'Alimentação', valor: 'R$ 150,00', emoji: '🥑', cor: '#3db87a' },
    { descricao: 'Netflix', categoria: 'Entretenimento', valor: 'R$ 45,00', emoji: '🎬', cor: '#5e9cf5' },
    { descricao: 'Salário', categoria: 'Receita', valor: 'R$ 3.500,00', emoji: '💰', cor: '#3db87a' },
    { descricao: 'Uber', categoria: 'Transporte', valor: 'R$ 23,00', emoji: '🚗', cor: '#f5a623' },
    { descricao: 'Café', categoria: 'Alimentação', valor: 'R$ 12,00', emoji: '☕', cor: '#f5a623' },
    { descricao: 'Spotify', categoria: 'Assinatura', valor: 'R$ 19,90', emoji: '🎵', cor: '#a78bfa' },
    { descricao: 'Restaurante', categoria: 'Alimentação', valor: 'R$ 87,00', emoji: '🍽️', cor: '#5e9cf5' },
  ];

  transacoesFiltradas = [...this.todasTransacoesHistorico];

  periodos = ['Este mês', 'Mês passado'];
  periodoAtivo = 'Este mês';
  indexPeriodo = 0;

  categoriasDados: { [key: string]: { emoji: string, valor: number, max: number }[] } = {
    'Este mês': [
      { emoji: '🥑', valor: 249, max: 500 },
      { emoji: '🚗', valor: 46, max: 500 },
      { emoji: '🎬', valor: 64.90, max: 500 },
      { emoji: '💪', valor: 99, max: 500 },
    ],
    'Mês passado': [
      { emoji: '🥑', valor: 312, max: 500 },
      { emoji: '🚗', valor: 89, max: 500 },
      { emoji: '🎬', valor: 45, max: 500 },
      { emoji: '💪', valor: 99, max: 500 },
    ]
  };

  nomesCategorias = ['Alimentação', 'Transporte', 'Entretenimento', 'Saúde'];
  categoriasAtivas: { emoji: string, nome: string, valor: number, porcentagem: number }[] = [];

  ngOnInit() {
    this.atualizarCategorias();
    setInterval(() => this.animarSaldo(), 2500);
    setInterval(() => this.trocarFiltro(), 2000);
    setInterval(() => this.trocarPeriodo(), 5000);
  }

  animarSaldo() {
    const t = this.transacoesAnimadas[this.indexSaldo % this.transacoesAnimadas.length];
    this.indexSaldo++;
    this.transacaoAtual = t;
    this.mostrarTransacao = true;
    this.cdr.detectChanges();

    const inicio = this.saldo;
    const fim = this.saldo + t.valor;
    const duracao = 800;
    const passos = 30;
    const incremento = (fim - inicio) / passos;
    let passo = 0;

    const intervalo = setInterval(() => {
      passo++;
      this.saldo = inicio + incremento * passo;
      this.cdr.detectChanges();
      if (passo >= passos) {
        this.saldo = fim;
        clearInterval(intervalo);
      }
    }, duracao / passos);

    setTimeout(() => {
      this.mostrarTransacao = false;
      this.cdr.detectChanges();
    }, 1500);
  }

  trocarFiltro() {
    this.indexCategoria = (this.indexCategoria + 1) % this.categorias.length;
    this.categoriaAtiva = this.categorias[this.indexCategoria];
    this.transacoesFiltradas = this.categoriaAtiva === 'Todos'
      ? [...this.todasTransacoesHistorico]
      : this.todasTransacoesHistorico.filter(t => t.categoria === this.categoriaAtiva);
    this.cdr.detectChanges();
  }

  trocarPeriodo() {
    this.indexPeriodo = (this.indexPeriodo + 1) % this.periodos.length;
    this.periodoAtivo = this.periodos[this.indexPeriodo];
    this.atualizarCategorias();
  }

  atualizarCategorias() {
    const dados = this.categoriasDados[this.periodoAtivo];
    this.categoriasAtivas = dados.map((d, i) => ({
      emoji: d.emoji,
      nome: this.nomesCategorias[i],
      valor: d.valor,
      porcentagem: Math.round((d.valor / d.max) * 100)
    }));
    this.cdr.detectChanges();
  }

  scrollPara(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }

  formatarSaldo(valor: number): string {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }
}