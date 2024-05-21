import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDocTranslationComponent } from './view-doc-translation.component';

describe('ViewDocTranslationComponent', () => {
  let component: ViewDocTranslationComponent;
  let fixture: ComponentFixture<ViewDocTranslationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewDocTranslationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewDocTranslationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
