import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreferenciasPage } from './preferencias.page';

describe('PreferenciasPage', () => {
  let component: PreferenciasPage;
  let fixture: ComponentFixture<PreferenciasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreferenciasPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreferenciasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
