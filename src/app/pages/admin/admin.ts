import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { TextBoxModule } from '@syncfusion/ej2-angular-inputs';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { GridModule } from '@syncfusion/ej2-angular-grids';
import { Header } from '../../header/header';

interface Operador {
  id: number;
  nombre: string;
  credencial: string;
  estado: string;
}

interface Eleccion {
  id: number;
  nombre: string;
  fecha: string;
  estado: string;
}

interface Lista {
  id: number;
  nombre: string;
  partido: string;
  eleccionId: number;
}

interface Circuito {
  id: number;
  nombre: string;
  ubicacion: string;
  operadorId?: number;
  estado: string;
}

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    TextBoxModule,
    DropDownListModule,
    GridModule,
    Header
  ],
  templateUrl: './admin.html',
  styleUrl: './admin.css'
})
export class Admin implements OnInit {
  // Vista actual
  vistaActual: string = 'dashboard';
  
  // Datos para operadores
  operadores: Operador[] = [
    { id: 1, nombre: 'Juan Pérez', credencial: 'OP001', estado: 'Activo' },
    { id: 2, nombre: 'María González', credencial: 'OP002', estado: 'Activo' }
  ];
  nuevoOperador = { nombre: '', credencial: '', password: '' };
  
  // Datos para elecciones
  elecciones: Eleccion[] = [
    { id: 1, nombre: 'Elecciones Nacionales 2024', fecha: '2024-10-27', estado: 'Planificada' }
  ];
  nuevaEleccion = { nombre: '', fecha: '', descripcion: '' };
  
  // Datos para listas
  listas: Lista[] = [
    { id: 1, nombre: 'Lista 1', partido: 'Partido Colorado', eleccionId: 1 },
    { id: 2, nombre: 'Lista 15', partido: 'Partido Nacional', eleccionId: 1 }
  ];
  nuevaLista = { nombre: '', partido: '', eleccionId: 1 };
  
  // Datos para circuitos
  circuitos: Circuito[] = [
    { id: 1, nombre: 'Circuito Centro', ubicacion: 'Montevideo Centro', operadorId: 1, estado: 'Activo' },
    { id: 2, nombre: 'Circuito Norte', ubicacion: 'Montevideo Norte', estado: 'Inactivo' }
  ];
  nuevoCircuito = { nombre: '', ubicacion: '', operadorId: 0 };
  
  constructor(private router: Router) {}
  
  ngOnInit() {
    console.log('=== ADMIN COMPONENT INITIALIZED ===');
    console.log('Operadores:', this.operadores);
    console.log('Elecciones:', this.elecciones);
    console.log('Listas:', this.listas);
    console.log('Circuitos:', this.circuitos);
  }
  
  // Navegación entre vistas
  cambiarVista(vista: string) {
    this.vistaActual = vista;
  }
  
  // Funciones para operadores
  crearOperador() {
    if (this.nuevoOperador.nombre && this.nuevoOperador.credencial) {
      const nuevoOperador = {
        id: this.operadores.length + 1,
        nombre: this.nuevoOperador.nombre,
        credencial: this.nuevoOperador.credencial,
        estado: 'Activo'
      };
      this.operadores.push(nuevoOperador);
      this.nuevoOperador = { nombre: '', credencial: '', password: '' };
      alert('Operador creado exitosamente');
    } else {
      alert('Por favor complete todos los campos requeridos');
    }
  }
  
  editarOperador(operador: Operador) {
    // Implementar edición
    console.log('Editando operador:', operador);
  }
  
  eliminarOperador(id: number) {
    if (confirm('¿Está seguro de eliminar este operador?')) {
      this.operadores = this.operadores.filter(o => o.id !== id);
    }
  }
  
  // Funciones para elecciones
  crearEleccion() {
    if (this.nuevaEleccion.nombre && this.nuevaEleccion.fecha) {
      const nuevaEleccion = {
        id: this.elecciones.length + 1,
        nombre: this.nuevaEleccion.nombre,
        fecha: this.nuevaEleccion.fecha,
        estado: 'Planificada'
      };
      this.elecciones.push(nuevaEleccion);
      this.nuevaEleccion = { nombre: '', fecha: '', descripcion: '' };
      alert('Elección creada exitosamente');
    } else {
      alert('Por favor complete todos los campos requeridos');
    }
  }
  
  eliminarEleccion(id: number) {
    if (confirm('¿Está seguro de eliminar esta elección?')) {
      this.elecciones = this.elecciones.filter(e => e.id !== id);
    }
  }
  
  // Funciones para listas
  crearLista() {
    if (this.nuevaLista.nombre && this.nuevaLista.partido) {
      const nuevaLista = {
        id: this.listas.length + 1,
        nombre: this.nuevaLista.nombre,
        partido: this.nuevaLista.partido,
        eleccionId: this.nuevaLista.eleccionId
      };
      this.listas.push(nuevaLista);
      this.nuevaLista = { nombre: '', partido: '', eleccionId: 1 };
      alert('Lista creada exitosamente');
    } else {
      alert('Por favor complete todos los campos requeridos');
    }
  }
  
  eliminarLista(id: number) {
    if (confirm('¿Está seguro de eliminar esta lista?')) {
      this.listas = this.listas.filter(l => l.id !== id);
    }
  }
  
  // Funciones para circuitos
  crearCircuito() {
    if (this.nuevoCircuito.nombre && this.nuevoCircuito.ubicacion) {
      const nuevoCircuito = {
        id: this.circuitos.length + 1,
        nombre: this.nuevoCircuito.nombre,
        ubicacion: this.nuevoCircuito.ubicacion,
        operadorId: this.nuevoCircuito.operadorId || undefined,
        estado: 'Activo'
      };
      this.circuitos.push(nuevoCircuito);
      this.nuevoCircuito = { nombre: '', ubicacion: '', operadorId: 0 };
      alert('Circuito creado exitosamente');
    } else {
      alert('Por favor complete todos los campos requeridos');
    }
  }
  
  asignarOperador(circuitoId: number, operadorId: number) {
    const circuito = this.circuitos.find(c => c.id === circuitoId);
    if (circuito) {
      circuito.operadorId = operadorId;
      alert('Operador asignado exitosamente');
    }
  }
  
  eliminarCircuito(id: number) {
    if (confirm('¿Está seguro de eliminar este circuito?')) {
      this.circuitos = this.circuitos.filter(c => c.id !== id);
    }
  }
  
  getNombreOperador(id: number): string {
    const operador = this.operadores.find(o => o.id === id);
    return operador ? operador.nombre : 'Sin asignar';
  }
  
  getNombreEleccion(id: number): string {
    const eleccion = this.elecciones.find(e => e.id === id);
    return eleccion ? eleccion.nombre : 'Elección no encontrada';
  }
  
  logout() {
    if (confirm('¿Está seguro que desea salir del sistema?')) {
      this.router.navigate(['/login']);
    }
  }
}
