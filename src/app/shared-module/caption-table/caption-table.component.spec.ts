import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaptionTableComponent } from './caption-table.component';

describe('CaptionTableComponent', () => {
  let component: CaptionTableComponent;
  let fixture: ComponentFixture<CaptionTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CaptionTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CaptionTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
