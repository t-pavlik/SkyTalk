import { TestBed } from '@angular/core/testing';

import { TranslationStorageService } from './translation-storage.service';

describe('TranslationStorageService', () => {
  let service: TranslationStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TranslationStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
