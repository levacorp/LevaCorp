import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LecturaQRPage } from './lectura-qr.page';

describe('LecturaQRPage', () => {
  let component: LecturaQRPage;
  let fixture: ComponentFixture<LecturaQRPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LecturaQRPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LecturaQRPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
