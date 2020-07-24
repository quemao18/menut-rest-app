import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MenuCardItemLargeComponent } from './menu-card/menu-card-item-large/menu-card-item-large.component';
import { MenuCardItemMediumComponent } from './menu-card/menu-card-item-medium/menu-card-item-medium.component';
import { DishCardItemLargeComponent } from './dish-card/dish-card-item-large/dish-card-item-large.component';
import { DishCardItemMediumComponent } from './dish-card/dish-card-item-medium/dish-card-item-medium.component';
import { QrCardComponent } from './order/qr-card/qr-card.component';
import { QRCodeModule } from 'angularx-qrcode';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    QRCodeModule
  ],
  declarations: [
    MenuCardItemLargeComponent,
    MenuCardItemMediumComponent,
    DishCardItemLargeComponent,
    DishCardItemMediumComponent,
    QrCardComponent
  ],
  exports: [
    MenuCardItemLargeComponent,
    MenuCardItemMediumComponent,
    DishCardItemLargeComponent,
    DishCardItemMediumComponent,
    QrCardComponent
  ]
})
export class SharedModule { }
