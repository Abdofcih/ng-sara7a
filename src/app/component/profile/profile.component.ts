import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { UserI } from 'src/app/modal/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private userService:UserService ,private router:Router) { }
  user:UserI;
  userLink :string;
  ngOnInit() {  
    let absoluteURI = window.location.href;
    let absoluteURILen = absoluteURI.length;
    let currentRouteLen = this.router.url.length;
    let webURI = absoluteURI.substr(0,absoluteURILen-currentRouteLen);
   console.log();
   
    this.user = this.userService.getAuthrisedUser();
    this.userLink= `${webURI}/m/${this.user.id}`
  }
  copyThis(){
    let selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = this.userLink;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
    
  }
}
