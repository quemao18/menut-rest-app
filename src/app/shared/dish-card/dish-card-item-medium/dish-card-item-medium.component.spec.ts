import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DishCardItemMediumComponent } from './dish-card-item-medium.component';

describe('DishCardItemMediumComponent', () => {
  let component: DishCardItemMediumComponent;
  let fixture: ComponentFixture<DishCardItemMediumComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DishCardItemMediumComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DishCardItemMediumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
