import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from  "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isAuth:boolean;
  notifyMessge:string = "";
  view:string = 'logIn';
  constructor(private userService: UserService,
              private  router:  Router,) {}

  ngOnInit() {
    this.userService.checkAuth();
      this.isAuth = this.userService.getAuthrisedUser();
      if(this.isAuth)
      {
        console.log('user is Auth');
        this.router.navigate(['home']);  
      } 
    
  }


  changeView(target:string){
    if(this.view != target)
    this.view = target;
  }

  changeNotificationMessage(message){
    this.notifyMessge = message
    setTimeout(() => {
      this.notifyMessge = ""
    }, 2000);
  }

 submitLogin(f){
   this.userService.loginUser(f.value);
   this.changeNotificationMessage("Wait .....");
 }
 submitSignup(f){
  this.userService.signUser(f.value);
  this.changeNotificationMessage("Wait .....");
  this.view = "logIn";
 }

//  loginWithGoogle(){
//    this.userService.loginWithGoogle();
//  }
}
