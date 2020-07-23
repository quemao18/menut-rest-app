import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuCardItemLargeComponent } from './menu-card-item-large.component';

describe('MenuCardItemLargeComponent', () => {
  let component: MenuCardItemLargeComponent;
  let fixture: ComponentFixture<MenuCardItemLargeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuCardItemLargeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuCardItemLargeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
