import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DishCardItemLargeComponent } from './dish-card-item-large.component';

describe('DishCardItemLargeComponent', () => {
  let component: DishCardItemLargeComponent;
  let fixture: ComponentFixture<DishCardItemLargeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DishCardItemLargeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DishCardItemLargeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
