import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {
  constructor(private router: Router) {}

  irARegistrarVotante() {
    this.router.navigate(['/registro-votante']);
  }

  cerrarCircuito() {
    if (confirm('¿Está seguro que desea cerrar el circuito de votación?')) {
      this.router.navigate(['/circuito-cerrado']);
    }
  }

  logout() {
    if (confirm('¿Está seguro que desea salir del sistema?')) {
      this.router.navigate(['/login']);
    }
  }
}
