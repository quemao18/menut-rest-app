import { Injectable } from '@angular/core';
import { User } from './user';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { NgxSpinnerService } from 'ngx-spinner';
import { NotificationService } from '../notification/notification.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private afs: AngularFirestore,     
    public notification: NotificationService,
    public spinner: NgxSpinnerService
    ) { }
   
}
