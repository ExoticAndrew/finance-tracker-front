import { Component } from '@angular/core';
import { FormContato } from './form-contato/form-contato';
import { AnimarAoEntrar } from '../../../../shared/directives/animar-ao-entrar';

@Component({
  selector: 'app-contato',
  imports: [FormContato, AnimarAoEntrar],
  templateUrl: './contato.html',
  styleUrl: './contato.scss',
})
export class Contato {}