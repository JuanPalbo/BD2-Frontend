import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ButtonModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
  constructor(private router: Router) {}

  irARegistro() {
    this.router.navigate(['/registro-votante']);
  }

  cerrarCircuito() {
    // Esto en el futuro sería una confirmación + llamada al backend
    this.router.navigate(['/circuito-cerrado']);
  }
}
