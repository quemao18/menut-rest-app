import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer-waiter',
  templateUrl: './footer-waiter.component.html',
  styleUrls: ['./footer-waiter.component.css']
})
export class FooterWaiterComponent implements OnInit {
  test : Date = new Date();
  
  constructor() { }

  ngOnInit() {
  }

}
