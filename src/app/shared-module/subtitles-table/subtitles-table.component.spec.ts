import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubtitlesTableComponent } from './subtitles-table.component';

describe('SubtitlesTableComponent', () => {
  let component: SubtitlesTableComponent;
  let fixture: ComponentFixture<SubtitlesTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubtitlesTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubtitlesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
