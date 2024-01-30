import { Component } from '@angular/core';
import { User } from '../../entity/user';
import { RegistrationService } from '../../services/registration.service';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { PasswordValidators } from '../../password-validators/password-validators';

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

  submitted = false;
  isWorking = false;

  signupForm = new FormGroup(
    {
      lastname: new FormControl(this.user.lastName, [Validators.required]),
      firstname: new FormControl(this.user.firstName, [Validators.required]),
      email: new FormControl(this.user.email, [Validators.email, Validators.required]),
      birthdate: new FormControl(this.user.birthdate, [Validators.required]),
      telnumber: new FormControl(this.user.telnumber, [Validators.required]),
      country: new FormControl(this.user.address.country, [Validators.required]),
      town: new FormControl(this.user.address.town, [Validators.required]),
      area: new FormControl(this.user.address.area, [Validators.required]),
      password: new FormControl(
        this.user.password,
        Validators.compose([
          Validators.required,
          Validators.minLength(8),
          PasswordValidators.patternValidator(new RegExp("(?=.*[0-9])"), {
            requiresDigit: true
          }),
          PasswordValidators.patternValidator(new RegExp("(?=.*[A-Z])"), {
            requiresUppercase: true
          }),
          PasswordValidators.patternValidator(new RegExp("(?=.*[a-z])"), {
            requiresLowercase: true
          }),
          PasswordValidators.patternValidator(new RegExp("(?=.*[$@^!%*?&])"), {
            requiresSpecialChars: true
          })
        ])
      ),
      password2: new FormControl(this.user.password2, [
        Validators.required,
        Validators.minLength(8)
      ])
    },
    {
      validators: PasswordValidators.MatchValidator
    }
  );

  // convenience getter for easy access to form controls
  get f() {
    return this.signupForm.controls;
  }

  get passwordValid() {
    return this.signupForm.controls["password"].errors === null;
  }

  get requiredValid() {
    return !this.signupForm.controls["password"].hasError("required");
  }

  get minLengthValid() {
    return !this.signupForm.controls["password"].hasError("minlength");
  }

  get requiresDigitValid() {
    return !this.signupForm.controls["password"].hasError("requiresDigit");
  }

  get requiresUppercaseValid() {
    return !this.signupForm.controls["password"].hasError("requiresUppercase");
  }

  get requiresLowercaseValid() {
    return !this.signupForm.controls["password"].hasError("requiresLowercase");
  }

  get requiresSpecialCharsValid() {
    return !this.signupForm.controls["password"].hasError("requiresSpecialChars");
  }

  setUser(){
    this.user.lastName = this.signupForm.get('lastname').value;
    this.user.firstName = this.signupForm.get('firstname').value;
    this.user.birthdate = this.signupForm.get('birthdate').value;
    this.user.email = this.signupForm.get('email').value;
    this.user.telnumber = this.signupForm.get('telnumber').value;
    this.user.password = this.signupForm.get('password').value;
    this.user.address.area = this.signupForm.get('area').value;
    this.user.address.country = this.signupForm.get('country').value;
    this.user.address.town = this.signupForm.get('town').value;
  }

  ngOnInit(): void {
    if(this.authService.isLoggedIn()){
      this.router.navigate(['/home']);
    }
  }
  register() {
    this.submitted = true;

    if (this.signupForm.invalid) {
      this.error.class = 'alert-danger';
      this.error.msg = 'All inputs are required';
      this.showOrHideSpinner(this.error.class);
      this.displayError()
    }
    else
    {
      this.setUser();

      this.isWorking = true;
      this.signupForm.disable();

      setTimeout(() => {
        this.isWorking = false;
        this.signupForm.enable();
      }, 1500);

      console.log(this.user);
      if(this.signupForm.value.password === this.signupForm.value.password2)
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
              this.error.msg = "Compte créé.\nVérifiez votre boite mail pour valider votre compte";
              setTimeout(()=> {
                document.location.href = "/login"
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
