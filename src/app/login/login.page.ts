import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterLinkWithHref, Router } from '@angular/router';
//import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterLinkWithHref]
})
export class LoginPage implements OnInit {

  authData:any ={
    email:'',
    password:''
  }

  constructor(
    //private auth: AuthenticationService, 
    private router: Router) { }

  //[routerLink]="['/tabs/homeapp']"
  ngOnInit() {
  }

  /*loginToApp(){
    this.auth.loginUser(this.authData.email, this.authData.password ).then((response)=>{
      console.log('se inicio el login en la App: ', response);
      this.router.navigate(['/tabs/homeapp']);
    })
    .catch(error => console.log('Se genero un error al realizar login: ', error));
  }

  loginGoogle(){
    this.auth.loginWithGoogle().then((response) => {
      console.log('Se inicio sesion con google. ', response);
      this.router.navigate(['/tabs/homeapp']);
    })
    .catch((error) => console.log('Se genero un error: ', error));
  }*/

}
