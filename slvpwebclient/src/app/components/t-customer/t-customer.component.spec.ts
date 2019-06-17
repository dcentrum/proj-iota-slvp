import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TCustomerComponent } from './t-customer.component';

describe('TCustomerComponent', () => {
  let component: TCustomerComponent;
  let fixture: ComponentFixture<TCustomerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TCustomerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
