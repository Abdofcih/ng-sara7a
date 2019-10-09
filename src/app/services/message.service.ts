import { Injectable } from '@angular/core';
import { Message } from '../modal/message';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private firestore: AngularFirestore) { }
  addMessage(message:Message) {
    this.firestore.collection('messages').add(message);
}
getMessages() {
  return this.firestore.collection('messages').snapshotChanges();
}
}
