import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AsociacionElementoDispositivoPage } from './asociacion-elemento-dispositivo.page';

describe('AsociacionElementoDispositivoPage', () => {
  let component: AsociacionElementoDispositivoPage;
  let fixture: ComponentFixture<AsociacionElementoDispositivoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsociacionElementoDispositivoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsociacionElementoDispositivoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
