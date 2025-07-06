import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';

interface Lista {
  id: number;
  nombre: string;
  partido?: string;
  numero?: number;
}

@Component({
  selector: 'app-votar',
  standalone: true,
  imports: [CommonModule, ButtonModule],
  templateUrl: './votar.html',
  styleUrl: './votar.css'
})
export class Votar implements OnInit {
  listas: Lista[] = [
    { id: 1, nombre: 'Lista 101 - Partido Democrático', partido: 'Democrático', numero: 101 },
    { id: 2, nombre: 'Lista 202 - Partido Liberal', partido: 'Liberal', numero: 202 },
    { id: 3, nombre: 'Lista 303 - Partido Socialista', partido: 'Socialista', numero: 303 }
  ];

  sobre: Lista[] = [];
  datosVotante: any = null;
  esVotoObservado = false;

  constructor(private router: Router) {
    // Obtener datos del votante desde el estado de navegación
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras?.state) {
      this.datosVotante = navigation.extras.state['datosVotante'];
      this.esVotoObservado = navigation.extras.state['votoObservado'] || false;
    }
  }

  ngOnInit() {
    this.cargarListas();
  }

  private async cargarListas() {
    try {
      // Aquí se cargarían las listas desde el backend
      // const response = await fetch('/api/listas');
      // this.listas = await response.json();
    } catch (error) {
      console.error('Error al cargar listas:', error);
    }
  }

  agregarAlSobre(lista: Lista) {
    this.sobre.push({ ...lista });
    console.log('Lista agregada al sobre:', lista.nombre);
  }

  vaciarSobre() {
    if (this.sobre.length > 0) {
      this.sobre = [];
      console.log('Sobre vaciado');
    }
  }

  async emitirVoto() {
    if (this.sobre.length === 0) {
      alert('No hay hojas en el sobre para emitir');
      return;
    }

    try {
      const voto = {
        votante: this.datosVotante?.credencial || 'sin-datos',
        hojas: this.sobre,
        esObservado: this.esVotoObservado,
        timestamp: new Date().toISOString()
      };

      console.log('Emitiendo voto:', voto);
      
      // Aquí se enviaría el voto al backend
      // await this.enviarVoto(voto);
      
      alert(this.esVotoObservado ? 'Voto observado emitido correctamente' : 'Voto emitido correctamente');
      this.router.navigate(['/home']);
    } catch (error) {
      console.error('Error al emitir voto:', error);
      alert('Error al emitir el voto. Intente nuevamente.');
    }
  }

  async votarEnBlanco() {
    try {
      const voto = {
        votante: this.datosVotante?.credencial || 'sin-datos',
        hojas: [],
        esBlanco: true,
        esObservado: this.esVotoObservado,
        timestamp: new Date().toISOString()
      };

      console.log('Emitiendo voto en blanco:', voto);
      
      // Aquí se enviaría el voto al backend
      // await this.enviarVoto(voto);
      
      alert(this.esVotoObservado ? 'Voto en blanco observado emitido' : 'Voto en blanco emitido correctamente');
      this.router.navigate(['/home']);
    } catch (error) {
      console.error('Error al emitir voto en blanco:', error);
      alert('Error al emitir el voto en blanco. Intente nuevamente.');
    }
  }

  private async enviarVoto(voto: any): Promise<void> {
    const response = await fetch('/api/emitir-voto', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(voto)
    });

    if (!response.ok) {
      throw new Error('Error al enviar el voto');
    }
  }
}