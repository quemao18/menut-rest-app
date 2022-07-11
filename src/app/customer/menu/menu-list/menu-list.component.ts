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
  restId: string;
  restaurant: any;
  uid: string;

  async ngOnInit(){
    // this.menusCollection = this.afs.collection<Item>('menus');
    // this.menus = this.menusCollection.valueChanges({idField: 'id'});
    // this.menus.subscribe(()=>this.spinner.hide());
    this.uid = localStorage.getItem('uid');

    this.activatedRoute.params.subscribe(params => {
      this.restId = params['restId'];
      this.getMenu(this.restId);
      this.getRestaurant(this.restId);
    });

    // this.shoppingCartItems$ = this.shoppingCartService.getItems();
    // this.shoppingCartItems$.subscribe(_ => this.shoppingCartItems = _);    
    // this.totalItemsCart = this.shoppingCartItems.length;
  }

  getRestaurant(restId: string){
    // this.spinner.show();
    this.afs.collection('restaurants').doc(restId).valueChanges()
    .subscribe(rest => {
      this.restaurant = rest;
      this.menuTitle = this.restaurant.name;
      // this.spinner.hide();
    });
  }

  getMenu(restId: string){
    // this.router.navigate(['/dishes/'+menuId])
    this.spinner.show();
    this.menus = null;
    if(restId !== 'all'){
      this.menusCollection = this.afs.collection<Item>('menus', ref => ref.where('restId', '==', restId));
      this.menus = this.menusCollection.valueChanges({idField: 'id'});
    }else{
      // return;
      // this.menusCollection = this.afs.collection<Item>('menus');
      // this.menus = this.menusCollection.valueChanges({idField: 'id'});
    }
    this.menus.subscribe(() => {
      this.spinner.hide();
    }); 
  }

  getDishesByMenu(menu: any){
    this.router.navigate([`/customer/menu/${this.restId}/dishes/`+menu.id])
  }

  totalItems(total: number) {
    this.totalItemsCart = total;
  }

  inCartItem(item: boolean) {
    !item ? this.totalItemsCart-- : this.totalItemsCart;
  }

  back(){
    this.location.back();
    // this.router.navigate([`/customer/restaurants/${this.uid}`])

    // this.menuId = '';
    // this.menuTitle = '';
    // this.dishes = this.dishesCopy;
  }

}
