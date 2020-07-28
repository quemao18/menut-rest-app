import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterWaiterComponent } from './footer-waiter.component';

describe('FooterWaiterComponent', () => {
  let component: FooterWaiterComponent;
  let fixture: ComponentFixture<FooterWaiterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FooterWaiterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterWaiterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
