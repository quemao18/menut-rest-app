import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/customer-home', title: 'Home',  icon: 'home', class: '' },
    { path: '/menu', title: 'Menú',  icon: 'restaurant_menu', class: '' },
    { path: '/cart', title: 'Cart',  icon: 'shopping_cart', class: '' },
    // { path: '/dish', title: 'Dishes',  icon: 'fastfood', class: '' },
];

@Component({
  selector: 'app-sidebar-customer',
  templateUrl: './sidebar-customer.component.html',
  styleUrls: ['./sidebar-customer.component.css']
})
export class SidebarCustomerComponent implements OnInit {
  menuItems: any[];

  constructor(public router: Router) { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
}
