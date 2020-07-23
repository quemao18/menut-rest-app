import { Component, OnInit } from '@angular/core';
import { MenuService } from 'app/services/menus/menu.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { NotificationService } from 'app/services/notification/notification.service';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { DishService } from 'app/services/dishes/dish.service';

@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.css'],
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
export class MenuListComponent implements OnInit {

  constructor(    
    private menuService: MenuService,
    private dishService: DishService,
    public spinner: NgxSpinnerService,
    // private afStorage: AngularFireStorage,
    private notificationService: NotificationService,
    // private _lightbox: Lightbox
    ) { }

  menus: any [];
  dishes: any [];
  lang: string = 'es';
  menuTitle: string = '';

  ngOnInit(): void {
    setTimeout(async () => {  
      this.spinner.show();
      await this.menuService.gets().toPromise().then(
        (docs) => {
        this.menus = []; 
        docs.forEach((data: any) => {
          this.menus.push({
            id: data.id,
            data: data.data()
          });
        });
        this.spinner.hide();
        this.menuTitle = '';
      }).catch((error) => {
        // window.alert(error)
        console.log(error);
        this.spinner.hide();
        this.notificationService.showNotification('top', 'right', 'danger', 'warning', error.message);
      });
    }, 100);
      // setTimeout(async () => {
      //   await this.dishService.gets().toPromise().then(
      //     (docs) => {
      //     this.dishes = []; 
      //     docs.forEach((data: any) => {
      //       this.dishes.push({
      //         id: data.id,
      //         data: data.data()
      //       });
      //     });
      //     this.spinner.hide();
      //   }).catch((error) => {
      //     // window.alert(error)
      //     console.log(error);
      //     this.spinner.hide();
      //     this.notificationService.showNotification('top', 'right', 'danger', 'warning', error.message);
      //   });
      // }, 500);
  }

  async showMenu(menuId: string, name: any, status: boolean){
    // this.dishes = this.dishes.filter(obj => obj.data.menuId == menuId);
    if(status){
      this.spinner.show();
      await this.dishService.getsByMenuId(menuId).toPromise().then(
        (docs) => {
        this.dishes = []; 
        docs.forEach((data: any) => {
          this.dishes.push({
            id: data.id,
            data: data.data()
          });
        });
        // this.dishes = this.dishes.filter(obj => obj.data.menuId == this.menuId);
        this.spinner.hide();
      }).catch((error) => {
        // window.alert(error)
        console.log(error);
        this.spinner.hide();
        this.notificationService.showNotification('top', 'right', 'danger', 'warning', error.message);
      });
      this.menuTitle = this.lang == 'es' ? name.es : name.en;
    }
  }

}
