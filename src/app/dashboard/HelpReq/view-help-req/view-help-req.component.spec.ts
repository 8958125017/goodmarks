import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewHelpReqComponent } from './view-help-req.component';

describe('ViewHelpReqComponent', () => {
  let component: ViewHelpReqComponent;
  let fixture: ComponentFixture<ViewHelpReqComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewHelpReqComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewHelpReqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
