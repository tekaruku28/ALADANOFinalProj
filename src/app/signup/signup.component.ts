import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  constructor(public afAuth: AngularFireAuth) { }

  async signupWithEmail(email: string, password: string) {
    try {
      await this.afAuth.createUserWithEmailAndPassword(email, password);
      // Handle successful signup here
    } catch (error) {
      // Handle signup error here
    }
  }

}