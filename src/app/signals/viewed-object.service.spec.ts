import { TestBed } from '@angular/core/testing';

import { ViewedObjectService } from './viewed-object.service';

describe('ViewedObjectService', () => {
  let service: ViewedObjectService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ViewedObjectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
