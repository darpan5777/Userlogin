import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AccountserviceService } from './accountservice.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AuthGuardService } from './Authgaurd/auth-guard.service';
import { AuthenticationService } from './Authgaurd/authentication.service';

import { BackendService, fakeBackendProvider } from './Authgaurd/backend.service';
import { ErrorinterceptorService } from './Authgaurd/errorinterceptor.service';
import { JwtinterceptorService } from './Authgaurd/jwtinterceptor.service';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
  AppComponent,
    LoginComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule, 
    HttpClientModule,
  
  ],
  providers: [ 
    { provide: HTTP_INTERCEPTORS, useClass: JwtinterceptorService, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorinterceptorService, multi: true },
    

    fakeBackendProvider,
],
  bootstrap: [AppComponent]
})
export class AppModule { }
