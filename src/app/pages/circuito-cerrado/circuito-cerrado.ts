import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';

@Component({
  selector: 'app-circuito-cerrado',
  standalone: true,
  imports: [ButtonModule],
  templateUrl: './circuito-cerrado.html',
  styleUrl: './circuito-cerrado.css'
})
export class CircuitoCerrado {
  constructor(private router: Router) {}

  verResultadosCircuito() {
    this.router.navigate(['/resultados-circuito']);
  }

  verResultadosGlobales() {
    this.router.navigate(['/resultados-globales']);
  }
}
