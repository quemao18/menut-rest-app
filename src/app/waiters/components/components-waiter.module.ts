import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FooterWaiterComponent } from './footer-waiter/footer-waiter.component';
import { SidebarWaiterComponent } from './sidebar-waiter/sidebar-waiter.component';
import { NavbarWaiterComponent } from './navbar-waiter/navbar-waiter.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
  ],
  declarations: [
    FooterWaiterComponent,
    NavbarWaiterComponent,
    SidebarWaiterComponent
  ],
  exports: [
    FooterWaiterComponent,
    NavbarWaiterComponent,
    SidebarWaiterComponent
  ]
})
export class ComponentsWaiterModule { }
