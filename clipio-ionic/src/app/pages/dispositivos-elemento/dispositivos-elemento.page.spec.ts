import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DispositivosElementoPage } from './dispositivos-elemento.page';

describe('DispositivosElementoPage', () => {
  let component: DispositivosElementoPage;
  let fixture: ComponentFixture<DispositivosElementoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DispositivosElementoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DispositivosElementoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
