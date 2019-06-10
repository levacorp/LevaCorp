import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PagClipioComponent } from './pag-clipio.component';

describe('PagClipioComponent', () => {
  let component: PagClipioComponent;
  let fixture: ComponentFixture<PagClipioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagClipioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagClipioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
