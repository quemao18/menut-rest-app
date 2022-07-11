import { Routes } from '@angular/router';
import { MenuListComponent } from 'app/customer/menu/menu-list/menu-list.component';
import { CartComponent } from 'app/customer/cart/cart/cart.component';
import { HomeComponent } from 'app/customer/home/home.component';

// import { ForgotPasswordComponent } from 'app/forgot-password/forgot-password.component';
import { DishListComponent } from '../../customer/dish/dish-list/dish-list.component';
import { RestaurantsListComponent } from 'app/customer/restaurants/restaurants-list/restaurants-list.component';

export const CustomerLayoutRoutes: Routes = [
    // { path: 'login', component: LoginComponent, },
    // { path: 'forgot-password', component: ForgotPasswordComponent, },
    // { path: 'customer/home',                            component: HomeComponent, },
    { path: 'customer/home/:restId',                    component: HomeComponent, },

    { path: 'customer/restaurants',             component: RestaurantsListComponent, },
    { path: 'customer/restaurants/:uid',             component: RestaurantsListComponent, },


    // { path: 'customer/menu',     component: MenuListComponent, },
    { path: 'customer/menu/:restId',           component: MenuListComponent, },
    // { path: 'customer/menu/:restId/:uid',           component: MenuListComponent, },

    { path: 'customer/menu/:restId/dishes/:menuId',    component: DishListComponent, },
    { path: 'customer/cart',               component: CartComponent, },
    // { path: 'menu-pdf',       component: MenuPdfComponent, },

];
