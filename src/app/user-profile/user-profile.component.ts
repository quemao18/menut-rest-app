import { Component, OnInit } from '@angular/core';
import { AuthService } from 'app/services/auth/auth.service';
import { Validators, FormControl, FormGroup } from '@angular/forms';
// import { AngularFirestore } from '@angular/fire/firestore';
import { NgxSpinnerService } from 'ngx-spinner';

import { ImageCroppedEvent } from 'ngx-image-cropper';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { SettingService } from '../services/settings/setting.service';
import { Item } from 'app/admin/menus/menus.component';
import { Observable } from 'rxjs';
import { NotificationService } from '../services/notification/notification.service';
import { environment } from '../../environments/environment';



@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private afs: AngularFirestore,
    public spinner: NgxSpinnerService,
    private afStorage: AngularFireStorage,
    private settingService: SettingService,
    private notificationService: NotificationService

    ) { }
  
  user = this.authService.getUserLoggedIn;
  // settings = this.settingService.getSettings;

  path = '/users/avatars/' + this.user.email + '/';
  logo = './assets/img/logo.png';
  photoBG = 'https://ununsplash.imgix.net/photo-1431578500526-4d9613015464?fit=crop&fm=jpg&h=300&q=75&w=400';


  percentage = 0;
  finish = false;
  imageChangedEventPF: any = '';
  imageChangedEventBG: any = '';
  croppedImagePF: any = '';
  croppedImageBG: any = '';
  private settingsCollection: AngularFirestoreCollection<Item>;
  settings: Observable<Item[]>;
  profileForm: FormGroup = new FormGroup({
    // uid: new FormControl({value: this.user.uid, disabled: true}),
    // email: new FormControl({value:this.user.email, disabled: true},),
    id: new FormControl(),
    appName: new FormControl('', Validators.required),

    email:  new FormControl(''),
    appSlogan: new FormControl('Your slogan here'),
    instagram: new FormControl(''),
    whatsapp: new FormControl(''),
    textButton: new FormControl('Menu'),
    textTitle: new FormControl('Welcome'),

    // userName:  new FormControl(this.user.userName),
    address:  new FormControl(''),
    filePF: new FormControl(null),
    fileBG: new FormControl(null),
    logo:  new FormControl(this.logo),
    photoBG:  new FormControl(this.photoBG),
    // photoPF:  new FormControl(this.settings.photoPF),
  });

  ngOnInit() {
    this.settingsCollection = this.afs.collection<Item>('settings', 
    ref => ref.where('projectId', '==', environment.firebaseConfig.projectId));
    this.settings = this.settingsCollection.valueChanges({idField: 'id'});
    this.settings.subscribe((data:any) => {
      const settings = data[0] || {};
      this.logo = settings.logo || './assets/img/logo.png';
      this.photoBG = settings.photoBG || 'https://ununsplash.imgix.net/photo-1431578500526-4d9613015464?fit=crop&fm=jpg&h=300&q=75&w=400';
      this.profileForm = new FormGroup({
        // uid: new FormControl({value: this.user.uid, disabled: true}),
        // email: new FormControl({value:this.user.email, disabled: true},),
        id: new FormControl(settings.id),
        appName: new FormControl(settings.appName, Validators.required),
        email:  new FormControl(settings.email),
        appSlogan: new FormControl(settings.appSlogan),
        instagram: new FormControl(settings.instagram),
        whatsapp: new FormControl(settings.whatsapp),
        textTitle: new FormControl(settings.textTitle),
        textButton: new FormControl(settings.textButton),
        // userName:  new FormControl(this.user.userName),
        address:  new FormControl(settings.address),
        filePF: new FormControl(null),
        fileBG: new FormControl(null),
        logo:  new FormControl(settings.logo),
        photoBG:  new FormControl(settings.photoBG),
        // photoPF:  new FormControl(this.settings.photoPF),
      });
    });
  }

  updateItem(documentId:string, data: any) {
    this.spinner.show();
    this.settingsCollection.doc(documentId).update(data).then(() => {
      this.spinner.hide();
      this.notificationService.showNotification('top', 'right', 'success','check', 'Update success');
    }).catch((error: { message: any; }) => {
      this.spinner.hide();
      this.notificationService.showNotification('top', 'right', 'danger','warning', error.message);
    });
  }


    onSubmit(){
      this.updateItem(this.profileForm.value.id, this.profileForm.value);
    } 
  

    async uploadPhoto(type:string, image: any) {
      let ref = this.afStorage.ref(this.path+type);
      this.finish = true;
      this.spinner.show();
      
      await ref.putString(image, 'data_url', {contentType:'image/webp'}).then((result) => {
        console.log(result);
        if(type == 'profile'){
          this.profileForm.patchValue({logo: this.logo});
        }
        if(type == 'background'){
          this.profileForm.patchValue({photoBG: this.photoBG});
        }

        this.spinner.hide();
      });

      ref.getDownloadURL().subscribe(function(URL) {
        console.log(URL);
        if(type == 'profile'){
          this.logo = URL;
        }
        if(type == 'background'){
          this.photoBG = URL;
        }

      }); 
    }

    fileChangeEvent(event: any, type: string): void {
      if(type == 'profile'){
        this.imageChangedEventPF = event;
      }
      if(type == 'background'){
        this.imageChangedEventBG = event;
      }
    }

    imageCropped(event: ImageCroppedEvent, type: string) {
      if(type == 'profile'){
      this.croppedImagePF = event.base64;
      this.logo = event.base64;
      this.profileForm.patchValue({logo: this.logo})
      }
      if(type == 'background'){
        this.croppedImageBG = event.base64;
        this.photoBG = event.base64;
        this.profileForm.patchValue({photoBG: this.photoBG});
      }
    }
    imageLoaded() {
        // show cropper
    }
    cropperReady() {
        // cropper ready
    }
    loadImageFailed() {
        // show message
    }
    
  }
