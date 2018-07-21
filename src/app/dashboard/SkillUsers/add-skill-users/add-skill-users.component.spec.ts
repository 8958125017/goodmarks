import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSkillUsersComponent } from './add-skill-users.component';

describe('AddSkillUsersComponent', () => {
  let component: AddSkillUsersComponent;
  let fixture: ComponentFixture<AddSkillUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSkillUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSkillUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
