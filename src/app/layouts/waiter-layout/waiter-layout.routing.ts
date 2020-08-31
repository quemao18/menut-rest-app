import { Routes } from '@angular/router';
import { WaiterComponent } from 'app/waiters/waiter/waiter.component';
import { HomeComponent } from 'app/waiters/home/home.component';
// import { ForgotPasswordComponent } from 'app/forgot-password/forgot-password.component';

export const WaiterLayoutRoutes: Routes = [
    // { path: 'login', component: LoginComponent, },
    // { path: 'forgot-password', component: ForgotPasswordComponent, },
    { path: 'waiter-home', component: HomeComponent, },
    { path: 'tables', component: WaiterComponent, },
];
