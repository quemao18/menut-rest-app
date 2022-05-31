import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { ImageCroppedEvent } from 'ngx-image-cropper';

import { NotificationService } from 'app/services/notification/notification.service';

import { trigger, state, style, transition, animate } from '@angular/animations';
import { ActivatedRoute, Router } from '@angular/router';
import { Item } from '../menus/menus.component';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-dishes',
  templateUrl: './dishes.component.html',
  styleUrls: ['./dishes.component.css'],
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
export class DishesComponent implements OnInit {

  @ViewChild('scroll', { read: ElementRef }) public scroll: ElementRef<any>;
  showForm: boolean = false;
  percentage = 0;
  finish = false;
  imageChangedEventPF: any = '';
  imageChangedEventBG: any = '';
  croppedImagePF: any = '';
  croppedImageBG: any = '';
  data: any;
  path = '/menus';
  photoPF = './assets/img/default-pf.png';
  photoBG = './assets/img/default-bg.png';
  item: Item = {
    photoPF: './assets/img/default-pf.png',
    photoBG: './assets/img/default-bg.png',
    name: {
      es: '',
      en: '',
    },
    description: {
      es: '',
      en: '',
    },
    status: true
  };
  form = new FormGroup({
    // uid: new FormControl({value: null, disabled: true}),
    id: new FormControl(),
    menuId: new FormControl(null, Validators.required),
    order: new FormControl(),
    ref: new FormControl(),
    // name: new FormControl('', Validators.required),
    // nameEs: new FormControl('', Validators.required),
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
    price:  new FormControl('', Validators.required),

  });

  documentId = null;
  menuId = 'all';

  status = true;
  isEdit = false;
  menu: any;
  
  max: number;
  config: any =  {
    itemsPerPage: 5,
    currentPage: 1,
    totalItems: 0
  };

  lang: string = 'es';
  album: any = [];

  private menusCollection: AngularFirestoreCollection<Item>;
  menus: Observable<Item[]>;
  private dishesCollection: AngularFirestoreCollection<Item>;
  dishes: Observable<Item[]>;

  constructor(
    public spinner: NgxSpinnerService,
    private activatedRoute: ActivatedRoute,
    private afs: AngularFirestore,
    private notificationService: NotificationService
    ) {

     }


  public scrollToTop() {
    this.scroll.nativeElement.scrollTop = 0;
  }

  scrollDiv(el: HTMLElement) {
    el.scrollIntoView();
  }

  async ngOnInit() {
    this.menusCollection = this.afs.collection<Item>('menus');
    this.menus = this.menusCollection.valueChanges({idField: 'id'});
    this.activatedRoute.params.subscribe(params => {
      this.menuId = params['id'] || 'all';
      this.getDishes(this.menuId);
    });
  }

  pageChanged(event: any){
    this.config.currentPage = event;
  }

  addItem(item: Item) {
    this.spinner.show();
    this.dishesCollection.add(item)
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
    this.dishesCollection.doc(documentId).update(data).then(() => {
      this.spinner.hide();
      this.showForm = !this.showForm && this.isEdit;
      this.notificationService.showNotification('top', 'right', 'success','check', 'Update success');
    }).catch((error: { message: any; }) => {
      this.spinner.hide();
      this.notificationService.showNotification('top', 'right', 'danger','warning', error.message);
    });
  }

  getDishes(menuId: string){
    // this.router.navigate(['/dishes/'+menuId])
    this.spinner.show();
    this.dishes = null;
    if(menuId !== 'all'){
      this.dishesCollection = this.afs.collection<Item>('dishes', ref => ref.where('menuId', '==', menuId));
      this.dishes = this.dishesCollection.valueChanges({idField: 'id'});
    }else{
      this.dishesCollection = this.afs.collection<Item>('dishes');
      this.dishes = this.dishesCollection.valueChanges({idField: 'id'});
    }
    this.dishes.subscribe(dishes => {
      this.config.totalItems = dishes.length;
      this.max = dishes.length; 
      this.spinner.hide();
    }); 
  }
  
  async onSubmit(form: any, documentId = this.documentId) {
      // }, 200);
      let data = {
        order: form.order,
        menuId: form.menuId,
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
        status: form.status,
        price: form.price
      }
      if (!this.isEdit) {
        console.log('New Doc');
        this.addItem(data);
      } else {
        console.log('Edit Doc');
        this.updateItem(documentId, data);
      }
      
    }

    edit(documentId: string) {
      this.showForm = true;
      this.spinner.show();
      this.reset();
      this.dishesCollection.doc(documentId).ref.get().then((doc: { exists: any; data: () => Item; }) => {
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
      this.form.valueChanges.subscribe(val => {
          this.item = {
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
              menuId: val.menuId,
              price: val.price
          };
      });
    }

    new(){
      this.reset();
      this.showForm=!this.showForm;
      this.form.patchValue({
        order: this.config.totalItems + 1,
        menuId: this.menuId
      })
    }

    delete(documentId: string) {
      this.spinner.show();
      this.dishesCollection.doc(documentId).delete().then(() => {
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
        description: {es:'', en:''},
        name: {es:'', en:''},
        order: '',
        ref: '',
        id: '',
        photoPF:  '',
        photoBG:  '',
        fileBG: null,
        filePF: null,
        price: ''
      });
      this.isEdit = false;
      this.croppedImageBG = '';
      this.croppedImagePF = '';
      this.imageChangedEventPF = null;
      this.imageChangedEventBG = null;
      this.photoPF = './assets/img/default-pf.png';
      this.photoBG = './assets/img/default-bg.png';
      // this.lang = 'es';
    }
}