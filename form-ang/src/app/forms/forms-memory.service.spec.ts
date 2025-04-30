import { TestBed } from '@angular/core/testing';

import { FormsMemoryService } from './forms-memory.service';

describe('FormsMemoryService', () => {
  let service: FormsMemoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormsMemoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
