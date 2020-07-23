import { NgModule, Pipe } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
// import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatRippleModule} from '@angular/material/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSelectModule} from '@angular/material/select';
import { WizardComponent } from 'app/wizard/wizard.component';
import { NgWizardModule, NgWizardConfig, THEME } from 'ng-wizard';
import { ImageCropperModule } from 'ngx-image-cropper';
import { MenusComponent } from 'app/menus/menus.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgxPaginationModule } from 'ngx-pagination';
import { FilterPipe } from 'app/pipes/pipes.pipe';

import { LightboxModule } from 'ngx-lightbox';
import { DishesComponent } from 'app/dishes/dishes.component';
import { MenuCardItemLargeComponent } from 'app/shared/menu-card/menu-card-item-large/menu-card-item-large.component';
import { MenuCardItemMediumComponent } from 'app/shared/menu-card/menu-card-item-medium/menu-card-item-medium.component';
import { DishCardItemLargeComponent } from 'app/shared/dish-card/dish-card-item-large/dish-card-item-large.component';
import { DishCardItemMediumComponent } from 'app/shared/dish-card/dish-card-item-medium/dish-card-item-medium.component';
import { SharedModule } from 'app/shared/shared.module';
// import { AgGridModule } from '@ag-grid-community/angular';
// import { FilterPipeModule, FilterPipe } from 'ngx-filter-pipe';

const ngWizardConfig: NgWizardConfig = {
  theme: THEME.default
};
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    ImageCropperModule,
    NgxSpinnerModule,
    NgxPaginationModule,
    LightboxModule,
    SharedModule
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
    WizardComponent,
    MenusComponent,
    DishesComponent,
    FilterPipe,
  ],
 
})

export class AdminLayoutModule {}
