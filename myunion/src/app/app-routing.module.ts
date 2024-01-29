import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './authentification/login/login.component';
import { RegistrationComponent } from './authentification/registration/registration.component';
import { ConfirmComponent } from './authentification/confirm/confirm.component';
import { GenerateTokenComponent } from './authentification/generate-token/generate-token.component';
import { ResetPasswordComponent } from './authentification/reset-password/reset-password.component';
import { SignoutComponent } from './authentification/signout/signout.component';
import { HomeComponent } from './authentification/home/home.component';

const routes: Routes = [
  {path:'home', component:HomeComponent},
  {path:'login', component:LoginComponent},
  {path:'register', component:RegistrationComponent},
  {path:'confirm', component:ConfirmComponent},
  {path:'generate_token', component:GenerateTokenComponent},
  {path:'reset_password', component:ResetPasswordComponent},
  {path:'logout', component:SignoutComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
