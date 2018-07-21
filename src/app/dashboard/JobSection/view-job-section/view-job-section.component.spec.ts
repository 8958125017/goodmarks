import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewJobSectionComponent } from './view-job-section.component';

describe('ViewJobSectionComponent', () => {
  let component: ViewJobSectionComponent;
  let fixture: ComponentFixture<ViewJobSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewJobSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewJobSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
