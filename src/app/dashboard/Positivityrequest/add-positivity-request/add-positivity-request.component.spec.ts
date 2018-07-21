import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPositivityRequestComponent } from './add-positivity-request.component';

describe('AddPositivityRequestComponent', () => {
  let component: AddPositivityRequestComponent;
  let fixture: ComponentFixture<AddPositivityRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPositivityRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPositivityRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
