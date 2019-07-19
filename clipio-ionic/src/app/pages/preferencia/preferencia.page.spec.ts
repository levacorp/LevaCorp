import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreferenciaPage } from './preferencia.page';

describe('PreferenciaPage', () => {
  let component: PreferenciaPage;
  let fixture: ComponentFixture<PreferenciaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreferenciaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreferenciaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
