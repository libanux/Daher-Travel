import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentServicesTableComponent } from './content-services-table.component';

describe('ContentServicesTableComponent', () => {
  let component: ContentServicesTableComponent;
  let fixture: ComponentFixture<ContentServicesTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ContentServicesTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ContentServicesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
