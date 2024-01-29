import { Component, OnInit } from '@angular/core';
import { RegistrationService } from '../../services/registration.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  public msg: string = '';

  constructor(
    private _service: RegistrationService, 
    private authService: AuthService,
    private router: Router){
    
  }
  ngOnInit(): void {
    if(this.authService.isLoggedIn()){
      this.msg = "is login";
    }
    else{
      this.msg = "is not login";
    }
    console.log(this.msg);
    
    this._service.home().subscribe(
      value => {
        if(value.error === true && value.authentified === false){
          this.authService.logOut();
          try {
            setTimeout(()=> {
              this.router.navigateByUrl('/login');
            } , 1500);
          } catch (error) {

          }
        }
      }
    ) 
  }
}
