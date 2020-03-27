import { Injectable } from '@angular/core';

import { auth } from 'firebase/app';
import { AngularFireAuth } from "@angular/fire/auth";
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public afAuth: AngularFireAuth,) { }

  GoogleAuth() {
    return this.AuthLogin(new auth.GoogleAuthProvider());
  }

  logOut(){
    return this.afAuth.auth.signOut();
  }

  AuthLogin(provider) {
    
    return new Promise<any>((resolve, reject) => {
      let provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope('profile');
      provider.addScope('email');
      this.afAuth.auth
      .signInWithPopup(provider)
      .then(res => {
        resolve(res);
      })
    })
  }
}
