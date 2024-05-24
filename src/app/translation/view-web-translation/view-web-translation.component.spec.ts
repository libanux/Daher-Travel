import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewWebTranslationComponent } from './view-web-translation.component';

describe('ViewWebTranslationComponent', () => {
  let component: ViewWebTranslationComponent;
  let fixture: ComponentFixture<ViewWebTranslationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewWebTranslationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewWebTranslationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
