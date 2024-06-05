import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PackageMainComponent } from './package-main.component';

describe('PackageMainComponent', () => {
  let component: PackageMainComponent;
  let fixture: ComponentFixture<PackageMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PackageMainComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PackageMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
