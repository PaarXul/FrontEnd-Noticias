import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewFavoritasComponent } from './view-favoritas.component';

describe('ViewFavoritasComponent', () => {
  let component: ViewFavoritasComponent;
  let fixture: ComponentFixture<ViewFavoritasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewFavoritasComponent]
    });
    fixture = TestBed.createComponent(ViewFavoritasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
