import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { auth } from 'firebase/app';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Goo } from './goo.model'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: Observable<any>;

  constructor(private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router) { 

      this.user$ = this.afAuth.authState;
      
    }

    async googleSignin() {
      const provider = new auth.GoogleAuthProvider();
      const credential = await this.afAuth.auth.signInWithPopup(provider);
      return this.updateUserData(credential.user);
    }

    async signOut() {
      await this.afAuth.auth.signOut();
      this.router.navigate(['/']);
    }

    private updateUserData({uid, email, displayName, photoURL} : Goo) {
      // Sets user data to firestore on login
      const userRef: AngularFirestoreDocument<Goo> = this.afs.doc('users/${uid}');
  
      const data = { 
        uid, 
        email, 
        displayName, 
        photoURL
      };
  
      return userRef.set(data, { merge: true });
  
    }

  
}
