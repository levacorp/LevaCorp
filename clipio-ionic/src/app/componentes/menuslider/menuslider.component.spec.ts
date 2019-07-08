import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenusliderComponent } from './menuslider.component';

describe('MenusliderComponent', () => {
  let component: MenusliderComponent;
  let fixture: ComponentFixture<MenusliderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenusliderComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenusliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
