import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfsTemplateComponent } from './pdfs-template.component';

describe('PdfsTemplateComponent', () => {
  let component: PdfsTemplateComponent;
  let fixture: ComponentFixture<PdfsTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PdfsTemplateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PdfsTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
