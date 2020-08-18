import { Component, OnInit, HostBinding } from '@angular/core';
import { MenuService } from 'app/services/menus/menu.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { NotificationService } from 'app/services/notification/notification.service';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { DishService } from 'app/services/dishes/dish.service';
import { interval, Observable, of } from 'rxjs';
import { ShoppingCartService, Product } from 'app/services/shopping-cart/shopping-cart.service';
import { environment } from 'environments/environment';

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
    public shoppingCartService: ShoppingCartService
    // private _lightbox: Lightbox
    ) {
      // this.shoppingCartItems$ = this
      // .shoppingCartService
      // .getItems();
      // this.shoppingCartItems$.subscribe(_ => this.shoppingCartItems = _);
      // this.totalItemsCart = this.shoppingCartItems.length;
     }

  public shoppingCartItems$: Observable<Product[]> = of([]);
  public shoppingCartItems: Product[] = [];
  menus: any = [];
  dishes: any = [];
  dishesCopy: any = [];
  lang: string = 'es';
  menuTitle: string = '';
  disable: boolean = false;
  menuId: string = '';
  totalItemsCart: number = 0;
  itemsCart: any;

  async ngOnInit(){
    this.shoppingCartItems$ = this
    .shoppingCartService
    .getItems();
    this.shoppingCartItems$.subscribe(_ => this.shoppingCartItems = _);    
    this.totalItemsCart = this.shoppingCartItems.length;
    this.getDishesAll();
    this.menuId = '';
    this.getMenu(true);
    setInterval(()=>{
      console.log('Updating dishes and menu...');
      if(this.menuId == '')
        this.getMenu(false);
      if(this.menuId!='')
        this.getDishes();
      this.getDishesAll();
    },60*1000*environment.updateMinutes); //update every 2 minutes

  }

  totalItems(total: number) {
    // console.log(total);
    this.totalItemsCart = total;
  }

  inCartItem(item: boolean) {
    // console.log(item);
    !item ? this.totalItemsCart--: this.totalItemsCart;
    // return item;
  }

  // async showMenu(menu:any){
  //   // this.dishes = this.dishes.filter(obj => obj.data.menuId == menuId);
  //   setTimeout(async () => {  
  //     if(menu.data.status){
  //       this.menuId = menu.id;
  //       this.spinner.show();
  //       await this.dishService.getsByMenuId(this.menuId).toPromise().then(
  //         (docs) => {
  //         this.dishes = []; 
  //         docs.forEach((data: any) => {
  //           this.dishes.push({
  //             id: data.id,
  //             data: data.data()
  //           });
  //         });
  //         // this.dishes = this.dishes.filter(obj => obj.data.menuId == this.menuId);
  //         this.spinner.hide();
  //       }).catch((error) => {
  //         // window.alert(error)
  //         console.log(error);
  //         this.spinner.hide();
  //         this.notificationService.showNotification('top', 'right', 'danger', 'warning', error.message);
  //       });
  //       this.menuTitle = this.lang == 'es' ? menu.data.name.es : menu.data.name.en;
  //     }
  //   }, 100);

  // }

  getMenu(spinner?:boolean){
    setTimeout(async () => {  
      if(spinner)
      this.spinner.show();
      await this.menuService.gets().toPromise().then(
        (docs) => {
        this.menus = docs; 
        // docs.forEach((data: any) => {
        //   this.menus.push({
        //     id: data.id,
        //     data: data.data()
        //   });
        // });
        this.spinner.hide();
        this.menuTitle = '';
      }).catch((error) => {
        // window.alert(error)
        console.log(error);
        this.spinner.hide();
        this.notificationService.showNotification('top', 'right', 'danger', 'warning', error.message);
      });
    }, 100);
  }

  back(){
    this.menuId = '';
    this.menuTitle = '';
    this.dishes = this.dishesCopy;
  }

  getDishes(){
    setTimeout(async () => {  
      await this.dishService.getsByMenuId(this.menuId).toPromise().then(
        (docs) => {
        this.dishes = docs; 
        // docs.forEach((data: any) => {
        //   this.dishes.push({
        //     id: data.id,
        //     data: data.data()
        //   });
        // });
        // this.dishes = this.dishes.filter(obj => obj.data.menuId == this.menuId);
        this.spinner.hide();
      }).catch((error) => {
        // window.alert(error)
        console.log(error);
        this.spinner.hide();
        this.notificationService.showNotification('top', 'right', 'danger', 'warning', error.message);
      });
    }, 100);
  }

  getDishesAll(){
    // this.disable = true;
    setTimeout(async () => {  
      await this.dishService.gets().toPromise().then(
        (docs) => {
        this.dishes = docs; 
        // docs.forEach((data: any) => {
        //   this.dishes.push({
        //     id: data.id,
        //     data: data.data()
        //   });
        // });
        this.dishesCopy = this.dishes;
        if(this.menuId!='')
          this.dishes = this.dishes.filter(obj => obj.data.menuId == this.menuId);
        this.spinner.hide();
      }).catch((error) => {
        // window.alert(error)
        console.log(error);
        this.spinner.hide();
        this.notificationService.showNotification('top', 'right', 'danger', 'warning', error.message);
      });
    }, 100);
  }

  filterDishes(menu: any){
      if(menu.data.status){
        this.menuId = menu.id;
        this.dishes = this.dishes.filter(obj => obj.data.menuId == this.menuId);
        this.menuTitle = this.lang == 'es' ? menu.data.name.es : menu.data.name.en;
      }
  }

}
