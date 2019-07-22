import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearEdificioPage } from './crear-edificio.page';

describe('CrearEdificioPage', () => {
  let component: CrearEdificioPage;
  let fixture: ComponentFixture<CrearEdificioPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearEdificioPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearEdificioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
