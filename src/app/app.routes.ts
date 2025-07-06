import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { RegistroVotante } from './pages/registro-votante/registro-votante';
import { Votar } from './pages/votar/votar';
import { AbrirCircuito } from './pages/abrir-circuito/abrir-circuito';
import { Home } from './pages/home/home';
import { CircuitoCerrado } from './pages/circuito-cerrado/circuito-cerrado';
import { Resultados } from './resultados/resultados';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'registro-votante', component: RegistroVotante },
  { path: 'votar', component: Votar },
  { path: 'abrir-circuito', component: AbrirCircuito },
  { path: 'home', component: Home },
  { path: 'circuito-cerrado', component: CircuitoCerrado },
  { path: 'resultados-circuito', component: Resultados },
  { path: 'resultados-globales', component: Resultados },
];