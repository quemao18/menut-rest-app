import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { ImageCroppedEvent } from 'ngx-image-cropper';

import { NotificationService } from 'app/services/notification/notification.service';

import { trigger, state, style, transition, animate } from '@angular/animations';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { AuthService } from 'app/services/auth/auth.service';

export interface Rest {
  id: string,
  photoPF: string,	
  photoBG: string,
  status: boolean,
  name: string,
  slogan: string,
  phone?: string,
  email?: string,
  address?: string,
  instagram?: string,
  whatsapp?: string,
  description?: string,
  textTitle?: string,
  textButton?: string,
  uid?: string,
}

@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.css'],
  animations: [
    trigger('animate', [
      state('*', style({
        transform: 'translate3D(0px, 0px, 0px)',
        opacity: 1
      })),
      transition('void => *', [
        style({opacity: 0,
          transform: 'translate3D(0px, 150px, 0px)',
        }),
        animate('0.3s 0s ease-out'),
      ])
    ]),
    trigger('flip', [
      transition('void => *', [
        style({opacity: 0,
          transform: 'rotateY(180deg)',
        }),
        animate('0.3s 0s ease-out'),
      ])
    ])  
  ]
})
export class RestaurantsComponent implements OnInit {

  @ViewChild('scroll', { read: ElementRef }) public scroll: ElementRef<any>;
  private restaurantsCollection: AngularFirestoreCollection<Rest>;
  restaurants: Observable<Rest[]>;

  constructor(
    public spinner: NgxSpinnerService,
    private notificationService: NotificationService,
    private afs: AngularFirestore,
    private authService: AuthService,
    ) {

     }

  showForm: boolean = false;
  percentage = 0;
  finish = false;
  imageChangedEventPF: any = '';
  imageChangedEventBG: any = '';
  croppedImagePF: any = null;
  croppedImageBG: any = null;
  data: any;
  path = '/menus';
  photoPF = './assets/img/default-pf.png';
  photoBG = './assets/img/default-bg.png';

  item: Rest = {
    photoPF: './assets/img/default-pf.png',
    photoBG: './assets/img/default-bg.png',
    status: true,
    name: '',
    slogan: '',
    address: '',
    phone: '',
    email: '',
    whatsapp: '',
    instagram: '',
    description: '',
    textTitle: '',
    textButton: '',
    uid: '',
    id: ''
  }

  // logo = './assets/img/logo.png';
  // photoBG = 'https://ununsplash.imgix.net/photo-1431578500526-4d9613015464?fit=crop&fm=jpg&h=300&q=75&w=400';

  form: FormGroup = new FormGroup({
    // uid: new FormControl({value: this.user.uid, disabled: true}),
    // email: new FormControl({value:this.user.email, disabled: true},),
    id: new FormControl(),
    name: new FormControl('Name', Validators.required),

    email:  new FormControl(''),
    slogan: new FormControl('Your slogan here'),
    instagram: new FormControl('instagram'),
    whatsapp: new FormControl('+581231231231'),
    textButton: new FormControl('Menu'),
    textTitle: new FormControl('Welcome'),
    description: new FormControl('', Validators.required),

    // userName:  new FormControl(this.user.userName),
    address:  new FormControl(''),
    filePF: new FormControl(null),
    fileBG: new FormControl(null),
    photoBG:  new FormControl(this.photoBG),
    status: new FormControl(true)
    // photoPF:  new FormControl(this.settings.photoPF),
  });

  // form: FormGroup;

  documentId = null;
  status = true;
  isEdit = false;

  max: number;
  config: any =  {
    itemsPerPage: 5,
    currentPage: 1,
    totalItems: 0
  };

  lang: string = 'es';
  album: any = [];

  public scrollToTop() {
    this.scroll.nativeElement.scrollTop = 0;
  }

  scrollDiv(el: HTMLElement) {
    el.scrollIntoView();
  }

  ngOnInit() {
    this.spinner.show();
    this.restaurantsCollection = this.afs.collection<Rest>('restaurants');
    this.restaurants = this.restaurantsCollection.valueChanges({idField: 'id'});
    this.restaurants
    .subscribe((data: string | any[]) => { 
      this.config.totalItems = data.length;
      this.spinner.hide();
    });

    // this.form = new FormGroup({
    //   // uid: new FormControl({value: null, disabled: true}),
    //   id: new FormControl(''),
    //   name: new FormControl('', Validators.required),
    //   description: new FormControl('', Validators.required),
    //   address: new FormControl(''),
    //   phone: new FormControl(''),
    //   email: new FormControl(''),
    //   filePF: new FormControl(null),
    //   fileBG: new FormControl(null),
    //   photoPF:  new FormControl(null),
    //   photoBG:  new FormControl(null),
    //   status:  new FormControl(true),
  
    // });
    
  }

  pageChanged(event: any){
    this.config.currentPage = event;
  }
  
  addItem(item: Rest) {
    this.spinner.show();
    this.restaurantsCollection.add(item)
    .then(() => {
      this.spinner.hide();
      this.showForm = false;
      this.notificationService.showNotification('top', 'right', 'success','check', 'Save success');
    })
    .catch((error: { message: any; }) => {
      this.spinner.hide();
      this.showForm = false;
      this.notificationService.showNotification('top', 'right', 'danger', 'warning', error.message);
    });
  }

  updateItem(documentId:string, data: any) {
    this.spinner.show();
    this.restaurantsCollection.doc(documentId).update(data).then(() => {
      this.spinner.hide();
      this.showForm = !this.showForm && this.isEdit;
      this.notificationService.showNotification('top', 'right', 'success','check', 'Update success');
    }).catch((error: { message: any; }) => {
      this.spinner.hide();
      this.notificationService.showNotification('top', 'right', 'danger','warning', error.message);
    });
  }

  async onSubmit(form: any, documentId = this.documentId) {
      let data = {
        name: form.name,
        id: form.id,
        slogan: form.slogan,
        address: form.address,
        // phone: form.phone,
        email: form.email,
        instagram: form.instagram,
        whatsapp: form.whatsapp,
        photoPF: this.photoPF,
        photoBG: this.photoBG,
        status: form.status,
        textTitle: form.textTitle,
        textButton: form.textButton,
        uid: this.authService.getUserLoggedIn.uid,
        description: form.description
      }
      if (!this.isEdit) {
        console.log('New Doc');
        this.addItem(data)
      } else {
        console.log('Edit Doc');
        this.updateItem(documentId, data);
      }
    }

    edit(documentId: string) {
      this.showForm = true;
      this.spinner.show();
      this.reset();
      this.restaurantsCollection.doc(documentId).ref.get().then((doc: any) => {
        this.spinner.hide();
        if (doc.exists) {
          this.isEdit = true;
          this.documentId = documentId;
          this.item = {id:this.documentId,...doc.data()}; 
          this.photoPF = this.item.photoPF;
          this.photoBG = this.item.photoBG;
          this.form.patchValue(this.item);
        }
      }).catch((error: { message: any; }) => {
        this.spinner.hide();
        this.notificationService.showNotification('top', 'right', 'danger','warning', error.message);
      });
    }

    onChanges(): void {
      this.form.valueChanges.subscribe((val: any) => {
          this.item = {
            id: val.id,
            photoBG: this.photoBG,
            photoPF: this.photoPF,
            status: val.status,
            name: val.name,
            slogan: val.slogan,
            address: val.address,
            phone: val.phone,
            email: val.email,
            whatsapp: val.whatsapp,
            instagram: val.instagram,
            description: val.description,
            textTitle: val.textTitle,
            textButton: val.textButton,
          };
      });
    }

    new(){
      this.reset();
      this.showForm=!this.showForm;
      this.form.patchValue({
        order: this.config?.totalItems + 1
      })
    }

    delete(documentId: string) {
      this.spinner.show();
      this.restaurantsCollection.doc(documentId).delete().then(() => {
        this.spinner.hide();
        this.notificationService.showNotification('top', 'right', 'success','check', 'Deleted success');
      }).catch((error: { message: any; }) => {
        this.spinner.hide();
        this.notificationService.showNotification('top', 'right', 'danger','warning', error.message);
      });
    }

    changeStatus(documentId: string, status: boolean) {
      this.reset();
      let data = {
        status: !status 
      }
      this.updateItem(documentId, data);        
    }


    fileChangeEvent(event: any, type: string): void {
      this.spinner.show();
      if( type == 'profile'){
        this.imageChangedEventPF = event;
      }
      if( type == 'background'){
        this.imageChangedEventBG = event;
      }
    }

    imageCropped(event: ImageCroppedEvent, type: string) {
      if(type == 'profile'){
        this.croppedImagePF = event.base64;
        this.photoPF = event.base64;
        this.item.photoPF = this.photoPF;
      }
      if(type == 'background'){
        this.croppedImageBG = event.base64;
        this.photoBG = event.base64;
        this.item.photoBG = this.photoBG;
      }
    }
    imageLoaded() {
        // show cropper
        this.spinner.hide();
    }
    cropperReady() {
        // cropper ready
    }
    loadImageFailed() {
        // show message
    }

    reset(){
      this.form.patchValue({
        description: '',
        name: '',
        id: '',
        photoPF:  '',
        photoBG:  '',
        fileBG: null,
        filePF: null,
        status: true,
        address: '',
        phone: '',
        email: '',
        whatsapp: '',
        instagram: '',
        textTitle: '',
        textButton: '',
      });
      this.isEdit = false;
      this.croppedImageBG = null;
      this.croppedImagePF = null;
      this.imageChangedEventPF = null;
      this.imageChangedEventBG = null;
      this.photoPF = './assets/img/default-pf.png';
      this.photoBG = 'https://ununsplash.imgix.net/photo-1431578500526-4d9613015464?fit=crop&fm=jpg&h=300&q=75&w=400';
    }
}

