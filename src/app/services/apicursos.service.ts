import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, getDocs, query } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import Cursos from 'src/Data/Cursos';

@Injectable({
  providedIn: 'root'
})
export class ApicursosService {

  constructor(
    public firestore: Firestore
  ) { }

  /* 
    Mostrar Todos los Cursos
  */

    CargarListaDeCursosDisponibles(): Observable<Cursos[]>{
      const datos = collection(this.firestore, 'RegCursos');
      return collectionData(datos,{ idField:'id' }) as Observable<Cursos[]>;
    }


  /* 
    Mostrar Todos los Cursos por Categorias
  */
    CargarListaDeCursosPorCategorias(categoria:any){

    }

  /* 
    Mostrar Todos los Cursos del Estudiante
  */
    CargarLosCursosDelEstudiante(idEstudiante:any){

    }


  /* 
    Calificar un curso
  */
    CalificaUnCurso(){
      
    }


  /* 
    
  */



}
