import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { CommonModule } from '@angular/common';

// Interfaces para tipar los datos
interface VotoPorLista {
  nombre: string;
  votos: number;
}

interface VotoPorPartido {
  nombre: string;
  votos: number;
}

interface Ganador {
  nombre: string;
  votos: number;
}

interface ResultadosVotacion {
  votosTotales: number;
  votosPorLista: VotoPorLista[];
  votosPorPartido: VotoPorPartido[];
  votosEnBlanco: number;
  votosAnulados: number;
  votosObservados: number;
  ganador: Ganador;
}

@Component({
  selector: 'app-resultados',
  standalone: true,
  imports: [ButtonModule, CommonModule],
  templateUrl: './resultados.html',
  styleUrl: './resultados.css'
})
export class Resultados implements OnInit {
  tipoResultado: 'circuito' | 'globales' = 'circuito';
  resultados: ResultadosVotacion = {
    votosTotales: 0,
    votosPorLista: [],
    votosPorPartido: [],
    votosEnBlanco: 0,
    votosAnulados: 0,
    votosObservados: 0,
    ganador: { nombre: '', votos: 0 }
  };

  cargando = false;
  error = false;
  mensajeError = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // Obtener el tipo de resultado de la URL o parámetros
    this.route.url.subscribe(url => {
      if (url.length > 0) {
        const path = url[0].path;
        if (path.includes('globales')) {
          this.tipoResultado = 'globales';
        } else {
          this.tipoResultado = 'circuito';
        }
      }
    });

    this.cargarResultados();
  }

  async cargarResultados() {
    this.cargando = true;
    this.error = false;
    
    try {
      if (this.tipoResultado === 'circuito') {
        this.resultados = await this.obtenerResultadosCircuito();
      } else {
        this.resultados = await this.obtenerResultadosGlobales();
      }
    } catch (error) {
      console.error('Error al cargar resultados:', error);
      this.error = true;
      this.mensajeError = 'No se pudieron cargar los resultados. Verifique la conexión e intente nuevamente.';
    } finally {
      this.cargando = false;
    }
  }

  async recargar() {
    await this.cargarResultados();
  }

  volver() {
    this.router.navigate(['/circuito-cerrado']);
  }

  // Métodos para conectar con el backend
  private async obtenerResultadosCircuito(): Promise<ResultadosVotacion> {
    const response = await fetch('/api/resultados/circuito');
    return await response.json();
  }

  private async obtenerResultadosGlobales(): Promise<ResultadosVotacion> {
    const response = await fetch('/api/resultados/globales');
    return await response.json();
  }
}