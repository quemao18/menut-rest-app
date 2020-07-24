import { Routes } from '@angular/router';
import { MenuListComponent } from 'app/customer/menu/menu-list/menu-list.component';
import { LoginComponent } from '../../login/login.component';
import { CartComponent } from 'app/customer/cart/cart/cart.component';
// import { ForgotPasswordComponent } from 'app/forgot-password/forgot-password.component';

export const CustomerLayoutRoutes: Routes = [
    // { path: 'login', component: LoginComponent, },
    // { path: 'forgot-password', component: ForgotPasswordComponent, },
    { path: 'menu', component: MenuListComponent, },
    { path: 'cart', component: CartComponent, },


];
