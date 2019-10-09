import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';

import { Message } from '../../modal/message';
import { MessageService } from 'src/app/services/message.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UserI } from 'src/app/modal/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-message-box',
  templateUrl: './message-box.component.html',
  styleUrls: ['./message-box.component.css'],
  providers: [DatePipe]
})
export class MessageBoxComponent implements OnInit {
 message:Message ={id:"null",body:'',date:'',
                    sender:'',  recieverId:''};
  userId:string;
  users:UserI[];
  userName:string;
  constructor(private messageService:MessageService,
               private userService:UserService,
              private datePipe: DatePipe,
              private router:ActivatedRoute) { }

  ngOnInit() {
    this.router.params.subscribe(parames => {
      this.userId = parames['id'];
      this.userService.getUsers().subscribe(actionArray => {
        this.users = actionArray.map(item => {
            return {
              id: item.payload.doc.id,
              ...item.payload.doc.data()
            } as UserI;
          })
          this.userName = this.users.find(user => user.id == this.userId).name;
        });
    })

    
  }
  myDate ;
  sendMessage(el){
     this.message.body = el.value;
     this.message.date  = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
     if(this.userId)
      this.message.recieverId = this.userId ;
    console.log("Sending message to ",this.userId)
   this.messageService.addMessage(this.message)
   this.changeNotificationMessage("Sending .....")
   el.value ="";
  }
  notifyMessge:string = "";
  changeNotificationMessage(message){
    this.notifyMessge = message
    setTimeout(() => {
      this.notifyMessge = ""
    }, 2000);
  }
}
