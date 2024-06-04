import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotiMainComponent } from './noti-main.component';

describe('NotiMainComponent', () => {
  let component: NotiMainComponent;
  let fixture: ComponentFixture<NotiMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotiMainComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotiMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
