import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'app/services/auth/auth.service';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/waiter-home', title: 'Inicio',  icon: 'home', class: '' },
    { path: '/tables', title: 'Mesas',  icon: 'restaurant', class: '' },
];

@Component({
  selector: 'app-sidebar-waiter',
  templateUrl: './sidebar-waiter.component.html',
  styleUrls: ['./sidebar-waiter.component.css']
})
export class SidebarWaiterComponent implements OnInit {
  menuItems: any[];

  constructor(public router: Router, public authService: AuthService) { }

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
