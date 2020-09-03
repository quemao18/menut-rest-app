import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';

import { AppComponent } from './app.component';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { HomeLayoutComponent } from './layouts/home-layout/home-layout.component';
import { AuthService } from './services/auth/auth.service';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from 'environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { NgxSpinnerModule } from "ngx-spinner";
import { NotificationService } from './services/notification/notification.service';

import { AngularFireStorageModule } from '@angular/fire/storage';

import { VersionCheckService } from './services/version/version-check.service';
import { NgxImageCompressService } from 'ngx-image-compress';
import { CustomerLayoutComponent } from './layouts/customer-layout/customer-layout.component';
import { ComponentsCustomerModule } from './customer/components/components-customer.module';

import { HttpClientModule } from '@angular/common/http';
import { ShoppingCartService } from './services/shopping-cart/shopping-cart.service';
import { ComponentsWaiterModule } from './waiters/components/components-waiter.module';
import { WaiterLayoutComponent } from './layouts/waiter-layout/waiter-layout.component';
import { AuthGuard } from './services/auth/auth.guard';
import { AuthAdminGuard } from './services/auth/auth-admin.guard';
import { AuthWaiterGuard } from './services/auth/auth-waiter.guard';
import { MessagingService } from './services/notification/messaging.service';
import { AngularFireMessagingModule } from '@angular/fire/messaging';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    ComponentsModule,
    ComponentsCustomerModule,
    ComponentsWaiterModule,
    RouterModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    NgxSpinnerModule,
    HttpClientModule,
    AngularFireMessagingModule
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
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }
