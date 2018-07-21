import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSkillListComponent } from './add-skill-list.component';

describe('AddSkillListComponent', () => {
  let component: AddSkillListComponent;
  let fixture: ComponentFixture<AddSkillListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSkillListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSkillListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
