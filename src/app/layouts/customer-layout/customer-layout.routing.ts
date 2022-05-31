import { Routes } from '@angular/router';
import { MenuListComponent } from 'app/customer/menu/menu-list/menu-list.component';
import { CartComponent } from 'app/customer/cart/cart/cart.component';
import { HomeComponent } from 'app/customer/home/home.component';

// import { ForgotPasswordComponent } from 'app/forgot-password/forgot-password.component';

export const CustomerLayoutRoutes: Routes = [
    // { path: 'login', component: LoginComponent, },
    // { path: 'forgot-password', component: ForgotPasswordComponent, },
    { path: 'customer/home',           component: HomeComponent, },
    { path: 'customer/menu',           component: MenuListComponent, },
    { path: 'customer/cart',           component: CartComponent, },
    // { path: 'menu-pdf',       component: MenuPdfComponent, },

];
