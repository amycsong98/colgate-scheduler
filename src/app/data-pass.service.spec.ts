import { TestBed } from '@angular/core/testing';

import { DataPassService } from './data-pass.service';

describe('DataPassService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DataPassService = TestBed.get(DataPassService);
    expect(service).toBeTruthy();
  });
});
