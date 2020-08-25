import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MenuCardItemLargeComponent } from './menu-card/menu-card-item-large/menu-card-item-large.component';
import { MenuCardItemMediumComponent } from './menu-card/menu-card-item-medium/menu-card-item-medium.component';
import { DishCardItemLargeComponent } from './dish-card/dish-card-item-large/dish-card-item-large.component';
import { DishCardItemMediumComponent } from './dish-card/dish-card-item-medium/dish-card-item-medium.component';
import { QrCardComponent } from './order/qr-card/qr-card.component';
import { QRCodeModule } from 'angularx-qrcode';
import { CardItemComponent } from './order/card-item/card-item.component';
import { MenuPdfComponent } from './menu-pdf/menu-pdf/menu-pdf.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MainPipeModule } from 'app/pipes/pipes.module';
import { ArraySortPipe } from 'app/pipes/pipes.pipe';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    QRCodeModule,
    NgxSpinnerModule,
    MatButtonModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    MainPipeModule
  ],
  declarations: [
    MenuCardItemLargeComponent,
    MenuCardItemMediumComponent,
    DishCardItemLargeComponent,
    DishCardItemMediumComponent,
    QrCardComponent,
    CardItemComponent,
    MenuPdfComponent,
  ],
  exports: [
    MenuCardItemLargeComponent,
    MenuCardItemMediumComponent,
    DishCardItemLargeComponent,
    DishCardItemMediumComponent,
    QrCardComponent,
    CardItemComponent,
    MenuPdfComponent,
  ]
})
export class SharedModule { }
