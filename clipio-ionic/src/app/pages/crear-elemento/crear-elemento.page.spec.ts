import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearElementoPage } from './crear-elemento.page';

describe('CrearElementoPage', () => {
  let component: CrearElementoPage;
  let fixture: ComponentFixture<CrearElementoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearElementoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearElementoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
