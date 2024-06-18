import { Injectable, effect, signal } from '@angular/core';
import { Admin } from '../classes/admin.class';

@Injectable({
  providedIn: 'root'
})
export class AuthSignalService {

  constructor() {
    effect(
      ()=> {
        console.log(this.logged_in_admin())
      }
    )
   }

  logged_in_admin = signal(
    {
        _id: '',
        firstname: '',
        lastname:  '',
        email:  '',
        phone: '',
        password: '',
        permissions: {
            packages: '',
            visa: '',
            recruitment: '',
            accounting: '',
            users: '',
            notes: ''
        },
        token: '',
    }
  )

}
