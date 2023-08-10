import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';

@Injectable({
  providedIn: 'root'
})
export class VerifyUserService {

  constructor(private generic: GenericService) { }

  verify(token) {
    return this.generic.get('Login/Userverify?token=', token);
  }
}
