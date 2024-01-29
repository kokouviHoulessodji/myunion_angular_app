import { Component, OnInit } from '@angular/core';
import { User } from '../../entity/user';
import { RegistrationService } from '../../services/registration.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-generate-token',
  templateUrl: './generate-token.component.html',
  styleUrl: './generate-token.component.css'
})
export class GenerateTokenComponent implements OnInit {
  public error= {
    class:'alert-danger',
    msg:''
  };
  user = new User();

  constructor(private _service: RegistrationService){
  }
  ngOnInit(): void {
    var idx = -1;
    try{
      idx = document.location.toString().indexOf('?');
    }
    catch(e){}

    if(idx !== -1){
      var tab = document.location.toString().split('?')[1].split('=');
      this.error.class = 'alert-danger';
      this.error.msg = decodeURIComponent(tab[1]);
      this.displayError();
    }
  }
  generate_token(f: NgForm) {
    if(f.value.email !== null && f.value.email !== undefined && f.value.email !== '')
      {
        this._service.generateNewToken(this.user).subscribe(
          value => {
            if(value.error === true){
              this.error.class = 'alert-danger';
              this.error.msg = value.msg;
            }
            else{
              this.error.class = 'alert-success';
              this.error.msg = value.msg;
            }
            
            this.displayError();
          },
        );
      }
      else{
        this.error.class = 'alert-danger';
        this.error.msg = 'Enter your email address';
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
}