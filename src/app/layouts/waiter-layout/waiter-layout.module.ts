import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WaiterLayoutRoutes } from './waiter-layout.routing';
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
import { SidebarCustomerComponent } from 'app/customer/components/sidebar-customer/sidebar-customer.component';
import { NavbarCustomerComponent } from 'app/customer/components/navbar-customer/navbar-customer.component';
import { MenuCardItemLargeComponent } from 'app/shared/menu-card/menu-card-item-large/menu-card-item-large.component';
import { SharedModule } from 'app/shared/shared.module';
import { CartComponent } from 'app/customer/cart/cart/cart.component';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { HomeComponent } from 'app/waiters/home/home/home.component';
import { CardItemComponent } from 'app/shared/order/card-item/card-item.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(WaiterLayoutRoutes),
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
    ZXingScannerModule
  ],
  declarations: [
    // CartComponent
    HomeComponent,
    
  ],
})
export class WaiterLayoutModule { }
