import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuPdfComponent } from './menu-pdf.component';

describe('MenuPdfComponent', () => {
  let component: MenuPdfComponent;
  let fixture: ComponentFixture<MenuPdfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuPdfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuPdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
