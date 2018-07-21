import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAdminUsersComponent } from './add-admin-users.component';

describe('AddAdminUsersComponent', () => {
  let component: AddAdminUsersComponent;
  let fixture: ComponentFixture<AddAdminUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAdminUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAdminUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
