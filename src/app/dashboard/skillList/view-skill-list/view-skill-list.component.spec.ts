import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSkillListComponent } from './view-skill-list.component';

describe('ViewSkillListComponent', () => {
  let component: ViewSkillListComponent;
  let fixture: ComponentFixture<ViewSkillListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewSkillListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewSkillListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
