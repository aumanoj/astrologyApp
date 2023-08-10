import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChartHoldersComponent } from './chart-holders.component';

const routes: Routes = [{ path: 'chartholders', component: ChartHoldersComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChartHoldersRoutingModule { }
