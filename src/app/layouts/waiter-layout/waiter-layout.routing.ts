import { Routes } from '@angular/router';
import { HomeComponent } from 'app/waiters/home/home/home.component';
// import { ForgotPasswordComponent } from 'app/forgot-password/forgot-password.component';

export const WaiterLayoutRoutes: Routes = [
    // { path: 'login', component: LoginComponent, },
    // { path: 'forgot-password', component: ForgotPasswordComponent, },
    { path: 'waiter', component: HomeComponent, },
];
