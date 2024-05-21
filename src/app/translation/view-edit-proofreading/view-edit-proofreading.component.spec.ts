import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewEditProofreadingComponent } from './view-edit-proofreading.component';

describe('ViewEditProofreadingComponent', () => {
  let component: ViewEditProofreadingComponent;
  let fixture: ComponentFixture<ViewEditProofreadingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewEditProofreadingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewEditProofreadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
