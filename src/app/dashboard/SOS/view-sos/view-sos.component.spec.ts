import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSosComponent } from './view-sos.component';

describe('ViewSosComponent', () => {
  let component: ViewSosComponent;
  let fixture: ComponentFixture<ViewSosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewSosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewSosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
