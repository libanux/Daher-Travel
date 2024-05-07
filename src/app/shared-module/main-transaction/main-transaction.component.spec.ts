import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainTransactionComponent } from './main-transaction.component';

describe('MainTransactionComponent', () => {
  let component: MainTransactionComponent;
  let fixture: ComponentFixture<MainTransactionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MainTransactionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MainTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
