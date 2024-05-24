import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProofreadingTableComponent } from './edit-proofreading-table.component';

describe('EditProofreadingTableComponent', () => {
  let component: EditProofreadingTableComponent;
  let fixture: ComponentFixture<EditProofreadingTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditProofreadingTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditProofreadingTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
