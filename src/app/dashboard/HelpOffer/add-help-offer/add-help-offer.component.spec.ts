import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddHelpOfferComponent } from './add-help-offer.component';

describe('AddHelpOfferComponent', () => {
  let component: AddHelpOfferComponent;
  let fixture: ComponentFixture<AddHelpOfferComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddHelpOfferComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddHelpOfferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
