import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPositiveMsgComponent } from './view-positive-msg.component';

describe('ViewPositiveMsgComponent', () => {
  let component: ViewPositiveMsgComponent;
  let fixture: ComponentFixture<ViewPositiveMsgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewPositiveMsgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewPositiveMsgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
