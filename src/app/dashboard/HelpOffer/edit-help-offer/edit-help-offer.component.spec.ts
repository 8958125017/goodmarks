import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditHelpOfferComponent } from './edit-help-offer.component';

describe('EditHelpOfferComponent', () => {
  let component: EditHelpOfferComponent;
  let fixture: ComponentFixture<EditHelpOfferComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditHelpOfferComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditHelpOfferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
