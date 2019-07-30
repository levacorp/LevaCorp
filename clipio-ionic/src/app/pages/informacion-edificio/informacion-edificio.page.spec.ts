import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InformacionEdificioPage } from './informacion-edificio.page';

describe('InformacionEdificioPage', () => {
  let component: InformacionEdificioPage;
  let fixture: ComponentFixture<InformacionEdificioPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [InformacionEdificioPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InformacionEdificioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
