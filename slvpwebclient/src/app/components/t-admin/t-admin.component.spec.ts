import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TAdminComponent } from './t-admin.component';

describe('TAdminComponent', () => {
  let component: TAdminComponent;
  let fixture: ComponentFixture<TAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
