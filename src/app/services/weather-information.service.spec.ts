import { TestBed } from '@angular/core/testing';

import { WeatherInformationService } from './weather-information.service';

describe('WeatherInformationService', () => {
  let service: WeatherInformationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WeatherInformationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
