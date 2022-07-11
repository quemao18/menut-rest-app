import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerLayoutRoutes } from './customer-layout.routing';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MenuListComponent } from 'app/customer/menu/menu-list/menu-list.component';
import { DishListComponent } from 'app/customer/dish/dish-list/dish-list.component';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgxPaginationModule } from 'ngx-pagination';
import { LightboxModule } from 'ngx-lightbox';

import { SharedModule } from 'app/shared/shared.module';
import { CartComponent } from 'app/customer/cart/cart/cart.component';
import { HomeComponent } from 'app/customer/home/home.component';
import { RestaurantsListComponent } from 'app/customer/restaurants/restaurants-list/restaurants-list.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(CustomerLayoutRoutes),
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    SharedModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    NgxSpinnerModule,
    NgxPaginationModule,
    LightboxModule,
  ],
  declarations: [
    MenuListComponent,
    DishListComponent,
    RestaurantsListComponent,
    CartComponent,
    HomeComponent
  ],
})
export class CustomerLayoutModule { }
