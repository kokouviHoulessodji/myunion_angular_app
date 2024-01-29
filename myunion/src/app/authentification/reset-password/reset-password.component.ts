import { Component, OnInit } from '@angular/core';
import { User } from '../../entity/user';
import { RegistrationService } from '../../services/registration.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent implements OnInit {
  public error= {
    class:'alert-danger',
    msg:''
  };
  user = new User();

  constructor(private _service: RegistrationService){
  }
  ngOnInit(): void {
    
  }
  reset_password(f: NgForm) {
    if(f.value.email !== null && f.value.email !== undefined && f.value.email !== ''
      && f.value.newpassword !== null && f.value.newpassword !== undefined && f.value.newpassword !== ''
      && f.value.newpassword2 !== null && f.value.newpassword2 !== undefined && f.value.newpassword2 !== '')
      {
        if(f.value.newpassword === f.value.newpassword2)
        {
          this._service.resetPassword(this.user).subscribe(
            value => {
              if(value.error === true){
                this.error.class = 'alert-danger';
                this.error.msg = value.msg;
                this.displayError();
              }
              else{
                this.error.class = 'alert-success';
                this.error.msg = "";
                this.showOrHideSpinner(this.error.class);
                this.displayError();
                setTimeout(()=> {
                  document.location.href = "/signin"
                } , 2500);
              }
              
            },
          );
        }
        else
        {
          this.error.class = 'alert-danger';
          this.error.msg = 'The new password don\'t match';
          this.displayError();
        }
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
