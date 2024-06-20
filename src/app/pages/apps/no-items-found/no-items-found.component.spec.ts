import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoItemsFoundComponent } from './no-items-found.component';

describe('NoItemsFoundComponent', () => {
  let component: NoItemsFoundComponent;
  let fixture: ComponentFixture<NoItemsFoundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoItemsFoundComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NoItemsFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
