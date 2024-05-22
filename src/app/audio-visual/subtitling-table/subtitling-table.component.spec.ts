import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubtitlingTableComponent } from './subtitling-table.component';

describe('SubtitlingTableComponent', () => {
  let component: SubtitlingTableComponent;
  let fixture: ComponentFixture<SubtitlingTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SubtitlingTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SubtitlingTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
