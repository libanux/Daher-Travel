import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProofreadingTableComponent } from './proofreading-table.component';

describe('ProofreadingTableComponent', () => {
  let component: ProofreadingTableComponent;
  let fixture: ComponentFixture<ProofreadingTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProofreadingTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProofreadingTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
