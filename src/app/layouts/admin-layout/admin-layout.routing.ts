import { Routes } from '@angular/router';

import { DashboardComponent } from '../../admin/dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';
// import { TypographyComponent } from '../../typography/typography.component';
// import { IconsComponent } from '../../icons/icons.component';
// import { NotificationsComponent } from '../../notifications/notifications.component';
// import { UpgradeComponent } from '../../upgrade/upgrade.component';
import { MenusComponent } from 'app/admin/menus/menus.component';
import { DishesComponent } from 'app/admin/dishes/dishes.component';
import { OrdersComponent } from 'app/admin/orders/orders.component';
import { MenuPdfComponent } from 'app/shared/menu-pdf/menu-pdf/menu-pdf.component';
import { TablesComponent } from 'app/tables/tables.component';
import { RestaurantsComponent } from '../../admin/restaurants/restaurants.component';

export const AdminLayoutRoutes: Routes = [
    // { path: 'admin/dashboard',      component: DashboardComponent, },
    { path: 'admin/menus',          component: MenusComponent, },
    { path: 'admin/menus/:id',      component: MenusComponent, },

    { path: 'admin/tables-admin',   component: TablesComponent, },

    { path: 'admin/dishes',         component: DishesComponent, },
    { path: 'admin/dishes/:id',     component: DishesComponent, },

    // { path: 'admin/orders',         component: OrdersComponent, },
    // { path: 'admin/orders/:id',     component: OrdersComponent, },
    
    // { path: 'admin/menu-pdf',       component: MenuPdfComponent, },

    { path: 'admin/profile',        component: UserProfileComponent },
    // { path: 'admin/table-list',     component: TableListComponent, },
    { path: 'admin/restaurants',    component: RestaurantsComponent, },
    // { path: 'typography',     component: TypographyComponent, },
    // { path: 'icons',          component: IconsComponent, },

    // { path: 'notifications',  component: NotificationsComponent, },
    // { path: 'upgrade',        component: UpgradeComponent },

];
