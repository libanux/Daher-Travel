import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTranscriptionComponent } from './view-transcription.component';

describe('ViewTranscriptionComponent', () => {
  let component: ViewTranscriptionComponent;
  let fixture: ComponentFixture<ViewTranscriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewTranscriptionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewTranscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
