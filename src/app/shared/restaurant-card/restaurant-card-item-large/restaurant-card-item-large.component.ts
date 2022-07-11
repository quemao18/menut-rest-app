import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Lightbox } from 'ngx-lightbox';
import { Location } from '@angular/common';

@Component({
  selector: 'app-restaurant-card-item-large',
  templateUrl: './restaurant-card-item-large.component.html',
  styleUrls: ['./restaurant-card-item-large.component.css'],
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
export class RestaurantCardItemLargeComponent implements OnInit, AfterViewInit {

  @Input() public lang: string;
  @Input() public item: any;

  constructor(
    private _lightbox: Lightbox,
    private location: Location,
  ) { }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {

  }

  getUrlIg(item: any): string {
    return 'https://instagram.com/' + item?.instagram;
  }

  getUrlWa(item: any): string {
    return `https://api.whatsapp.com/send?phone=${item?.whatsapp}&text=Hola,%20qué%20tal?`;
  }


  open(name: string, photo: string): void {
    // open lightbox        
    const album = [];
    album.push({
      src: photo,
      caption: name,
      thumb: photo,
      downloadUrl: ''
   });
    this._lightbox.open(album, 0);
  }
 
  close(): void {
    // close lightbox programmatically
    this._lightbox.close();
  }

  back(){
    this.location.back();
  }

}
