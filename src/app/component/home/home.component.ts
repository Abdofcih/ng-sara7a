import { Component, OnInit } from '@angular/core';
import { MessageService } from 'src/app/services/message.service';
import { Message } from '../../modal/message';
import { UserI } from 'src/app/modal/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
 messagesList:Message[];
 User:UserI;
  constructor(private messageService:MessageService,private userService:UserService) { }

  ngOnInit() {
    this.User = this.userService.getAuthrisedUser();
    const userID = this.User.id;
    this.messageService.getMessages().subscribe(actionArray => {
     
      this.messagesList = actionArray.map(item => {
        return {
          ...item.payload.doc.data()
        } as Message;
      }).filter(function(message){ return message.recieverId ===  userID});
    });
  }

}
