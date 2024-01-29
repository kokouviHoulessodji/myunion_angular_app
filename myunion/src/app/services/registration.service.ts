import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../entity/user';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(private http: HttpClient, private auth: AuthService) {
    
  }

  public home() : Observable<any>{
    console.log(this.auth.getToken());
    console.log(this.auth.getHttpOptions());
    return this.http.get(environment.apiBaseUrl+'registration/home', this.auth.getHttpOptions());
  }
  public login(user: User) : Observable<any>{
    return this.http.post(environment.apiBaseUrl+'registration/signin', user);
  }
  public signout() : Observable<any>{
    return this.http.get(environment.apiBaseUrl+'registration/signout', this.auth.getHttpOptions());
  }
  public register(user: User) : Observable<any>{
    return this.http.post(environment.apiBaseUrl+'registration/register', user);
  }
  public confirmAccount(token: string) : Observable<any>{
    return this.http.get(environment.apiBaseUrl+'registration/confirm?token='+token);
  }
  public generateNewToken(user: User) : Observable<any>{
    return this.http.post(environment.apiBaseUrl+'registration/generate_new_token', user);
  }
  public resetPassword(user: User) : Observable<any>{
    return this.http.put(environment.apiBaseUrl+'registration/reset_password', user);
  }
}
