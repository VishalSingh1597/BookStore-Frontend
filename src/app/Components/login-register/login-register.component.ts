import { Component, Injectable, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserServiceService } from 'src/app/Services/user-service.service';
@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.scss']
})
export class LoginRegisterComponent implements OnInit {

  constructor(private userService:UserServiceService, private snackBar:MatSnackBar,private router:Router) { }
  LoginForm!:FormGroup;
  RegisterForm!:FormGroup;
  LoginEmailExists:any;
  RegisterEmailExists:any;
  hide = true;
  backColor = "#777777";
  changeColor()
  {
    this.backColor = "#ACACAC";
  }
  ngOnInit(): void {
    this.RegisterForm = new FormGroup({
      FullName: new FormControl('',[ Validators.required]),
      EmailId: new FormControl('',[Validators.required, Validators.email]),
      Password:new FormControl('', [Validators.required, Validators.minLength(6)]),
      PhoneNo:new FormControl('',[Validators.required,Validators.pattern("^[6-9]{1}[0-9]{9}$")])
    });
    this.LoginForm = new FormGroup({
     EmailId: new FormControl('',[Validators.required, Validators.email]),
      Password:new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }
  getErrorMessage(inputName:string) {
    let minLen = inputName=="Password"?8:3;
    
    if (this.LoginForm.controls[`${inputName}`].hasError('required')) {
      return `You must enter a value`;
    }
    else if(this.LoginForm.controls[`${inputName}`].hasError('minlength')){
      return `minimum ${minLen} characters`;
    }
    else if(this.LoginForm.controls[`${inputName}`].hasError('email'))
    {
      return `${inputName} is invalid`;
    }
    return this.LoginForm.controls[`${inputName}`].hasError('pattern') ? `${inputName} is invalid` : '';
}
getErrorMessageRegister(inputName:string) {
  let minLen = inputName=="Password"?8:3;
  
  if (this.RegisterForm.controls[`${inputName}`].hasError('required')) {
    return `You must enter a value`;
  }
  else if(this.RegisterForm.controls[`${inputName}`].hasError('minlength')){
    return `minimum ${minLen} characters`;
  }
  else if(this.RegisterForm.controls[`${inputName}`].hasError('email'))
  {
    return `${inputName} is invalid`;
  }
  return this.RegisterForm.controls[`${inputName}`].hasError('pattern') ? `${inputName} is invalid` : '';
}
  Register()
  {
    console.log(this.RegisterForm.value);
    this.userService.Register(this.RegisterForm.value)
    .subscribe((result:any)=>{
      this.snackBar.open(`${result.message}`, '', {
          duration: 3000,
          verticalPosition: 'bottom',
          horizontalPosition: 'left'
        });
        if(result.status == true)
        {
          this.router.navigate(['/login']);
          this.RegisterForm.reset();
          
        }
    },error => {  
      this.snackBar.open(`${error.error.message}`, '', {
        duration: 3000,
        verticalPosition: 'bottom',
        horizontalPosition: 'left'
      });
    })
  }
  CheckLoginEmailExists()
  {
    this.userService.CheckEmailExists(this.LoginForm.value.email).subscribe((result:any)=>{
      console.log(result);
      this.LoginEmailExists = result.status?"Email Id Not Exists":"";
    });
  }
  CheckRegisterEmailExists()
  {
    this.userService.CheckEmailExists(this.RegisterForm.value.email).subscribe((result:any)=>{
      console.log(result);
      this.RegisterEmailExists = result.status?"Email Id Already Exists":"";
    });
  }
  Login()
  {
    console.log(this.LoginForm.value);
    this.userService.Login(this.LoginForm.value)
    .subscribe((result:any)=>{
      console.log(result);
      if(result.data)
      {
        localStorage.setItem('userDetails',JSON.stringify(result.data));
        localStorage.setItem('token',JSON.stringify(result.resultMessage));
        this.snackBar.open(`${result.message}`, '', {
          duration: 3000,
          verticalPosition: 'bottom',
          horizontalPosition: 'left'
        });
        if(result.status == true)
        {
          this.router.navigate(['/home']);
        }
      }
      else
      {
        localStorage.setItem('userDetails',JSON.stringify(result.data));
        localStorage.setItem('token',JSON.stringify(result.resultMessage));
        this.snackBar.open(`${result.message}`, '', {
          duration: 3000,
          verticalPosition: 'bottom',
          horizontalPosition: 'left'
        });
        if(result.status == true)
        {
          this.router.navigate(['/home']);
        }
      }
    },error => {  
      this.snackBar.open(`${error.error.message}`, '', {
        duration: 3000,
        verticalPosition: 'bottom',
        horizontalPosition: 'left'
      });
    })
    
  }

}
