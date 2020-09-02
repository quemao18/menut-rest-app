import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { interval } from 'rxjs';
import { OrderService } from 'app/services/orders/order.service';
import { Router } from '@angular/router';
import { ShoppingCartService } from 'app/services/shopping-cart/shopping-cart.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-qr-card',
  templateUrl: './qr-card.component.html',
  styleUrls: ['./qr-card.component.css'],
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
export class QrCardComponent implements OnInit, OnDestroy {

  @Input() public orderId: string = '';

  constructor(
    private spinner: NgxSpinnerService,
    private orderService: OrderService, 
    private router: Router, 
    public shoppingCartService: ShoppingCartService
    ) { }

  ngOnDestroy(): void {
    console.log('destroy')
    this.stop()
  }

  order: any = [];
  status: string = '';
  public intervallTimer = interval(1000);
  private subscription: any;
  items: any;
  details: string;

  ngOnInit(): void {
    if(this.orderId!==''){
      // setTimeout(() => {
      //   this.spinner.show(); 
      // }, 200);
        this.subscription = this.intervallTimer.subscribe(async() => {
        // something
          this.orderService.getByOrderId(this.orderId).toPromise().then((docs:any)=>{
              docs.forEach((data: any) => {
              this.status = data.data.status;
              this.items = data.data.items;
              this.details = data.data.details;
            });
            if(this.status == 'Readed'){
              this.router.navigateByUrl('/menu');
              this.shoppingCartService.clearCart();
              this.stop();
            }
            else
            setTimeout(() => {
              this.spinner.hide(); 
            }, 500);
          });
        });

    } 
    else
      this.router.navigateByUrl('/menu');
    // console.log(this.items)
  }

  stop() {
    this.subscription.unsubscribe();
  }

}
