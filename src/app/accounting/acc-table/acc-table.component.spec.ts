import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccTableComponent } from './acc-table.component';

describe('AccTableComponent', () => {
  let component: AccTableComponent;
  let fixture: ComponentFixture<AccTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
