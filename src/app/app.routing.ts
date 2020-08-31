import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
;
import { HomeLayoutComponent } from './layouts/home-layout/home-layout.component';

import { canActivate, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { CustomerLayoutComponent } from './layouts/customer-layout/customer-layout.component';
import { WaiterLayoutComponent } from './layouts/waiter-layout/waiter-layout.component';

const redirectUnauthorizedToLanding = () => redirectUnauthorizedTo(['login']);
// const redirectUnauthorizedToLandingCustomer = () => redirectUnauthorizedTo(['menu']);

const routes: Routes =[
  { path: 'login', redirectTo: 'login', pathMatch: 'full', }, 
  { 
    path: '', component: HomeLayoutComponent,
    children: [
      {path: '', loadChildren: './layouts/home-layout/home-layout.module#HomeLayoutModule'},
      // { path: '', loadChildren: () => HomeLayoutModule }
    ]
  },
  { path: 'customer', redirectTo: 'customer-home', pathMatch: 'full', }, 
  { 
    path: '', component: CustomerLayoutComponent,
    children: [
      { path: '', loadChildren: './layouts/customer-layout/customer-layout.module#CustomerLayoutModule'},
      // { path: '', loadChildren: () => CustomerLayoutModule },
    ]
  },
  { path: 'waiter', redirectTo: 'waiter-home', pathMatch: 'full', }, 
  { 
    path: '', component: WaiterLayoutComponent,
    ...canActivate(redirectUnauthorizedToLanding),
    children: [
      {path: '', loadChildren: './layouts/waiter-layout/waiter-layout.module#WaiterLayoutModule'},
      // { path: '', loadChildren: () => WaiterLayoutModule }
    ]
  },
  { path: 'dashboard', redirectTo: 'orders', pathMatch: 'full', }, 
  {
    path: '',
    component: AdminLayoutComponent,
    ...canActivate(redirectUnauthorizedToLanding),
    children: [
      {path: '', loadChildren: './layouts/admin-layout/admin-layout.module#AdminLayoutModule'}
      // { path: '', loadChildren: () => AdminLayoutModule }
    ]
  },
  
];


@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes,{
       useHash: true
    })
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
