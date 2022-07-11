import { Component, OnInit, Input } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-card-home',
  templateUrl: './home-card.component.html',
  styleUrls: ['./home-card.component.css'],
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
export class HomeCardComponent implements OnInit {

  @Input() public route: string;
  @Input() public textButton: string;
  @Input() public textTitle: string;
  @Input() public slogan: string;
  @Input() public instagram: string = '';
  @Input() public whatsapp: string = '';
  @Input() public address: string = '';
  @Input() public logo: string = '';

  urlIg = '';
  urlWa = '';
  constructor() { }

  ngOnInit(): void {
    this.urlIg = 'https://instagram.com/' + this.instagram;
    this.urlWa = `https://api.whatsapp.com/send?phone=${this.whatsapp}&text=Hola,%20qué%20tal?`
  }

}
