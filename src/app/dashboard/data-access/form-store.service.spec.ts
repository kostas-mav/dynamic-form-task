import { TestBed } from '@angular/core/testing';

import { FormStoreService } from './form-store.service';

describe('FormStoreService', () => {
  let service: FormStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
