import { TestBed } from '@angular/core/testing';

import { DataConvertionService } from './data-convertion.service';

describe('DataConvertionService', () => {
  let service: DataConvertionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataConvertionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
