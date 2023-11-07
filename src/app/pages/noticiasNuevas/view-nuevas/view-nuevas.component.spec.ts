import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewNuevasComponent } from './view-nuevas.component';

describe('ViewNuevasComponent', () => {
  let component: ViewNuevasComponent;
  let fixture: ComponentFixture<ViewNuevasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewNuevasComponent]
    });
    fixture = TestBed.createComponent(ViewNuevasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
