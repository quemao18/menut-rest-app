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
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
@Component({
  selector: 'app-dish-list',
  templateUrl: './dish-list.component.html',
  styleUrls: ['./dish-list.component.css'],
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

export class DishListComponent implements OnInit {

  constructor(    
    // private dishService: DishService,
    private afs: AngularFirestore,
    public spinner: NgxSpinnerService,
    private location: Location,
    private activatedRoute: ActivatedRoute,
    public shoppingCartService: ShoppingCartService,
    private router: Router
  ) 
    {
    
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
  restId: string;
  restaurant: any;

  async ngOnInit(){
    // this.menusCollection = this.afs.collection<Item>('menus');
    // this.menus = this.menusCollection.valueChanges({idField: 'id'});
    // this.menus.subscribe(()=>this.spinner.hide());

    this.activatedRoute.params.subscribe(params => {
      this.restId = params['restId'];
      this.menuId = params['menuId'];
      this.getDishes(this.menuId);
      this.getRestaurant(this.restId);
    });

    // this.shoppingCartItems$ = this.shoppingCartService.getItems();
    // this.shoppingCartItems$.subscribe(_ => this.shoppingCartItems = _);    
    // this.totalItemsCart = this.shoppingCartItems.length;
  }

  getRestaurant(restId: string){
    this.spinner.show();
    this.afs.collection('restaurants').doc(restId).valueChanges().subscribe(rest => {
      this.restaurant = rest;
      this.menuTitle = this.restaurant.name;
      // this.spinner.hide();
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
      // return;
      // this.menusCollection = this.afs.collection<Item>('menus');
      // this.menus = this.menusCollection.valueChanges({idField: 'id'});
    }
    this.dishes.subscribe(() => {
      this.spinner.hide();
    }); 
  }

  getMenuByRest(){
    this.router.navigate(['/customer/menu/'+this.restId]);
  }


  // getDishes(menuId: string){
  //   this.spinner.show();
  //   if(menuId !== 'all'){
  //     this.dishesCollection = this.afs.collection<Item>('dishes', ref => ref.where('menuId', '==', menuId));
  //     this.dishes = this.dishesCollection.valueChanges({idField: 'id'});
  //   }else{
  //     this.dishesCollection = this.afs.collection<Item>('dishes');
  //     this.dishes = this.dishesCollection.valueChanges({idField: 'id'});
  //   }
  //   this.dishes.subscribe(()=>this.spinner.hide());
  // }

  totalItems(total: number) {
    this.totalItemsCart = total;
  }

  inCartItem(item: boolean) {
    !item ? this.totalItemsCart-- : this.totalItemsCart;
  }

  back(){
    // this.menuId = '';
    // this.menuTitle = '';
    // this.dishes = this.dishesCopy;
    // this.getMenuByRest();
    this.location.back();
  }

  // getDishesByMenu(menu: any){
  //     if(menu.status){
  //       this.menuId = menu.id;
  //       this.getDishes(this.menuId);
  //       this.menuTitle = this.lang == 'es' ? menu.name.es : menu.name.en;
  //     }
  // }

}
