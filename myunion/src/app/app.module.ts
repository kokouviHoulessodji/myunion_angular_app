import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './authentification/login/login.component';
import { RegistrationComponent } from './authentification/registration/registration.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmComponent } from './authentification/confirm/confirm.component';
import { GenerateTokenComponent } from './authentification/generate-token/generate-token.component';
import { ResetPasswordComponent } from './authentification/reset-password/reset-password.component';
import { SignoutComponent } from './authentification/signout/signout.component';
import { HomeComponent } from './authentification/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    ConfirmComponent,
    GenerateTokenComponent,
    ResetPasswordComponent,
    SignoutComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
