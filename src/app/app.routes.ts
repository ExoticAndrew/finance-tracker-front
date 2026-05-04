import { Routes } from '@angular/router';
import { Landing } from './features/landing/landing';
import { Dashboard } from './features/dashboard/dashboard';
import { Transacoes } from './features/transacoes/transacoes';
import { Login } from './features/auth/login/login';
import { Cadastro } from './features/auth/cadastro/cadastro';

export const routes: Routes = [
  { path: '', component: Landing },
  { path: 'dashboard', component: Dashboard },
  { path: 'transacoes', component: Transacoes },
  { path: 'login', component: Login },
  { path: 'cadastro', component: Cadastro },
  { path: '**', redirectTo: '' }
];