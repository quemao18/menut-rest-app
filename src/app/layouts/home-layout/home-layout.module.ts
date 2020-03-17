import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from '../../login/login.component';
import { HomeLayoutRoutes } from './home-layout.routing';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(HomeLayoutRoutes),
  ]
})
export class HomeLayoutModule { }
