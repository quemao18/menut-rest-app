import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WaiterLayoutRoutes } from './waiter-layout.routing';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgxPaginationModule } from 'ngx-pagination';
import { LightboxModule } from 'ngx-lightbox';
import { SharedModule } from 'app/shared/shared.module';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { HomeComponent } from 'app/waiters/home/home.component';
import { WaiterComponent } from 'app/waiters/waiter/waiter.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(WaiterLayoutRoutes),
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    SharedModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    NgxSpinnerModule,
    NgxPaginationModule,
    LightboxModule,
    ZXingScannerModule
  ],
  declarations: [
    // CartComponent
    HomeComponent,
    WaiterComponent
    
  ],
})
export class WaiterLayoutModule { }
