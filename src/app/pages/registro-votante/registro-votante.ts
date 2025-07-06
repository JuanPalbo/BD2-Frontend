import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TextBoxModule } from '@syncfusion/ej2-angular-inputs';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-registro-votante',
  standalone: true,
  imports: [FormsModule, TextBoxModule, ButtonModule],
  templateUrl: './registro-votante.html',
  styleUrl: './registro-votante.css'
})
export class RegistroVotante {
  credencial = '';
  pin = '';

  constructor(private router: Router, private http: HttpClient) {}

  verificarYVotar() {
    const datos = {
      credencial: this.credencial,
      pin: this.pin
    };

    this.http.post<any>('/api/verificar-votante', datos).subscribe({
      next: (response) => {
        if (response.puedeVotar) {
          console.log('Acceso concedido');
          this.router.navigate(['/votar']);
        } else {
          alert('Acceso denegado: PIN incorrecto');
        }
      },
      error: (error) => {
        console.error('Error al verificar el votante', error);
        alert('Error al verificar el votante. Por favor, inténtelo de nuevo.');
      }
    });
  }
}
