import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonUsedComponent } from './button-used.component';

describe('ButtonUsedComponent', () => {
  let component: ButtonUsedComponent;
  let fixture: ComponentFixture<ButtonUsedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ButtonUsedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ButtonUsedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }); 

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
