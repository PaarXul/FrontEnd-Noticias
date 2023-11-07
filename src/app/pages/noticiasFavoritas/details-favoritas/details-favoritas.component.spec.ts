import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsFavoritasComponent } from './details-favoritas.component';

describe('DetailsFavoritasComponent', () => {
  let component: DetailsFavoritasComponent;
  let fixture: ComponentFixture<DetailsFavoritasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailsFavoritasComponent]
    });
    fixture = TestBed.createComponent(DetailsFavoritasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
