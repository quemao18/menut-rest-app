import { NgModule } from '@angular/core';
import {CommonModule} from "@angular/common";
import { ArraySortPipe, OrderByPipe, PhonePipe } from './pipes.pipe';


@NgModule({
  declarations:[
    ArraySortPipe,
    OrderByPipe,
    PhonePipe
  ], 
  imports:[CommonModule],
  exports:[
    ArraySortPipe,
    OrderByPipe,
    PhonePipe,
  ] 
})

export class MainPipeModule{}