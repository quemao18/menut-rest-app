import { Injectable } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { BehaviorSubject } from 'rxjs'

 
@Injectable()
export class MessagingService {
 
currentMessage = new BehaviorSubject(null);
token: string;
 
constructor(private angularFireMessaging: AngularFireMessaging) {
 
      this.angularFireMessaging.onMessage((payload) => {
        console.log(payload);
        const NotificationOptions = {
          body: payload.notification.body,
          data: payload.data,
          icon: payload.notification.icon
        }
        navigator.serviceWorker.getRegistration('/firebase-cloud-messaging-push-scope').then(registration => {
          registration.showNotification(payload.notification.title, NotificationOptions);
        });
      })
  }
 
  requestPermission() {
    this.angularFireMessaging.requestToken.subscribe(
      (token) => { console.log('Permission granted! Save to the server!', token); this.setTokenLocal(token); },
      (error) => { console.error(error); },  
    );
  }

  receiveMessage() {
    this.angularFireMessaging.messages.subscribe(
      (payload) => {
      console.log("new message received. ", payload);
      this.currentMessage.next(payload);
    })
  }

  setTokenLocal(token: any){
    localStorage.setItem('fcm_token', token);
  }

  getTokenLocal(){
   return localStorage.getItem('fcm_token');
  }
 
}
