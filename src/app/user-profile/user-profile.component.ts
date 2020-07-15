import { Component, OnInit } from '@angular/core';
import { AuthService } from 'app/services/auth/auth.service';
import { UserService } from 'app/services/user/user.service';
import { Validators, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { NgxSpinnerService } from 'ngx-spinner';
import { AngularFireStorage } from '@angular/fire/storage';
import { ImageCroppedEvent } from 'ngx-image-cropper';

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
    private afStorage: AngularFireStorage

    ) { }
  
  user = this.authService.getUserLoggedIn();
  path = '/users/avatars/' + this.user.email + '/';
  photoURL = this.user.photoURL ? this.user.photoURL : './assets/img/faces/marc.jpg';
  photoBG = this.user.photoBG ? this.user.photoBG : 'https://ununsplash.imgix.net/photo-1431578500526-4d9613015464?fit=crop&fm=jpg&h=300&q=75&w=400';
  profileForm = new FormGroup({
    uid: new FormControl({value: this.user.uid, disabled: true}),
    email: new FormControl({value:this.user.email, disabled: true},),
    firstName: new FormControl(this.user.firstName, Validators.required),
    lastName:  new FormControl(this.user.lastName),
    aboutMe: new FormControl(this.user.aboutMe),
    userName:  new FormControl(this.user.userName),
    address:  new FormControl(this.user.address),
    filePF: new FormControl(null),
    fileBG: new FormControl(null),
    photoURL:  new FormControl(this.user.photoURL),
    photoBG:  new FormControl(this.user.photoBG),

  });

  percentage = 0;
  finish = false;
  imageChangedEventPF: any = '';
  imageChangedEventBG: any = '';
  croppedImagePF: any = '';
  croppedImageBG: any = '';


  ngOnInit() {
     
  }


  async onSubmit(){
    // console.log(this.profileForm.getRawValue());
    this.spinner.show();
    var docRef = this.afs.collection("users").doc(this.profileForm.getRawValue().email);
    await docRef.get().toPromise().then(
      async (doc) => {
      if (doc.exists) {
        if(this.croppedImagePF!='')
          await this.uploadPhoto('profile', this.croppedImagePF);
        if(this.croppedImageBG!='')
          await this.uploadPhoto('background', this.croppedImageBG);
        console.log("Update user DB:", this.profileForm.getRawValue());
        this.authService.setUserLoggedIn(this.profileForm.getRawValue());
        docRef.update(this.profileForm.getRawValue());
        this.spinner.hide();
      } else {
        // doc.data() will be undefined in this case
        console.log("Not found!");
        this.spinner.hide();
      }
    }).catch(
        (err) => {
          console.log(err);
          this.spinner.hide();
        }
      );
    } 
  

    async uploadPhoto(type:string, image: any) {
      // let archivo = this.profileForm.get('photo');
      let ref = this.afStorage.ref(this.path+type);
      // let task = this.afStorage;//.upload(this.path+this.croppedImage.name, this.croppedImage);

      // task.percentageChanges().subscribe((percentage) => {
        // this.percentage = Math.round(percentage);
        // if (this.percentage == 100) {
          this.finish = true;
          this.spinner.show();
          
          await ref.putString(image, 'data_url', {contentType:'image/webp'}).then((result) => {
            console.log(result);
            if(type == 'profile')
            this.profileForm.patchValue({photoURL: this.photoURL});
            if(type == 'background')
            this.profileForm.patchValue({photoBG: this.photoBG});

            this.spinner.hide();
          });

          ref.getDownloadURL().subscribe(function(URL) {
            console.log(URL);
            if(type == 'profile')
            this.photoURL = URL;
            if(type == 'background')
            this.photoBG = URL;

          }); 

        // }
      // });
  
      
    }

    fileChangeEvent(event: any, type: string): void {
      if(type == 'profile')
      this.imageChangedEventPF = event;
      if(type == 'background')
      this.imageChangedEventBG = event;
    }
    imageCropped(event: ImageCroppedEvent, type: string) {
      if(type == 'profile'){
      this.croppedImagePF = event.base64;
      this.photoURL = event.base64;
      }
      if(type == 'background'){
        this.croppedImageBG = event.base64;
        this.photoBG = event.base64;
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
