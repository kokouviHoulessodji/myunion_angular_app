import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  storageKey: string = 'bearer';

  constructor() { }

  setToken(token: string){
    localStorage.setItem(this.storageKey, token);
  }

  getToken(){
    return localStorage.getItem(this.storageKey);
  }

  isLoggedIn(){
    return this.getToken() !== null;
  }
  logOut(){
    localStorage.removeItem(this.storageKey);
  }
  getHttpOptions(){
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.getToken()}`
      })
    }
  }
}
