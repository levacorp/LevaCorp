import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearDispositivoPage } from './crear-dispositivo.page';

describe('CrearDispositivoPage', () => {
  let component: CrearDispositivoPage;
  let fixture: ComponentFixture<CrearDispositivoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearDispositivoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearDispositivoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
