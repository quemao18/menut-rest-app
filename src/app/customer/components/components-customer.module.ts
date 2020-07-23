import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NavbarCustomerComponent } from './navbar-customer/navbar-customer.component';
import { SidebarCustomerComponent } from './sidebar-customer/sidebar-customer.component';
import { FooterCustomerComponent } from './footer-customer/footer-customer.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
  ],
  declarations: [
    FooterCustomerComponent,
    NavbarCustomerComponent,
    SidebarCustomerComponent
  ],
  exports: [
    FooterCustomerComponent,
    NavbarCustomerComponent,
    SidebarCustomerComponent
  ]
})
export class ComponentsCustomerModule { }
