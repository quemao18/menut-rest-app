import { Component, OnInit, Input } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Lightbox } from 'ngx-lightbox';

@Component({
  selector: 'app-dish-card-item-large',
  templateUrl: './dish-card-item-large.component.html',
  styleUrls: ['./dish-card-item-large.component.css'],
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
export class DishCardItemLargeComponent implements OnInit {

  @Input() public lang: string;
  @Input() public photoBG: string;
  @Input() public photoPF: string;
  @Input() public ref: any;
  @Input() public nameEs: string;
  @Input() public nameEn: string;
  @Input() public descriptionEs: string;
  @Input() public descriptionEn: string;
  @Input() public status: boolean;
  @Input() public price: number;

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
