import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisaMainComponent } from './visa-main.component';

describe('VisaMainComponent', () => {
  let component: VisaMainComponent;
  let fixture: ComponentFixture<VisaMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VisaMainComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VisaMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
