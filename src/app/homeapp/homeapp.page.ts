import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterLinkWithHref, Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import Cursos from 'src/Data/Cursos';
import { ApicursosService } from '../services/apicursos.service'; 

@Component({
  selector: 'app-homeapp',
  templateUrl: './homeapp.page.html',
  styleUrls: ['./homeapp.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterLinkWithHref],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class HomeappPage implements OnInit {

  cursos: Cursos[];
  

  constructor(
    //private auth: AuthenticationService,
    private api: ApicursosService, 
    private router: Router) { 
      this.cursos = [];
    }

  ngOnInit() {
    //Cargo la lista de cursos Disponibles
    this.CargarListaDeCursosDisponibles();
  }

  public CargarListaDeCursosDisponibles(){
    this.api.CargarListaDeCursosDisponibles().subscribe(cursos =>{
      console.log('CURSOS: ', cursos);
      this.cursos = cursos;
    })
  }


  /*logOutFromApp(){
    this.auth.LogOutUser().then(() => {
      console.log('se cerro la sesion del usuario: ');
      this.router.navigate(['/home']);
    })
    .catch((error) => console.log('Se genero un error al cerrar la sesion: ', error));
  }*/
}
