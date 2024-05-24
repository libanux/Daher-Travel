import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentServicesMainComponent } from './content-services-main.component';

describe('ContentServicesMainComponent', () => {
  let component: ContentServicesMainComponent;
  let fixture: ComponentFixture<ContentServicesMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ContentServicesMainComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ContentServicesMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
