import { Routes } from '@angular/router';
import { Dashboard } from './features/dashboard/dashboard';
import { Landing } from './features/landing/landing';
import { Transacoes } from './features/transacoes/transacoes';

export const routes: Routes = [
  { path: '', component: Landing },
  { path: 'dashboard', component: Dashboard },
  { path: 'transacoes', component: Transacoes },
  { path: '**', redirectTo: '' }
];