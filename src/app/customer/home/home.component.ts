import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { SettingService } from '../../services/settings/setting.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Location } from '@angular/common';

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

  settings: any;
  restId: string;
  item: any;
  uid: string;
  lang: string = 'es';

  constructor(
    private settingService: SettingService,
    private afs: AngularFirestore,
    public spinner: NgxSpinnerService,
    private activatedRoute: ActivatedRoute,
    private location: Location,
    
    ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.uid = localStorage.getItem('uid');
      this.restId = params['restId'];
      this.restId && this.getRestaurantById(this.restId);
    });

    // setTimeout(() => {
    //   this.settings = this.settingService.getSettings;
    // }, 500);
  }

  getRestaurantById(restId: string) {
    this.afs.collection('restaurants').doc(restId).valueChanges({ idField: 'id' })
    .subscribe(rest => {
      this.item = rest;
    });
  }

  back(){
    this.location.back();
  }

}
