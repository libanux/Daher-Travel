import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentTransTableComponent } from './document-trans-table.component';

describe('DocumentTransTableComponent', () => {
  let component: DocumentTransTableComponent;
  let fixture: ComponentFixture<DocumentTransTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DocumentTransTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DocumentTransTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
