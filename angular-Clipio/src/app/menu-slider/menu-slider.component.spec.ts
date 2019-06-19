import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuSliderComponent } from './menu-slider.component';

describe('MenuSliderComponent', () => {
  let component: MenuSliderComponent;
  let fixture: ComponentFixture<MenuSliderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuSliderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
