import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebTranslationTableComponent } from './web-translation-table.component';

describe('WebTranslationTableComponent', () => {
  let component: WebTranslationTableComponent;
  let fixture: ComponentFixture<WebTranslationTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WebTranslationTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WebTranslationTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
