import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebsiteTranslationComponent } from './website-translation.component';

describe('WebsiteTranslationComponent', () => {
  let component: WebsiteTranslationComponent;
  let fixture: ComponentFixture<WebsiteTranslationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WebsiteTranslationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WebsiteTranslationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
