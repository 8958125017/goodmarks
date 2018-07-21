import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSkillUsersComponent } from './view-skill-users.component';

describe('ViewSkillUsersComponent', () => {
  let component: ViewSkillUsersComponent;
  let fixture: ComponentFixture<ViewSkillUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewSkillUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewSkillUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
