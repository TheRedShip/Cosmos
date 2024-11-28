import { TestBed } from '@angular/core/testing';

import { PlanetStatisticsService } from './planet-statistics.service';

describe('PlanetStatisticsService', () => {
  let service: PlanetStatisticsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlanetStatisticsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
