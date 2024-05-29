import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProofreadinFormComponent } from './edit-proofreadin-form.component';

describe('EditProofreadinFormComponent', () => {
  let component: EditProofreadinFormComponent;
  let fixture: ComponentFixture<EditProofreadinFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditProofreadinFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditProofreadinFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
