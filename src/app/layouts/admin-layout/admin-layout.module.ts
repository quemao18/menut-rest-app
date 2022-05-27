import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../admin/dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';

import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatRippleModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';
import { ImageCropperModule } from 'ngx-image-cropper';
import { MenusComponent } from 'app/admin/menus/menus.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgxPaginationModule } from 'ngx-pagination';
import { FilterPipe, FilterOrderPipe, Filter2Pipe } from 'app/pipes/pipes.pipe';

import { LightboxModule } from 'ngx-lightbox';
import { DishesComponent } from 'app/admin/dishes/dishes.component';
import { SharedModule } from 'app/shared/shared.module';
import { OrdersComponent, DialogItems } from 'app/admin/orders/orders.component';
import { TablesComponent } from 'app/tables/tables.component';


@NgModule({
  imports: [
    CommonModule,
    // BrowserModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatSelectModule,
    MatTooltipModule,
    ImageCropperModule,
    NgxSpinnerModule,
    NgxPaginationModule,
    LightboxModule,
    SharedModule,
  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    TableListComponent,
    TypographyComponent,
    IconsComponent,
    // MapsComponent,
    NotificationsComponent,
    UpgradeComponent,
    MenusComponent,
    TablesComponent,
    DishesComponent,
    FilterPipe,
    Filter2Pipe,
    FilterOrderPipe,
    OrdersComponent,
    DialogItems,
  ],
  entryComponents: [ 
    DialogItems 
  ],
})

export class AdminLayoutModule {}
