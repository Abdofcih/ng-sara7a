import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { UserI } from '../modal/user';
//any Q => abdelrahman.m.fcih@gmail.com
import { Router } from  "@angular/router";
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase'
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private firestore: AngularFirestore,
               private  router:  Router,
              private afAuth:AngularFireAuth) {

    this.checkAuth()
   }
 user:UserI;
  isUserAuth(){
    if(this.user)
    return true
    else
    return false
  }

  signUser(user:UserI){
    this.afAuth.auth.createUserWithEmailAndPassword(user.email,user.password);
    this.firestore.collection('users').add(user);
  }

  loginUser(data){
    this.afAuth.auth.signInWithEmailAndPassword(data.email,data.password).then(()=>{
      console.log('user exists');
      this.selectUser(data.email)
    })
  }

  // // loginWithGoogle(){
  // //   this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider()) 
  // //   }

  checkAuth(){
    this.afAuth.authState.subscribe(r =>{
      if(r)
      {
        this.user = JSON.parse(localStorage.getItem('user'));
      }
      else
      {
        this.user = null;
      }
    })
  }
  getUsers() {
    return this.firestore.collection('users').snapshotChanges();
  }
  getAuthrisedUser(){
    let checkLocalStorage = localStorage.getItem('user');
    if(this.afAuth.authState)
    return JSON.parse(checkLocalStorage)
    else
     return false;
  }
   selectUser(email:string) {
    const snapshotResult = this.firestore.collection('users', ref => ref.where('email', '==', email)
    .limit(1))
    .snapshotChanges().subscribe(res =>{
      if(res.length != 0){
        this.user = <UserI>{id:res[0].payload.doc.id,...res[0].payload.doc.data()}
        localStorage.setItem('user',JSON.stringify(this.user));
        this.router.navigate(['home']);    
      }
      else{
        console.log('User not found');
        
      }
    })

  }

  logOut(){
    this.afAuth.auth.signOut().then(() => {
      this.router.navigate(['']);
      localStorage.removeItem('user');
   });
    
   
    
  }
  
}
