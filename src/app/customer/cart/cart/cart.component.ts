import { Component, OnInit } from '@angular/core';
import { ShoppingCartService, Product } from 'app/services/shopping-cart/shopping-cart.service';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Observable, of } from 'rxjs';
import { OrderService } from 'app/services/orders/order.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { NotificationService } from 'app/services/notification/notification.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
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
export class CartComponent implements OnInit {

  constructor(public shoppingCartService: ShoppingCartService, 
    private orderService: OrderService, 
    private spinner: NgxSpinnerService,
    private notificationService: NotificationService
    
    ) { }

  lang: string = 'es';
  totalPrice: number = 0;
  shoppingCartItems$: Observable<Product[]> = of([]);
  shoppingCartItems: Product[] = [];
  orderId: string = '';

  ngOnInit(): void {
    // this.shoppingCartService.getItems().subscribe(items => this.items = items);
    // this.items = this.shoppingCartService.getItemsInCart();
    this.shoppingCartService.getTotalAmount().subscribe(total=> this.totalPrice = total);
    this.shoppingCartItems$ = this
    .shoppingCartService
    .getItems();
    this.shoppingCartItems$.subscribe(_ => this.shoppingCartItems = _);
    // this.totalItemsCart = this.shoppingCartItems.length;
  }

  totalPriceCart(total) {
    // console.log(mensaje);
    this.totalPrice = total;
  }

  async checkout(){
    console.log('New Order');
    this.spinner.show();
    await this.orderService.create({items:this.shoppingCartItems}).then((doc) => {
      console.log('Order created successs', doc.id);
      this.orderId = doc.id;
      this.spinner.hide();
      this.notificationService.showNotification('top', 'right', 'success','check', 'Checkout success!');
      this.shoppingCartService.clearCart();
      this.shoppingCartItems = [];
    }, (error) => {
      console.error(error);
      this.notificationService.showNotification('top', 'right', 'danger','warning', 'Error Checkout');
      this.spinner.hide();
    });

  }

}
