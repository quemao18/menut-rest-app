import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { MenuService } from 'app/services/menus/menu.service';
import { DishService } from 'app/services/dishes/dish.service';

import { NotificationService } from 'app/services/notification/notification.service';

import { Lightbox } from 'ngx-lightbox';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'app/services/auth/auth.service';


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
export class DishesComponent implements OnInit, AfterViewInit {

  @ViewChild('scroll', { read: ElementRef }) public scroll: ElementRef<any>;

  constructor(
    private menuService: MenuService,
    private dishService: DishService,
    public spinner: NgxSpinnerService,
    private afStorage: AngularFireStorage,
    private notificationService: NotificationService,
    private _lightbox: Lightbox,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private authService: AuthService
    ) {

     }



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
  item: any = {
    data:{
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
    }
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
  menuId = null;

  status = true;
  currentStatus = 1;
  menu: any;
  menus: any;
  dishes: any;
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

  async ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.menuId = params['id'];
    });
    // setTimeout(() => {
      this.spinner.show();
      this.menuService.gets().subscribe(async (menus) => {
        this.menus = menus; 
        this.menu = this.menus.filter(obj => obj.id === this.menuId)[0];
        // setTimeout(async () => {
          this.spinner.show();
          await this.dishService.getsByMenuId(this.menuId).toPromise().then(
            (docs) => {
            this.dishes = docs; 
            this.config.totalItems =  this.dishes.length;
            this.spinner.hide();
          }).catch((error) => {
            // window.alert(error)
            console.log(error);
            this.spinner.hide();
            this.notificationService.showNotification('top', 'right', 'danger', 'warning', error.message);
          });
        // }, 500);
        this.spinner.hide();
      },(error) => {
        // window.alert(error)
        console.log(error);
        this.spinner.hide();
        this.notificationService.showNotification('top', 'right', 'danger', 'warning', error.message);
      });
    // }, 500);
  }

  ngAfterViewInit(): void {
    
  }

  pageChanged(event){
    this.config.currentPage = event;
  }

  updateDishes(value){
    console.log(value)
    this.router.navigate(['/dishes/'+value])
    this.ngOnInit();
    // this.dishes = this.dishes.filter(obj => obj.data.menuId == value);
  }
  
  async onSubmit(form: any, documentId = this.documentId) {
      // console.log(`Status: ${this.currentStatus}`);
      // setTimeout(() => {
      this.spinner.show();
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
      if (this.currentStatus == 1) {
        console.log('New Doc');
        await this.dishService.create(data).toPromise().then(() => {
          console.log('Doc created successs');
          setTimeout(() => {
            this.ngOnInit();
            this.showForm = false;
          }, 100);
          this.notificationService.showNotification('top', 'right', 'success','check', 'Save success');
        }, (error) => {
          console.log(error);
          this.spinner.hide();
          if(error.status == 401) {
            this.notificationService.showNotification('top', 'right', 'danger','warning', 'Unauthorized. Please Login Again...');
            this.authService.signOut();
          }else{
            this.notificationService.showNotification('top', 'right', 'danger','warning', 'Error saving');
          }
        });
      } else {
        console.log('Edit Doc');
        return await this.dishService.update(documentId, data).toPromise().then(() => {
          this.currentStatus = 1;
          console.log('Doc edited success');
          setTimeout(async () => {  
            await this.ngOnInit();
            this.showForm = false;
          }, 100);
          this.notificationService.showNotification('top', 'right', 'success','check', 'Edited success');
        }, (error) => {
          console.log(error);
          this.spinner.hide();
          if(error.status == 401) {
            this.notificationService.showNotification('top', 'right', 'danger','warning', 'Unauthorized. Please Login Again...');
            this.authService.signOut();
          }else{
            this.notificationService.showNotification('top', 'right', 'danger','warning', 'Error editing');
          }
        });
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
      this.reset();
      this.spinner.show();
        this.dishService.getById(documentId).toPromise().then((menu: any) => {
        this.currentStatus = 2;
        this.documentId = documentId;

        this.status = menu.data.status,
        this.photoPF = menu.data.photoPF;
        this.photoBG = menu.data.photoBG;
        this.item = {
          data: {  
            photoBG: menu.data.photoBG,
            photoPF: menu.data.photoPF,
            status: menu.data.status,
            name: {
              es: menu.data.name.es,
              en: menu.data.name.en,
            },
            description: {
              es: menu.data.description.es,
              en: menu.data.description.en,
            },
            ref: menu.data.ref,
            order: menu.data.order,
            price: menu.data.price,
            menuId: menu.data.menuId
          }
        };

        this.form.patchValue({
          id: documentId,
          name: {
            es: menu.data.name.es,
            en: menu.data.name.en,
          },
          description: {
            es: menu.data.description.es,
            en: menu.data.description.en,
          },
          ref: menu.data.ref,
          order: menu.data.order,
          status: menu.data.status,
          menuId: menu.data.menuId,
          price: menu.data.price
        });
        // editSubscribe.unsubscribe();
        this.spinner.hide();

      },
      (error) => 
        this.notificationService.showNotification('top', 'right', 'danger','danger', error.message)
      )//.unsubscribe();
    }

    onChanges(): void {
      this.form.valueChanges.subscribe(val => {
          // console.log(val);
          this.item = {
            data: {
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
            }
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

    async delete(documentId: string) {
      this.spinner.show();
      await this.dishService.delete(documentId).toPromise().then((menu) => {
        console.log('deleted');
        this.notificationService.showNotification('top', 'right', 'success','check', 'Delete success');
        this.dishes = this.dishes.filter(obj => obj.id !== documentId);
        this.config.totalItems =  this.dishes.length;
        // setTimeout(() => {
        //   this.ngOnInit();
        // }, 100);
        this.spinner.hide();
      }, (error) => {
        console.log(error);
        this.spinner.hide();
        if(error.status == 401) {
          this.notificationService.showNotification('top', 'right', 'danger','warning', 'Unauthorized. Please Login Again...');
          this.authService.signOut();
        }else{
          this.notificationService.showNotification('top', 'right', 'danger','warning', 'Error deleting');
        }
      });
    }

    async changeStatus(documentId: string, status: boolean) {
      this.spinner.show();
      let data = {
        status: !status 
      }
     await this.dishService.update(documentId, data).toPromise().then(() => {
        console.log('Edited');
        this.notificationService.showNotification('top', 'right', 'success','check', 'Status changed success');
        this.dishes.forEach(x =>  {
          if(x.id == documentId) x.data.status = !x.data.status
       });
       this.spinner.hide();
      }, (error) => {
        console.log(error);
        this.spinner.hide();
        if(error.status == 401) {
          this.notificationService.showNotification('top', 'right', 'danger','warning', 'Unauthorized. Please Login Again...');
          this.authService.signOut();
        }else{
          this.notificationService.showNotification('top', 'right', 'danger','warning', 'Error changing status');
        }
      });
    }
  

    async uploadPhoto(type:string, image: any) {
      // let archivo = this.profileForm.get('photo');
      console.log('Uploading file to firebase...');
      let ref = this.afStorage.ref(this.path).child(this.form.value.name.en).child(type);
      this.finish = true;
      // this.spinner.show();
      
      await ref.putString(image, 'data_url', {contentType:'image/webp'}).then((result) => {
        // console.log(result);
        console.log('Upload finished');
        // this.spinner.hide();
      });

      ref.getDownloadURL().subscribe(function(URL) {
        console.log(URL);
        // if(type == 'profile')
        // this.photoPF = URL;
        // if(type == 'background')
        // this.photoBG = URL;
      }); 
      
    }

    fileChangeEvent(event: any, type: string): void {
      this.spinner.show();
      if(type == 'profile')
      this.imageChangedEventPF = event;
      if(type == 'background')
      this.imageChangedEventBG = event;
    }
    imageCropped(event: ImageCroppedEvent, type: string) {
      if(type == 'profile'){
      this.croppedImagePF = event.base64;
      this.photoPF = event.base64;
      this.item.data.photoPF = this.photoPF;
      }
      if(type == 'background'){
        this.croppedImageBG = event.base64;
        this.photoBG = event.base64;
        this.item.data.photoBG = this.photoBG;
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
      this.currentStatus = 1;
      this.croppedImageBG = '';
      this.croppedImagePF = '';
      this.imageChangedEventPF = null;
      this.imageChangedEventBG = null;
      this.photoPF = './assets/img/default-pf.png';
      this.photoBG = './assets/img/default-bg.png';
      // this.lang = 'es';
    }
}