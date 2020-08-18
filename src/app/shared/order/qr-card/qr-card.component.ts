import { Component, OnInit, Input } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { interval } from 'rxjs';
import { OrderService } from 'app/services/orders/order.service';
import { Router } from '@angular/router';

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
export class QrCardComponent implements OnInit {

  @Input() public orderId: string = '';
  
  constructor(private orderService: OrderService, private router: Router) { }
  order: any = [];
  status: string = '';
  public intervallTimer = interval(1000);
  private subscription: any;
  ngOnInit(): void {
    if(this.orderId!=='')
    this.subscription = this.intervallTimer.subscribe(async() => {
      // something
        await this.orderService.getByOrderId(this.orderId).toPromise().then((docs:any)=>{
            docs.forEach((data: any) => {
            this.status = data.data.status;
          });
          if(this.status == 'Readed'){
            this.router.navigateByUrl('/menu');
            this.stop();
          }
        });
      });
    
  }

  stop() {
    this.subscription.unsubscribe();
  }

}
