import { TestBed } from '@angular/core/testing';

import { TranslateLanguageService } from './translate-language.service';

describe('TranslateLanguageService', () => {
  let service: TranslateLanguageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TranslateLanguageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
