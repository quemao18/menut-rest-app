import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app.routing';

import { AppComponent } from './app.component';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { HomeLayoutComponent } from './layouts/home-layout/home-layout.component';
import { AuthService } from './services/auth/auth.service';

import { environment } from 'environments/environment';

import { NgxSpinnerModule } from "ngx-spinner";
import { NotificationService } from './services/notification/notification.service';



import { VersionCheckService } from './services/version/version-check.service';
import { NgxImageCompressService } from 'ngx-image-compress';
import { CustomerLayoutComponent } from './layouts/customer-layout/customer-layout.component';
import { ComponentsCustomerModule } from './customer/components/components-customer.module';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ShoppingCartService } from './services/shopping-cart/shopping-cart.service';
import { ComponentsWaiterModule } from './waiters/components/components-waiter.module';
import { WaiterLayoutComponent } from './layouts/waiter-layout/waiter-layout.component';
import { AuthGuard } from './services/auth/auth.guard';
import { AuthAdminGuard } from './services/auth/auth-admin.guard';
import { AuthWaiterGuard } from './services/auth/auth-waiter.guard';
import { MessagingService } from './services/notification/messaging.service';
import { AngularFireMessagingModule } from '@angular/fire/compat/messaging';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';

import { AngularFireModule } from '@angular/fire/compat';
import { HttpErrorInterceptor } from './interceptors/http-error.interceptor';
import { ServiceWorkerModule } from '@angular/service-worker';
import { ComponentsAdminModule } from './admin/components/components-admin.module';

import { chanchoTacoTheme } from './themes/chancho-taco-theme';
import { ThemeModule } from './themes/themes.module';
import { menuRestAppTheme } from './themes/menu-rest-app-theme';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsAdminModule,
    ComponentsCustomerModule,
    ComponentsWaiterModule,
    RouterModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    // AngularFirestoreModule.enablePersistence(),
    NgxSpinnerModule,
    HttpClientModule,
    AngularFireMessagingModule,
    AngularFireStorageModule,
    ServiceWorkerModule.register('combined-sw.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
    ThemeModule.forRoot({
      themes: [menuRestAppTheme, chanchoTacoTheme],
      active: 'menu-rest-app'
    })
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    HomeLayoutComponent,
    CustomerLayoutComponent,
    WaiterLayoutComponent,
  ],
  providers: [
    AuthService, 
    AuthGuard,
    AuthAdminGuard,
    AuthWaiterGuard,
    NotificationService, 
    VersionCheckService, 
    MessagingService,
    NgxImageCompressService, 
    ShoppingCartService, 
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true },
    { provide: LOCALE_ID, useValue: "en-VE" },
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }
