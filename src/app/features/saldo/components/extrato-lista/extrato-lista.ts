import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LinhaExtrato } from '../../saldo';
import { iconeCategoria, corCategoria, labelCategoria } from '../../../../core/utils/categoria-metadata';

@Component({
  selector: 'app-extrato-lista',
  imports: [CommonModule],
  templateUrl: './extrato-lista.html',
  styleUrl: './extrato-lista.scss'
})
export class ExtratoLista {
  @Input() linhas: LinhaExtrato[] = [];

  iconeCategoria = iconeCategoria;
  corCategoria = corCategoria;
  labelCategoria = labelCategoria;
}