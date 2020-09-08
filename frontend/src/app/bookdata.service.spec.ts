import { TestBed } from '@angular/core/testing';

import { BookdataService } from './bookdata.service';

describe('BookdataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BookdataService = TestBed.get(BookdataService);
    expect(service).toBeTruthy();
  });
});
