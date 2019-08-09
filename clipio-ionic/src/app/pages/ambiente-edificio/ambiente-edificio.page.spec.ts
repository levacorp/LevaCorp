import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AmbienteEdificioPage } from './ambiente-edificio.page';

describe('AmbienteEdificioPage', () => {
  let component: AmbienteEdificioPage;
  let fixture: ComponentFixture<AmbienteEdificioPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AmbienteEdificioPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AmbienteEdificioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
