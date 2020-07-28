import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WaiterLayoutComponent } from './waiter-layout.component';

describe('CustomerLayoutComponent', () => {
  let component: WaiterLayoutComponent;
  let fixture: ComponentFixture<WaiterLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WaiterLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WaiterLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
