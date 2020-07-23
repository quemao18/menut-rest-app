import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarCustomerComponent } from './navbar-customer.component';

describe('NavbarCustomerComponent', () => {
  let component: NavbarCustomerComponent;
  let fixture: ComponentFixture<NavbarCustomerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavbarCustomerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
