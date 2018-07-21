import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddHelpReqComponent } from './add-help-req.component';

describe('AddHelpReqComponent', () => {
  let component: AddHelpReqComponent;
  let fixture: ComponentFixture<AddHelpReqComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddHelpReqComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddHelpReqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
