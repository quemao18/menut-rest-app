import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'app/services/auth/auth.service';
import { environment } from 'environments/environment';
import { SettingService } from '../../../services/settings/setting.service';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    // { path: '/dashboard', title: 'Dashboard',  icon: 'dashboard', class: '' },
    // { path: '/orders', title: 'Orders',  icon: 'list', class: '' },
    { path: 'admin/restaurants', title: 'Restaurants',  icon: 'table_chart', class: '' },
    { path: 'admin/menus', title: 'Menus',  icon: 'restaurant_menu', class: '' },
    { path: 'admin/dishes', title: 'Dishes',  icon: 'fastfood', class: '' },
    // { path: '/menu-pdf', title: 'Menú PDF',  icon: 'picture_as_pdf', class: '' },
    { path: '/admin/profile', title: 'Profile',  icon:'person', class: '' },
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
  appName: string;

  constructor(public router: Router, public authService: AuthService, private settingService: SettingService) { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    setTimeout(() =>{
      this.appName = this.settingService.getSettings?.appName;
    }, 500)
  }

  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
}
