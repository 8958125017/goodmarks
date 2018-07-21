import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPositiveMsgComponent } from './add-positive-msg.component';

describe('AddPositiveMsgComponent', () => {
  let component: AddPositiveMsgComponent;
  let fixture: ComponentFixture<AddPositiveMsgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPositiveMsgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPositiveMsgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
