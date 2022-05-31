import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'app/services/auth/auth.service';
import { environment } from '../../../../environments/environment';
import { SettingService } from '../../../services/settings/setting.service';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: 'customer/home', title: 'Inicio',  icon: 'home', class: '' },
    { path: 'customer/menu', title: 'Menú',  icon: 'restaurant_menu', class: '' },
    // { path: '/cart', title: 'Pedido',  icon: 'shopping_cart', class: '' },
    // { path: '/dish', title: 'Dishes',  icon: 'fastfood', class: '' },
];

@Component({
  selector: 'app-sidebar-customer',
  templateUrl: './sidebar-customer.component.html',
  styleUrls: ['./sidebar-customer.component.css']
})
export class SidebarCustomerComponent implements OnInit {
  menuItems: any[];

  appName: string;


  constructor(public router: Router, public authService: AuthService, private settingService: SettingService) { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.appName = this.settingService.getSettings.appName;
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
}
