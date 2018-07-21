import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSkillUsersComponent } from './edit-skill-users.component';

describe('EditSkillUsersComponent', () => {
  let component: EditSkillUsersComponent;
  let fixture: ComponentFixture<EditSkillUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditSkillUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSkillUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
