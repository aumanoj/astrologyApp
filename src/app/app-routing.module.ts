import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChartHolderDetailsComponent } from './components/chart-holder-details/chart-holder-details.component';
import { ChartHoldersComponent } from './components/chart-holders/chart-holders.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HeaderFooterComponent } from './components/header-footer/header-footer.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterSuccessComponent } from './components/register-success/register-success.component';
import { VerifyUserComponent } from './components/verify-user/verify-user.component';

const routes: Routes = [
  {
  path:'',
  component:LoginComponent
  },
  {
    path:'registerSuccess',
    component: RegisterSuccessComponent
  },
  {
    path:'verify',
    component: VerifyUserComponent
  },
  {
    path:'home',
    component: DashboardComponent
  },
  {
    path: 'chartholders',
    component: ChartHoldersComponent
  },
  {
    path: 'ChartHoldersDetails',
    component: ChartHolderDetailsComponent
  },
  
  // {
  //   path:'',
  //   component:HeaderFooterComponent,
  //   children:[
  //     {
  //       path:'home',
  //       loadChildren: () => import('../app/components/dashboard/dashboard.module').then(m => m.DashboardModule)
  //     },
  //     {
  //       path: 'chartholders',
  //       loadChildren: () => import('./components/chart-holders/chart-holders.module').then(m => m.ChartHoldersModule)
  //     }
  //   ],
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
