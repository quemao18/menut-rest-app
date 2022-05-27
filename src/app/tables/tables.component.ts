import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { MenuService } from 'app/services/menus/menu.service';

import { NotificationService } from 'app/services/notification/notification.service';

import { Lightbox } from 'ngx-lightbox';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { AuthService } from 'app/services/auth/auth.service';
import { TableService } from 'app/services/tables/table.service';


@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.css'],
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
export class TablesComponent implements OnInit, AfterViewInit {

  @ViewChild('scroll', { read: ElementRef }) public scroll: ElementRef<any>;

  constructor(
    private tableService: TableService,
    public spinner: NgxSpinnerService,
    private afStorage: AngularFireStorage,
    private notificationService: NotificationService,
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
  path = '/tables';
  photoPF = './assets/img/default-pf.png';
  photoBG = './assets/img/default-bg.png';
    
  item: any = {
    data:{
      name: '',
      order: '',
      id: '',
      capacity: '',
      location: '',
      number: ''
    }
  }

  form = new FormGroup({
    // uid: new FormControl({value: null, disabled: true}),
    id: new FormControl(),
    order: new FormControl(),
    number: new FormControl(),
    location: new FormControl(),
    capacity: new FormControl(),
    name: new FormControl('', Validators.required),
    status:  new FormControl(true),
  });

  documentId = null;
  status = true;
  currentStatus = 1;
  tables: any;
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
    // setTimeout(async () => {
      this.spinner.show();
      await this.tableService.gets().toPromise().then(
        (docs) => { 
        this.tables = docs; 
        this.config.totalItems =  this.tables.length;
        this.spinner.hide();
      }).catch((error) => {
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
  
  async onSubmit(form: any, documentId = this.documentId, status = this.status) {
      // console.log(`Status: ${this.currentStatus}`);
      // setTimeout(() => {
      this.spinner.show();
      // }, 200);
      let data = {
        order: form.order,
        location: form.location,
        name: form.name,
        capacity: form.capacity,
        number: form.number,
        status: form.status
      }
      if (this.currentStatus == 1) {
        console.log('New Doc');
        await this.tableService.create(data).toPromise().then(() => {
          console.log('Doc created successs');
          setTimeout(() => {
            this.ngOnInit();
            this.showForm = false;
          }, 100);
          this.notificationService.showNotification('top', 'right', 'success','check', 'Save success');
        }, (error) => {
          console.error(error);
          this.spinner.hide();
          if(error.status == 401) {
            this.notificationService.showNotification('top', 'right', 'danger','warning', 'Unauthorized. Please login again...');
            this.authService.signOut();
          }else{
            this.notificationService.showNotification('top', 'right', 'danger','warning', 'Error saving');
          }
        });
      } else {
        console.log('Edit Doc');
        return await this.tableService.update(documentId, data).toPromise().then(() => {
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
        this.tableService.getById(documentId).toPromise().then((table: any) => {
        this.currentStatus = 2;
        this.documentId = documentId;
        this.status = table.data.status,
        this.item = {
          data: {  
            status: table.data.status,
            name: table.data.name,
            location: table.data.location,
            number: table.data.number,
            order: table.data.order,
            capacity: table.data.capacity,
          }
        };
        // console.log(this.item)
        this.form.patchValue({
          id: documentId,
          status: table.data.status,
          name: table.data.name,
          location: table.data.location,
          number: table.data.number,
          order: table.data.order,
          capacity: table.data.capacity,
        });
        // editSubscribe.unsubscribe();
        this.spinner.hide();

      },
      (error) => 
        {
          console.log(error);
          this.notificationService.showNotification('top', 'right', 'danger','danger', error.message)
        }
      )//.unsubscribe();
    }

    onChanges(): void {
      this.form.valueChanges.subscribe(val => {
          // console.log(val);
          this.item = {
            data: {
              status: val.status,
              name: val.name,
              number: val.number,
              location: val.location,
              capacity: val.capacity,
              order: val.order,
            }
          };
      });
    }

    new(){
      this.reset();
      this.showForm=!this.showForm;
      this.form.patchValue({
        order: this.config.totalItems + 1
      })
    }

    async delete(documentId: string) {
      this.spinner.show();
      await this.tableService.delete(documentId).toPromise().then((menu) => {
        console.log('deleted');
        this.notificationService.showNotification('top', 'right', 'success','check', 'Delete success');
        this.tables = this.tables.filter((obj: any) => obj.id !== documentId);
        this.config.totalItems =  this.tables.length;
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
     await this.tableService.update(documentId, data).toPromise().then(() => {
        console.log('Edited');
        this.notificationService.showNotification('top', 'right', 'success','check', 'Status changed success');
        this.tables.forEach(x =>  {
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
      this.currentStatus = 1;
      this.form.patchValue({
        name: '',
        order: '',
        id: '',
        capacity: '',
        location: '',
        number: ''
      });
      // this.lang = 'es';
    }

}