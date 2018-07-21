import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditJobSectionComponent } from './edit-job-section.component';

describe('EditJobSectionComponent', () => {
  let component: EditJobSectionComponent;
  let fixture: ComponentFixture<EditJobSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditJobSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditJobSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
