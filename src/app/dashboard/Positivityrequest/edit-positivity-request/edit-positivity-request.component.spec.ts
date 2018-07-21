import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPositivityRequestComponent } from './edit-positivity-request.component';

describe('EditPositivityRequestComponent', () => {
  let component: EditPositivityRequestComponent;
  let fixture: ComponentFixture<EditPositivityRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditPositivityRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPositivityRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
