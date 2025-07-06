import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';

@Component({
  selector: 'app-abrir-circuito',
  standalone: true,
  imports: [ButtonModule],
  templateUrl: './abrir-circuito.html',
  styleUrls: ['./abrir-circuito.css']
})
export class AbrirCircuito {
  constructor(private router: Router) {}

  abrirCircuito() {
    // no hay backend, tralalero tralalá
    console.log('Circuito abierto');

    this.router.navigateByUrl('/home');
  }
}
