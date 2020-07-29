import { Routes } from '@angular/router';
import { LoginComponent } from '../../login/login.component';
import { ForgotPasswordComponent } from 'app/forgot-password/forgot-password.component';
import { MenuPdfComponent } from 'app/shared/menu-pdf/menu-pdf/menu-pdf.component';

export const HomeLayoutRoutes: Routes = [
    { path: 'login', component: LoginComponent, },
    { path: 'forgot-password', component: ForgotPasswordComponent, },
];
