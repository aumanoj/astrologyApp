import { Component, OnInit } from '@angular/core';
import { RegisterResponse } from 'src/app/models/register/register-response';
import { VerifyUserService } from 'src/app/services/verify-user.service';

@Component({
  selector: 'app-verify-user',
  templateUrl: './verify-user.component.html'
 // styleUrls: ['./verify-user.component.css'
})
export class VerifyUserComponent implements OnInit {

  registerResponse: RegisterResponse;
  reponseMessage: string = '';
  verified: boolean = false;
  constructor(private verifyService: VerifyUserService) { }

  ngOnInit(): void {
    debugger;
    var currentURL = window.location.href;
    var token = currentURL.split('t=')[1];
    this.verifyService.verify(token).subscribe(
      res => {
        this.registerResponse = res;
        if(this.registerResponse.success) {
          this.reponseMessage = this.registerResponse.message;
          this.verified = this.registerResponse.success;
        }
      }
    )
  }

}
