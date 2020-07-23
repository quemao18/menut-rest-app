import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterCustomerComponent } from './footer-customer.component';

describe('FooterCustomerComponent', () => {
  let component: FooterCustomerComponent;
  let fixture: ComponentFixture<FooterCustomerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FooterCustomerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
