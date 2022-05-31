import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { DishService } from 'app/services/dishes/dish.service';
import { MenuService } from 'app/services/menus/menu.service';
import { NotificationService } from 'app/services/notification/notification.service';
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'
import { trigger, state, style, transition, animate } from '@angular/animations';


@Component({
  selector: 'app-menu-pdf',
  templateUrl: './menu-pdf.component.html',
  styleUrls: ['./menu-pdf.component.css'],
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
export class MenuPdfComponent implements OnInit {

  constructor(
    private spinner: NgxSpinnerService,
    private menuService: MenuService,
    private dishService: DishService,
    private notificationService: NotificationService
  ) { }

  menus: any;
  dishes: any;
  @ViewChild('htmlData') htmlData:ElementRef;
  lang: string = 'es';
  disabled: boolean = true;
  
  async ngOnInit(){
    // this.spinner.show();
    // await this.getDishes('');
    // await this.getMenu();
    // this.disabled = false;
    // this.spinner.hide();
  }
  

  async getMenu(){
    // if(spinner)
    // setTimeout(async () => {  
      await this.menuService.gets().toPromise().then(
        (docs: any) => {
        this.menus = []; 
        docs.forEach(async(data: any) => {
          // await this.getDishes(data.id);
          const dishes = this.dishes.filter((obj: any) =>  obj.menuId === data.id);
          this.menus.push({
            id: data.id,
            menu: data.data,
            dishes: dishes,
            order: data.data.order
          });
        });
      }).catch((error) => {
        // window.alert(error)
        console.log(error);
        this.spinner.hide();
        this.notificationService.showNotification('top', 'right', 'danger', 'warning', error.message);
      });
    // }, 300);



  }

  async getDishes(menuId: string){
    // setTimeout(() => {
    await this.dishService.getsByMenuId(menuId).toPromise().then(
        (docs: any) => {
        this.dishes = []; 
        docs.forEach((data: any) => {
          this.dishes.push({
            id: data.id,
            dish: data.data,
            menuId: data.data.menuId
          });
        });
      }).catch((error) => {
        // window.alert(error)
        console.log(error);
        this.spinner.hide();
        this.notificationService.showNotification('top', 'right', 'danger', 'warning', error.message);
      });
    // }, 100);

  }

  public openPDF():void {
    let DATA = this.htmlData.nativeElement;
    let doc = new jsPDF('p','pt', 'a4');
    // doc.fromHTML(DATA.innerHTML,15,15);
    // doc.output('dataurlnewwindow');
  }


  public downloadPDF():void {
    let DATA = this.htmlData.nativeElement;
    let doc = new jsPDF('p','pt', 'letter');
    // doc.internal.scaleFactor = 1.1;
    // doc.addHTML(DATA, 
    // function save() {
    //   doc.save('chacaitoba-menu.pdf');
    //   // window.open(doc.output('bloburl'));
    // });
  }

}
