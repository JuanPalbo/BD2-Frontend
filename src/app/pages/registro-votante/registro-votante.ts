import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TextBoxModule } from '@syncfusion/ej2-angular-inputs';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro-votante',
  standalone: true,
  imports: [FormsModule, TextBoxModule, ButtonModule],
  templateUrl: './registro-votante.html',
  styleUrl: './registro-votante.css'
})
export class RegistroVotante {
  credencial = '';
  circuito = '';

  constructor(private router: Router) {}

  registrar() {
    console.log(`Credencial: ${this.credencial}, Circuito: ${this.circuito}`);
    // PLACEHOLDER: Acá va la lógica de registro del votante
    this.router.navigate(['/votar']);
  }
}

