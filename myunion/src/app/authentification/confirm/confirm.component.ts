import { Component, OnInit } from '@angular/core';
import { RegistrationService } from '../../services/registration.service';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrl: './confirm.component.css'
})
export class ConfirmComponent implements OnInit {

  constructor(private _service: RegistrationService){
  }
  ngOnInit(): void {
    this.confirm();
  }

  confirm(){
    var token = '';
    try{
      token = document.location.toString().split('?')[1];
    
    if(token !== null)
    {
      var tokenValue = token.split('=')[1];
      console.log(tokenValue);
      this._service.confirmAccount(tokenValue).subscribe(
        (value) => {
          if(value.error === false)
            setTimeout(()=>{
              document.location.href = '/signin?checked='+value.msg
            }, 1000);
          else
            setTimeout(()=>{
              document.location.href = '/generate_token?checked='+value.msg
            }, 1000);
        }
      );
    }
  }
  catch(e){

  }
    
  }

}
