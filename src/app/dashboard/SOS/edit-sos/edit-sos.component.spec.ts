import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSosComponent } from './edit-sos.component';

describe('EditSosComponent', () => {
  let component: EditSosComponent;
  let fixture: ComponentFixture<EditSosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditSosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
