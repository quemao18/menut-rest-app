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
    // { path: '/dashboard', title: 'Dashboard',  icon: 'dashboard', class: '' },
    { path: '/orders', title: 'Orders',  icon: 'list', class: '' },
    { path: '/menus', title: 'Menus',  icon: 'menu_book', class: '' },
    { path: '/dishes', title: 'Dishes',  icon: 'fastfood', class: '' },
    { path: '/menu-pdf', title: 'Menú PDF',  icon: 'picture_as_pdf', class: '' },
    // { path: '/user-profile', title: 'User Profile',  icon:'person', class: '' },
    // { path: '/table-list', title: 'Table List',  icon:'content_paste', class: '' },
    // { path: '/typography', title: 'Typography',  icon:'library_books', class: '' },
    // { path: '/icons', title: 'Icons',  icon:'bubble_chart', class: '' },
    // { path: '/maps', title: 'Maps',  icon:'location_on', class: '' },
    // { path: '/notifications', title: 'Notifications',  icon:'notifications', class: '' },
    // { path: '/upgrade', title: 'Upgrade to PRO',  icon:'unarchive', class: 'active-pro' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
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
