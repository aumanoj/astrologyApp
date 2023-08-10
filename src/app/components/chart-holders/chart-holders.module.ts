import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChartHoldersRoutingModule } from './chart-holders-routing.module';
import { ChartHoldersComponent } from './chart-holders.component';
import { BrowserModule } from '@angular/platform-browser';


@NgModule({
  declarations: [ChartHoldersComponent],
  imports: [
    CommonModule,
    BrowserModule,
    ChartHoldersRoutingModule
  ]
})
export class ChartHoldersModule { }
