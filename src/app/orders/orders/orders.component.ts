import { Component, OnInit, Inject } from '@angular/core';
import { NgxSpinner } from 'ngx-spinner/lib/ngx-spinner.enum';
import { OrderService } from 'app/services/orders/order.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { NotificationService } from 'app/services/notification/notification.service';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material/dialog';

export interface DialogData {
  orderId: string;
  data: any;
}

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
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
export class OrdersComponent implements OnInit {

  constructor(
    private spinner: NgxSpinnerService, 
    private orderService: OrderService, 
    private notificationService: NotificationService,
    public dialog: MatDialog,
    ) { }

  orders = [];
  config: any =  {
    itemsPerPage: 10,
    currentPage: 1,
    totalItems: 0
  };

  ngOnInit(): void {
    this.spinner.show();
    setTimeout(async () => {
      await this.orderService.gets().toPromise().then(
        (docs) => {
        this.orders = []; 
        docs.forEach((data: any) => {
          let sum = data.data().items.reduce(function (total: any, currentValue: { qty: number, data: { price: any; }; }) {
            return currentValue.data.price ? total + currentValue.data.price * currentValue.qty : 0;
          }, 0);
          this.orders.push({
            id: data.id,
            data: data.data(), 
            total: sum
          });
        });
        // console.log(this.orders)
        this.config.totalItems =  this.orders.length;
        this.spinner.hide();
      }).catch((error) => {
        // window.alert(error)
        console.log(error);
        this.spinner.hide();
        this.notificationService.showNotification('top', 'right', 'danger', 'warning', error.message);
      });
    }, 500);
  }

  pageChanged(event: any){
    this.config.currentPage = event;
  }

  async delete(documentId: string) {
    this.spinner.show();
    await this.orderService.delete(documentId).then((menu) => {
      console.log('deleted');
      this.notificationService.showNotification('top', 'right', 'success','check', 'Delete success');
      this.orders = this.orders.filter(obj => obj.id !== documentId);
      this.config.totalItems =  this.orders.length;
      // setTimeout(() => {
      //   this.ngOnInit();
      // }, 100);
      this.spinner.hide();
    }, (error) => {
      console.log(error);
      this.notificationService.showNotification('top', 'right', 'danger','danger', 'Error deleting');
      this.spinner.hide();
    });
  }
  
  data = [];
  openDialog(order: any) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.width = '620px';
    dialogConfig.maxHeight = '690px';
    
    dialogConfig.data = {
        order: order,
    };

    const dialogRef = this.dialog.open(DialogItems, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}

@Component({
  selector: 'items-dialog',
  templateUrl: './items-dialog.html',
  styleUrls: ['./orders.component.css'],
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
export class DialogItems {
  constructor(
    public dialogRef: MatDialogRef<DialogItems>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

    onNoClick(): void {
      this.dialogRef.close();
    }

}
