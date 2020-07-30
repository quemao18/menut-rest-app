import { Component, OnInit, ViewChild } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { OrderService } from 'app/services/orders/order.service';
import { NgxSpinner } from 'ngx-spinner/lib/ngx-spinner.enum';
import { NgxSpinnerService } from 'ngx-spinner';
import { NotificationService } from 'app/services/notification/notification.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
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
export class HomeComponent implements OnInit {
  
  constructor(
    private orderService: OrderService,
    private spinner: NgxSpinnerService,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    // this.onCodeResult('5ASA3t')
  }

  scanQR(){
    this.show = !this.show;
  }

  qrResultString: string;
  order: any = [];
  items: any = [];
  show: boolean = false;
  orderId: string;
  orderIdShort: string;
  status: string;

  clearResult(): void {
    this.qrResultString = null;
  }

  onCodeResult(resultString: string) {
    this.qrResultString = resultString;
    this.show = false;
      // this.dishes = this.dishes.filter(obj => obj.data.menuId == menuId);
      console.log(this.qrResultString);
      setTimeout(async () => {  
        if(this.qrResultString){
          this.spinner.show();
          await this.orderService.getByOrderId(this.qrResultString).toPromise().then(
            (docs) => {
            docs.forEach((data: any) => {
              this.orderId = data.id;
              this.status = data.data().status;
              this.orderIdShort = data.data().orderId;

              this.order.push({
                id: data.id,
                status: data.data().status,
                items: data.data()
              });
            });
            console.log(this.order.length)
            if(this.status == 'Pending')
            this.items = this.order[0].items.items;
            else{
            this.notificationService.showNotification('top', 'right', 'danger', 'warning', 'Orden ya leída!');
            this.clearResult();
            }
            this.spinner.hide();
          }).catch((error) => {
            // window.alert(error)
            console.log(error);
            this.spinner.hide();
            this.notificationService.showNotification('top', 'right', 'danger', 'warning', error.message);
          });
        }
      }, 100);
  
  }

  async changeStatus(){
    this.spinner.show();
    await this.orderService.update(this.orderId, {'status': 'Readed'}).then(() => {
      console.log('Changed Status');
      this.spinner.hide();
      this.items = null;
    });
  }

}
