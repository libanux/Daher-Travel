import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountingTableComponent } from './accounting-table.component';

describe('AccountingTableComponent', () => {
  let component: AccountingTableComponent;
  let fixture: ComponentFixture<AccountingTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AccountingTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AccountingTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
