import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuCardItemMediumComponent } from './menu-card-item-medium.component';

describe('MenuCardItemMediumComponent', () => {
  let component: MenuCardItemMediumComponent;
  let fixture: ComponentFixture<MenuCardItemMediumComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuCardItemMediumComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuCardItemMediumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
