import { Component } from '@angular/core';
import { Navbar } from '../../shared/navbar/navbar';
import { Hero } from './components/hero/hero';
import { ComoFunciona } from './components/como-funciona/como-funciona';
import { CardCategorias } from './components/card-categorias/card-categorias';
import { CardHistorico } from './components/card-historico/card-historico';
import { CardTransacoes } from './components/card-transacoes/card-transacoes';
import { CardSaldo } from './components/card-saldo/card-saldo';
import { Planos } from './components/planos/planos';
import { Contato } from './components/contato/contato';
import { Relatorios } from './components/relatorios/relatorios';
@Component({
  selector: 'app-landing',
  imports: [
    Navbar,
    Hero,
    ComoFunciona,
    CardCategorias,
    CardHistorico,
    CardTransacoes,
    CardSaldo,
    Planos,
    Contato ,
     Relatorios
  ],
  templateUrl: './landing.html',
  styleUrl: './landing.scss',
})
export class Landing {}