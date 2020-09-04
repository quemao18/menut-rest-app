import { Component, OnInit, Inject } from '@angular/core';
import { NgxSpinner } from 'ngx-spinner/lib/ngx-spinner.enum';
import { OrderService } from 'app/services/orders/order.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { NotificationService } from 'app/services/notification/notification.service';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material/dialog';
import { AuthService } from 'app/services/auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

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
    private authService: AuthService,
    private activatedRoute: ActivatedRoute
    ) { 
      this.activatedRoute.params.subscribe(params => {
        this.orderId = params['id'];
      });
    }

  orders: any = [];
  orderId: string = '';
  config: any =  {
    itemsPerPage: 10,
    currentPage: 1,
    totalItems: 0
  };

  async ngOnInit() {
    this.spinner.show();
      await this.orderService.gets().toPromise().then(
        (docs) => {
        this.orders = docs;
        this.config.totalItems =  this.orders.length;
        if(this.orderId !== ''){
          let order = this.orders.filter((obj: any) => obj.data.orderId === this.orderId)[0];
          this.openDialog(order);
        }
        this.spinner.hide();
      }).catch((error) => {
        // window.alert(error)
        console.log(error);
        this.spinner.hide();
        if(error.status == 401) {
          this.notificationService.showNotification('top', 'right', 'danger','warning', 'Unauthorized. Please Login Again...');
          this.authService.signOut();
        }else{
        this.notificationService.showNotification('top', 'right', 'danger', 'warning', error.message);
        }
      });
  }

  pageChanged(event: any){
    this.config.currentPage = event;
  }

  async delete(documentId: string) {
    this.spinner.show();
    await this.orderService.delete(documentId).toPromise().then((menu) => {
      console.log('deleted');
      this.notificationService.showNotification('top', 'right', 'success','check', 'Delete success');
      this.orders = this.orders.filter((obj: any) => obj.id !== documentId);
      this.config.totalItems =  this.orders.length;
      // setTimeout(() => {
      //   this.ngOnInit();
      // }, 100);
      this.spinner.hide();
    }, (error) => {
        console.log(error);
        this.spinner.hide();
        if(error.status == 401) {
          this.notificationService.showNotification('top', 'right', 'danger','warning', 'Unauthorized. Please Login Again...');
          this.authService.signOut();
        }else{
          this.notificationService.showNotification('top', 'right', 'danger','warning', 'Error deleting');
        }
    });
  }
  
  data = [];
  openDialog(order: any) {
    if(order == null) return;
    
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
