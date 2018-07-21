import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditHelpReqComponent } from './edit-help-req.component';

describe('EditHelpReqComponent', () => {
  let component: EditHelpReqComponent;
  let fixture: ComponentFixture<EditHelpReqComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditHelpReqComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditHelpReqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
