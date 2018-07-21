import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSkillListComponent } from './edit-skill-list.component';

describe('EditSkillListComponent', () => {
  let component: EditSkillListComponent;
  let fixture: ComponentFixture<EditSkillListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditSkillListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSkillListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
