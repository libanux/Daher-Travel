import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecMainComponent } from './rec-main.component';

describe('RecMainComponent', () => {
  let component: RecMainComponent;
  let fixture: ComponentFixture<RecMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecMainComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
