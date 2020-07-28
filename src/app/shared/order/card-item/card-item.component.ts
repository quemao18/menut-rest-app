import { Component, OnInit, Input } from '@angular/core';
import { Lightbox } from 'ngx-lightbox';

@Component({
  selector: 'app-card-item',
  templateUrl: './card-item.component.html',
  styleUrls: ['./card-item.component.css']
})
export class CardItemComponent implements OnInit {

  @Input() public item?: any;

  constructor(
    private _lightbox: Lightbox
  ) { }

  ngOnInit(): void {
    console.log('item',this.item)
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
