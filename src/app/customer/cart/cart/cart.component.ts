import { Component, OnInit } from '@angular/core';
import { ShoppingCartService, Product } from 'app/services/shopping-cart/shopping-cart.service';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Observable, of } from 'rxjs';
import { OrderService } from 'app/services/orders/order.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { NotificationService } from 'app/services/notification/notification.service';
import { now } from 'jquery';

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
    // var id = this.randomStringCharset(5, "CHACITOBchacito0123456789");
    // console.log(id)
    this.shoppingCartService.getTotalAmount().subscribe(total=> this.totalPrice = total);
    this.shoppingCartItems$ = this
    .shoppingCartService
    .getItems();
    this.shoppingCartItems$.subscribe(_ => this.shoppingCartItems = _);
    // this.totalItemsCart = this.shoppingCartItems.length;
  }

  totalPriceCart(total: number) {
    // console.log(mensaje);
    this.totalPrice = total;
  }

  async checkout(){
    console.log('New Order');
    this.spinner.show();
    // var id  = '' + Math.random().toString(36).toUpperCase().substr(2, 6);
    var id = this.randomStringCharset(5, "CHATOBchato0123456789");
    await this.orderService.create({orderId: id, date: Date.now(), items:this.shoppingCartItems}).then((doc) => {
      console.log('Order created successs', doc.id);
      this.orderId = id;
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

  randomString(len: number, an?: string){
      //an = "A" alfa "N" number
      an = an&&an.toLowerCase();
      var str="", i=0, min=an=="a"?10:0, max=an=="n"?10:62;
      for(;i++<len;){
        var r = Math.random()*(max-min)+min <<0;
        str += String.fromCharCode(r+=r>9?r<36?55:61:48);
      }
      return str;
  }

  randomStringCharset(len: number, charSet?: string) {
    charSet = charSet || 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var randomString = '';
    for (var i = 0; i < len; i++) {
        var randomPoz = Math.floor(Math.random() * charSet.length);
        randomString += charSet.substring(randomPoz,randomPoz+1);
    }
    return randomString;
}

}
