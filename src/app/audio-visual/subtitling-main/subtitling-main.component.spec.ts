import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubtitlingMainComponent } from './subtitling-main.component';

describe('SubtitlingMainComponent', () => {
  let component: SubtitlingMainComponent;
  let fixture: ComponentFixture<SubtitlingMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SubtitlingMainComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SubtitlingMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
