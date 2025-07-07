import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { TextBoxModule } from '@syncfusion/ej2-angular-inputs';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    ButtonModule,
    TextBoxModule
  ],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  credencial: string = '';
  password: string = '';

  constructor(private router: Router) {}

  login() {
    console.log('Login simulado:', this.credencial, this.password);
    
    // Verificar si es administrador
    if (this.credencial === 'admin' && this.password === 'admin123') {
      this.router.navigate(['/admin']);
      return;
    }
    
    // Login normal para operadores
    this.router.navigate(['/abrir-circuito']);
  }
}

