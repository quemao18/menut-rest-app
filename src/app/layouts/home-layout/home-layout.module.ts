import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from '../../login/login.component';
import { HomeLayoutRoutes } from './home-layout.routing';
import { RouterModule } from '@angular/router';
import { ForgotPasswordComponent } from 'app/forgot-password/forgot-password.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    LoginComponent,
    ForgotPasswordComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(HomeLayoutRoutes),
  ]
})
export class HomeLayoutModule { }
