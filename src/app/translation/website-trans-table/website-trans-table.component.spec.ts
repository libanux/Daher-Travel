import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebsiteTransTableComponent } from './website-trans-table.component';

describe('WebsiteTransTableComponent', () => {
  let component: WebsiteTransTableComponent;
  let fixture: ComponentFixture<WebsiteTransTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WebsiteTransTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WebsiteTransTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
