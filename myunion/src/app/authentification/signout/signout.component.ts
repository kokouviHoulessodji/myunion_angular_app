import { Component, OnInit } from '@angular/core';
import { RegistrationService } from '../../services/registration.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signout',
  templateUrl: './signout.component.html',
  styleUrl: './signout.component.css'
})
export class SignoutComponent implements OnInit {

  public msg: string = '';

  constructor(
    private _service: RegistrationService, 
    private authService: AuthService,
    private router: Router){
  }
  ngOnInit(): void {
    if(this.authService.isLoggedIn()){
      try {
        this._service.signout().subscribe(
          value =>{
            this.msg = value.msg;
            this.authService.logOut();
            setTimeout(()=> {
              this.router.navigate(['/home']);
            } , 2500);
          }
        );
      } catch (error) {
        
      }
    }
    else{
      this.router.navigate(['/home']);
    }
  }

}
