import { Component, OnInit, ViewChild } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { OrderService } from 'app/services/orders/order.service';
import { NgxSpinner } from 'ngx-spinner/lib/ngx-spinner.enum';
import { NgxSpinnerService } from 'ngx-spinner';
import { NotificationService } from 'app/services/notification/notification.service';
import { ZXingScannerComponent } from '@zxing/ngx-scanner';

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
    // this.onCodeResult('2AS13A', 5)
  }

  qrResultString: string;
  order: any = [];
  ordersTable: any;
  items: any;
  showScanner: boolean = false;
  showItems: boolean = false;
  showTables: boolean = true;
  showOrdersTable: boolean = false;
  orderId: string;
  orderIdShort: string;
  status: string;
  tables: number = 10;
  tableSelect: number;
  currentDevice: MediaDeviceInfo = null;
  availableDevices: MediaDeviceInfo[];
  hasDevices: boolean;
  hasPermission: boolean;

  async getTable(num: number){
    // this.show = !this.show;
    this.spinner.show();
    this.tableSelect = num;
    this.items = null;
    await this.orderService.getByTable(num).toPromise().then(
        (docs: any) => {
          this.ordersTable = [];
          docs.forEach((data: any) => {
          // this.orderId = data.id;
          // this.status = data.data.status;
          // this.orderIdShort = data.data.orderId;
          this.ordersTable.push({
            id: data.id,
            status: data.data.status,
            items: data.data.items,
            orderId: data.data.orderId,
            date: data.data.date,
            table: data.data.table
          });
        });
        if(this.ordersTable.length == 0) {
          this.showScanner = true;
          this.showItems = false;
          this.showTables = false;
          this.showOrdersTable = false;
          this.ordersTable = null;
        }else{
          this.showOrdersTable = true;
          this.showItems = false;
          this.showTables = false;
          this.showScanner = false;
        }

        this.spinner.hide();
      }).catch((error) => {
        // window.alert(error)
        console.log(error);
        this.spinner.hide();
        this.notificationService.showNotification('top', 'right', 'danger', 'warning', error.message);
      });
  }

  clearResult(): void {
    this.qrResultString = null;
  }

  finish(){
    this.items = null;
    this.ordersTable = this.ordersTable.filter((obj: any) => obj.id !== this.orderId);
    if(this.ordersTable.length == 0) {
      this.reset();
    }else{
      this.showOrdersTable = true;
      this.showItems = false;
    }
  }

  showOrder(order: any){
    this.items = order.items;
    // this.order = order;
    this.orderIdShort = order.orderId;
    this.orderId = order.id;
    // this.qrResultString = order.orderIdShort;
    this.showOrdersTable = false;
    this.showItems = true;
  }

  reset(){
    this.showOrdersTable = false;
    this.showItems = false;
    this.showTables = true;
    this.showScanner = false;
    this.ordersTable = null;
    this.items = null;
  }

  onCodeResult(resultString: string, tableSelect: number) {
    this.qrResultString = resultString;
    this.tableSelect = tableSelect;
    this.showScanner = false;
      // this.dishes = this.dishes.filter(obj => obj.data.menuId == menuId);
      console.log(this.qrResultString);
      setTimeout(async () => {  
        if(this.qrResultString){
          this.spinner.show();
          await this.orderService.getByOrderId(this.qrResultString).toPromise().then(
            (docs: any) => {
              this.order = [];
              docs.forEach((data: any) => {
              this.orderId = data.id;
              this.status = data.data.status;
              this.orderIdShort = data.data.orderId;
              this.order.push({
                id: data.id,
                status: data.data.status,
                items: data.data.items,
                orderId: data.data.orderId
              });
            });

            if(this.status == 'Pending'){
              this.changeStatus('Readed');
              this.items = this.order[0].items;
              this.showItems = true;
              this.showScanner = false;
            }
            // else{
            // this.notificationService.showNotification('top', 'right', 'danger', 'warning', 'Orden ya leída!');
            // this.clearResult();
            // }
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

  async changeStatus(status: string){
    this.spinner.show();
    console.log(this.orderId);
    await this.orderService.update(this.orderId, 
      {
        'status': status,
        'table': this.tableSelect
      
      }).toPromise().then(() => {
      console.log('Changed Status');
      this.spinner.hide();
      // this.items = null;
    }).catch(() => this.spinner.hide() );

    let data = {
      orderId: this.orderIdShort, 
      date: Date.now(), 
      status: status,
      table: this.tableSelect,
      // table: 0,
      items: this.items
    };
    await this.sendWa(data);
  }

  async sendWa(data: any){
    await this.orderService.sendWa(data).toPromise().then((doc: any) => {
      console.log(doc);
    });
  }

  arrayN(){
    return Array(this.tables);
  }

  onCamerasFound(devices: MediaDeviceInfo[]): void {
    this.availableDevices = devices;
    this.hasDevices = Boolean(devices && devices.length);
  }

  onHasPermission(has: boolean) {
    this.hasPermission = has;
  }

}
