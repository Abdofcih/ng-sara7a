import { Component } from '@angular/core';
// import { NotificationService } from './services/notification.service'; nex version
import { UserService } from 'src/app/services/user.service';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';

//any Q => abdelrahman.m.fcih@gmail.com

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // user$O:Observable<firebase.User>;
   user$O:firebase.User;
  constructor(private userService: UserService,
               private afAuth:AngularFireAuth){
    // this.user$O =  this.afAuth.authState;
    this.afAuth.authState.subscribe(user => {this.user$O = user})
  }

  title = 'ng-sara7a';
  navToggler = true;
  changed = false;
  isAuth ;

   
   navTogglerFun(){
    this.navToggler = !this.navToggler;
    this.changed = !this.changed;
  }
  logOut(){
    this.user$O = null;
    this.navTogglerFun();
    this.userService.logOut();
  }

  
}
