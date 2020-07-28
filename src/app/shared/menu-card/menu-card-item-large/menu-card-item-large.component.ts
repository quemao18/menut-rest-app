import { Component, OnInit, Input } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Lightbox } from 'ngx-lightbox';

@Component({
  selector: 'app-menu-card-item-large',
  templateUrl: './menu-card-item-large.component.html',
  styleUrls: ['./menu-card-item-large.component.css'],
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
export class MenuCardItemLargeComponent implements OnInit {

  @Input() public lang: string;
  @Input() public item: any;

    constructor(
      private _lightbox: Lightbox
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

}
