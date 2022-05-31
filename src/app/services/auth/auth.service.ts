import { Injectable, NgZone } from '@angular/core';

import { AngularFireAuth } from "@angular/fire/compat/auth";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { NotificationService } from '../notification/notification.service';

import { environment } from 'environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MessagingService } from '../notification/messaging.service';
import * as auth from 'firebase/auth';

declare var $: any;

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  userDataAuth: any; // Save logged in user data
  isAdmin: boolean = false;
  userDB: any ;
  userLogged: any = null;
  userExist: boolean = false;
  token: any;
  tokenFCM: any;

  constructor(
    public afs: AngularFirestore,   // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,  
    public ngZone: NgZone, // NgZone service to remove outside scope warning
    public notification: NotificationService,
    public spinner: NgxSpinnerService,
  ) {    
    /* 
    Saving user data in localstorage when 
    logged in and setting up null when logged out 
    */
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userLogged = user;
        this.afs.collection('users').doc(user.uid).get()
        .subscribe((res:any) => {
          this.userLogged = {...this.userLogged, ...res.data()};
          this.setUserLoggedIn(this.userLogged);
          // this.getUserLoggedIn;
          this.router.navigate(['admin']);
        });
      } else {
        this.setUserLoggedIn(null);
        // this.getUserLoggedIn;
      }
    });
  }

  generateHeaders() {
    console.log(this.getAccessToken());
    return new HttpHeaders( { authorization: `Bearer ${this.getAccessToken()}` } );
  }

  getAccessToken() {
    return (localStorage.getItem('access_token'));
  }

   // Sign in with email/password
   async signIn(email: string, password: string) {
     this.spinner.show();
    try {
       const result = await this.afAuth
         .signInWithEmailAndPassword(email, password);
        this.spinner.hide();
        this.setUserData(result.user);
     } catch (error) {
       console.log(error.message);
       this.spinner.hide();
       this.notification.showNotification('top', 'center', 'danger', 'warning', error.message);
     }
  }

    // Sign up with email/password
    async signUp(email: string, password: string) {
      return this.afAuth
        .createUserWithEmailAndPassword(email, password)
        .then((result) => {
          /* Call the SendVerificaitonMail() function when new user sign 
          up and returns promise */
          this.sendVerificationMail();
          this.setUserData(result.user);
        })
        .catch((error) => {
          console.log(error.message);
          this.notification.showNotification('top', 'center', 'danger', 'Error', error.message);
        });
    }
    // Send email verfificaiton when new user sign up
    async sendVerificationMail() {
      return this.afAuth.currentUser
        .then((u: any) => u.sendEmailVerification())
        .then(() => {
          this.router.navigate(['verify-email-address']);
        });
    }
    // Reset Forggot password
    async forgotPassword(passwordResetEmail: string) {
      return this.afAuth
        .sendPasswordResetEmail(passwordResetEmail)
        .then(() => {
          this.notification.showNotification('top', 'center', 'success', 'Email Sent', 'Password reset email has been sent.');
        })
        .catch((error) => {
          console.log(error);
          this.notification.showNotification('top', 'center', 'danger', 'Error', error.message);
        });
    }
    // Returns true when user is looged in and email is verified
    get isLoggedIn(): boolean {
      const user = this.getUserLoggedIn;
      return user ? true : false;
    }

    get isAdminIn(): boolean {
      const user = this.getUserLoggedIn;
      return user && user.isAdmin ? true : false;
    }

    get isWaiterIn(): boolean {
      const user = this.getUserLoggedIn;
      return (user !== null && user.isWaiter === true) ? true : false;
    }

    // Sign in with Google
    async googleAuth() {
      return this.authLogin(new auth.GoogleAuthProvider()).then((res: any) => {
        if (res) {
          this.router.navigate(['admin']);
        }
      });
    }
    // Auth logic to run auth providers
    async authLogin(provider: any) {
      return this.afAuth
        .signInWithPopup(provider)
        .then((result) => {
          this.ngZone.run(() => {
            this.router.navigate(['admin']);
          });
          this.setUserData(result.user);
        })
        .catch((error) => {
          console.log(error);
          this.notification.showNotification('top', 'center', 'danger', 'Error', error.message);
        });
    }
    /* Setting up user data when sign in with username/password, 
    sign up with username/password and sign in with social auth  
    provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
    setUserData(user: any) {
      const userRef: AngularFirestoreDocument<any> = this.afs.doc(
        `users/${user.uid}`
      );
      const userData: any = {
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
    async signOut() {
      return this.afAuth.signOut().then(() => {
        localStorage.removeItem('user');
        this.router.navigate(['login']);
      });
    }

    get getUserLoggedIn(): any{
      return JSON.parse(localStorage.getItem('user')!);
    }

    setUserLoggedIn(user: any){
      localStorage.setItem('user', JSON.stringify(user));
    }
}