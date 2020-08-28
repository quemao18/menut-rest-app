import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Lightbox } from 'ngx-lightbox';
import { ShoppingCartService, Product } from 'app/services/shopping-cart/shopping-cart.service';
import { NotificationService } from 'app/services/notification/notification.service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-dish-card-item-large',
  templateUrl: './dish-card-item-large.component.html',
  styleUrls: ['./dish-card-item-large.component.css'],
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
export class DishCardItemLargeComponent implements OnInit {

  @Input() public lang: string;
  @Input() public item: any;
  @Input() public menuTitle: string;

  @Output()
  totalItems = new EventEmitter<number>();
  @Output()
  inCartItem = new EventEmitter<boolean>();

  totalPrice = 0;
  inCart = false;
  totalItemsCart = 0;
  public shoppingCartItems$: Observable<Product[]> = of([]);
  public shoppingCartItems: Product[] = [];
  productExistInCart:any = { qty:0 };
    constructor(
      private _lightbox: Lightbox,
      private shoppingCartService: ShoppingCartService,
      private notification: NotificationService
    ) {
     }

  ngOnInit(): void {
    setTimeout(() => {
      // this.shoppingCartItems = this.shoppingCartService.getItemsInCart();
      this.shoppingCartService.getTotalAmount().subscribe(total=> this.totalPrice = total);
      this.shoppingCartItems$ = this.shoppingCartService.getItems();
      this.shoppingCartItems$.subscribe(_ => this.shoppingCartItems = _);

      if(this.shoppingCartItems){
      const productExistInCart = this.shoppingCartItems.find(({id}) => id === this.item.id);
      if(productExistInCart) 
      {
        this.productExistInCart.qty = productExistInCart.qty;
        this.inCart = true; 
      }else
      this.inCart = false;
      }
      // console.log(this.inCart)
    }, 100);

  }

  open(name: string, photo: string): void {
    // open lightbox        
    const album = [{
          src: photo,
          caption: name,
          thumb: photo
       }];
    this._lightbox.open(album, 0);
  }
 
  close(): void {
    // close lightbox programmatically
    this._lightbox.close();
  }

  addToCart(qty: number){
    let item = {
      data: this.item.data,
      menuTitle: this.menuTitle,
      // lang: this.lang,
      id: this.item.id,
      qty: qty
    } 
    this.item = item;

    this.shoppingCartService.addToCart(item, qty);
    this.shoppingCartService.getTotalAmount().subscribe(total=> this.totalPrice = total);
    this.shoppingCartItems$ = this.shoppingCartService.getItems();
    this.shoppingCartItems$.subscribe(_ => this.shoppingCartItems = _);
    this.productExistInCart = this.shoppingCartItems.find(({id}) => id === this.item.id); 
    if(this.productExistInCart.qty ==0) this.remove(item);
    this.totalItems.emit(this.shoppingCartItems.length);
    this.inCartItem.emit(true);
    this.inCart = true;
  }

  remove(item: Product){
    this.productExistInCart.qty = 0;
    this.shoppingCartService.removeFromCart(item);
    this.shoppingCartService.getTotalAmount().subscribe(total=> this.totalPrice = total);
    this.shoppingCartItems$ = this
    .shoppingCartService
    .getItems();
    this.shoppingCartItems$.subscribe(_ => this.shoppingCartItems = _);
    this.totalItems.emit(this.shoppingCartItems.length);
    this.inCartItem.emit(false);
    this.inCart = false;
  }

}
