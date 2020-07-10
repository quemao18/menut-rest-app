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

export class AuthGuard implements CanActivate {
  
  // constructor(
  //   public authService: AuthService,
  //   public router: Router,
  //   private notification: NotificationService
  // ){ }

  // canActivate(
  //   next: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

  //   // setTimeout(() => {
  //     if(this.authService.isLoggedIn !== true) {
  //       this.router.navigate(['login'])
  //     }
  //     if(this.authService.isAdmindIn !== true){
  //       this.notification.showNotification('top', 'center', 'warning', 'warning', 'You are not aministrator user!' );
  //     }
  //   // }, 100);
     
  //   return true;

  // }

  constructor(private auth: AngularFireAuth, private router: Router, private authService: AuthService, private notification: NotificationService) {}

  canActivate(): Observable<boolean> {
    
    return this.auth.authState
    .take(1)
    .map(authState => !!authState)
    .do(authenticated => {
      if (!authenticated) {
        this.router.navigate(['login'])
      }else{      
      // console.log(this.authService.isAdmindIn)
      // if(this.authService.isAdmindIn !== true){
      //   this.notification.showNotification('top', 'center', 'warning', 'warning', 'You are not aministrator user!' );
      //   this.router.navigate(['login'])
      // }
      }
     
    });
  
  }

}