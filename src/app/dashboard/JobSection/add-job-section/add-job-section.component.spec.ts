import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddJobSectionComponent } from './add-job-section.component';

describe('AddJobSectionComponent', () => {
  let component: AddJobSectionComponent;
  let fixture: ComponentFixture<AddJobSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddJobSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddJobSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
