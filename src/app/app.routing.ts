import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
;
import { HomeLayoutComponent } from './layouts/home-layout/home-layout.component';

// import { canActivate, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { CustomerLayoutComponent } from './layouts/customer-layout/customer-layout.component';
import { WaiterLayoutComponent } from './layouts/waiter-layout/waiter-layout.component';
import { AuthGuard } from './services/auth/auth.guard';
import { AuthAdminGuard } from './services/auth/auth-admin.guard';
import { AuthWaiterGuard } from './services/auth/auth-waiter.guard';

// const redirectUnauthorizedToLanding = () => redirectUnauthorizedTo(['/login']);
// const redirectUnauthorizedToLandingCustomer = () => redirectUnauthorizedTo(['menu']);

const routes: Routes =[
  // { path: '', redirectTo: 'customer/home', pathMatch: 'full', }, 
  { path: 'login', redirectTo: 'login', pathMatch: 'full', }, 
  { 
    path: '', component: HomeLayoutComponent,
    children: [
      {
        path: '', 
        loadChildren: () => import('./layouts/home-layout/home-layout.module').then(x => x.HomeLayoutModule)
      },
      // { path: '', loadChildren: () => HomeLayoutModule }
    ]
  },
  // { path: 'customer', redirectTo: 'customer/home', pathMatch: 'full', }, 
  { 
    path: '', component: CustomerLayoutComponent,
    children: [
      { 
        path: '', 
        loadChildren: () => import('./layouts/customer-layout/customer-layout.module').then(x => x.CustomerLayoutModule)
      },
      // { path: '', loadChildren: () => CustomerLayoutModule },
    ]
  },
  // { path: 'waiter', redirectTo: 'waiter/home', pathMatch: 'full', }, 
  { 
    path: '', component: WaiterLayoutComponent,
    canActivate: [AuthGuard, AuthWaiterGuard],
    children: [
      {
        path: '', 
        loadChildren: () => import('./layouts/waiter-layout/waiter-layout.module').then(x => x.WaiterLayoutModule)
      }
      // { path: '', loadChildren: () => WaiterLayoutModule }
    ]
  },
  { path: 'admin', redirectTo: 'admin/restaurants', pathMatch: 'full', }, 
  {
    path: '',
    component: AdminLayoutComponent,
    canActivate: [AuthGuard, AuthAdminGuard],
    children: [
      {
        path: '', 
        loadChildren: () => import('./layouts/admin-layout/admin-layout.module').then(x => x.AdminLayoutModule)
        // { path: '', loadChildren: () => AdminLayoutModule } 
      }
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
