import { TestBed } from '@angular/core/testing';

import { TranslationSignalService } from './translation-signal.service';

describe('TranslationSignalService', () => {
  let service: TranslationSignalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TranslationSignalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
