import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { LoginRequest } from '../../models/login/login-request';
import { LoginResponse } from '../../models/login/login-response';
import { RegisterRequest } from '../../models/register/register-request';
import { RegisterResponse } from '../../models/register/register-response';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginRequest: LoginRequest;
  loginResponse: LoginResponse;
  registerRequest: RegisterRequest;
  registerResponse: RegisterResponse;
  emailForPassword: string;

  constructor(private loginService: LoginService, private router: Router, private _cookieService: CookieService, private toastr: ToastrService) {
    this.loginRequest = new LoginRequest();
    this.registerRequest = new RegisterRequest();
    this.emailForPassword = '';
   }

  ngOnInit(): void {
  }

  login() {
    debugger;
    if(this.loginRequest.UserName == '' || this.loginRequest.UserName == null || this.loginRequest.UserName == undefined) {
      this.toastr.info('Username cannot be empty!');
      return;
    }
    if(this.loginRequest.Password == '' || this.loginRequest.Password == null || this.loginRequest.Password == undefined) {
      this.toastr.info('Password cannot be empty!');
      return;
    }
    this.loginRequest.deviceinfo = navigator.userAgent;
    this.loginRequest.URL = window.location.href;
    this.loginService.authenticate(this.loginRequest).subscribe (
      res => {
        debugger;
        this.loginResponse = res;
        if(this.loginResponse.success == true && this.loginResponse.status == '200') {
          // ADD USERNAME AND PASSWORD (ENCRYPTED) IN SESSION STORAGE

          sessionStorage.setItem('accessToken', JSON.stringify(this.loginResponse.result.access_token));
          if(this.loginRequest.IsRemember) {
            this._cookieService.set('username', this.loginRequest.UserName, 30);
            this._cookieService.set('password', this.loginRequest.Password, 30);
          }
          this.router.navigate(['/chartholders']);
        }
        else {
          this.toastr.error('Username or password is not correct!');
          this.router.navigate(['/']);
        }
        console.log(res);
      }
    )
  }

  registerUser() {
    if(this.registerRequest.Password == this.registerRequest.ConfirmPassword) {
      this.registerRequest.URL = window.location.href;
      this.loginService.register(this.registerRequest).subscribe (
        res => {
          this.registerResponse = res;
          if(this.registerResponse && this.registerResponse != null || this.registerResponse != undefined) {
            if(this.registerResponse.success) {
              this.toastr.success(this.registerResponse.message);
              this.router.navigate(['/registerSuccess']);
            }
            else {
              this.toastr.error(this.registerResponse.message);
            }
          }
        }
      );
    }
  }

  forgotPassword() {
    debugger;
    if(this.emailForPassword != "") {
      this.registerRequest.Email = this.emailForPassword;
      this.loginService.forgotPassword(this.registerRequest).subscribe (
        res => {
          if(res) {
            this.registerResponse = res;
            if(this.registerResponse.success) {
              this.toastr.success(this.registerResponse.message);
            }
          }
          
        }
      )
    }
  }

}
