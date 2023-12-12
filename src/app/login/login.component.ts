import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(public afAuth: AngularFireAuth, private authService: AuthService, private router: Router) { }

  async loginWithEmail(email: string, password: string) {
    try {
      await this.afAuth.signInWithEmailAndPassword(email, password);
      // Handle successful login here
      console.log('Login successful'); // Add console log
      this.router.navigate(['/post-list']); // Redirect to post-list
    } catch (error) {
      // Handle login error here
      console.error('Login error', error);
    }
  }
}