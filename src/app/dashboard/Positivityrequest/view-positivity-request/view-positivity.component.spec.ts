import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPositivityComponent } from './view-positivity.component';

describe('ViewPositivityComponent', () => {
  let component: ViewPositivityComponent;
  let fixture: ComponentFixture<ViewPositivityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewPositivityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewPositivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
