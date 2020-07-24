import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Lightbox } from 'ngx-lightbox';
import { ShoppingCartService } from 'app/services/shopping-cart/shopping-cart.service';

@Component({
  selector: 'app-dish-card-item-medium',
  templateUrl: './dish-card-item-medium.component.html',
  styleUrls: ['./dish-card-item-medium.component.css'],
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
export class DishCardItemMediumComponent implements OnInit {

  @Input() public lang: string;
  @Input() public item: any;

  @Output()
  totalPrice = new EventEmitter<number>();

  totalPriceCart: number = 0;
  animate = false;

    constructor(
      private _lightbox: Lightbox,
      private shoppingCartService: ShoppingCartService
    ) { }

  ngOnInit(): void {
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

  updateQty(qty:number){
    this.shoppingCartService.addToCart(this.item, qty);
    this.shoppingCartService.getTotalAmount().subscribe(total => this.totalPriceCart =  total)
    this.totalPrice.emit(this.totalPriceCart);
  }

  remove(){
    // this.shoppingCartService.removeProduct(this.item.id);
    this.shoppingCartService.removeFromCart(this.item);
    this.shoppingCartService.getTotalAmount().subscribe(total => this.totalPriceCart =  total);
    console.log(this.totalPriceCart)
    this.totalPrice.emit(this.totalPriceCart);
  }
}
