import { Routes } from '@angular/router';
import { MenuListComponent } from 'app/customer/menu/menu-list/menu-list.component';
import { LoginComponent } from '../../login/login.component';
// import { ForgotPasswordComponent } from 'app/forgot-password/forgot-password.component';

export const CustomerLayoutRoutes: Routes = [
    // { path: 'login', component: LoginComponent, },
    // { path: 'forgot-password', component: ForgotPasswordComponent, },
    { path: 'menu', component: MenuListComponent, },

];
