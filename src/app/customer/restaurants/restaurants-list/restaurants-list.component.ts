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
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-restaurants-list',
  templateUrl: './restaurants-list.component.html',
  styleUrls: ['./restaurants-list.component.css'],
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

export class RestaurantsListComponent implements OnInit {

  constructor(    
    // private dishService: DishService,
    private afs: AngularFirestore,
    public spinner: NgxSpinnerService,
    private notificationService: NotificationService,
    private activatedRoute: ActivatedRoute,
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

  private restaurantsCollection: AngularFirestoreCollection<Item>;
  restaurants: Observable<Item[]>;
  uid: string;

  async ngOnInit(){
    this.activatedRoute.params.subscribe(params => {
      this.uid = params['uid'];
      this.uid && this.getRestaurantsByUid(this.uid);
    });

    // this.shoppingCartItems$ = this.shoppingCartService.getItems();
    // this.shoppingCartItems$.subscribe(_ => this.shoppingCartItems = _);    
    // this.totalItemsCart = this.shoppingCartItems.length;
  }

  getRestaurantsByUid(uid: string){
    // this.router.navigate(['/dishes/'+menuId])
    localStorage.setItem('uid', uid);
    this.spinner.show();
    this.restaurants = null;
    if(uid !== 'all'){
      this.restaurantsCollection = this.afs.collection<Item>('restaurants', ref => ref.where('uid', '==', uid));
      this.restaurants = this.restaurantsCollection.valueChanges({idField: 'id'});
    }else{
      // return;
      this.restaurantsCollection = this.afs.collection<Item>('restaurants');
      this.restaurants = this.restaurantsCollection.valueChanges({idField: 'id'});
    }
    this.restaurants.subscribe(() => {
      this.spinner.hide();
    }); 
  }


  // totalItems(total: number) {
  //   this.totalItemsCart = total;
  // }

  // inCartItem(item: boolean) {
  //   !item ? this.totalItemsCart-- : this.totalItemsCart;
  // }

  back(){
    this.menuId = '';
    this.menuTitle = '';
  }

}
