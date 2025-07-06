import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TextBoxModule } from '@syncfusion/ej2-angular-inputs';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

// Interfaces para tipar las respuestas
interface VerificacionResponse {
  valido: boolean;
  puedeVotar: boolean;
  perteneceCircuito: boolean;
  mensaje: string;
  nombreVotante?: string;
  circuitoAsignado?: string;
}

interface AdminResponse {
  autorizado: boolean;
  mensaje: string;
}

type EstadoVotante = 'invalido' | 'valido' | 'otro_circuito';
type TipoMensaje = 'error' | 'success' | 'warning';

@Component({
  selector: 'app-registro-votante',
  standalone: true,
  imports: [FormsModule, CommonModule, TextBoxModule, ButtonModule],
  templateUrl: './registro-votante.html',
  styleUrl: './registro-votante.css'
})
export class RegistroVotante {
  credencial = '';
  pin = '';
  adminPassword = '';
  
  cargando = false;
  mostrarMensaje = false;
  estadoVotante: EstadoVotante = 'invalido';
  tipoMensaje: TipoMensaje = 'error';
  tituloMensaje = '';
  textoMensaje = '';
  
  // Datos del votante para pasar a la siguiente pantalla
  datosVotante: any = null;

  constructor(private router: Router, private http: HttpClient) {}

  async verificarYVotar() {
    if (!this.credencial || !this.pin) {
      this.mostrarMensajeError('Error de validación', 'Por favor ingrese credencial y PIN');
      return;
    }

    this.cargando = true;
    
    try {
      const response = await this.verificarVotante();
      this.procesarRespuestaVerificacion(response);
    } catch (error) {
      console.error('Error al verificar votante:', error);
      this.mostrarMensajeError('Error de conexión', 'No se pudo verificar el votante. Intente nuevamente.');
    } finally {
      this.cargando = false;
    }
  }

  private async verificarVotante(): Promise<VerificacionResponse> {
    // TEMPORAL: Simulación de verificación para probar flujos
    // Comentar estas líneas cuando se conecte con el backend real
    
    // Simulación de diferentes casos según la credencial ingresada
    if (this.credencial === '12345678') {
      // Caso: Credencial inválida
      return {
        valido: false,
        puedeVotar: false,
        perteneceCircuito: false,
        mensaje: 'La credencial ingresada no existe en el sistema'
      };
    } else if (this.credencial === '87654321') {
      // Caso: Válido pero ya votó
      return {
        valido: true,
        puedeVotar: false,
        perteneceCircuito: true,
        mensaje: 'Este votante ya emitió su voto',
        nombreVotante: 'Juan Pérez'
      };
    } else if (this.credencial === '11111111') {
      // Caso: Válido de otro circuito
      return {
        valido: true,
        puedeVotar: true,
        perteneceCircuito: false,
        mensaje: 'Votante válido pero pertenece a otro circuito',
        nombreVotante: 'María González',
        circuitoAsignado: 'Circuito 5'
      };
    } else {
      // Caso: Válido y puede votar
      return {
        valido: true,
        puedeVotar: true,
        perteneceCircuito: true,
        mensaje: 'Votante habilitado para votar',
        nombreVotante: 'Carlos Rodríguez'
      };
    }

    // Código real para cuando se conecte con el backend:
    /*
    const response = await fetch('/api/verificar-votante', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        credencial: this.credencial,
        pin: this.pin
      })
    });
    
    return await response.json();
    */
  }

  private procesarRespuestaVerificacion(response: VerificacionResponse) {
    if (!response.valido) {
      // Caso 1: Credencial no válida
      this.estadoVotante = 'invalido';
      this.mostrarMensajeError('Credencial Inválida', response.mensaje || 'La credencial ingresada no es válida');
      return;
    }

    if (!response.puedeVotar) {
      // Caso 2: Válido pero no puede votar (ya votó, inhabilitado, etc.)
      this.estadoVotante = 'invalido';
      this.mostrarMensajeError('No puede votar', response.mensaje || 'Este votante no puede ejercer el voto');
      return;
    }

    if (response.perteneceCircuito) {
      // Caso 3: Válido y puede votar en este circuito
      this.estadoVotante = 'valido';
      this.datosVotante = response;
      this.mostrarMensajeExito('Votante Habilitado', 
        `Bienvenido ${response.nombreVotante || 'votante'}. Puede proceder a votar.`);
    } else {
      // Caso 4: Válido pero pertenece a otro circuito
      this.estadoVotante = 'otro_circuito';
      this.datosVotante = response;
      this.mostrarMensajeAdvertencia('Votante de Otro Circuito', 
        `El votante ${response.nombreVotante || ''} pertenece al circuito ${response.circuitoAsignado || 'N/A'}. Se requiere autorización del administrador de mesa.`);
    }
  }

  procederAVotar() {
    // Navegar a la pantalla de votación con los datos del votante
    this.router.navigate(['/votar'], { 
      state: { datosVotante: this.datosVotante } 
    });
  }

  async cancelarVoto() {
    if (!this.adminPassword) {
      alert('Debe ingresar la contraseña del administrador');
      return;
    }

    try {
      const autorizado = await this.verificarAdministrador();
      if (autorizado) {
        this.cerrarMensaje();
        this.limpiarFormulario();
        alert('Voto cancelado correctamente');
      }
    } catch (error) {
      console.error('Error al cancelar voto:', error);
      alert('Error al procesar la cancelación');
    }
  }

  async observarVoto() {
    if (!this.adminPassword) {
      alert('Debe ingresar la contraseña del administrador');
      return;
    }

    try {
      const autorizado = await this.verificarAdministrador();
      if (autorizado) {
        // Navegar a votación pero marcando como voto observado
        this.router.navigate(['/votar'], { 
          state: { 
            datosVotante: this.datosVotante,
            votoObservado: true 
          } 
        });
      }
    } catch (error) {
      console.error('Error al observar voto:', error);
      alert('Error al procesar el voto observado');
    }
  }

  private async verificarAdministrador(): Promise<boolean> {
    // TEMPORAL: Simulación de verificación de administrador
    // Comentar estas líneas cuando se conecte con el backend real
    
    if (this.adminPassword === 'admin123') {
      return true;
    } else {
      alert('Contraseña de administrador incorrecta');
      return false;
    }

    // Código real para cuando se conecte con el backend:
    /*
    try {
      const response = await fetch('/api/verificar-admin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          password: this.adminPassword
        })
      });
      
      const result: AdminResponse = await response.json();
      
      if (!result.autorizado) {
        alert('Contraseña de administrador incorrecta');
        return false;
      }
      
      return true;
    } catch (error) {
      console.error('Error al verificar administrador:', error);
      throw error;
    }
    */
  }

  private mostrarMensajeError(titulo: string, mensaje: string) {
    this.tipoMensaje = 'error';
    this.tituloMensaje = titulo;
    this.textoMensaje = mensaje;
    this.mostrarMensaje = true;
  }

  private mostrarMensajeExito(titulo: string, mensaje: string) {
    this.tipoMensaje = 'success';
    this.tituloMensaje = titulo;
    this.textoMensaje = mensaje;
    this.mostrarMensaje = true;
  }

  private mostrarMensajeAdvertencia(titulo: string, mensaje: string) {
    this.tipoMensaje = 'warning';
    this.tituloMensaje = titulo;
    this.textoMensaje = mensaje;
    this.mostrarMensaje = true;
  }

  cerrarMensaje() {
    this.mostrarMensaje = false;
    this.adminPassword = '';
  }

  private limpiarFormulario() {
    this.credencial = '';
    this.pin = '';
    this.adminPassword = '';
    this.datosVotante = null;
    this.estadoVotante = 'invalido';
  }
}