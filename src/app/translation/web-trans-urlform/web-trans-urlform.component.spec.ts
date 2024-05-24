import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebTransUrlformComponent } from './web-trans-urlform.component';

describe('WebTransUrlformComponent', () => {
  let component: WebTransUrlformComponent;
  let fixture: ComponentFixture<WebTransUrlformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WebTransUrlformComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WebTransUrlformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
