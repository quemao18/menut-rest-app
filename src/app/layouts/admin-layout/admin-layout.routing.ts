import { Routes } from '@angular/router';

import { DashboardComponent } from '../../admin/dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';
import { MenusComponent } from 'app/admin/menus/menus.component';
import { DishesComponent } from 'app/admin/dishes/dishes.component';
import { OrdersComponent } from 'app/admin/orders/orders.component';
import { MenuPdfComponent } from 'app/shared/menu-pdf/menu-pdf/menu-pdf.component';
import { TablesComponent } from 'app/tables/tables.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent, },
    { path: 'menus',          component: MenusComponent, },
    { path: 'tables-admin',   component: TablesComponent, },
    { path: 'dishes/:id',     component: DishesComponent, },
    { path: 'dishes',         component: DishesComponent, },
    { path: 'orders',         component: OrdersComponent, },
    { path: 'orders/:id',     component: OrdersComponent, },
    { path: 'menu-pdf',       component: MenuPdfComponent, },

    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'table-list',     component: TableListComponent, },
    { path: 'typography',     component: TypographyComponent, },
    { path: 'icons',          component: IconsComponent, },

    { path: 'notifications',  component: NotificationsComponent, },
    { path: 'upgrade',        component: UpgradeComponent },

];
