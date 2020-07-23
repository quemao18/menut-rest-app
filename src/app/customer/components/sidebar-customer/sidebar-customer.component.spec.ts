import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarCustomerComponent } from './sidebar-customer.component';

describe('SidebarCustomerComponent', () => {
  let component: SidebarCustomerComponent;
  let fixture: ComponentFixture<SidebarCustomerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidebarCustomerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
