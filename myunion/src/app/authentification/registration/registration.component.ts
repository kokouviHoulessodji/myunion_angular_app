import { Component } from '@angular/core';
import { User } from '../../entity/user';
import { RegistrationService } from '../../services/registration.service';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css'
})
export class RegistrationComponent {
  public error= {
    class:'alert-danger',
    msg:''
  };
  user = new User();

  constructor(private _service: RegistrationService, 
    private authService: AuthService,
    private router: Router){
  }
  ngOnInit(): void {
    if(this.authService.isLoggedIn()){
      this.router.navigate(['/home']);
    }
  }
  register(f: NgForm) {
    if(f.valid)
    {
      console.log(f.value);
      if(f.value.password === f.value.password2)
      {
        this._service.register(this.user).subscribe(
          (value) => {
            if(value.error === true){
              this.error.class = 'alert-danger';
              this.error.msg = value.msg;
            }
            else{
              this.error.class = 'alert-success';
              this.showOrHideSpinner(this.error.class);
              this.error.msg = "Successfully register.\nCheck your email to confirm your account";
              setTimeout(()=> {
                document.location.href = "/signin"
               } , 5000);
            }
            
            this.showOrHideSpinner(this.error.class);
            this.displayError();
          }
        );
      }
      else
      {
        this.error.class = 'alert-danger';
        this.error.msg = 'Passwords don\'t match';
        this.showOrHideSpinner(this.error.class);
        this.displayError()
      }
    }
    else
    {
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
