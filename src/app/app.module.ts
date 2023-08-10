import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HeaderFooterComponent } from './components/header-footer/header-footer.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { CookieService } from 'ngx-cookie-service';
import { RegisterSuccessComponent } from './components/register-success/register-success.component';
import { VerifyUserComponent } from './components/verify-user/verify-user.component';
import { CommonModule } from '@angular/common';
import { ChartHoldersComponent } from './components/chart-holders/chart-holders.component';
import { ChartHoldersModule } from './components/chart-holders/chart-holders.module';
import { ChartHolderDetailsComponent } from './components/chart-holder-details/chart-holder-details.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderFooterComponent,
    RegisterSuccessComponent,
    ChartHolderDetailsComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    ChartHoldersModule
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
