import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccMainComponent } from './acc-main.component';

describe('AccMainComponent', () => {
  let component: AccMainComponent;
  let fixture: ComponentFixture<AccMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccMainComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
