import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from "../auth/auth.service";
import { Observable } from 'rxjs';
import { NotificationService } from '../notification/notification.service';
import { AngularFireAuth } from '@angular/fire/auth';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/do';

import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})

export class SecureInnerPagesGuard implements CanActivate {

  // constructor(
  //   public authService: AuthService,
  //   public router: Router,
  //   private notification: NotificationService
  // ) { }

  // // Esta funcion bloquea accesso a la ruta si ya estas logeado.
  
  // canActivate(
  //   next: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
  //   // setTimeout(() => {
  //     console.log('secure-inner')
  //     if(this.authService.isLoggedIn) {
  //       // window.alert("You are not allowed to access this URL!");
  //       this.notification.showNotification('top', 'center', 'warning', 'warning', 'You are logged to access this URL!' );
  //       this.router.navigate(['dashboard'])
  //     }
  //   // }, 100);

  //   return true;
  // }

  constructor(private auth: AngularFireAuth, private router: Router) {}

  canActivate(): Observable<boolean> {
    
    return this.auth.authState
    .take(1)
    .map(authState => !!authState)
    .do(authenticated => {
      if (!authenticated) {
        this.router.navigate(['login'])
      }
    });
  
  }

}