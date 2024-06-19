import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewWholesalerComponent } from './view-wholesaler.component';

describe('ViewWholesalerComponent', () => {
  let component: ViewWholesalerComponent;
  let fixture: ComponentFixture<ViewWholesalerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewWholesalerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewWholesalerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
