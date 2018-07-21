import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewHelpOfferComponent } from './view-help-offer.component';

describe('ViewHelpOfferComponent', () => {
  let component: ViewHelpOfferComponent;
  let fixture: ComponentFixture<ViewHelpOfferComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewHelpOfferComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewHelpOfferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
