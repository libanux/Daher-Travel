import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralExpensesComponent } from './general-expenses.component';

describe('GeneralExpensesComponent', () => {
  let component: GeneralExpensesComponent;
  let fixture: ComponentFixture<GeneralExpensesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GeneralExpensesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GeneralExpensesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
