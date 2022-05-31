import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { NotificationService } from 'app/services/notification/notification.service';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { ShoppingCartService, Product } from 'app/services/shopping-cart/shopping-cart.service';
import { environment } from 'environments/environment';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { combineLatest, Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { uniq } from 'lodash';
import { Item } from 'app/admin/menus/menus.component';
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
    // private dishService: DishService,
    private afs: AngularFirestore,
    public spinner: NgxSpinnerService,
    private notificationService: NotificationService,
    public shoppingCartService: ShoppingCartService,
    ) {
     }

  public shoppingCartItems$: Observable<Product[]> = of([]);
  public shoppingCartItems: Product[] = [];

  // dishes: any = [];
  dishesCopy: any = [];
  lang: string = 'es';
  menuTitle: string = '';
  disable: boolean = false;
  menuId: string = '';
  totalItemsCart: number = 0;
  itemsCart: any;
  private menusCollection: AngularFirestoreCollection<Item>;
  menus: Observable<Item[]>;
  private dishesCollection: AngularFirestoreCollection<Item>;
  dishes: Observable<Item[]>;

  async ngOnInit(){
    this.spinner.show();
    this.menusCollection = this.afs.collection<Item>('menus');
    this.menus = this.menusCollection.valueChanges({idField: 'id'});
    this.menus.subscribe(()=>this.spinner.hide());
    // this.shoppingCartItems$ = this.shoppingCartService.getItems();
    // this.shoppingCartItems$.subscribe(_ => this.shoppingCartItems = _);    
    // this.totalItemsCart = this.shoppingCartItems.length;
  }

  getList() { 
    return this.afs.collection<any>('menus').valueChanges({idField: 'id'})
    .pipe(
      switchMap((menus: any) => {
        const menusIds = uniq(menus.map((bp:any) => bp.id))
        return combineLatest([
          of(menus),
          // combineLatest(
            menusIds.map((menuId: any) =>
              this.afs.collection<any>('dishes', ref => ref.where('menuId', '==', menuId)).valueChanges({idField: 'id'})
              // .pipe(
              //   map((dishes: any) => { 
              //     return {menuId: menuId, data: uniq(dishes.map((bp:any) => bp.id))} 
              //     }
              //   )
              // )
            )
          // )
        ])
      }),
      map(([menus, dishes]:any) => {
          return menus.map((menu: any) => {
            return {
              ...menu, 
              dishes: dishes//.find((rev: any) =>rev.menuId === menu.id),
            }
          })
      }),
    )
  }

  getDishes(menuId: string){
    this.spinner.show();
    if(menuId !== 'all'){
      this.dishesCollection = this.afs.collection<Item>('dishes', ref => ref.where('menuId', '==', menuId));
      this.dishes = this.dishesCollection.valueChanges({idField: 'id'});
    }else{
      this.dishesCollection = this.afs.collection<Item>('dishes');
      this.dishes = this.dishesCollection.valueChanges({idField: 'id'});
    }
    this.dishes.subscribe(()=>this.spinner.hide());
  }

  totalItems(total: number) {
    this.totalItemsCart = total;
  }

  inCartItem(item: boolean) {
    !item ? this.totalItemsCart-- : this.totalItemsCart;
  }

  back(){
    this.menuId = '';
    this.menuTitle = '';
    this.dishes = this.dishesCopy;
  }

  getDishesByMenu(menu: any){
      if(menu.status){
        this.menuId = menu.id;
        this.getDishes(this.menuId);
        this.menuTitle = this.lang == 'es' ? menu.name.es : menu.name.en;
      }
  }

}
