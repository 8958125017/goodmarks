import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPositiveMsgComponent } from './edit-positive-msg.component';

describe('EditPositiveMsgComponent', () => {
  let component: EditPositiveMsgComponent;
  let fixture: ComponentFixture<EditPositiveMsgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditPositiveMsgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPositiveMsgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
