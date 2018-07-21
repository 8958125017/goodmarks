import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAdminUsersComponent } from './edit-admin-users.component';

describe('EditAdminUsersComponent', () => {
  let component: EditAdminUsersComponent;
  let fixture: ComponentFixture<EditAdminUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditAdminUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAdminUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
