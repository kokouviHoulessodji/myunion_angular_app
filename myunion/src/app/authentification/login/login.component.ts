import { Component, OnInit } from '@angular/core';
import { User } from '../../entity/user';
import { RegistrationService } from '../../services/registration.service';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  public error= {
    class:'alert-danger',
    msg:''
  };
  user = new User();

  constructor(
    private _service: RegistrationService, 
    private authService: AuthService,
    private router: Router){
  }
  ngOnInit(): void {
    if(this.authService.isLoggedIn())
      this.router.navigate(['/home']);
    
    var idx = -1;
    try{
      idx = document.location.toString().indexOf('?');
    }
    catch(e){}

    if(idx !== -1){
      var tab = '';
      var tab1 = <any>[];
      try{
        tab = document.location.toString().split('?')[1];
        tab1 = tab.split('=');
      }
      catch(e){}

      if(tab == 'expired=true')
      {
        this._service.signout().subscribe(
          value => {
            console.log(value);
            this.error.class = 'alert-success';
            this.error.msg = value.msg
            this.displayError();
          }
        );
        
      }
      else
      {
        if(tab1[1] === 'confirmed')
        {
          this.error.class = 'alert-success';
          this.error.msg = 'Your account is confirmed'
          this.displayError();
        }
        else
        {
          this.error.class = 'alert-danger';
          this.error.msg = decodeURIComponent(tab[1]);
          this.displayError();
        }
      }
    }
  }
  login(f: NgForm) {
    if(f.valid)
      {
        this._service.login(this.user).subscribe(
          value => {
            console.log(value);
            if(value.error === true){
              this.error.class = 'alert-danger';
              this.error.msg = value.msg;
            }
            else{
              this.error.class = 'alert-success';
              this.showOrHideSpinner(this.error.class);
              this.error.msg = "";
              this.authService.setToken(value.bearer);
              setTimeout(()=> {
                this.router.navigate(['/home']);
              } , 2500);
            }
            
            this.showOrHideSpinner(this.error.class);
            this.displayError();
          },
        );
      }
      else{
        this.error.class = 'alert-danger';
        this.error.msg = 'All inputs are required';
        this.showOrHideSpinner(this.error.class);
        this.displayError()
      }
  }
  displayError(){
    
    var elemError = document.getElementById("error");
    if(elemError !== null && elemError !== undefined)
      if(this.error.msg === "")
      {
        elemError.style.display = 'none';
        elemError.classList.remove('alert-danger', 'alert-success');
        elemError.classList.add(this.error.class);
      }
      else
      {
        elemError.style.display = 'block';
        elemError.classList.remove('alert-danger', 'alert-success');
        elemError.classList.add(this.error.class);
      }
  }
  showOrHideSpinner(value: string){
    var spinner = document.getElementsByClassName("spinner-border")[0]
    if(spinner !== null && spinner !== undefined)
      if(value === 'alert-success')
        spinner.removeAttribute("hidden");
      else
        spinner.setAttribute("hidden", "true");
  }
}
