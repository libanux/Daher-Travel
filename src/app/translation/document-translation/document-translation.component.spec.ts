import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentTranslationComponent } from './document-translation.component';

describe('DocumentTranslationComponent', () => {
  let component: DocumentTranslationComponent;
  let fixture: ComponentFixture<DocumentTranslationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DocumentTranslationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DocumentTranslationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
