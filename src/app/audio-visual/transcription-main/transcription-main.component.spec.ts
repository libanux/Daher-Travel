import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TranscriptionMainComponent } from './transcription-main.component';

describe('TranscriptionMainComponent', () => {
  let component: TranscriptionMainComponent;
  let fixture: ComponentFixture<TranscriptionMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TranscriptionMainComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TranscriptionMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
