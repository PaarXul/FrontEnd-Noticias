import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsNuevasComponent } from './details-nuevas.component';

describe('DetailsNuevasComponent', () => {
  let component: DetailsNuevasComponent;
  let fixture: ComponentFixture<DetailsNuevasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailsNuevasComponent]
    });
    fixture = TestBed.createComponent(DetailsNuevasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
