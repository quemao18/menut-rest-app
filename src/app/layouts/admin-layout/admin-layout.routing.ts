import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';
import { WizardComponent } from 'app/wizard/wizard.component';
import { MenusComponent } from 'app/menus/menus.component';
import { DishesComponent } from 'app/dishes/dishes.component';
import { OrdersComponent } from 'app/orders/orders/orders.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent, },
    { path: 'menus',          component: MenusComponent, },
    { path: 'dishes/:id',     component: DishesComponent, },
    { path: 'dishes',         component: DishesComponent, },
    { path: 'orders',         component: OrdersComponent, },


    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'table-list',     component: TableListComponent, },
    { path: 'typography',     component: TypographyComponent, },
    { path: 'icons',          component: IconsComponent, },

    { path: 'notifications',  component: NotificationsComponent, },
    { path: 'upgrade',        component: UpgradeComponent },
    { path: 'wizard',         component: WizardComponent },

];
