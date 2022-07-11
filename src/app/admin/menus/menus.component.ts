import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { ImageCroppedEvent } from 'ngx-image-cropper';

import { NotificationService } from 'app/services/notification/notification.service';

import { trigger, state, style, transition, animate } from '@angular/animations';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

export interface Item {
  photoPF: string,	
  photoBG: string,
  status: boolean,
  restId?: string,
  ref?: string,
  order?: number,
  name: {
    es: string,
    en: string,
  },
  description: {
    es: string,
    en: string,
  },
  menuId?: string,
  price?: number,
}
@Component({
  selector: 'app-menus',
  templateUrl: './menus.component.html',
  styleUrls: ['./menus.component.css'],
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
export class MenusComponent implements OnInit {

  @ViewChild('scroll', { read: ElementRef }) public scroll: ElementRef<any>;
  private menusCollection: AngularFirestoreCollection<Item>;
  menus: Observable<Item[]>;

  private restaurantsCollection: AngularFirestoreCollection<Item>;
  restaurants: Observable<Item[]>;

  constructor(
    public spinner: NgxSpinnerService,
    private afStorage: AngularFireStorage,
    private notificationService: NotificationService,
    private afs: AngularFirestore,
    private activatedRoute: ActivatedRoute,

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

  item: Item = {
    restId: '',
    photoPF: './assets/img/default-pf.png',
    photoBG: './assets/img/default-bg.png',
    status: true,
    ref: '',
    order: 0,
    name: {
      es: '',
      en: ''
    },
    description: {
      es: '',
      en: ''
    }
  }

  form: FormGroup;

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
  restId = '';

  public scrollToTop() {
    this.scroll.nativeElement.scrollTop = 0;
  }

  scrollDiv(el: HTMLElement) {
    el.scrollIntoView();
  }

  ngOnInit() {
    this.restaurantsCollection = this.afs.collection<Item>('restaurants');
    this.restaurants = this.restaurantsCollection.valueChanges({idField: 'id'});
    this.activatedRoute.params.subscribe(params => {
      this.restId = params['id'];
      this.restId && this.getMenusByRestId(this.restId);
    });

    // this.menusCollection = this.afs.collection<Item>('menus');
    // this.menus = this.itemsCollection.valueChanges({idField: 'id'});
    // this.menus
    // .subscribe((data: string | any[]) => { 
    //   this.config.totalItems = data.length;
    //   this.spinner.hide();
    // });
    
    this.form = new FormGroup({
      // uid: new FormControl({value: null, disabled: true}),
      id: new FormControl(''),
      restId: new FormControl(null, Validators.required),

      order: new FormControl('', [Validators.min(1)]),
      ref: new FormControl(''),
      name: new FormGroup({
        es: new FormControl('', Validators.required),
        en: new FormControl('', Validators.required)
      }),
      description: new FormGroup({
        es: new FormControl('',),
        en: new FormControl('',)
      }),
      filePF: new FormControl(null),
      fileBG: new FormControl(null),
      photoPF:  new FormControl(null),
      photoBG:  new FormControl(null),
      status:  new FormControl(true),
  
    });
  }

  pageChanged(event: any){
    this.config.currentPage = event;
  }
  
  addItem(item: Item) {
    this.spinner.show();
    this.menusCollection.add(item)
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
    this.menusCollection.doc(documentId).update(data).then(() => {
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
        order: form.order,
        restId: form.restId,
        ref: form.ref,
        name: {
          es: form.name.es,
          en: form.name.en
        },
        description: {
          es: form.description.es,
          en: form.description.en
        },
        photoPF: this.photoPF,
        photoBG: this.photoBG,
        status: form.status
      }
      if (!this.isEdit) {
        console.log('New Doc');
        this.addItem(data)
      } else {
        console.log('Edit Doc');
        this.updateItem(documentId, data);
      }
    }

    async upload(){
      if(this.croppedImagePF!=''){
        await this.uploadPhoto('profile', this.croppedImagePF);
      }
      if(this.croppedImageBG!=''){
        await this.uploadPhoto('background', this.croppedImageBG);
      }
    }

    edit(documentId: string) {
      this.showForm = true;
      this.spinner.show();
      this.reset();
      this.menusCollection.doc(documentId).ref.get().then((doc: { exists: any; data: () => Item; }) => {
        this.spinner.hide();
        if (doc.exists) {
          this.isEdit = true;
          this.documentId = documentId;
          this.item = doc.data(); 
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
            restId: val.restId,
            photoBG: this.photoBG,
            photoPF: this.photoPF,
            status: val.status,
            name: {
              es: val.name.es,
              en: val.name.en,
            },
            description: {
              es: val.description.es,
              en: val.description.en
            },
            ref: val.ref,
            order: val.order,
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
      this.menusCollection.doc(documentId).delete().then(() => {
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

    
  getMenusByRestId(restId: string){
    // this.router.navigate(['/dishes/'+menuId])
    this.spinner.show();
    this.menus = null;
    this.menusCollection = this.afs.collection<Item>('menus', ref => ref.where('restId', '==', restId));
    this.menus = this.menusCollection.valueChanges({idField: 'id'});
    this.menus.subscribe(dishes => {
      this.config.totalItems = dishes.length;
      this.max = dishes.length; 
      this.spinner.hide();
    }); 
  }
  

    async uploadPhoto(type:string, image: any) {
      // let archivo = this.profileForm.get('photo');
      console.log('Uploading file to firebase...');
      let ref = this.afStorage.ref(this.path).child(this.form.value.name.en).child(type);
      this.finish = true;
      // this.spinner.show();
      
      await ref.putString(image, 'data_url', {contentType:'image/webp'}).then((result: any) => {
        // console.log(result);
        console.log('Upload finished');
        // this.spinner.hide();
      });

      ref.getDownloadURL().subscribe(function(URL: any) {
        console.log(URL);
        // if(type == 'profile')
        // this.photoPF = URL;
        // if(type == 'background')
        // this.photoBG = URL;
      }); 
      
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
        restId: '',
        description: {es:'', en:''},
        name: {es:'', en:''},
        order: '',
        ref: '',
        id: '',
        photoPF:  '',
        photoBG:  '',
        fileBG: null,
        filePF: null,
      });
      this.isEdit = false;
      this.croppedImageBG = null;
      this.croppedImagePF = null;
      this.imageChangedEventPF = null;
      this.imageChangedEventBG = null;
      this.photoPF = './assets/img/default-pf.png';
      this.photoBG = './assets/img/default-bg.png';
    }
}

