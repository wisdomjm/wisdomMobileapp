import { Injectable, NgZone } from '@angular/core';
import { 
  Auth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signOut,
  signInWithPopup,
  GoogleAuthProvider
  } from '@angular/fire/auth';

  import {
    AngularFirestore,
    AngularFirestoreDocument,
  } from '@angular/fire/compat/firestore';
  import * as auth from 'firebase/auth';
  import { AngularFireAuth } from '@angular/fire/compat/auth';
  import { Router } from '@angular/router';
  import { User } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  userData: any;

  constructor(
    private auth: Auth,
    public afAuth: AngularFireAuth,
    public afs: AngularFirestore, // Inject Firestore service
    public router: Router,
    public ngZone: NgZone // NgZone service to remove outside scope warning
    ) { 

      /* Saving user data in localstorage when 
      logged in and setting up null when logged out */
      this.afAuth.authState.subscribe((user) => {
        if (user) {
          this.userData = user;
          localStorage.setItem('user', JSON.stringify(this.userData));
          JSON.parse(localStorage.getItem('user')!);
        } else {
          localStorage.setItem('user', 'null');
          JSON.parse(localStorage.getItem('user')!);
        }
      });
    
  }

  //registrar al usuario con email y contraseña
  registerUser(email:any, password:any){
    return createUserWithEmailAndPassword(this.auth, email, password);
    
  }

  //realizar el login con usuario y contraseña
  loginUser(email:any, password:any){
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  //realizar el registro con google


  //iniciar el login con google
  loginWithGoogle(){
    return signInWithPopup(this.auth, new GoogleAuthProvider());
  }

  //Logout
  LogOutUser(){
    return signOut(this.auth);
  }


  /*METODOS AVANZADOS*/
  // Sign in with email/password
  SignIn(email: string, password: string) {
    console.log('Se realiza el login de la app...');
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.SetUserData(result.user);
        this.afAuth.authState.subscribe((user) => {
          if (user) {
            console.log('DATOS DEL USER: ', user);
            this.router.navigate(['dashboard']);
          }
        });
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }

  // Sign up with email/password
  SignUp(email: string, password: string) {
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        /* Call the SendVerificaitonMail() function when new user sign 
        up and returns promise */
        //this.SendVerificationMail();
        this.SetUserData(result.user);
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }

  // Send email verfificaiton when new user sign up
  SendVerificationMail() {
    return this.afAuth.currentUser
      .then((u: any) => u.sendEmailVerification())
      .then(() => {
        this.router.navigate(['verify-email-address']);
      });
  }

  // Reset Forggot password
  ForgotPassword(passwordResetEmail: string) {
    return this.afAuth
      .sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        window.alert('Password reset email sent, check your inbox.');
      })
      .catch((error) => {
        window.alert(error);
      });
  }

  // Returns true when user is looged in and email is verified
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user !== null && user.emailVerified !== false ? true : false;
  }

   /* Setting up user data when sign in with username/password, 
  sign up with username/password and sign in with social auth  
  provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
  SetUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
    };
    return userRef.set(userData, {
      merge: true,
    });
  }

  // Sign out
  SignOut() {
    console.log('Logout...');
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['home']);
    });
  }





}
