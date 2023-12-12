import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afAuth: AngularFireAuth, private router: Router) { }

  async signup(email: string, password: string) {
    try {
      const result = await this.afAuth.createUserWithEmailAndPassword(email, password);
      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  async loginWithEmail(email: string, password: string) {
    try {
      const result = await this.afAuth.signInWithEmailAndPassword(email, password);
      // Handle successful login here
      this.router.navigate(['/post-list']); // Redirect to post-list
      return result;
    } catch (error) {
      // Handle login error here
      throw error;
    }
  }


  // You can add more methods for login, logout, etc.
}