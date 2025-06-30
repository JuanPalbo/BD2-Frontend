import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';

@Component({
  selector: 'app-votar',
  standalone: true,
  imports: [CommonModule, ButtonModule],
  templateUrl: './votar.html',
  styleUrl: './votar.css'
})
export class Votar {
  listas = [
    { id: 1, nombre: 'Lista 101 - Partido A' },
    { id: 2, nombre: 'Lista 202 - Partido B' },
    { id: 3, nombre: 'Lista 303 - Partido C' }
  ];

  sobre: { id: number; nombre: string }[] = [];

  constructor(private router: Router) {}

  agregarAlSobre(lista: { id: number; nombre: string }) {
    this.sobre.push({ ...lista });
  }

  vaciarSobre() {
    this.sobre = [];
  }

  emitirVoto() {
    console.log('Sobre:', this.sobre);
    this.router.navigate(['/home']);
  }

  votarEnBlanco() {
    this.sobre = [];
    console.log('Voto en blanco emitido');
    this.router.navigate(['/home']);
  }
}
