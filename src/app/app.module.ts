import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { HeaderComponent } from './header/header.component';
import { PostComponent } from './post/post.component';
import { PostEditComponent } from './post-edit/post-edit.component';
import { PostListComponent } from './post-list/post-list.component';
import { RouterModule } from '@angular/router';
import { Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AngularFireModule } from '@angular/fire/compat';

// Import Firebase

import * as firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  {path: 'post-list', component: PostListComponent},
  {path: 'post-add', component: PostEditComponent},
  {path: 'authentication', component: AuthComponent},
  {path: 'post-edit/:index', component: PostEditComponent},
]

const firebaseConfig = {
  apiKey: "AIzaSyDh4cxk9CNZuk1axztwe3yj_IHZQETrgr8",
  authDomain: "aladanoangularproj.firebaseapp.com",
  databaseURL: "https://aladanoangularproj-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "aladanoangularproj",
  storageBucket: "aladanoangularproj.appspot.com",
  messagingSenderId: "1009179904048",
  appId: "1:1009179904048:web:3c924c224d3d203f5745f5"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    HeaderComponent,
    PostComponent,
    PostEditComponent,
    PostListComponent,
    LoginComponent,
    SignupComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(routes),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(firebaseConfig)
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }