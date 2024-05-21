import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditingProofreadingMaimComponent } from './editing-proofreading-maim.component';

describe('EditingProofreadingMaimComponent', () => {
  let component: EditingProofreadingMaimComponent;
  let fixture: ComponentFixture<EditingProofreadingMaimComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditingProofreadingMaimComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditingProofreadingMaimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
