import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonAddPhoneSizeComponent } from './button-add-phone-size.component';

describe('ButtonAddPhoneSizeComponent', () => {
  let component: ButtonAddPhoneSizeComponent;
  let fixture: ComponentFixture<ButtonAddPhoneSizeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ButtonAddPhoneSizeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ButtonAddPhoneSizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
