import { TestBed } from '@angular/core/testing';

import { TrainsService } from './trains.service';

describe('TrainsService', () => {
  let service: TrainsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrainsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
