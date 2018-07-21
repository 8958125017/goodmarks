import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSosComponent } from './add-sos.component';

describe('AddSosComponent', () => {
  let component: AddSosComponent;
  let fixture: ComponentFixture<AddSosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
