import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { SettingService } from '../../services/settings/setting.service';

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

  constructor(private settingService: SettingService) { }

  ngOnInit(): void {
    this.settings = this.settingService.getSettings;
  }

}
