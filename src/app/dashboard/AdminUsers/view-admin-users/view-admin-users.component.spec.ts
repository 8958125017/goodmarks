import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAdminUsersComponent } from './view-admin-users.component';

describe('ViewAdminUsersComponent', () => {
  let component: ViewAdminUsersComponent;
  let fixture: ComponentFixture<ViewAdminUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewAdminUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAdminUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
