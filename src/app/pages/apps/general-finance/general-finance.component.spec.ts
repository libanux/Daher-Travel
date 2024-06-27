import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralFinanceComponent } from './general-finance.component';

describe('GeneralFinanceComponent', () => {
  let component: GeneralFinanceComponent;
  let fixture: ComponentFixture<GeneralFinanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GeneralFinanceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GeneralFinanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
