import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TranslationMainComponent } from './translation-main.component';

describe('TranslationMainComponent', () => {
  let component: TranslationMainComponent;
  let fixture: ComponentFixture<TranslationMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TranslationMainComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TranslationMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
