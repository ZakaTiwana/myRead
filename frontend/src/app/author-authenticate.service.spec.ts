import { TestBed } from '@angular/core/testing';

import { AuthorAuthenticateService } from './author-authenticate.service';

describe('AuthorAuthenticateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AuthorAuthenticateService = TestBed.get(AuthorAuthenticateService);
    expect(service).toBeTruthy();
  });
});
