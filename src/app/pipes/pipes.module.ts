import { NgModule } from '@angular/core';
import {CommonModule} from "@angular/common";
import { ArraySortPipe, OrderByPipe } from './pipes.pipe';


@NgModule({
  declarations:[
    ArraySortPipe,
    OrderByPipe
  ], 
  imports:[CommonModule],
  exports:[
    ArraySortPipe,
    OrderByPipe
  ] 
})

export class MainPipeModule{}