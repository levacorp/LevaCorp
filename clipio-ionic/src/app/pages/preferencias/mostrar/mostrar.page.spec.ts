import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrarPage } from './mostrar.page';

describe('MostrarPage', () => {
  let component: MostrarPage;
  let fixture: ComponentFixture<MostrarPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MostrarPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MostrarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
