import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TranscriptionTableComponent } from './transcription-table.component';

describe('TranscriptionTableComponent', () => {
  let component: TranscriptionTableComponent;
  let fixture: ComponentFixture<TranscriptionTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TranscriptionTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TranscriptionTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
